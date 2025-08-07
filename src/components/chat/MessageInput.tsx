import { useState, useRef } from 'react';
import { Send, Paperclip, Image as ImageIcon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/useChat';
import { toast } from '@/hooks/use-toast';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, uploadMedia } = useChat();

  const handleSend = async () => {
    if (!message.trim()) return;
    
    await sendMessage(message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const validPdfType = 'application/pdf';
    
    if (!validImageTypes.includes(file.type) && file.type !== validPdfType) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG, GIF, WebP) or PDF file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const mediaUrl = await uploadMedia(file);
      if (mediaUrl) {
        const messageType = validImageTypes.includes(file.type) ? 'image' : 'pdf';
        await sendMessage('', messageType, mediaUrl, file.name);
        toast({
          title: "File uploaded",
          description: `${file.name} has been shared.`
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="bg-background/80 border-border focus:ring-primary"
            disabled={uploading}
          />
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="shrink-0"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        
        <Button 
          onClick={handleSend}
          disabled={!message.trim() || uploading}
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {uploading && (
        <div className="mt-2 text-sm text-muted-foreground">
          Uploading file...
        </div>
      )}
    </div>
  );
}