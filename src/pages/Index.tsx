import { useAuth } from '@/hooks/useAuth';
import { ChatInterface } from '@/components/chat/ChatInterface';

const Index = () => {
  const { user, isAnonymous } = useAuth();

  // Show chat interface for both authenticated users and anonymous users
  return (
    <div className="h-screen">
      <ChatInterface />
    </div>
  );
};

export default Index;