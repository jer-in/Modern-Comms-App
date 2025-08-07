import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MessageCircle, Shield, Users, Zap, Upload, Clock } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Realtime Messaging",
      description: "Instant communication with realtime updates across all connected users"
    },
    {
      icon: Shield,
      title: "Anonymous & Secure",
      description: "Chat anonymously or create an account - your choice, your privacy"
    },
    {
      icon: Upload,
      title: "Media Sharing", 
      description: "Share images and PDFs seamlessly with built-in file upload support"
    },
    {
      icon: Users,
      title: "Room Creation",
      description: "Start conversations that automatically become shareable chat rooms"
    },
    {
      icon: Clock,
      title: "Burn Chat",
      description: "Anonymous sessions auto-delete when you leave for complete privacy"
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "No signup required - jump into conversations immediately as a guest"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-landing bg-noise relative overflow-hidden">
      {/* Background textures */}
      <div className="absolute inset-0 bg-texture-grain opacity-40"></div>
      
      {/* Abstract gradient shapes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-hero rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/15 rounded-full opacity-25 blur-xl"></div>

      <div className="content-layer relative">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6 relative z-20">
          <div className="text-2xl font-bold text-foreground">
            Modern<span className="text-primary">Chat</span>
          </div>
          <Link to="/auth">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
              Connect instantly with
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Modern Chat
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience seamless realtime messaging with media sharing, anonymous sessions, 
              and room-based conversations. Start chatting in seconds, no signup required.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                  Start Chatting
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-border hover:bg-secondary/50">
                  Try as Guest
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Everything you need for modern communication, built with privacy and simplicity in mind
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-card bg-noise relative overflow-hidden">
              <div className="absolute inset-0 bg-texture-grain opacity-30"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Connect?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of users already enjoying seamless communication
                </p>
                <Link to="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-border/50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-muted-foreground">
              © 2024 ModernChat. Built with React & Supabase.
            </div>
            <div className="flex gap-6 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;