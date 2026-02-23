import { ShieldCheck, Award } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "DVSA Authorised",
    subtitle: "MOT Testing Station",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    icon: Award,
    title: "AUTODATA Compliant",
    subtitle: "Manufacturer-spec servicing",
    color: "text-primary-600",
    bg: "bg-primary-50",
    border: "border-primary-200",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100 py-6" aria-label="Trust signals and credentials">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div key={i} className={`flex items-center gap-4 px-6 py-4 rounded-xl border ${badge.bg} ${badge.border} flex-1 max-w-xs`}>
                <div className={`w-12 h-12 rounded-xl ${badge.bg} ${badge.border} border flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${badge.color}`} />
                </div>
                <div>
                  <p className={`font-bold text-base ${badge.color}`}>{badge.title}</p>
                  <p className="text-sm text-gray-500">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}

          {/* Google review link */}
          <a
            href="https://g.page/r/automotcentre/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-6 py-4 rounded-xl border border-yellow-200 bg-yellow-50 flex-1 max-w-xs hover:bg-yellow-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-yellow-100 flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-base text-yellow-700">4.9 ★ on Google</p>
              <p className="text-sm text-gray-500">Leave us a review</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
