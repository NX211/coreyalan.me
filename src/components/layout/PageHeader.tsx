'use client';

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="relative py-16 overflow-hidden bg-accent">
      {/* Modern geometric elements */}
      <div className="absolute inset-0">
        {/* Horizontal accent line */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-white/10"></div>
        
        {/* Geometric accent shapes */}
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 -rotate-12 rounded-sm transform -translate-x-24 translate-y-12"></div>
        <div className="absolute top-12 right-0 w-64 h-32 bg-white/5 rotate-12 rounded-sm transform translate-x-24 -translate-y-6"></div>
        
        {/* Subtle dot grid pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }}>
        </div>
      </div>
      
      <div className="container relative mx-auto px-4 z-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {title}
        </h1>
        <p className="text-xl text-center max-w-3xl mx-auto">
          {description}
        </p>
        
        {/* Minimal accent bar instead of underline */}
        <div className="w-24 h-1 bg-white/40 mx-auto mt-6 rounded-full"></div>
      </div>
    </section>
  );
} 