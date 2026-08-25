import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import bgImage from "../assets/car_booking_minimal.webp";

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col p-6 lg:p-10 text-white">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Rolling Dreams
          </h1>

          <p className="text-xs uppercase tracking-[0.25em] text-white/70">
            Bhagalpur • Clean Rides
          </p>
        </header>

        {/* Hero */}
        <div className="flex-1 grid lg:grid-cols-2 items-center gap-12 mt-10">
          {/* Left Side */}
          <div>
            <h2 className="text-5xl lg:text-7xl font-bold leading-none tracking-tight">
              Drive <br />
              your <br />
              dreams.
            </h2>

            <p className="mt-6 max-w-md text-white/80 leading-7">
              Safe, affordable and on-time rides across Bihar. Book trusted
              captains with a clean and simple experience.
            </p>

            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-white/60">
              <span className="h-px w-10 bg-white/40" />
              120+ Cars • Verified Captains
            </div>
          </div>

          {/* Right Card */}
          <div className="w-full max-w-md lg:ml-auto">
            <div className="rounded-3xl bg-white/95 backdrop-blur-md p-6 shadow-2xl text-black">
              <h3 className="text-xl font-semibold mb-5">Where to?</h3>

              <div className="space-y-3">
                <div className="flex gap-3 rounded-2xl bg-gray-100 p-4">
                  <MapPin size={18} className="text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500">
                      Pickup
                    </p>
                    <p className="font-medium">Bhagalpur Junction</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-2xl bg-gray-100 p-4">
                  <MapPin size={18} className="text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500">
                      Drop
                    </p>
                    <p className="font-medium">Airport, Patna</p>
                  </div>
                </div>
              </div>

              <Link to="/userlogin" className="block mt-6">
                <button className="w-full rounded-full bg-black text-white py-4 px-6 flex items-center justify-between hover:bg-zinc-900 transition">
                  Continue to Book
                  <ArrowRight size={18} />
                </button>
              </Link>

              <p className="mt-4 text-center text-xs text-gray-500">
                Clean Cars • No Surge • Bihar Only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}