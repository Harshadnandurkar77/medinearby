import { useState } from 'react';
import RuralHealthcareIllustration from './RuralHealthcareIllustration';

export default function SignupPage({ onReplayIntro, onSwitchToLogin, onPharmacySignupSuccess }) {
  const [accountType, setAccountType] = useState('customer'); // 'customer' | 'pharmacy'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleProceedAfterSignup = () => {
    if (accountType === 'pharmacy' && onPharmacySignupSuccess) {
      onPharmacySignupSuccess();
    } else if (onSwitchToLogin) {
      onSwitchToLogin();
    }
  };
  // ... rest handled in component


  // Calculate Password Strength (0 to 4)
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass) || /[A-Z]/.test(pass)) score++;

    switch (score) {
      case 1: return { score: 1, label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
      case 2: return { score: 2, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
      case 3: return { score: 3, label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
      case 4: return { score: 4, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
      default: return { score: 0, label: 'Very Weak', color: 'bg-red-400', text: 'text-red-400' };
    }
  };

  const strength = getPasswordStrength(password);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[0-9+\s()-]{7,15}$/;
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!phoneRegex.test(mobile)) {
      newErrors.mobile = 'Please enter a valid phone number (e.g. +1 555 123 4567)';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
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
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-brand-bg via-[#f0f7ff] to-[#e1f0f5] relative select-none">
      
      <div className="max-w-6xl w-full bg-brand-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/60 animate-hero-entrance my-4">
        
        {/* Left Side - Open Card-Free Rural Healthcare Illustration */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#EFF6FF] via-[#E0F2FE]/40 to-[#F0FDF4]/50 relative items-center justify-center p-6 lg:p-10 overflow-hidden select-none">
          <RuralHealthcareIllustration />
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-7/12 p-6 sm:p-10 md:p-12 flex flex-col justify-center animate-hero-entrance-delayed">
          <div className="max-w-lg w-full mx-auto">
            
            {/* Header & Login Link */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-brand-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <line x1="12" y1="7" x2="12" y2="13"></line>
                  <line x1="9" y1="10" x2="15" y2="10"></line>
                </svg>
                <span className="text-lg font-extrabold text-brand-dark">Medi<span className="text-brand-primary">Nearby</span></span>
              </div>
              <button 
                type="button" 
                onClick={onSwitchToLogin}
                className="text-xs font-semibold text-brand-primary hover:text-brand-dark transition-colors cursor-pointer bg-brand-bg px-3 py-1.5 rounded-lg border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              >
                Log in instead →
              </button>
            </div>

            {isSuccess ? (
              /* Success Message Screen */
              <div className="py-8 text-center animate-hero-entrance">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20 animate-bounce">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-brand-dark mb-2">Account Created Successfully!</h3>
                <p className="text-brand-muted text-sm max-w-sm mx-auto mb-6">
                  Welcome to MediNearby! Your account as a <span className="font-semibold text-brand-primary">{accountType === 'customer' ? 'Customer' : 'Pharmacy Owner'}</span> is now active.
                </p>
                <button
                  onClick={handleProceedAfterSignup}
                  className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-brand-primary/30 transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-primary/30"
                >
                  {accountType === 'pharmacy' ? 'Proceed to Pharmacy Verification →' : 'Proceed to Login'}
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-1 tracking-tight">Create your account</h2>
                <p className="text-brand-muted mb-5 text-xs md:text-sm">Select your account type and fill in your details to get started.</p>

                {/* Account Type Selection Cards */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Account Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Card 1: Customer */}
                    <div
                      onClick={() => setAccountType('customer')}
                      className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                        accountType === 'customer'
                          ? 'border-brand-primary bg-brand-primary/5 shadow-md shadow-brand-primary/10'
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-white'
                      }`}
                    >
                      <div className={`p-2 rounded-xl text-brand-primary transition-colors ${accountType === 'customer' ? 'bg-brand-primary text-white' : 'bg-gray-100'}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-brand-dark">I am a Customer</h4>
                          {accountType === 'customer' && (
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                          )}
                        </div>
                        <p className="text-[11px] text-brand-muted leading-tight mt-0.5">Find medicines from nearby pharmacies.</p>
                      </div>
                    </div>

                    {/* Card 2: Pharmacy Owner */}
                    <div
                      onClick={() => setAccountType('pharmacy')}
                      className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                        accountType === 'pharmacy'
                          ? 'border-brand-teal bg-brand-teal/5 shadow-md shadow-brand-teal/10'
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-white'
                      }`}
                    >
                      <div className={`p-2 rounded-xl transition-colors ${accountType === 'pharmacy' ? 'bg-brand-teal text-white' : 'bg-gray-100 text-brand-teal'}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-brand-dark">I own a Pharmacy</h4>
                          {accountType === 'pharmacy' && (
                            <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping"></span>
                          )}
                        </div>
                        <p className="text-[11px] text-brand-muted leading-tight mt-0.5">Manage pharmacy inventory & reservations.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Form Fields */}
                <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: null })); }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                        errors.fullName ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                      }`}
                      placeholder="e.g. Jane Doe"
                    />
                    <div className="min-h-[16px] mt-0.5">
                      {errors.fullName && <p className="text-[11px] text-brand-error font-medium">{errors.fullName}</p>}
                    </div>
                  </div>

                  {/* Email & Mobile Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: null })); }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                          errors.email ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                        }`}
                        placeholder="jane@example.com"
                      />
                      <div className="min-h-[16px] mt-0.5">
                        {errors.email && <p className="text-[11px] text-brand-error font-medium">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Mobile Number</label>
                      <input 
                        type="tel" 
                        value={mobile}
                        onChange={(e) => { setMobile(e.target.value); setErrors(prev => ({ ...prev, mobile: null })); }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                          errors.mobile ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                        }`}
                        placeholder="+1 (555) 000-0000"
                      />
                      <div className="min-h-[16px] mt-0.5">
                        {errors.mobile && <p className="text-[11px] text-brand-error font-medium">{errors.mobile}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Password & Confirm Password Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={password}
                          onChange={(e) => { 
                            setPassword(e.target.value); 
                            setErrors(prev => ({ ...prev, password: null })); 
                            if (confirmPassword && e.target.value !== confirmPassword) {
                              setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                            } else {
                              setErrors(prev => ({ ...prev, confirmPassword: null }));
                            }
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all pr-9 ${
                            errors.password ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                          }`}
                          placeholder="At least 6 characters"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 rounded-lg"
                        >
                          {showPassword ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          )}
                        </button>
                      </div>

                      {/* Password Strength Meter */}
                      {password && (
                        <div className="mt-1.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-brand-muted font-medium">Strength:</span>
                            <span className={`text-[10px] font-bold ${strength.text}`}>{strength.label}</span>
                          </div>
                          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden flex gap-1">
                            {[1, 2, 3, 4].map((step) => (
                              <div
                                key={step}
                                className={`h-full flex-1 transition-all duration-300 ${
                                  step <= strength.score ? strength.color : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="min-h-[16px] mt-0.5">
                        {errors.password && <p className="text-[11px] text-brand-error font-medium">{errors.password}</p>}
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Confirm Password</label>
                      <div className="relative">
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          value={confirmPassword}
                          onChange={(e) => { 
                            setConfirmPassword(e.target.value); 
                            if (password && e.target.value !== password) {
                              setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                            } else {
                              setErrors(prev => ({ ...prev, confirmPassword: null }));
                            }
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all pr-9 ${
                            errors.confirmPassword ? 'border-brand-error ring-2 ring-brand-error/10 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary'
                          }`}
                          placeholder="Re-enter password"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 rounded-lg"
                        >
                          {showConfirmPassword ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          )}
                        </button>
                      </div>

                      {/* Live Password Match Confirmation Indicator */}
                      {confirmPassword && !errors.confirmPassword && password === confirmPassword && (
                        <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                          ✓ Passwords match
                        </p>
                      )}
                      <div className="min-h-[16px] mt-0.5">
                        {errors.confirmPassword && <p className="text-[11px] text-brand-error font-medium">{errors.confirmPassword}</p>}
                      </div>
                    </div>

                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={agreedTerms}
                        onChange={(e) => { setAgreedTerms(e.target.checked); setErrors(prev => ({ ...prev, terms: null })); }}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/30 transition-all cursor-pointer" 
                      />
                      <span className="text-xs text-brand-muted group-hover:text-brand-text transition-colors leading-relaxed font-medium">
                        I accept the <a href="#" className="underline text-brand-primary font-bold">Terms and Conditions</a> & <a href="#" className="underline text-brand-primary font-bold">Privacy Policy</a>.
                      </span>
                    </label>
                    <div className="min-h-[16px] mt-0.5">
                      {errors.terms && <p className="text-[11px] text-brand-error font-medium">{errors.terms}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-brand-primary hover:bg-brand-dark text-brand-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-brand-primary/30"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Complete Signup</span>
                    )}
                  </button>

                  {/* Security Trust Note */}
                  <div className="text-center pt-1">
                    <span className="text-[11px] text-brand-muted font-medium flex items-center justify-center gap-1">
                      🔒 Your information is kept secure and private.
                    </span>
                  </div>

                </form>

                {/* Bottom Switch Link */}
                <p className="mt-4 text-center text-xs text-brand-muted">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={onSwitchToLogin}
                    className="font-bold text-brand-primary hover:text-brand-dark transition-colors cursor-pointer focus:outline-none focus:underline"
                  >
                    Log in
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
