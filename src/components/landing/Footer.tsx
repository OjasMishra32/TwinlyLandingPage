export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-twin-cyan/30 to-transparent" />
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <defs>
                  <linearGradient id="twinly-footer" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="hsl(170 90% 70%)" />
                    <stop offset="1" stopColor="hsl(260 90% 78%)" />
                  </linearGradient>
                </defs>
                <circle cx="11" cy="11" r="9" stroke="url(#twinly-footer)" strokeWidth="1.5" />
                <circle cx="11" cy="7" r="2.5" fill="url(#twinly-footer)" />
                <circle cx="11" cy="15" r="2.5" stroke="url(#twinly-footer)" strokeWidth="1.5" />
              </svg>
              <span className="text-[16px] font-semibold tracking-tight">Twinly</span>
            </div>
            <p className="max-w-[420px] text-[15px] text-white/55 leading-relaxed">
              A personal AI operator that learns how you work, writes in your voice, and
              moves life-admin forward with your approval.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 text-[13px]">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/35 mb-4">Site</div>
              <ul className="space-y-3 text-white/65">
                <li><a href="#product" className="hover:text-white transition-colors">Product</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">Use cases</a></li>
                <li><a href="#trust" className="hover:text-white transition-colors">Trust</a></li>
                <li><a href="#waitlist" className="hover:text-white transition-colors">Request access</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/35 mb-4">Company</div>
              <ul className="space-y-3 text-white/65">
                <li><a href="mailto:hello@twinly.tech" className="hover:text-white transition-colors">hello@twinly.tech</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press kit</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/35 mb-4">Legal</div>
              <ul className="space-y-3 text-white/65">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="font-serif-accent text-[clamp(4rem,16vw,14rem)] leading-[0.82] tracking-[-0.04em] text-white/[0.04] select-none pointer-events-none whitespace-nowrap mask-fade-r">
          twinly.tech
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-[11px] font-mono uppercase tracking-wider text-white/35">
          <span>© 2026 Twinly, Inc. All rights reserved.</span>
          <span>Crafted with intent · Not a chatbot</span>
        </div>
      </div>
    </footer>
  );
}
