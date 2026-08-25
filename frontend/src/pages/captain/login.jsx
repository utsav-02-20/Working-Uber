import { Link } from "react-router-dom";
import { ArrowRight, Phone, Lock, Eye } from "lucide-react";

export default function UserLogin() {
  return (
    <div className="min-h-screen w-full bg-white text-[#111] relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#f5f3ef] rounded-full blur-[80px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#e8efe8] rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        <Link to="/" className="inline-block text-[14px] font-semibold mb-8">← Rolling Dreams</Link>

        <div className="rounded-[28px] border border-black/[0.08] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <h1 className="text-[28px] font-semibold tracking-tight leading-[0.9]">Welcome back</h1>
          <p className="mt-2 text-[13px] opacity-60">Login to book clean rides in Bhagalpur.</p>

          <div className="mt-8 space-y-3">
            <div className="flex gap-3 rounded-2xl bg-[#faf8f5] border border-black/5 p-4">
              <Phone size={16} className="mt-0.5 opacity-40" />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-medium">Phone Number</p>
                <input placeholder="91XXXXXXXX" className="w-full bg-transparent outline-none text-[14px] font-medium mt-1 placeholder:opacity-30" />
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl bg-[#faf8f5] border border-black/5 p-4">
              <Lock size={16} className="mt-0.5 opacity-40" />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-medium">Password</p>
                <input type="password" placeholder="••••••••" className="w-full bg-transparent outline-none text-[14px] font-medium mt-1 placeholder:opacity-30" />
              </div>
              <Eye size={16} className="opacity-30" />
            </div>
          </div>

          <button className="mt-6 w-full h-[52px] rounded-full bg-black text-white text-[14px] font-medium tracking-wide flex items-center justify-between px-6 hover:bg-zinc-900 transition">
            Continue to login
            <span className="h-8 w-8 rounded-full bg-white text-black grid place-items-center">
              <ArrowRight size={16} />
            </span>
          </button>

          <div className="mt-6 flex justify-between text-[12px]">
            <Link to="/user/forgot" className="opacity-60 hover:opacity-100">Forgot password?</Link>
            <Link to="/user/signup" className="font-medium underline">Create account</Link>
          </div>

          <p className="mt-6 text-center text-[11px] opacity-40">Clean cars • No OTP spam • Bihar only</p>
        </div>
      </div>
    </div>
  );
}