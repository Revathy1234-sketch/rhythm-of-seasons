
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Music } from 'lucide-react';
import { playlists } from '@/data/sampleTracks';
import { cn } from '@/lib/utils';

interface PlaylistCardProps {
  playlistId: string;
  onSelectTrack: (trackId: string) => void;
}

const PlaylistCard = ({ playlistId, onSelectTrack }: PlaylistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const playlist = playlists.find(p => p.id === playlistId);
  
  if (!playlist) return null;

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'chill': return 'from-moods-chill/50 to-moods-chill/10 border-moods-chill/30';
      case 'energetic': return 'from-moods-energetic/50 to-moods-energetic/10 border-moods-energetic/30';
      case 'happy': return 'from-moods-happy/50 to-moods-happy/10 border-moods-happy/30';
      case 'melancholy': return 'from-moods-melancholy/50 to-moods-melancholy/10 border-moods-melancholy/30';
      case 'focus': return 'from-moods-focus/50 to-moods-focus/10 border-moods-focus/30';
      default: return 'from-primary/50 to-primary/10 border-primary/30';
    }
  };

  const getTimeOfDayBadgeColor = (time: string) => {
    switch (time) {
      case 'morning': return 'bg-amber-500';
      case 'afternoon': return 'bg-orange-500';
      case 'evening': return 'bg-indigo-500';
      case 'night': return 'bg-blue-900';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border",
        "bg-gradient-to-b", 
        getMoodColor(playlist.mood),
        isHovered && "transform scale-[1.02]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10"/>
        <img 
          src={playlist.coverImage} 
          alt={playlist.name}
          className={cn(
            "w-full h-40 object-cover transition-all duration-500",
            isHovered && "scale-105"
          )}
        />
        <div className="absolute top-2 right-2 z-20">
          <Badge className={getTimeOfDayBadgeColor(playlist.timeOfDay)}>
            {playlist.timeOfDay}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="relative z-20 pb-2">
        <CardTitle className="font-display text-lg">{playlist.name}</CardTitle>
        <CardDescription>{playlist.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center text-sm">
          <Music size={16} className="mr-2" />
          <span>{playlist.tracks.length} tracks</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="secondary" 
          className="w-full" 
          onClick={() => {
            if (playlist.tracks.length > 0) {
              onSelectTrack(playlist.tracks[0].id);
            }
          }}
        >
          <Play size={16} className="mr-2" />
          Explore Playlist
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaylistCard;
