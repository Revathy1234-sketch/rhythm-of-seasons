
import React, { useRef, useEffect, useState } from 'react';
import { Track } from '@/data/sampleTracks';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MoodMapProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
  selectedTrack: Track | null;
}

const MoodMap: React.FC<MoodMapProps> = ({ tracks, onSelectTrack, selectedTrack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);

  // Map coordinates from data space (-1 to 1) to canvas space
  const mapCoordinates = (x: number, y: number, width: number, height: number) => {
    const canvasX = ((x + 1) / 2) * width;
    const canvasY = ((y + 1) / 2) * height;
    return { x: canvasX, y: canvasY };
  };

  // Get color based on mood
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'chill': return '#3b82f6';      // Blue
      case 'energetic': return '#ef4444';  // Red
      case 'happy': return '#f59e0b';      // Amber/Orange
      case 'melancholy': return '#8b5cf6'; // Purple
      case 'focus': return '#10b981';      // Green
      default: return '#ffffff';          // White
    }
  };

  // Draw the mood map on the canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const gradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 1.5
    );
    gradient.addColorStop(0, 'rgba(30, 27, 45, 0.8)');
    gradient.addColorStop(1, 'rgba(15, 13, 22, 1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add grid lines with low opacity
    context.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    context.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= canvas.height; i += canvas.height / 10) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= canvas.width; i += canvas.width / 10) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, canvas.height);
      context.stroke();
    }

    // Group tracks by mood for cluster visualization
    const moods = [...new Set(tracks.map(track => track.mood))];
    
    // Draw mood cluster backgrounds
    moods.forEach(mood => {
      const moodTracks = tracks.filter(track => track.mood === mood);
      if (moodTracks.length === 0) return;
      
      // Find the centroid of this mood cluster
      const centroidX = moodTracks.reduce((sum, track) => sum + track.coordinates.x, 0) / moodTracks.length;
      const centroidY = moodTracks.reduce((sum, track) => sum + track.coordinates.y, 0) / moodTracks.length;
      
      const { x: canvasCentroidX, y: canvasCentroidY } = mapCoordinates(centroidX, centroidY, canvas.width, canvas.height);
      
      // Calculate the radius of the cluster (distance to furthest track + padding)
      const radius = moodTracks.reduce((max, track) => {
        const { x, y } = mapCoordinates(track.coordinates.x, track.coordinates.y, canvas.width, canvas.height);
        const distance = Math.sqrt(Math.pow(x - canvasCentroidX, 2) + Math.pow(y - canvasCentroidY, 2));
        return Math.max(max, distance);
      }, 0) + 40;
      
      // Draw cluster background
      const moodColor = getMoodColor(mood);
      const gradient = context.createRadialGradient(
        canvasCentroidX, canvasCentroidY, 0,
        canvasCentroidX, canvasCentroidY, radius
      );
      gradient.addColorStop(0, `${moodColor}40`); // 25% opacity
      gradient.addColorStop(1, `${moodColor}00`); // 0% opacity
      
      context.beginPath();
      context.arc(canvasCentroidX, canvasCentroidY, radius, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();
      
      // Add mood label
      context.font = 'bold 16px Inter, sans-serif';
      context.fillStyle = moodColor;
      context.fillText(mood.charAt(0).toUpperCase() + mood.slice(1), canvasCentroidX - 30, canvasCentroidY - radius - 10);
    });

    // Draw connecting lines between tracks of same mood
    moods.forEach(mood => {
      const moodTracks = tracks.filter(track => track.mood === mood);
      const moodColor = getMoodColor(mood);
      
      if (moodTracks.length > 1) {
        context.strokeStyle = `${moodColor}30`; // 20% opacity
        context.lineWidth = 1;
        
        // Draw lines between consecutive tracks of the same mood
        for (let i = 0; i < moodTracks.length - 1; i++) {
          const trackA = moodTracks[i];
          const trackB = moodTracks[i + 1];
          
          const { x: xA, y: yA } = mapCoordinates(trackA.coordinates.x, trackA.coordinates.y, canvas.width, canvas.height);
          const { x: xB, y: yB } = mapCoordinates(trackB.coordinates.x, trackB.coordinates.y, canvas.width, canvas.height);
          
          context.beginPath();
          context.moveTo(xA, yA);
          context.lineTo(xB, yB);
          context.stroke();
        }
      }
    });

    // Draw track points
    tracks.forEach(track => {
      const { x, y } = mapCoordinates(track.coordinates.x, track.coordinates.y, canvas.width, canvas.height);
      const isSelected = selectedTrack?.id === track.id;
      const isHovered = hoveredTrack?.id === track.id;
      
      // Draw glow effect for selected/hovered tracks
      if (isSelected || isHovered) {
        context.beginPath();
        context.arc(x, y, isSelected ? 16 : 12, 0, Math.PI * 2);
        context.fillStyle = `${getMoodColor(track.mood)}40`; // 25% opacity
        context.fill();
      }
      
      // Draw the track point
      context.beginPath();
      context.arc(x, y, isSelected ? 8 : (isHovered ? 7 : 5), 0, Math.PI * 2);
      context.fillStyle = getMoodColor(track.mood);
      context.fill();
      
      // Draw border for selected track
      if (isSelected) {
        context.beginPath();
        context.arc(x, y, 9, 0, Math.PI * 2);
        context.strokeStyle = '#ffffff';
        context.lineWidth = 2;
        context.stroke();
      }
    });

  }, [tracks, selectedTrack, hoveredTrack, dimensions]);

  // Handle canvas click to select a track
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert canvas coordinates back to data space
    const dataX = (x / canvas.width) * 2 - 1;
    const dataY = (y / canvas.height) * 2 - 1;
    
    // Find the closest track
    let closestTrack = null;
    let minDistance = Infinity;
    
    tracks.forEach(track => {
      const dx = track.coordinates.x - dataX;
      const dy = track.coordinates.y - dataY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestTrack = track;
      }
    });
    
    // Select the track if it's close enough (threshold: 0.1 in data space)
    if (closestTrack && minDistance < 0.1) {
      onSelectTrack(closestTrack);
    }
  };

  // Handle canvas hover to show track info
  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert canvas coordinates back to data space
    const dataX = (x / canvas.width) * 2 - 1;
    const dataY = (y / canvas.height) * 2 - 1;
    
    // Find the closest track
    let closestTrack = null;
    let minDistance = Infinity;
    
    tracks.forEach(track => {
      const dx = track.coordinates.x - dataX;
      const dy = track.coordinates.y - dataY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestTrack = track;
      }
    });
    
    // Hover the track if it's close enough (threshold: 0.05 in data space)
    if (closestTrack && minDistance < 0.05) {
      setHoveredTrack(closestTrack);
    } else {
      setHoveredTrack(null);
    }
  };

  // Handle canvas mouse leave
  const handleCanvasMouseLeave = () => {
    setHoveredTrack(null);
  };

  // Update canvas dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="mood-canvas relative w-full h-[600px] rounded-xl overflow-hidden border border-border"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasMouseLeave}
      />
      
      {hoveredTrack && !selectedTrack && (
        <div 
          className="absolute py-2 px-3 bg-black/80 backdrop-blur-md rounded-md text-white text-sm pointer-events-none"
          style={{
            left: `${mapCoordinates(hoveredTrack.coordinates.x, hoveredTrack.coordinates.y, dimensions.width, dimensions.height).x + 10}px`,
            top: `${mapCoordinates(hoveredTrack.coordinates.x, hoveredTrack.coordinates.y, dimensions.width, dimensions.height).y + 10}px`,
          }}
        >
          <div className="font-semibold">{hoveredTrack.title}</div>
          <div className="text-xs text-gray-300">{hoveredTrack.artist}</div>
          <Badge 
            className={cn(
              "mt-1",
              hoveredTrack.mood === 'chill' && "bg-moods-chill hover:bg-moods-chill/80",
              hoveredTrack.mood === 'energetic' && "bg-moods-energetic hover:bg-moods-energetic/80",
              hoveredTrack.mood === 'happy' && "bg-moods-happy hover:bg-moods-happy/80",
              hoveredTrack.mood === 'melancholy' && "bg-moods-melancholy hover:bg-moods-melancholy/80",
              hoveredTrack.mood === 'focus' && "bg-moods-focus hover:bg-moods-focus/80",
            )}
          >
            {hoveredTrack.mood}
          </Badge>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <div className="text-xs text-white/60 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-md">
          Horizontal axis: Valence (negative to positive emotion)
        </div>
        <div className="text-xs text-white/60 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-md">
          Vertical axis: Energy (calm to energetic)
        </div>
      </div>
    </div>
  );
};

export default MoodMap;
