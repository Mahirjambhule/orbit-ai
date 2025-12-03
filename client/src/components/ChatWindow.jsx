import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatWindow = ({
    user,
    messages,
    input,
    setInput,
    onSend,
    isSidebarOpen,
    onToggleSidebar,
    isAiTyping
}) => {

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isAiTyping]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') onSend();
    };

    return (
        <div className="relative z-10 flex-1 flex flex-col h-full transition-all duration-300">

            {/* HAMBURGER TOGGLE */}
            <div className="p-4 absolute top-0 left-0 z-20">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* MESSAGES LIST */}
            {messages.length > 0 ? (
                <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 space-y-6 scrollbar-hide">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-xl backdrop-blur-md border border-gray-700/50 shadow-lg overflow-hidden ${msg.role === 'user'
                                    ? 'bg-blue-600/20 text-white rounded-br-none border-blue-500/30'
                                    : 'bg-gray-800/80 text-gray-100 rounded-bl-none'
                                }`}>

                                {/* SAFE RENDERING LOGIC */}
                                {msg.role === 'user' ? (
                                    <div className="whitespace-pre-wrap font-sans break-words">{msg.text}</div>
                                ) : (
                                    
                                    <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed break-words">
                                        <ReactMarkdown
                                            components={{
                                                
                                                pre: ({ node, ...props }) => (
                                                    <div className="overflow-x-auto w-full my-2 bg-black/30 p-3 rounded-lg border border-gray-700/50">
                                                        <pre {...props} className="m-0" />
                                                    </div>
                                                ),
                                                
                                                code: ({ node, ...props }) => (
                                                    <code {...props} className="bg-gray-700/50 px-1 py-0.5 rounded text-gray-200 font-mono text-sm break-all" />
                                                )
                                            }}
                                        >
                                            {msg.text || ""}
                                        </ReactMarkdown>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isAiTyping && (
                        <div className="flex justify-start animate-pulse">
                            <div className="bg-gray-800/50 p-4 rounded-xl rounded-bl-none border border-gray-700/50 flex space-x-2 items-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            ) : (
                <div className="flex-1"></div>
            )}

            {/* INPUT AREA */}
            <div className={`transition-all duration-500 ease-in-out flex flex-col 
        ${messages.length === 0 ? 'justify-center items-center h-full pb-32' : 'p-4 border-t border-gray-700/30 bg-black/20 backdrop-blur-md'}`}>

                {messages.length === 0 && (
                    <div className="text-center mb-8 animate-fade-in-up px-4">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Hello, {user?.username || 'User'}
                        </h1>
                        <p className="text-gray-400 text-lg">How can I help you today?</p>
                    </div>
                )}

                <div className="w-full max-w-3xl relative px-4 mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isAiTyping}
                        placeholder={isAiTyping ? "AI is thinking..." : "Ask anything..."}
                        className="w-full p-4 pl-6 pr-16 rounded-full bg-gray-900/90 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white shadow-2xl transition-all disabled:opacity-50 disabled:cursor-wait"
                    />
                    <button
                        onClick={onSend}
                        disabled={isAiTyping}
                        className="absolute right-6 top-2 bg-blue-600/80 p-2 rounded-full hover:bg-blue-500 transition-colors mt-0.5 disabled:bg-gray-700 disabled:cursor-not-allowed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>

                <div className="text-center mt-2">
                    <p className="text-xs text-gray-500">AI can make mistakes. Check important info.</p>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;