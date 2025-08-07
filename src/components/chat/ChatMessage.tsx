import { format } from 'date-fns';
import { FileIcon, ImageIcon } from 'lucide-react';
import { Message } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { user, anonymousId } = useAuth();
  const isOwnMessage = message.sender_id === (user?.id || anonymousId);

  const renderMedia = () => {
    if (!message.media_url) return null;

    if (message.message_type === 'image') {
      return (
        <div className="mt-2">
          <img 
            src={message.media_url} 
            alt={message.media_filename || 'Shared image'}
            className="max-w-sm rounded-lg border border-border"
          />
        </div>
      );
    }

    if (message.message_type === 'pdf') {
      return (
        <div className="mt-2 flex items-center gap-2 p-3 rounded-lg bg-muted">
          <FileIcon className="h-5 w-5 text-muted-foreground" />
          <a 
            href={message.media_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            {message.media_filename || 'Document'}
          </a>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn(
      "flex w-full mb-4",
      isOwnMessage ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] rounded-2xl px-4 py-3 relative",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-noise before:opacity-20 before:pointer-events-none",
        isOwnMessage 
          ? "bg-chat-bubble-user text-chat-bubble-user-foreground" 
          : "bg-chat-bubble-other text-chat-bubble-other-foreground"
      )}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium opacity-80">
              {message.sender_name}
            </span>
            {message.is_anonymous && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted/20 text-muted-foreground">
                Guest
              </span>
            )}
          </div>
          
          {message.content && (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
          
          {renderMedia()}
          
          <div className="flex justify-end mt-2">
            <span className="text-xs opacity-60">
              {format(new Date(message.created_at), 'HH:mm')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}