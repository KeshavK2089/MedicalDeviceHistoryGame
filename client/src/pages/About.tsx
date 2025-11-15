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
            An interactive learning experience
          </p>
        </div>

        <Card className="p-8 mb-8 border-2">
          <div className="flex items-start gap-4 mb-6">
            <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-grotesk font-bold text-2xl mb-3">The Vision</h2>
              <p className="text-foreground leading-relaxed mb-4">
                Chronicles of the Machine is an immersive journey through the evolution of medical device technology. 
                From the simple stethoscope to AI-driven closed-loop systems, this interactive experience explores 
                how engineering ingenuity has transformed healthcare.
              </p>
              <p className="text-foreground leading-relaxed">
                Each era presents real medical devices, their engineering principles, and the ethical questions 
                they raise. Through game-like interactions, you'll understand both the technical innovation and 
                human impact of these life-changing technologies.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-start gap-4 mb-6">
            <Heart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-grotesk font-bold text-2xl mb-3">Educational Purpose</h2>
              <p className="text-foreground leading-relaxed mb-4">
                This project was created as an educational tool to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Illustrate the progression of medical device technology</li>
                <li>Explain complex engineering concepts in accessible terms</li>
                <li>Encourage critical thinking about healthcare ethics</li>
                <li>Inspire the next generation of biomedical engineers</li>
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-start gap-4">
            <Github className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-grotesk font-bold text-2xl mb-3">Open Source</h2>
              <p className="text-foreground leading-relaxed mb-4">
                This project is open source and available on GitHub. Feel free to explore the code, 
                contribute improvements, or adapt it for your own educational purposes.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.
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
