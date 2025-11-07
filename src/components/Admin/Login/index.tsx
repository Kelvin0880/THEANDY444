'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useRouter } from '../../../contexts/RouterContext';
import { setAuthToken } from '../../../utils/auth';
import { LOGIN_CONSTANTS } from './constants';
import { defaultUserData } from '../../../data/defaultUserData';

export function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Trim inputs to remove whitespace
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();

      console.log('Attempting login with:', { trimmedUsername, trimmedPassword });
      console.log('Expected:', { username: defaultUserData.username, password: defaultUserData.password });

      // Verify username and password
      if (trimmedUsername === defaultUserData.username && trimmedPassword === defaultUserData.password) {
        console.log('Login successful!');
        setAuthToken(trimmedUsername);
        router.push('/admin-dashboard');
      } else {
        console.log('Login failed - credentials do not match');
        setError(LOGIN_CONSTANTS.errorMessage);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(LOGIN_CONSTANTS.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff7f]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff99]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-[#1a1a1a] border-2 border-[#00ff7f]/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,255,127,0.2)]">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#00ff7f]/10 border-2 border-[#00ff7f]/30 flex items-center justify-center"
            >
              <Lock className="text-[#00ff7f]" size={32} />
            </motion.div>
            <h1 className="text-white mb-2">{LOGIN_CONSTANTS.pageTitle}</h1>
            <p className="text-[#00ff7f]">{LOGIN_CONSTANTS.subtitle}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-white/80 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00ff7f]/50" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={LOGIN_CONSTANTS.usernamePlaceholder}
                  className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:border-[#00ff7f] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/80 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00ff7f]/50" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={LOGIN_CONSTANTS.passwordPlaceholder}
                  className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:border-[#00ff7f] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg p-3"
              >
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ff7f] text-black py-3 rounded-lg hover:bg-[#00ff99] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? LOGIN_CONSTANTS.loadingMessage : LOGIN_CONSTANTS.loginButton}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Acceso solo para administradores autorizados
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}