import { useState, useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthContext'
import Auth from './components/Auth'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import config from './config'

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) return <div>Auth Context Error</div>;

  const { user, logout, initialLoad } = authContext;

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [bgUrl, setBgUrl] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user?.settings?.bgImage) {
      setBgUrl(user.settings.bgImage);
    }
    if (user) fetchChats();
  }, [user]);

  const fetchChats = async () => {
    try {
      const res = await fetch(`${config.API_URL}/chats/user/${user._id}`);
      const data = await res.json();
      setChats(data);
    } catch (err) {
      console.error("Failed to load chats", err);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const res = await fetch(`${config.API_URL}/auth/settings/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          settings: newSettings
        })
      });

      if (res.ok) {
        const updatedUser = await res.json();
        try {
          const currentUser = JSON.parse(localStorage.getItem("user"));
          const mergedUser = { ...currentUser, settings: updatedUser.settings };
          localStorage.setItem("user", JSON.stringify(mergedUser));
        } catch (storageErr) {
          console.warn("LocalStorage update failed", storageErr);
        }
      }

    } catch (err) {
      console.error("Failed to save settings", err);
    }
  };

  const handleBgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", config.CLOUDINARY_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.secure_url) {
        setBgUrl(data.secure_url);
        updateSettings({ bgImage: data.secure_url });
      } else {
        console.error("Cloudinary Error:", data);
        alert(data.error?.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveBg = () => {
    setBgUrl("");
    updateSettings({ bgImage: "" });
  };

  const handleSelectChat = async (chatId) => {
    setActiveChatId(chatId);
    try {
      const res = await fetch(`${config.API_URL}/chats/${chatId}`);
      const data = await res.json();
      setMessages(data.messages);
    } catch (err) {
      console.error("Error loading chat", err);
    }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setInput("");
  };

  const handleDeleteChat = async (chatId) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;
    try {
      await fetch(`${config.API_URL}/chats/${chatId}`, { method: "DELETE" });
      setChats(prev => prev.filter(c => c._id !== chatId));
      if (activeChatId === chatId) handleNewChat();
    } catch (err) { console.error(err); }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const currentInput = input;
    setInput("");
    setIsAiTyping(true);

    let currentChatId = activeChatId;

    try {
      if (!currentChatId) {
        const createRes = await fetch(`${config.API_URL}/chats/new`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, title: currentInput.substring(0, 30) + "..." })
        });
        const newChat = await createRes.json();
        currentChatId = newChat._id;
        setActiveChatId(currentChatId);
        setChats([newChat, ...chats]);
      }

      const aiRes = await fetch(`${config.API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, history: newMessages })
      });
      const aiData = await aiRes.json();
      const aiText = aiData.text || "Error: No response";

      const aiMessage = { role: 'ai', text: aiText };
      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);

      await fetch(`${config.API_URL}/chats/${currentChatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMessage, aiMessage] })
      });

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to server." }]);
    }

    setIsAiTyping(false);
  };

  if (initialLoad) return <div className="h-screen w-full bg-black text-gray-500 flex items-center justify-center">Loading...</div>;
  if (!user) return <Auth />;

  return (
    <div
      className="flex h-screen text-white relative overflow-hidden font-sans"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'black'
      }}
    >
      <div className={`absolute inset-0 ${bgUrl ? 'bg-black/70' : ''} z-0`}></div>

      {isUploading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-white text-xl font-bold animate-pulse">Uploading Wallpaper...</div>
        </div>
      )}

      <Sidebar
        user={user}
        isOpen={isSidebarOpen}
        onLogout={logout}

        onBgUpload={handleBgUpload}
        onRemoveBg={handleRemoveBg}
        hasWallpaper={!!bgUrl}

        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      <ChatWindow
        user={user}
        messages={messages}
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isAiTyping={isAiTyping}
      />
    </div>
  )
}

export default App