import { useState } from 'react';
import MoodMap from '@/components/MoodMap';
import TrackDetail from '@/components/TrackDetail';
import MoodAnalytics from '@/components/MoodAnalytics';
import PlaylistCard from '@/components/PlaylistCard';
import { sampleTracks, playlists, Track } from '@/data/sampleTracks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Music } from 'lucide-react';

const Index = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [activeTab, setActiveTab] = useState('map');
  
  const handleSelectTrack = (track: Track) => {
    setSelectedTrack(track);
  };
  
  const handleCloseTrackDetail = () => {
    setSelectedTrack(null);
  };
  
  const handleSelectPlaylistTrack = (trackId: string) => {
    const track = sampleTracks.find(t => t.id === trackId);
    if (track) {
      setSelectedTrack(track);
      setActiveTab('map');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-gradient-to-r from-background to-muted py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display text-foreground font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                  Music Mood Map
                </span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Explore music through the lens of emotion and data
              </p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <TabsList className="bg-card">
              <TabsTrigger value="map" className="data-[state=active]:bg-primary/20">Mood Map</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/20">Analytics</TabsTrigger>
              <TabsTrigger value="playlists" className="data-[state=active]:bg-primary/20">Playlists</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="map" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={cn("lg:col-span-3", selectedTrack && "lg:col-span-2")}>
                <h2 className="text-xl font-display font-semibold mb-3">Visual Music Mood Map</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore our musical universe where each point represents a track positioned by its emotional qualities. 
                  Click on any point to discover more.
                </p>
                <MoodMap 
                  tracks={sampleTracks}
                  onSelectTrack={handleSelectTrack}
                  selectedTrack={selectedTrack}
                />
              </div>
              
              {selectedTrack && (
                <div className="lg:col-span-1">
                  <h2 className="text-xl font-display font-semibold mb-4">Track Details</h2>
                  <TrackDetail 
                    track={selectedTrack} 
                    onClose={handleCloseTrackDetail}
                  />
                </div>
              )}
            </div>
            
            <div>
              <Separator className="my-6" />
              <h2 className="text-xl font-display font-semibold mb-4">Understanding the Music Mood Map</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">The Emotional Coordinates</h3>
                  <p className="text-sm text-muted-foreground">
                    Our mood map plots songs on two key emotional dimensions:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>
                      <strong>Horizontal axis:</strong> Valence (musical positiveness), 
                      from melancholy on the left to joyful on the right
                    </li>
                    <li>
                      <strong>Vertical axis:</strong> Energy level, 
                      from calm/relaxing at the bottom to energetic at the top
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Mood Clustering</h3>
                  <p className="text-sm text-muted-foreground">
                    The colored regions represent distinct mood clusters:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-moods-chill mr-2" />
                      <span className="text-sm">Chill - relaxed, smooth</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-moods-energetic mr-2" />
                      <span className="text-sm">Energetic - upbeat, intense</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-moods-happy mr-2" />
                      <span className="text-sm">Happy - uplifting, positive</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-moods-melancholy mr-2" />
                      <span className="text-sm">Melancholy - reflective, sad</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-moods-focus mr-2" />
                      <span className="text-sm">Focus - instrumental, calm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <h2 className="text-xl font-display font-semibold mb-4">Musical Mood Trends & Insights</h2>
            <MoodAnalytics tracks={sampleTracks} />
          </TabsContent>
          
          <TabsContent value="playlists">
            <h2 className="text-xl font-display font-semibold mb-4">Curated Mood Playlists</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Discover curated collections of tracks that capture specific moods and moments.
              Each playlist is carefully crafted based on audio features and emotional resonance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {playlists.map(playlist => (
                <PlaylistCard 
                  key={playlist.id}
                  playlistId={playlist.id}
                  onSelectTrack={handleSelectPlaylistTrack}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-border py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Music Mood Map - A data-driven exploration of music and emotion
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Visualizing the emotional landscape of music through audio features
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
