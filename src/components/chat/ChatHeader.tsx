import { useState } from 'react';
import { User, LogOut, Settings, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';

export function ChatHeader() {
  const { user, displayName, setDisplayName, isAnonymous, signOut } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);

  const handleSaveName = () => {
    setDisplayName(tempName);
    setIsEditingName(false);
  };

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Modern Chat</h1>
            <p className="text-sm text-muted-foreground">
              {isAnonymous ? 'Anonymous session' : 'Authenticated user'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Display Name</label>
                  <div className="flex gap-2 mt-1">
                    {isEditingName ? (
                      <>
                        <Input
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          placeholder="Enter display name"
                        />
                        <Button size="sm" onClick={handleSaveName}>
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <Input value={displayName} disabled />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setIsEditingName(true)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Status: {isAnonymous ? 'Anonymous User' : 'Authenticated User'}
                  </p>
                  {!isAnonymous && (
                    <p className="text-sm text-muted-foreground mb-4">
                      Email: {user?.email}
                    </p>
                  )}
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={signOut}
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isAnonymous ? 'Clear Session' : 'Sign Out'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}