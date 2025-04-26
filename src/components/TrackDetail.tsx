
import { useRef, useState } from 'react';
import { Track } from '@/data/sampleTracks';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TrackDetailProps {
  track: Track;
  onClose: () => void;
}

const TrackDetail = ({ track, onClose }: TrackDetailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const togglePlay = () => {
    if (!audioRef.current || !track.previewUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // Get feature visualization style
  const getFeatureStyle = (value: number) => {
    return { width: `${value * 100}%` };
  };

  // Get mood-based color
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'chill': return 'bg-moods-chill';
      case 'energetic': return 'bg-moods-energetic';
      case 'happy': return 'bg-moods-happy';
      case 'melancholy': return 'bg-moods-melancholy';
      case 'focus': return 'bg-moods-focus';
      default: return 'bg-primary';
    }
  };

  return (
    <Card className="bg-card/90 backdrop-blur-md border-border w-full max-w-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-display">{track.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            ✕
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24 overflow-hidden rounded-md">
            <img 
              src={track.albumArt} 
              alt={track.album} 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Album: {track.album}</p>
            <p className="text-sm text-muted-foreground">Year: {track.year}</p>
            <p className="text-sm text-muted-foreground">Genre: {track.genre}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={cn(getMoodColor(track.mood))}>
                {track.mood}
              </Badge>
              <Badge variant="outline">{track.timeOfDay}</Badge>
              <Badge variant="outline">{track.season}</Badge>
            </div>
          </div>
        </div>

        {track.previewUrl && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={togglePlay} 
                className="h-10 w-10 rounded-full"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              
              <div className="flex-1 mx-2">
                <Progress value={progress} className="h-1" />
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMute}
                className="h-8 w-8 rounded-full"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </Button>
              
              <audio 
                ref={audioRef} 
                src={track.previewUrl} 
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground">Preview available</p>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Tempo</span>
              <span>{track.features.tempo} BPM</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn("h-full", getMoodColor(track.mood))}
                style={{ width: `${(track.features.tempo / 200) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Energy</span>
              <span>{Math.round(track.features.energy * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn("h-full", getMoodColor(track.mood))}
                style={getFeatureStyle(track.features.energy)}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Valence</span>
              <span>{Math.round(track.features.valence * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn("h-full", getMoodColor(track.mood))}
                style={getFeatureStyle(track.features.valence)}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Danceability</span>
              <span>{Math.round(track.features.danceability * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn("h-full", getMoodColor(track.mood))}
                style={getFeatureStyle(track.features.danceability)}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Acousticness</span>
              <span>{Math.round(track.features.acousticness * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn("h-full", getMoodColor(track.mood))}
                style={getFeatureStyle(track.features.acousticness)}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <p className="text-sm text-muted-foreground italic">
          This {track.mood} track is perfect for {track.timeOfDay} listening during {track.season}.
        </p>
      </CardFooter>
    </Card>
  );
};

export default TrackDetail;
