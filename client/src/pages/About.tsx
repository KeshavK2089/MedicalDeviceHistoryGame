import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ArrowLeft, Github, Heart, Lightbulb } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <ProgressTracker />

      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="outline"
            onClick={() => setLocation("/timeline")}
            data-testid="button-back-timeline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Timeline
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-4" data-testid="text-about-title">
            About This Project
          </h1>
          <p className="text-muted-foreground text-lg">
            An interactive journey through bioengineering innovation
          </p>
        </div>

        <Card className="p-8 mb-8 border-2 bg-gradient-to-br from-card via-card to-cyan-950/5">
          <div className="flex items-start gap-4 mb-6">
            <Lightbulb className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-grotesk font-bold text-2xl mb-3">Created by Keshav Kotteswaran</h2>
              <p className="text-foreground leading-relaxed mb-4">
                <span className="font-semibold text-primary">M.S. in Bioengineering</span> | Northeastern University
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Chronicles of the Bioengineer is an interactive journey through the evolution of medical device technology, 
                informed by real-world experience in pharmaceutical development, quality assurance testing, and healthcare IT systems.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                From analyzing Omnipod insulin pumps at Insulet Corporation to managing EHR implementations at Epic Systems, 
                this project combines hands-on biomedical device expertise with interactive education.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-start gap-4 mb-6">
            <Heart className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-grotesk font-bold text-2xl mb-3">Real-World Experience</h2>
              <p className="text-foreground leading-relaxed mb-4">
                This project draws from professional experience across the medical device industry:
              </p>
              <ul className="list-none space-y-3 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span><span className="font-semibold">Epic Systems</span> — Healthcare IT project management and EHR workflow optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">•</span>
                  <span><span className="font-semibold">Insulet Corporation</span> — Quality assurance testing for Omnipod insulin delivery systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 font-bold mt-1">•</span>
                  <span><span className="font-semibold">Acorda Therapeutics</span> — Pharmaceutical analytical development and biocompatibility testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span><span className="font-semibold">Northeastern University</span> — Research in wound healing and cellular migration optimization</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-start gap-4">
            <Github className="w-8 h-8 text-teal-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-grotesk font-bold text-2xl mb-3">Technology & Open Source</h2>
              <p className="text-foreground leading-relaxed mb-4">
                Built with cutting-edge web technologies and modern design patterns. This interactive experience 
                features dynamic visualizations, localStorage-based progression, and responsive animations.
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-semibold">Tech Stack:</span> React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Wouter routing
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Contact:</span> kotteswaran.k@northeastern.edu | 
                <a href="https://www.linkedin.com/in/keshav-kotteswaran/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline ml-1">
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-muted/30">
          <h3 className="font-grotesk font-bold text-lg mb-3">Disclaimer</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            All content in this experience is for educational and informational purposes only. 
            Device descriptions are simplified for accessibility and may not capture the full 
            complexity of real medical devices.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            This project does not provide medical advice, recommendations, or endorsements of 
            specific devices or treatments. Always consult healthcare professionals for medical decisions.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The fictional devices generated in the Lab Sandbox are purely speculative and do not 
            represent actual products or feasible designs.
          </p>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Ready to explore the eras of medical innovation?
          </p>
          <Button
            size="lg"
            onClick={() => setLocation("/timeline")}
            data-testid="button-start-journey"
          >
            Begin Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
