import React from 'react';

const Sidebar = ({
  user,
  isOpen,
  onLogout,
  onBgUpload,
  onRemoveBg,
  hasWallpaper,
  onNewChat,
  chats = [],
  activeChatId,
  onSelectChat,
  onDeleteChat
}) => {
  return (
    <div
      className={`${isOpen ? 'w-64' : 'w-20'} 
      bg-black/50 backdrop-blur-md border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col relative z-10`}
    >
      {/* --- BRAND HEADER (ORBIT) --- */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800/50">
        {/* Orbit Logo Icon */}
        <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">

            <circle cx="12" cy="12" r="3" fill="white" stroke="none" />

            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
          </svg>
        </div>

        {/* App Name */}
        {isOpen && (
          <span className="ml-3 font-bold text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-blue-200">
            Orbit
          </span>
        )}
      </div>

      {/* NEW CHAT BUTTON */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className={`w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-3 transition flex items-center shadow-lg shadow-blue-900/20 group ${isOpen ? 'justify-start px-4' : 'justify-center'}`}
        >
          {/* Plus Icon with rotation effect on hover */}
          <span className="text-xl font-bold group-hover:rotate-90 transition-transform duration-300">+</span>
          {isOpen && <span className="ml-2 font-medium">New Chat</span>}
        </button>
      </div>

      {/* CHAT HISTORY LIST */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onSelectChat(chat._id)}
            className={`p-3 rounded-lg cursor-pointer flex items-center transition group relative justify-between
                 ${activeChatId === chat._id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}
                 ${isOpen ? 'justify-between' : 'justify-center'}
               `}
          >
            <div className="flex items-center overflow-hidden w-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              {isOpen && (
                <span className="ml-3 text-sm truncate">{chat.title}</span>
              )}
            </div>

            {/* Delete Button */}
            {isOpen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat._id);
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 p-1 transition-all"
                title="Delete Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* BOTTOM ACTIONS (User & Settings) */}
      <div className="p-4 border-t border-gray-800/50 space-y-4">

        {/* User Profile */}
        <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-white shrink-0 border border-gray-600">
            {user.username ? user.username.charAt(0).toUpperCase() : '?'}
          </div>
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <div className="font-medium text-sm text-white truncate">{user.username}</div>
            </div>
          )}
        </div>

        {/* Wallpaper Control */}
        <div className="flex flex-col space-y-1">
          <label className={`cursor-pointer hover:bg-white/10 p-2 rounded-lg flex items-center transition text-gray-300 hover:text-white ${isOpen ? 'justify-start px-4' : 'justify-center'}`} title="Change Wallpaper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {isOpen && <span className="ml-3 text-sm">Wallpaper</span>}
            <input type="file" accept="image/*" className="hidden" onChange={onBgUpload} />
          </label>

          {hasWallpaper && (
            <button
              onClick={onRemoveBg}
              className={`cursor-pointer hover:bg-red-900/20 text-red-300 hover:text-red-400 p-2 rounded-lg flex items-center transition ${isOpen ? 'justify-start px-4' : 'justify-center'}`}
              title="Remove Wallpaper"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isOpen && <span className="ml-3 text-sm">Remove</span>}
            </button>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`w-full cursor-pointer hover:bg-white/10 text-gray-400 hover:text-white p-2 rounded-lg flex items-center transition ${isOpen ? 'justify-start px-4' : 'justify-center'}`}
          title="Log out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          {isOpen && <span className="ml-3 text-sm">Log out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;