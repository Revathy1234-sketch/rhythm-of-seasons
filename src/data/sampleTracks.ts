
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  year: number;
  genre: string;
  features: {
    tempo: number;        // Beats per minute (BPM)
    energy: number;       // 0.0 to 1.0
    valence: number;      // 0.0 to 1.0 (musical positiveness)
    danceability: number; // 0.0 to 1.0
    acousticness: number; // 0.0 to 1.0
    instrumentalness: number; // 0.0 to 1.0
  };
  coordinates: {
    x: number;
    y: number;
  };
  previewUrl?: string;
  mood: 'chill' | 'energetic' | 'happy' | 'melancholy' | 'focus';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  season: 'spring' | 'summer' | 'fall' | 'winter';
}

export const sampleTracks: Track[] = [
  // Chill tracks
  {
    id: '1',
    title: 'Blue in Green',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    albumArt: 'https://picsum.photos/id/65/300/300',
    year: 1959,
    genre: 'Jazz',
    features: {
      tempo: 78,
      energy: 0.2,
      valence: 0.4,
      danceability: 0.3,
      acousticness: 0.9,
      instrumentalness: 0.8
    },
    coordinates: { x: -0.7, y: -0.5 },
    previewUrl: 'https://p.scdn.co/mp3-preview/126337c2ff5dd239a74a9aecbb3832a313ccd8f8',
    mood: 'chill',
    timeOfDay: 'evening',
    season: 'fall'
  },
  {
    id: '2',
    title: 'In a Sentimental Mood',
    artist: 'Duke Ellington & John Coltrane',
    album: 'Duke Ellington & John Coltrane',
    albumArt: 'https://picsum.photos/id/24/300/300',
    year: 1963,
    genre: 'Jazz',
    features: {
      tempo: 72,
      energy: 0.25,
      valence: 0.35,
      danceability: 0.25,
      acousticness: 0.85,
      instrumentalness: 0.7
    },
    coordinates: { x: -0.75, y: -0.6 },
    previewUrl: 'https://p.scdn.co/mp3-preview/c8b7b6838ec7d9fc8c037177cb704d5addfc742f',
    mood: 'chill',
    timeOfDay: 'night',
    season: 'winter'
  },
  {
    id: '3',
    title: 'Flamenco Sketches',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    albumArt: 'https://picsum.photos/id/65/300/300',
    year: 1959,
    genre: 'Jazz',
    features: {
      tempo: 76,
      energy: 0.15,
      valence: 0.3,
      danceability: 0.2,
      acousticness: 0.95,
      instrumentalness: 0.9
    },
    coordinates: { x: -0.8, y: -0.7 },
    mood: 'chill',
    timeOfDay: 'night',
    season: 'winter'
  },

  // Energetic Tracks
  {
    id: '4',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    album: 'Uptown Special',
    albumArt: 'https://picsum.photos/id/96/300/300',
    year: 2014,
    genre: 'Pop',
    features: {
      tempo: 115,
      energy: 0.9,
      valence: 0.95,
      danceability: 0.92,
      acousticness: 0.05,
      instrumentalness: 0.0
    },
    coordinates: { x: 0.8, y: 0.7 },
    previewUrl: 'https://p.scdn.co/mp3-preview/d608f10e9b92b5083edc2e907dd888333f65bd85',
    mood: 'energetic',
    timeOfDay: 'afternoon',
    season: 'summer'
  },
  {
    id: '5',
    title: 'Don\'t Stop Me Now',
    artist: 'Queen',
    album: 'Jazz',
    albumArt: 'https://picsum.photos/id/96/300/300',
    year: 1979,
    genre: 'Rock',
    features: {
      tempo: 156,
      energy: 0.85,
      valence: 0.9,
      danceability: 0.7,
      acousticness: 0.15,
      instrumentalness: 0.05
    },
    coordinates: { x: 0.75, y: 0.8 },
    previewUrl: 'https://p.scdn.co/mp3-preview/8defd1d4607abd835242ce34e9602f371eaced3b',
    mood: 'energetic',
    timeOfDay: 'afternoon',
    season: 'summer'
  },
  {
    id: '6',
    title: 'Can\'t Hold Us',
    artist: 'Macklemore & Ryan Lewis',
    album: 'The Heist',
    albumArt: 'https://picsum.photos/id/96/300/300',
    year: 2012,
    genre: 'Hip-Hop',
    features: {
      tempo: 146,
      energy: 0.93,
      valence: 0.87,
      danceability: 0.85,
      acousticness: 0.1,
      instrumentalness: 0.0
    },
    coordinates: { x: 0.85, y: 0.75 },
    mood: 'energetic',
    timeOfDay: 'afternoon',
    season: 'spring'
  },

  // Happy Tracks
  {
    id: '7',
    title: 'Here Comes The Sun',
    artist: 'The Beatles',
    album: 'Abbey Road',
    albumArt: 'https://picsum.photos/id/42/300/300',
    year: 1969,
    genre: 'Rock',
    features: {
      tempo: 129,
      energy: 0.54,
      valence: 0.89,
      danceability: 0.55,
      acousticness: 0.7,
      instrumentalness: 0.1
    },
    coordinates: { x: 0.45, y: 0.6 },
    previewUrl: 'https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99',
    mood: 'happy',
    timeOfDay: 'morning',
    season: 'spring'
  },
  {
    id: '8',
    title: 'Walking on Sunshine',
    artist: 'Katrina & The Waves',
    album: 'Walking on Sunshine',
    albumArt: 'https://picsum.photos/id/42/300/300',
    year: 1985,
    genre: 'Pop',
    features: {
      tempo: 110,
      energy: 0.8,
      valence: 0.95,
      danceability: 0.7,
      acousticness: 0.15,
      instrumentalness: 0.05
    },
    coordinates: { x: 0.55, y: 0.7 },
    mood: 'happy',
    timeOfDay: 'morning',
    season: 'summer'
  },
  {
    id: '9',
    title: 'Good Vibrations',
    artist: 'The Beach Boys',
    album: 'Smiley Smile',
    albumArt: 'https://picsum.photos/id/42/300/300',
    year: 1966,
    genre: 'Pop Rock',
    features: {
      tempo: 118,
      energy: 0.65,
      valence: 0.9,
      danceability: 0.65,
      acousticness: 0.4,
      instrumentalness: 0.1
    },
    coordinates: { x: 0.5, y: 0.65 },
    previewUrl: 'https://p.scdn.co/mp3-preview/631390e343ebc41e97d8ce31e80c5219a15d3665',
    mood: 'happy',
    timeOfDay: 'afternoon',
    season: 'summer'
  },

  // Melancholy Tracks
  {
    id: '10',
    title: 'Creep',
    artist: 'Radiohead',
    album: 'Pablo Honey',
    albumArt: 'https://picsum.photos/id/23/300/300',
    year: 1993,
    genre: 'Alternative Rock',
    features: {
      tempo: 92,
      energy: 0.56,
      valence: 0.1,
      danceability: 0.43,
      acousticness: 0.45,
      instrumentalness: 0.0
    },
    coordinates: { x: -0.2, y: -0.7 },
    previewUrl: 'https://p.scdn.co/mp3-preview/bbbe9c3a14c3b21ae41e21fcf79b1aaeee9bdbdb',
    mood: 'melancholy',
    timeOfDay: 'night',
    season: 'winter'
  },
  {
    id: '11',
    title: 'Everybody Hurts',
    artist: 'R.E.M.',
    album: 'Automatic for the People',
    albumArt: 'https://picsum.photos/id/23/300/300',
    year: 1992,
    genre: 'Alternative Rock',
    features: {
      tempo: 82,
      energy: 0.3,
      valence: 0.15,
      danceability: 0.35,
      acousticness: 0.5,
      instrumentalness: 0.05
    },
    coordinates: { x: -0.3, y: -0.8 },
    mood: 'melancholy',
    timeOfDay: 'evening',
    season: 'fall'
  },
  {
    id: '12',
    title: 'Tears in Heaven',
    artist: 'Eric Clapton',
    album: 'Rush',
    albumArt: 'https://picsum.photos/id/23/300/300',
    year: 1992,
    genre: 'Rock',
    features: {
      tempo: 98,
      energy: 0.25,
      valence: 0.2,
      danceability: 0.3,
      acousticness: 0.9,
      instrumentalness: 0.1
    },
    coordinates: { x: -0.4, y: -0.75 },
    previewUrl: 'https://p.scdn.co/mp3-preview/6db99b0f43bcde69153a6fb3722dc8b08c738086',
    mood: 'melancholy',
    timeOfDay: 'evening',
    season: 'fall'
  },

  // Focus Tracks
  {
    id: '13',
    title: 'Gymnopédie No.1',
    artist: 'Erik Satie',
    album: 'Trois Gymnopédies',
    albumArt: 'https://picsum.photos/id/15/300/300',
    year: 1888,
    genre: 'Classical',
    features: {
      tempo: 66,
      energy: 0.15,
      valence: 0.5,
      danceability: 0.2,
      acousticness: 0.95,
      instrumentalness: 1.0
    },
    coordinates: { x: -0.45, y: 0.1 },
    previewUrl: 'https://p.scdn.co/mp3-preview/3fd41b627a2fa39290a0d7e4ee22631675928232',
    mood: 'focus',
    timeOfDay: 'morning',
    season: 'spring'
  },
  {
    id: '14',
    title: 'Weightless',
    artist: 'Marconi Union',
    album: 'Weightless',
    albumArt: 'https://picsum.photos/id/15/300/300',
    year: 2012,
    genre: 'Ambient',
    features: {
      tempo: 60,
      energy: 0.2,
      valence: 0.4,
      danceability: 0.1,
      acousticness: 0.7,
      instrumentalness: 0.9
    },
    coordinates: { x: -0.5, y: 0.2 },
    mood: 'focus',
    timeOfDay: 'night',
    season: 'winter'
  },
  {
    id: '15',
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    album: 'Suite bergamasque',
    albumArt: 'https://picsum.photos/id/15/300/300',
    year: 1905,
    genre: 'Classical',
    features: {
      tempo: 85,
      energy: 0.2,
      valence: 0.45,
      danceability: 0.15,
      acousticness: 1.0,
      instrumentalness: 1.0
    },
    coordinates: { x: -0.55, y: 0.15 },
    previewUrl: 'https://p.scdn.co/mp3-preview/122559ab0c8c14d2926054129febfee45e3a7c53',
    mood: 'focus',
    timeOfDay: 'evening',
    season: 'winter'
  },
];

// Create playlists based on moods
export const playlists = [
  {
    id: 'midnight-flow',
    name: 'Midnight Flow',
    description: 'Gentle beats that pulse like distant stars in the night sky. Perfect for late-night focus or unwinding.',
    coverImage: 'https://picsum.photos/id/37/300/300',
    mood: 'chill',
    timeOfDay: 'night',
    tracks: sampleTracks.filter(track => track.mood === 'chill' || track.mood === 'focus')
  },
  {
    id: 'rainy-day-rhythms',
    name: 'Rainy Day Rhythms',
    description: 'Melancholy tunes that resonate with the patter of raindrops on windows.',
    coverImage: 'https://picsum.photos/id/29/300/300',
    mood: 'melancholy',
    timeOfDay: 'evening',
    tracks: sampleTracks.filter(track => track.mood === 'melancholy')
  },
  {
    id: 'energize-morning',
    name: 'Energize Your Morning',
    description: 'Vibrant tracks with sunrise tempos to kickstart your day with optimism.',
    coverImage: 'https://picsum.photos/id/96/300/300',
    mood: 'energetic',
    timeOfDay: 'morning',
    tracks: sampleTracks.filter(track => track.mood === 'energetic' || track.mood === 'happy')
  },
  {
    id: 'sunset-beats',
    name: 'Sunset Beats',
    description: 'Warm, golden melodies that transition from day to evening with grace.',
    coverImage: 'https://picsum.photos/id/106/300/300',
    mood: 'happy',
    timeOfDay: 'evening',
    tracks: sampleTracks.filter(track => track.mood === 'happy')
  },
  {
    id: 'deep-focus',
    name: 'Deep Focus',
    description: 'Instrumental pieces that create a cocoon of concentration.',
    coverImage: 'https://picsum.photos/id/15/300/300',
    mood: 'focus',
    timeOfDay: 'afternoon',
    tracks: sampleTracks.filter(track => track.mood === 'focus')
  }
];
