import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { type Device } from "@shared/schema";
import { Activity, Beaker, Eye, Heart, Microscope, ChevronRight, X } from "lucide-react";

const categoryIcons = {
  diagnostic: Microscope,
  therapeutic: Heart,
  monitoring: Activity,
  surgical: Beaker,
  imaging: Eye
};

interface DeviceCardProps {
  device: Device;
  eraColor: string;
}

export function DeviceCard({ device, eraColor }: DeviceCardProps) {
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [toggleValue, setToggleValue] = useState(false);

  const Icon = categoryIcons[device.category];

  const colorClasses = {
    cyan: "border-cyan-500/30 shadow-cyan-500/10",
    purple: "border-purple-500/30 shadow-purple-500/10",
    teal: "border-teal-500/30 shadow-teal-500/10"
  };

  const badgeColorClasses = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    teal: "bg-teal-500/10 text-teal-400 border-teal-500/20"
  };

  return (
    <>
      <Card 
        className={`hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer group border-2 ${colorClasses[eraColor as keyof typeof colorClasses]} shadow-xl`}
        onClick={() => setOpen(true)}
        data-testid={`card-device-${device.id}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <Badge 
                  variant="outline" 
                  className={`text-xs uppercase tracking-wide ${badgeColorClasses[eraColor as keyof typeof badgeColorClasses]}`}
                  data-testid={`badge-category-${device.category}`}
                >
                  {device.category}
                </Badge>
              </div>
              <h3 className="font-grotesk font-bold text-xl tracking-tight" data-testid={`text-device-name-${device.id}`}>
                {device.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{device.tagline}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </CardHeader>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid={`dialog-device-${device.id}`}>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <Icon className="w-6 h-6 text-muted-foreground" />
              <Badge 
                variant="outline" 
                className={`text-xs uppercase tracking-wide ${badgeColorClasses[eraColor as keyof typeof badgeColorClasses]}`}
              >
                {device.category}
              </Badge>
            </div>
            <DialogTitle className="font-grotesk text-2xl tracking-tight">
              {device.name}
            </DialogTitle>
            <p className="text-muted-foreground">{device.tagline}</p>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Problem
              </h4>
              <p className="text-foreground leading-relaxed">{device.problem}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Engineering Insight
              </h4>
              <p className="text-foreground leading-relaxed">{device.engineering}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Ethical Consideration
              </h4>
              <p className="text-foreground leading-relaxed">{device.ethics}</p>
            </div>

            {device.interactionType && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                    Interactive Comparison
                  </h4>
                  
                  {device.interactionType === 'slider' && (
                    <div className="space-y-4">
                      <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        max={100}
                        step={1}
                        className="w-full"
                        data-testid={`slider-${device.id}`}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 bg-destructive/5 border-destructive/20">
                          <p className="text-xs text-destructive-foreground font-medium mb-1">Before</p>
                          <p className="text-sm text-muted-foreground">{device.beforeStat}</p>
                        </Card>
                        <Card className="p-4 bg-primary/5 border-primary/20">
                          <p className="text-xs text-primary-foreground font-medium mb-1">After</p>
                          <p className="text-sm text-muted-foreground">{device.afterStat}</p>
                        </Card>
                      </div>
                    </div>
                  )}

                  {device.interactionType === 'toggle' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-card rounded-md border">
                        <span className="text-sm font-medium">
                          {toggleValue ? 'After Innovation' : 'Before Innovation'}
                        </span>
                        <Switch
                          checked={toggleValue}
                          onCheckedChange={setToggleValue}
                          data-testid={`toggle-${device.id}`}
                        />
                      </div>
                      <Card className="p-4">
                        <p className="text-sm text-muted-foreground">
                          {toggleValue ? device.afterStat : device.beforeStat}
                        </p>
                      </Card>
                    </div>
                  )}

                  {device.interactionType === 'comparison' && (
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 bg-destructive/5 border-destructive/20">
                        <p className="text-xs text-destructive-foreground font-medium mb-2">Before</p>
                        <p className="text-sm text-muted-foreground">{device.beforeStat}</p>
                      </Card>
                      <Card className="p-4 bg-primary/5 border-primary/20">
                        <p className="text-xs text-primary-foreground font-medium mb-2">After</p>
                        <p className="text-sm text-muted-foreground">{device.afterStat}</p>
                      </Card>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4"
              data-testid={`button-close-device-${device.id}`}
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
