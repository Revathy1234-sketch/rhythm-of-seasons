
import { Track } from '@/data/sampleTracks';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface MoodAnalyticsProps {
  tracks: Track[];
}

const MoodAnalytics: React.FC<MoodAnalyticsProps> = ({ tracks }) => {
  const [activeTab, setActiveTab] = useState('time');
  
  // Prepare data for time of day analysis
  const timeOfDayData = [
    { name: 'Morning', ...countMoodsByTime('morning') },
    { name: 'Afternoon', ...countMoodsByTime('afternoon') },
    { name: 'Evening', ...countMoodsByTime('evening') },
    { name: 'Night', ...countMoodsByTime('night') },
  ];
  
  // Prepare data for seasons analysis
  const seasonData = [
    { name: 'Spring', ...countMoodsBySeason('spring') },
    { name: 'Summer', ...countMoodsBySeason('summer') },
    { name: 'Fall', ...countMoodsBySeason('fall') },
    { name: 'Winter', ...countMoodsBySeason('winter') },
  ];
  
  // Prepare data for genre analysis
  const genreData = getGenreData();
  
  // Helper function to count moods by time of day
  function countMoodsByTime(time: string) {
    const filtered = tracks.filter(track => track.timeOfDay === time);
    return {
      chill: filtered.filter(t => t.mood === 'chill').length,
      energetic: filtered.filter(t => t.mood === 'energetic').length,
      happy: filtered.filter(t => t.mood === 'happy').length,
      melancholy: filtered.filter(t => t.mood === 'melancholy').length,
      focus: filtered.filter(t => t.mood === 'focus').length,
      total: filtered.length,
    };
  }
  
  // Helper function to count moods by season
  function countMoodsBySeason(season: string) {
    const filtered = tracks.filter(track => track.season === season);
    return {
      chill: filtered.filter(t => t.mood === 'chill').length,
      energetic: filtered.filter(t => t.mood === 'energetic').length,
      happy: filtered.filter(t => t.mood === 'happy').length,
      melancholy: filtered.filter(t => t.mood === 'melancholy').length,
      focus: filtered.filter(t => t.mood === 'focus').length,
      total: filtered.length,
    };
  }
  
  // Helper function to prepare genre data
  function getGenreData() {
    const genreCounts: Record<string, number> = {};
    tracks.forEach(track => {
      genreCounts[track.genre] = (genreCounts[track.genre] || 0) + 1;
    });
    
    return Object.entries(genreCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }
  
  // Colors for mood categories
  const moodColors = {
    chill: '#3b82f6',      // Blue
    energetic: '#ef4444',  // Red
    happy: '#f59e0b',      // Amber/Orange
    melancholy: '#8b5cf6', // Purple
    focus: '#10b981',      // Green
  };
  
  // Colors for pie chart
  const GENRE_COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/90 backdrop-blur-md p-2 border border-border rounded-md text-xs">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.fill }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Insights based on the data
  const timeInsights = () => {
    const nightChillCount = tracks.filter(t => t.timeOfDay === 'night' && t.mood === 'chill').length;
    const nightTotal = tracks.filter(t => t.timeOfDay === 'night').length;
    const nightChillPercent = ((nightChillCount / nightTotal) * 100).toFixed(0);
    
    const morningEnergeticCount = tracks.filter(t => t.timeOfDay === 'morning' && t.mood === 'energetic').length;
    const morningTotal = tracks.filter(t => t.timeOfDay === 'morning').length;
    const morningEnergeticPercent = ((morningEnergeticCount / morningTotal) * 100).toFixed(0);
    
    return (
      <div className="space-y-2 mt-4">
        <p className="text-sm">
          <span className="font-semibold text-moods-chill">Chill tracks</span> make up {nightChillPercent}% of night listening, 
          creating a "Midnight Flow" perfect for unwinding.
        </p>
        <p className="text-sm">
          <span className="font-semibold text-moods-energetic">Energetic music</span> dominates mornings at {morningEnergeticPercent}%, 
          helping listeners kickstart their day.
        </p>
        <p className="text-sm italic text-muted-foreground">
          The data suggests our moods align with natural daily rhythms - energetic in mornings, 
          mellowing through the day toward calm evenings.
        </p>
      </div>
    );
  };
  
  const seasonInsights = () => {
    const winterMelancholyCount = tracks.filter(t => t.season === 'winter' && t.mood === 'melancholy').length;
    const winterTotal = tracks.filter(t => t.season === 'winter').length;
    const winterMelancholyPercent = ((winterMelancholyCount / winterTotal) * 100).toFixed(0);
    
    const summerHappyCount = tracks.filter(t => t.season === 'summer' && t.mood === 'happy').length;
    const summerTotal = tracks.filter(t => t.season === 'summer').length;
    const summerHappyPercent = ((summerHappyCount / summerTotal) * 100).toFixed(0);
    
    return (
      <div className="space-y-2 mt-4">
        <p className="text-sm">
          <span className="font-semibold text-moods-melancholy">Melancholy tracks</span> peak during winter ({winterMelancholyPercent}%), 
          reflecting the introspective nature of the season.
        </p>
        <p className="text-sm">
          <span className="font-semibold text-moods-happy">Happy music</span> thrives in summer months ({summerHappyPercent}%), 
          mirroring longer days and outdoor activities.
        </p>
        <p className="text-sm italic text-muted-foreground">
          Our listening patterns show a clear seasonal rhythm, with emotional resonance 
          shifting alongside nature's own cycles.
        </p>
      </div>
    );
  };
  
  const genreInsights = () => {
    const genres = [...new Set(tracks.map(track => track.genre))];
    const jazzTracks = tracks.filter(t => t.genre === 'Jazz');
    const jazzMoods = [...new Set(jazzTracks.map(track => track.mood))];
    const dominantJazzMood = jazzMoods.sort((a, b) => 
      jazzTracks.filter(t => t.mood === b).length - jazzTracks.filter(t => t.mood === a).length
    )[0];
    
    return (
      <div className="space-y-2 mt-4">
        <p className="text-sm">
          Our collection spans {genres.length} diverse genres, with each having distinct mood signatures.
        </p>
        <p className="text-sm">
          Jazz tracks predominantly evoke <span className="font-semibold" 
          style={{ color: moodColors[dominantJazzMood as keyof typeof moodColors] }}>
            {dominantJazzMood}
          </span> moods, perfect for focused listening sessions.
        </p>
        <p className="text-sm italic text-muted-foreground">
          Different genres serve as reliable mood catalysts, with distinct emotional profiles 
          across musical traditions.
        </p>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-display">Mood Analytics</CardTitle>
        <CardDescription>
          Discover how moods shift across time, seasons, and genres
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="time" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="time">Time of Day</TabsTrigger>
            <TabsTrigger value="season">Seasons</TabsTrigger>
            <TabsTrigger value="genre">Genres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="time" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timeOfDayData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="chill" stackId="a" fill={moodColors.chill} />
                  <Bar dataKey="energetic" stackId="a" fill={moodColors.energetic} />
                  <Bar dataKey="happy" stackId="a" fill={moodColors.happy} />
                  <Bar dataKey="melancholy" stackId="a" fill={moodColors.melancholy} />
                  <Bar dataKey="focus" stackId="a" fill={moodColors.focus} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {timeInsights()}
          </TabsContent>
          
          <TabsContent value="season" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={seasonData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="chill" stackId="a" fill={moodColors.chill} />
                  <Bar dataKey="energetic" stackId="a" fill={moodColors.energetic} />
                  <Bar dataKey="happy" stackId="a" fill={moodColors.happy} />
                  <Bar dataKey="melancholy" stackId="a" fill={moodColors.melancholy} />
                  <Bar dataKey="focus" stackId="a" fill={moodColors.focus} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {seasonInsights()}
          </TabsContent>
          
          <TabsContent value="genre" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={GENRE_COLORS[index % GENRE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {genreInsights()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MoodAnalytics;
