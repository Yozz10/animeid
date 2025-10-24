import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import Home from "@/pages/home";
import AnimeDetail from "@/pages/anime-detail";
import Watch from "@/pages/watch";
import Search from "@/pages/search";
import History from "@/pages/history";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/anime/:id" component={AnimeDetail} />
      <Route path="/watch/:animeId/:episodeNumber" component={Watch} />
      <Route path="/search" component={Search} />
      <Route path="/history" component={History} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="pt-0 md:pt-0">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
