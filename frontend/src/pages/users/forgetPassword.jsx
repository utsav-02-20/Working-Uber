import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { validateEmail } from "../../validator";

export default function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sent, setSent] = useState(false);

  // Live email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const error = validateEmail(value);
    setEmailError(error || "");

    // Hide success message if user edits email
    setSent(false);
  };

  // Submit handler
  const handleSubmit = () => {
    const error = validateEmail(email);

    if (error) {
      setEmailError(error);
      setSent(false);
      return;
    }

    setEmailError("");
    setSent(true);

    // Backend API call goes here later
    // await axios.post("/users/forgot-password", { email });
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#111] relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#f5f3ef] rounded-full blur-[80px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#e8efe8] rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Back */}
        <Link to="/userlogin" className="inline-block text-[14px] font-semibold mb-8">
          ← Back to Login
        </Link>

        <div className="rounded-[28px] border border-black/[0.08] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <h1 className="text-[28px] font-semibold tracking-tight leading-[0.9]">
            Forgot password?
          </h1>

          <p className="mt-2 text-[13px] opacity-60">
            No worries. Enter your registered email and we'll send you a password reset link.
          </p>

          {/* Email Input */}
          <div className="mt-8 space-y-3">
            <div className="flex gap-3 rounded-2xl bg-[#faf8f5] border border-black/5 p-4">
              <Mail size={16} className="mt-0.5 opacity-40" />

              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-medium">
                  Email *
                </p>

                <input
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

            {/* Success Message */}
            {sent && (
              <div className="rounded-2xl bg-[#e8efe8] border border-green-200 p-4">
                <p className="text-[13px] font-medium text-green-700">
                  Reset link sent successfully to{" "}
                  <span className="font-semibold">{email}</span>. Please check your inbox.
                </p>
              </div>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full h-[52px] rounded-full bg-black text-white text-[14px] font-medium tracking-wide flex items-center justify-between px-6 hover:bg-zinc-900 transition"
          >
            {sent ? "Resend link" : "Send reset link"}

            <span className="h-8 w-8 rounded-full bg-white text-black grid place-items-center">
              <ArrowRight size={16} />
            </span>
          </button>

          {/* Footer */}
          <div className="mt-6 text-center text-[12px]">
            <span className="opacity-60">Remember your password? </span>

            <Link to="/userlogin" className="font-medium underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}