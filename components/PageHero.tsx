import { ReactNode } from "react";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  badge,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={`relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 min-h-[50vh] flex items-center overflow-hidden ${className || ""}`}>
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(227,30,36,0.6) 100%)" }} />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent-600/10 rounded-full blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-primary-500/10 rounded-full blur-[80px]" />

      <div className="container-custom relative z-10 text-center py-20">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            {badge}
          </div>
        )}
        
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        
        {subtitle && (
          <div className="text-blue-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {subtitle}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
