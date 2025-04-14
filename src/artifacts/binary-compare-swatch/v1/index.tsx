import { useState, useEffect, useRef } from 'react';

interface SwatchProps {
  width?: number;
  height?: number;
}

export default function BinaryCompareSwatch({ width = 600, height = 400 }: SwatchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw a split color display
    ctx.fillStyle = '#1E40AF'; // Left side - blue
    ctx.fillRect(0, 0, width / 2, height);

    ctx.fillStyle = '#9F1239'; // Right side - red
    ctx.fillRect(width / 2, 0, width / 2, height);

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Binary Compare Swatch', width / 2, height / 2);
    ctx.fillText('(Simple Placeholder)', width / 2, height / 2 + 24);
  }, [width, height]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Binary Compare Swatch</h1>
      <p className="text-muted-foreground mb-4">
        A simple visualization tool for comparing binary data visually.
      </p>

      <div className="overflow-hidden rounded-lg border">
        <canvas ref={canvasRef} width={width} height={height} className="bg-black" />
      </div>

      <button
        onClick={toggleAnimation}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
      >
        {isAnimating ? 'Pause' : 'Animate'} (Not Implemented)
      </button>
    </div>
  );
}
