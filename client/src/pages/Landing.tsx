import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Rocket, Map } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
      </div>

      {/* Portal rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-96 h-96">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-portal-spin" 
               style={{ animationDuration: '20s' }} />
          <div className="absolute inset-8 rounded-full border-2 border-purple-500/30 animate-portal-spin" 
               style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          <div className="absolute inset-16 rounded-full border-2 border-teal-500/30 animate-portal-spin" 
               style={{ animationDuration: '10s' }} />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-teal-500/10 animate-glow-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="font-grotesk font-bold text-5xl md:text-7xl tracking-tight mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-400 bg-clip-text text-transparent" data-testid="text-landing-title">
            Chronicles of the Machine
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            An immersive journey through the evolution of medical device technology
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={() => setLocation("/era/foundations")}
            className="group min-w-[200px]"
            data-testid="button-begin-journey"
          >
            <Rocket className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Begin Journey
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/timeline")}
            className="min-w-[200px] backdrop-blur-sm"
            data-testid="button-skip-timeline"
          >
            <Map className="w-5 h-5 mr-2" />
            Skip to Timeline
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>Explore five eras of innovation</p>
          <p className="text-xs">From early diagnostics to AI-driven futures</p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full animate-glow-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
