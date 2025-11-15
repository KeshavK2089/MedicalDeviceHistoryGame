import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import Timeline from "@/pages/Timeline";
import EraView from "@/pages/EraView";
import LabSandbox from "@/pages/LabSandbox";
import About from "@/pages/About";
import Achievements from "@/pages/Achievements";
import NotFound from "@/pages/not-found";

const base = import.meta.env.BASE_URL;

function AppRouter() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/era/:slug" component={EraView} />
        <Route path="/lab" component={LabSandbox} />
        <Route path="/about" component={About} />
        <Route path="/achievements" component={Achievements} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
