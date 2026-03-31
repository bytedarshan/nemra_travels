import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default to standard customer
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(email, password);
      if (result.success) {
        navigate('/account'); // Send them to dashboard on success
      } else {
        setError(result.message);
      }
    } else {
      if (!name || !email || !password) {
        setError("Please fill in all fields.");
        return;
      }
      const result = signup(name, email, password, role);
      if (result.success) {
        navigate('/account'); // Send them to dashboard on success
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1542314831-c6a4d14b8fc4?q=80&w=2000&auto=format&fit=crop" 
        alt="Luxury Hotel" 
        className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
      />
      
      <div className="relative z-10 w-full max-w-md px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-white"
        >
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 p-1 rounded-lg flex gap-1 border border-white/10">
              <button 
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`px-6 py-2 rounded-md text-sm tracking-wider uppercase font-medium transition-all duration-300 ${isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}
              >
                Login
              </button>
              <button 
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`px-6 py-2 rounded-md text-sm tracking-wider uppercase font-medium transition-all duration-300 ${!isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-light tracking-wide">{isLogin ? 'Welcome Back' : 'Join Nemra Travels'}</h2>
                <p className="text-sm text-gray-300 mt-1 font-light">
                  {isLogin ? 'Access your itineraries and exclusive deals.' : 'Elevate your travel experience.'}
                </p>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              {!isLogin && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-3 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder-slate-400 shadow-inner transition-all"
                />
              )}
              
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder-slate-400 shadow-inner transition-all"
              />
              
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder-slate-400 shadow-inner transition-all"
              />

              {!isLogin && (
                <div className="mt-2 bg-slate-900/50 p-4 rounded-lg border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-amber-500 mb-3">Account Type</p>
                  <label className="flex items-center gap-3 cursor-pointer mb-2">
                    <input 
                      type="radio" 
                      name="role" 
                      checked={role === 'customer'}
                      onChange={() => setRole('customer')}
                      className="accent-amber-500 w-4 h-4" 
                    />
                    <span className="text-sm font-light">Standard Customer</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="role" 
                      checked={role === 'agent'}
                      onChange={() => setRole('agent')}
                      className="accent-amber-500 w-4 h-4" 
                    />
                    <span className="text-sm font-light">Travel Agent (Nemra Pro)</span>
                  </label>
                </div>
              )}

              <button type="submit" className="w-full mt-4 bg-amber-600 text-white py-3 rounded-lg uppercase tracking-wider font-semibold hover:bg-amber-500 transition-colors shadow-lg">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              {isLogin && (
                <button type="button" className="text-xs text-gray-400 hover:text-white mt-2 font-light">
                  Forgot your password?
                </button>
              )}
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSignup;