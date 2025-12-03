import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginCall, registerCall, isFetching, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      loginCall(email, password);
    } else {
      registerCall(username, email, password);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden text-white font-sans p-4">

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]"></div>

      <div className="z-10 w-full max-w-sm p-6 sm:p-8 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl flex flex-col items-center h-auto">
        
        <div className="mb-6 flex flex-col items-center">
 
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-white">
              <circle cx="12" cy="12" r="3" fill="white" stroke="none" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">
            Orbit AI
          </h1>
        </div>

        <h2 className="text-lg font-semibold mb-1 text-gray-200">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-400 text-xs mb-6 text-center">
          {isLogin ? "Enter details to continue" : "Join us and explore AI"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 w-full">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Username</label>
              <input
                type="text"
                required
                className="w-full p-2.5 bg-black/40 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition text-white placeholder-gray-600 text-sm"
                placeholder="johndoe"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Email</label>
            <input
              type="email"
              required
              className="w-full p-2.5 bg-black/40 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition text-white placeholder-gray-600 text-sm"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              className="w-full p-2.5 bg-black/40 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition text-white placeholder-gray-600 text-sm"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isFetching}
            className="w-full p-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm"
          >
            {isFetching ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          {isLogin ? "No account? " : "Has account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(false);
            }}
            className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}