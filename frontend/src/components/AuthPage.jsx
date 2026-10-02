import React, { useState } from 'react';
import RuralHealthcareIllustration from './RuralHealthcareIllustration';

export default function AuthPage({ onLoginSuccess, onPharmacySignupSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup State
  const [accountType, setAccountType] = useState('customer'); // 'customer' | 'pharmacy'
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Common State
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateLogin = () => {
    const newErrors = {};
    if (!loginEmail) newErrors.loginEmail = 'Email is required';
    if (!loginPassword) newErrors.loginPassword = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!signupEmail) newErrors.signupEmail = 'Email is required';
    if (!mobile) newErrors.mobile = 'Mobile number is required';
    if (!signupPassword) newErrors.signupPassword = 'Password is required';
    if (signupPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedTerms) newErrors.terms = 'Please accept the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!validateLogin()) return;
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        // Mock backend determining role by email for demo
        const role = loginEmail.includes('pharmacy') ? 'pharmacy' : 'customer';
        onLoginSuccess(role);
      }, 900);
    } else {
      if (!validateSignup()) return;
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        if (accountType === 'pharmacy') {
          if (onPharmacySignupSuccess) onPharmacySignupSuccess();
        } else {
          onLoginSuccess('customer');
        }
      }, 900);
    }
  };

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFF6FF] sm:p-4 md:p-8 selection:bg-brand-primary selection:text-white">
      <div className="w-full max-w-[1000px] bg-white sm:rounded-[2rem] sm:shadow-2xl overflow-hidden flex flex-col md:flex-row border-0 sm:border border-white/60 min-h-screen sm:min-h-0">
        
        {/* MOBILE TOP HEADER & ILLUSTRATION */}
        <div className="md:hidden flex flex-col items-center pt-8 pb-4 px-6 bg-gradient-to-br from-[#EFF6FF] via-[#E0F2FE]/40 to-[#F0FDF4]/50">
          <div className="flex items-center gap-2 mb-2 text-brand-primary">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-primary to-brand-cyan text-white flex items-center justify-center shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <line x1="12" y1="7" x2="12" y2="13"></line>
                <line x1="9" y1="10" x2="15" y2="10"></line>
              </svg>
            </div>
            <span className="text-xl font-extrabold text-brand-dark tracking-tight">Medi<span className="text-brand-primary">Nearby</span></span>
          </div>
          <p className="text-[11px] text-brand-muted font-medium text-center mb-6">Find medicines nearby • Reserve with confidence</p>
          
          <div className="w-full max-w-[280px]">
            <RuralHealthcareIllustration compact={true} />
          </div>
        </div>

        {/* DESKTOP/TABLET LEFT SIDE ILLUSTRATION */}
        <div className="hidden md:flex md:w-[45%] lg:w-1/2 bg-gradient-to-br from-[#EFF6FF] via-[#E0F2FE]/40 to-[#F0FDF4]/50 flex-col justify-center items-center p-8 lg:p-12 relative overflow-hidden">
          <RuralHealthcareIllustration />
        </div>

        {/* RIGHT SIDE FORM AREA */}
        <div className="w-full md:w-[55%] lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white rounded-t-3xl sm:rounded-none -mt-4 sm:mt-0 relative z-10 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] sm:shadow-none">
          <div className="max-w-md w-full mx-auto">
            
            {/* DESKTOP BRAND HEADER */}
            <div className="hidden md:flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan text-white flex items-center justify-center shadow-md shadow-brand-primary/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <line x1="12" y1="7" x2="12" y2="13"></line>
                  <line x1="9" y1="10" x2="15" y2="10"></line>
                </svg>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-brand-dark tracking-tight">Medi<span className="text-brand-primary">Nearby</span></span>
                <p className="text-xs text-brand-muted font-medium mt-0.5">Find medicines nearby • Reserve with confidence</p>
              </div>
            </div>



            {/* FORM */}
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              
              {mode === 'signup' && (
                <>
                  <div className="mb-2">
                    <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Account Role</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setAccountType('customer')}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 ${
                          accountType === 'customer'
                            ? 'border-brand-primary bg-brand-primary/5'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${accountType === 'customer' ? 'border-brand-primary' : 'border-gray-300'}`}>
                          {accountType === 'customer' && <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>}
                        </div>
                        <span className={`text-xs font-bold ${accountType === 'customer' ? 'text-brand-dark' : 'text-brand-muted'}`}>Customer</span>
                      </div>
                      <div
                        onClick={() => setAccountType('pharmacy')}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 ${
                          accountType === 'pharmacy'
                            ? 'border-brand-teal bg-brand-teal/5'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${accountType === 'pharmacy' ? 'border-brand-teal' : 'border-gray-300'}`}>
                          {accountType === 'pharmacy' && <div className="w-1.5 h-1.5 bg-brand-teal rounded-full"></div>}
                        </div>
                        <span className={`text-xs font-bold ${accountType === 'pharmacy' ? 'text-brand-dark' : 'text-brand-muted'}`}>Pharmacy</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-text mb-1 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: null })); }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.fullName ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                      }`}
                      placeholder="e.g. Jane Doe"
                    />
                    {errors.fullName && <p className="text-[11px] text-brand-error mt-1 font-medium">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-brand-text mb-1 uppercase tracking-wider">Mobile Number</label>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => { setMobile(e.target.value); setErrors(prev => ({ ...prev, mobile: null })); }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.mobile ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                      }`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.mobile && <p className="text-[11px] text-brand-error mt-1 font-medium">{errors.mobile}</p>}
                  </div>
                </>
              )}

              <div>
                <label className="block text-[11px] font-bold text-brand-text mb-1 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={mode === 'login' ? loginEmail : signupEmail}
                  onChange={(e) => { 
                    const val = e.target.value;
                    if (mode === 'login') {
                      setLoginEmail(val);
                      setErrors(prev => ({ ...prev, loginEmail: null }));
                    } else {
                      setSignupEmail(val);
                      setErrors(prev => ({ ...prev, signupEmail: null }));
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    (mode === 'login' ? errors.loginEmail : errors.signupEmail) ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                  }`}
                  placeholder={mode === 'login' ? 'Enter your email' : 'you@example.com'}
                />
                {(mode === 'login' ? errors.loginEmail : errors.signupEmail) && (
                  <p className="text-[11px] text-brand-error mt-1 font-medium">{mode === 'login' ? errors.loginEmail : errors.signupEmail}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-[11px] font-bold text-brand-text uppercase tracking-wider">Password</label>
                  {mode === 'login' && (
                    <a href="#" className="text-[11px] font-bold text-brand-primary hover:text-brand-dark transition-colors focus:outline-none">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={mode === 'login' ? loginPassword : signupPassword}
                    onChange={(e) => { 
                      const val = e.target.value;
                      if (mode === 'login') {
                        setLoginPassword(val);
                        setErrors(prev => ({ ...prev, loginPassword: null }));
                      } else {
                        setSignupPassword(val);
                        setErrors(prev => ({ ...prev, signupPassword: null }));
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all pr-12 ${
                      (mode === 'login' ? errors.loginPassword : errors.signupPassword) ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
                {(mode === 'login' ? errors.loginPassword : errors.signupPassword) && (
                  <p className="text-[11px] text-brand-error mt-1 font-medium">{mode === 'login' ? errors.loginPassword : errors.signupPassword}</p>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-bold text-brand-text mb-1 uppercase tracking-wider">Confirm Password</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: null })); }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                      errors.confirmPassword ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                    }`}
                    placeholder="Re-enter password"
                  />
                  {errors.confirmPassword && <p className="text-[11px] text-brand-error mt-1 font-medium">{errors.confirmPassword}</p>}
                </div>
              )}

              {mode === 'signup' && (
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={agreedTerms}
                      onChange={(e) => { setAgreedTerms(e.target.checked); setErrors(prev => ({ ...prev, terms: null })); }}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/30 transition-all cursor-pointer" 
                    />
                    <span className="text-xs text-brand-muted group-hover:text-brand-text transition-colors leading-tight font-medium">
                      I accept the <a href="#" className="underline text-brand-primary font-bold">Terms and Conditions</a> & <a href="#" className="underline text-brand-primary font-bold">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.terms && <p className="text-[11px] text-brand-error mt-1 font-medium">{errors.terms}</p>}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-brand-primary hover:bg-brand-dark text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/25 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Please wait...</span>
                  </>
                ) : (
                  <span>{mode === 'login' ? 'Log in' : 'Create Account'}</span>
                )}
              </button>

              <div className="mt-5 text-center text-xs text-brand-muted">
                {mode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => switchMode('signup')} 
                      className="font-bold text-brand-primary hover:text-brand-dark transition-colors focus:outline-none focus:underline"
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => switchMode('login')} 
                      className="font-bold text-brand-primary hover:text-brand-dark transition-colors focus:outline-none focus:underline"
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
