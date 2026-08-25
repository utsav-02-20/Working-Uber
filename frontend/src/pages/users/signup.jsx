import { Link } from "react-router-dom";
import { ArrowRight, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../validator";

export default function UserSignup() {
  const [showPass, setShowPass] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation State
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Email Validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) || "");
  };

  // Password Validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordError(validatePassword(value) || "");

    // Revalidate confirm password when password changes
    if (confirmPassword) {
      setConfirmPasswordError(
        validateConfirmPassword(value, confirmPassword) || ""
      );
    }
  };

  // Confirm Password Validation
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    setConfirmPasswordError(
      validateConfirmPassword(password, value) || ""
    );
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#111] relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#f5f3ef] rounded-full blur-[80px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#e8efe8] rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        <Link to="/" className="inline-block text-[14px] font-semibold mb-8">
          ← Rolling Dreams
        </Link>

        <div className="rounded-[28px] border border-black/[0.08] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <h1 className="text-[28px] font-semibold tracking-tight leading-[0.9]">
            Create account
          </h1>

          <p className="mt-2 text-[13px] opacity-60">
            Join 1200+ riders in clean suburban Bihar.
          </p>

          {/* Form */}
          <div className="mt-8 space-y-3">
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex gap-3 rounded-2xl bg-[#faf8f5] border border-black/5 p-4">
                <User size={16} className="mt-0.5 opacity-40 shrink-0" />

                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest opacity-40 font-medium">
                    First Name *
                  </p>

                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Utsav"
                    className="w-full bg-transparent outline-none text-[14px] font-medium mt-1 placeholder:opacity-30"
                  />
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl bg-[#faf8f5] border border-black/5 p-4">
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest opacity-40 font-medium">
                    Last Name
                  </p>

                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Kumar"
                    className="w-full bg-transparent outline-none text-[14px] font-medium mt-1 placeholder:opacity-30"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-3 rounded-2xl bg-[#faf8f5] border border-black/5 p-4">
              <Mail size={16} className="mt-0.5 opacity-40" />

              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-medium">
                  Email *
                </p>

                <input
                  required
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="utsav@email.com"
                  className={`w-full bg-transparent outline-none text-[14px] font-medium mt-1 border-b pb-2 transition-colors ${
                    emailError
                      ? "border-red-500"
                      : "border-black/20 focus:border-black"
                  }`}
                />

                {emailError && (
                  <p className="text-red-500 text-xs mt-2">{emailError}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="flex gap-3 rounded-2xl bg-[#faf8f5] border border-black/5 p-4">
              <Lock size={16} className="mt-0.5 opacity-40" />

              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-medium">
                  Password *
                </p>

                <input
                  required
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Minimum 12 characters"
                  className={`w-full bg-transparent outline-none text-[14px] font-medium mt-1 border-b pb-2 transition-colors ${
                    passwordError
                      ? "border-red-500"
                      : "border-black/20 focus:border-black"
                  }`}
                />

                {passwordError && (
                  <p className="text-red-500 text-xs mt-2">{passwordError}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeOff size={16} className="opacity-30 hover:opacity-60 transition" />
                ) : (
                  <Eye size={16} className="opacity-30 hover:opacity-60 transition" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="flex gap-3 rounded-2xl bg-[#faf8f5] border border-black/5 p-4">
              <Lock size={16} className="mt-0.5 opacity-40" />

              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-medium">
                  Confirm Password *
                </p>

                <input
                  required
                  type={showPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Re-enter password"
                  className={`w-full bg-transparent outline-none text-[14px] font-medium mt-1 border-b pb-2 transition-colors ${
                    confirmPasswordError
                      ? "border-red-500"
                      : "border-black/20 focus:border-black"
                  }`}
                />

                {confirmPasswordError && (
                  <p className="text-red-500 text-xs mt-2">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeOff size={16} className="opacity-30 hover:opacity-60 transition" />
                ) : (
                  <Eye size={16} className="opacity-30 hover:opacity-60 transition" />
                )}
              </button>
            </div>

            <p className="px-1 text-[11px] opacity-40">
              Minimum 12 characters • 1 uppercase • 1 lowercase • 1 number • 1 special character.
            </p>
          </div>

          {/* Button */}
          <button className="mt-6 w-full h-[52px] rounded-full bg-black text-white text-[14px] font-medium tracking-wide flex items-center justify-between px-6 hover:bg-zinc-900 transition">
            Create account

            <span className="h-8 w-8 rounded-full bg-white text-black grid place-items-center">
              <ArrowRight size={16} />
            </span>
          </button>

          {/* Footer */}
          <div className="mt-6 text-center text-[12px]">
            <span className="opacity-60">Already have an account? </span>

            <Link to="/userlogin" className="font-medium underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}