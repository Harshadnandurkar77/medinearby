import { useState } from 'react';
import RuralHealthcareIllustration from './RuralHealthcareIllustration';

export default function LoginPage({ onLoginSuccess, onSwitchToSignup, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [userRole, setUserRole] = useState('customer'); // 'customer' | 'pharmacy'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSwitchToSignup = () => {
    if (onSwitchToSignup) {
      onSwitchToSignup();
    } else {
      setMode('signup');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess(userRole);
      }
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-brand-bg via-[#f0f7ff] to-[#e1f0f5] relative select-none">
      
      <div className="max-w-6xl w-full bg-brand-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/60 animate-hero-entrance my-4">
        
        {/* Left Side - Open Card-Free Rural Healthcare Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#EFF6FF] via-[#E0F2FE]/40 to-[#F0FDF4]/50 relative items-center justify-center p-6 lg:p-10 overflow-hidden select-none">
          <RuralHealthcareIllustration />
        </div>

        {/* Right Side - Accessible Authentication Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-14 flex flex-col justify-center animate-hero-entrance-delayed">
          <div className="max-w-md w-full mx-auto">
            
            {/* Header Brand Logo & Title */}
            <div className="flex items-center gap-2.5 mb-4 text-brand-primary">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan text-white flex items-center justify-center shadow-md shadow-brand-primary/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <line x1="12" y1="7" x2="12" y2="13"></line>
                  <line x1="9" y1="10" x2="15" y2="10"></line>
                </svg>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-brand-dark tracking-tight">Medi<span className="text-brand-primary">Nearby</span></span>
                <p className="text-[11px] text-brand-muted font-medium">Find medicines nearby • Reserve with confidence</p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-gray-100/80 p-1 rounded-2xl mb-4 border border-gray-200/60">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 ${
                  mode === 'login'
                    ? 'bg-white text-brand-primary shadow-md'
                    : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                Log in
              </button>
              <button
                type="button"
                onClick={handleSwitchToSignup}
                className={`flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 ${
                  mode === 'signup'
                    ? 'bg-white text-brand-primary shadow-md'
                    : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Account Role Selector */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-brand-muted mb-1.5 uppercase tracking-wider">I am logging in as:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUserRole('customer')}
                  className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    userRole === 'customer'
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'bg-gray-100 text-brand-muted hover:bg-gray-200'
                  }`}
                >
                  <span>👤 Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole('pharmacy')}
                  className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    userRole === 'pharmacy'
                      ? 'bg-brand-teal text-white shadow-md'
                      : 'bg-gray-100 text-brand-muted hover:bg-gray-200'
                  }`}
                >
                  <span>🏪 Pharmacy Owner</span>
                </button>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark mb-1 tracking-tight">
              {userRole === 'pharmacy' ? 'Pharmacy Portal Login' : 'Welcome back'}
            </h2>
            <p className="text-brand-muted mb-5 text-xs sm:text-sm">
              {userRole === 'pharmacy'
                ? 'Manage your medicine catalog, stock levels & customer pickup holds.'
                : 'Log in to search medicines and manage pharmacy reservations.'}
            </p>

            {/* Form */}
            <form className="space-y-3" onSubmit={handleSubmit} noValidate>
              
              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: null })); }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                    errors.email ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                  }`}
                  placeholder={userRole === 'pharmacy' ? 'pharmacy.owner@medinearby.in' : 'Enter your email address'}
                  required
                />
                <div className="min-h-[16px] mt-0.5">
                  {errors.email && <p className="text-[11px] text-brand-error font-medium">{errors.email}</p>}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: null })); }}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all pr-10 ${
                      errors.password ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-[#2563EB]'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 rounded-lg"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
                <div className="min-h-[16px] mt-0.5">
                  {errors.password && <p className="text-[11px] text-brand-error font-medium">{errors.password}</p>}
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/30 transition-all cursor-pointer" />
                  <span className="text-xs text-brand-muted group-hover:text-brand-text transition-colors font-medium">Remember me</span>
                </label>
                <a href="#" className="text-xs font-semibold text-brand-primary hover:text-brand-dark transition-colors focus:outline-none focus:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit CTA Button with Loading State */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-2 py-3.5 rounded-xl font-bold transition-all text-white shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                  userRole === 'pharmacy' ? 'bg-brand-teal hover:bg-teal-800 shadow-brand-teal/25' : 'bg-brand-primary hover:bg-brand-dark shadow-brand-primary/25'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <span>{userRole === 'pharmacy' ? 'Open Pharmacy Portal →' : 'Login as Customer'}</span>
                )}
              </button>

              {/* Security Trust Note */}
              <div className="text-center pt-2">
                <span className="text-[11px] text-brand-muted font-medium flex items-center justify-center gap-1">
                  🔒 Your information is kept secure and private.
                </span>
              </div>

            </form>

            {/* Bottom Switch Link */}
            <p className="mt-5 text-center text-xs text-brand-muted">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={handleSwitchToSignup}
                className="font-bold text-brand-primary hover:text-brand-dark transition-colors cursor-pointer focus:outline-none focus:underline"
              >
                Create an account
              </button>
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}

