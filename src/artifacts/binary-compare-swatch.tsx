import React, { useRef, useEffect, useState, useMemo } from 'react';

interface Dimensions {
  width: number;
  height: number;
  swatchSize: number;
  holeDiameter: number;
}

interface LayoutData {
  effectiveWidthSide: number;
  effectiveHeightSide: number;
  swatchesPerWidthSide: number;
  swatchesPerHeightSide: number;
  topBottomSwatchWidth: number;
  leftRightSwatchWidth: number;
  regularSwatches: number;
  cornerSwatches: number;
  totalSwatches: number;
  usableWidth: number;
  usablePercentage: number;
}

interface Point {
  x: number;
  y: number;
}

interface CornerPosition {
  x: number;
  y: number;
}

const BinaryComparisonSwatchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 8.5, // Default page width in inches
    height: 11, // Default page height in inches
    swatchSize: 1, // Default swatch size in inches
    holeDiameter: 0.25, // Standard hole punch diameter in inches
  });

  const [scale, setScale] = useState(72); // Default Pixels per inch (common screen resolution)

  // Calculate layout dimensions once to avoid duplicate calculations
  const layoutData = useMemo<LayoutData>(() => {
    const { width: W, height: H, swatchSize: s, holeDiameter: d } = dimensions;

    // Calculate the effective side lengths (without corners)
    const effectiveWidthSide = W - 2 * s;
    const effectiveHeightSide = H - 2 * s;

    // Calculate the number of swatches per side
    const swatchesPerWidthSide = Math.floor(effectiveWidthSide / s);
    const swatchesPerHeightSide = Math.floor(effectiveHeightSide / s);

    // Calculate swatch widths for each side
    const topBottomSwatchWidth = effectiveWidthSide / swatchesPerWidthSide;
    const leftRightSwatchWidth = effectiveHeightSide / swatchesPerHeightSide;

    // Calculate total swatches and binary comparisons
    const regularSwatches = 2 * (swatchesPerWidthSide + swatchesPerHeightSide);
    const cornerSwatches = 4;
    const totalSwatches = regularSwatches + cornerSwatches;

    // Calculate usable area
    const usableWidth = s - d;
    const usablePercentage = (usableWidth / s) * 100;

    return {
      effectiveWidthSide,
      effectiveHeightSide,
      swatchesPerWidthSide,
      swatchesPerHeightSide,
      topBottomSwatchWidth,
      leftRightSwatchWidth,
      regularSwatches,
      cornerSwatches,
      totalSwatches,
      usableWidth,
      usablePercentage,
    };
  }, [dimensions]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Ensure value is non-negative
    const parsedValue = Math.max(0, parseFloat(value));
    if (!isNaN(parsedValue)) {
        setDimensions((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    }
  };

  // Handle scale change
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = Math.max(1, parseFloat(e.target.value)); // Ensure scale is at least 1
    if (!isNaN(parsedValue)) {
        setScale(parsedValue);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, swatchSize, holeDiameter } = dimensions;

    // Set canvas dimensions based on the physical dimensions and scale
    canvas.width = width * scale;
    canvas.height = height * scale;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the swatch layout
    drawSwatchLayout(ctx, width, height, swatchSize, holeDiameter, scale, layoutData);
  }, [dimensions, scale, layoutData]);

  const drawSwatchLayout = (
    ctx: CanvasRenderingContext2D,
    W: number,
    H: number,
    s: number,
    d: number,
    scale: number,
    layoutData: LayoutData
  ) => {
    // Convert dimensions to pixels
    const width = W * scale;
    const height = H * scale;
    const swatchSize = s * scale;
    const holeDiameter = d * scale;
    const holeRadius = holeDiameter / 2;

    // Use the pre-calculated layout data to avoid duplicate calculations
    const {
      swatchesPerWidthSide,
      swatchesPerHeightSide,
      topBottomSwatchWidth,
      leftRightSwatchWidth,
      usablePercentage,
      effectiveWidthSide,
      effectiveHeightSide,
    } = layoutData;

    // Convert to canvas units
    const scaledTopBottomSwatchWidth = topBottomSwatchWidth * scale;
    const scaledLeftRightSwatchWidth = leftRightSwatchWidth * scale;

    // Draw the page outline
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    // Draw the inner perimeter (indicating the inner edge of the swatches)
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(swatchSize, swatchSize, width - 2 * swatchSize, height - 2 * swatchSize);

    // Helper function to draw a trapezoid (for side swatches)
    function drawTrapezoid(points: Point[], color = '#f0f0f0') {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Helper function to draw a hole
    function drawHole(x: number, y: number) {
      ctx.beginPath();
      ctx.arc(x, y, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw corners properly as miter joints, not chamfers
    const drawCorner = (cornerPosition: CornerPosition) => {
      const { x, y } = cornerPosition;

      // Calculate corner coordinates
      const points: Point[] = [];

      // Each corner has a different set of points based on its position
      if (x === 0 && y === 0) {
        // Top-left
        points.push({ x: 0, y: 0 });
        points.push({ x: swatchSize, y: 0 });
        points.push({ x: swatchSize, y: swatchSize });
        points.push({ x: 0, y: swatchSize });

        // Draw the diagonal line for the miter joint
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(swatchSize, swatchSize);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (x === width - swatchSize && y === 0) {
        // Top-right
        points.push({ x: x, y: 0 });
        points.push({ x: width, y: 0 });
        points.push({ x: width, y: swatchSize });
        points.push({ x: x, y: swatchSize });

        // Draw the diagonal line for the miter joint
        ctx.beginPath();
        ctx.moveTo(width, 0);
        ctx.lineTo(x, swatchSize);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (x === 0 && y === height - swatchSize) {
        // Bottom-left
        points.push({ x: 0, y: y });
        points.push({ x: swatchSize, y: y });
        points.push({ x: swatchSize, y: height });
        points.push({ x: 0, y: height });

        // Draw the diagonal line for the miter joint
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(swatchSize, y);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (x === width - swatchSize && y === height - swatchSize) {
        // Bottom-right
        points.push({ x: x, y: y });
        points.push({ x: width, y: y });
        points.push({ x: width, y: height });
        points.push({ x: x, y: height });

        // Draw the diagonal line for the miter joint
        ctx.beginPath();
        ctx.moveTo(width, height);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Fill the corner area (except for the diagonal section)
      ctx.fillStyle = '#d0d0ff';
      ctx.beginPath();
      ctx.rect(x, y, swatchSize, swatchSize);
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    // Draw corner swatches
    drawCorner({ x: 0, y: 0 }); // Top-left
    drawCorner({ x: width - swatchSize, y: 0 }); // Top-right
    drawCorner({ x: 0, y: height - swatchSize }); // Bottom-left
    drawCorner({ x: width - swatchSize, y: height - swatchSize }); // Bottom-right

    // Draw trapezoid swatches along the top edge
    for (let i = 0; i < swatchesPerWidthSide; i++) {
      const x1 = swatchSize + i * scaledTopBottomSwatchWidth;
      const x2 = swatchSize + (i + 1) * scaledTopBottomSwatchWidth;

      // Trapezoid has different widths at top and bottom edges
      drawTrapezoid(
        [
          { x: x1, y: 0 }, // Top-left
          { x: x2, y: 0 }, // Top-right
          { x: x2, y: swatchSize }, // Bottom-right
          { x: x1, y: swatchSize }, // Bottom-left
        ],
        '#d0ffd0'
      );
    }

    // Draw trapezoid swatches along the bottom edge
    for (let i = 0; i < swatchesPerWidthSide; i++) {
      const x1 = swatchSize + i * scaledTopBottomSwatchWidth;
      const x2 = swatchSize + (i + 1) * scaledTopBottomSwatchWidth;

      drawTrapezoid(
        [
          { x: x1, y: height - swatchSize }, // Top-left
          { x: x2, y: height - swatchSize }, // Top-right
          { x: x2, y: height }, // Bottom-right
          { x: x1, y: height }, // Bottom-left
        ],
        '#d0ffd0'
      );
    }

    // Draw trapezoid swatches along the left edge
    for (let i = 0; i < swatchesPerHeightSide; i++) {
      const y1 = swatchSize + i * scaledLeftRightSwatchWidth;
      const y2 = swatchSize + (i + 1) * scaledLeftRightSwatchWidth;

      drawTrapezoid(
        [
          { x: 0, y: y1 }, // Top-left
          { x: swatchSize, y: y1 }, // Top-right
          { x: swatchSize, y: y2 }, // Bottom-right
          { x: 0, y: y2 }, // Bottom-left
        ],
        '#ffd0d0'
      );
    }

    // Draw trapezoid swatches along the right edge
    for (let i = 0; i < swatchesPerHeightSide; i++) {
      const y1 = swatchSize + i * scaledLeftRightSwatchWidth;
      const y2 = swatchSize + (i + 1) * scaledLeftRightSwatchWidth;

      drawTrapezoid(
        [
          { x: width - swatchSize, y: y1 }, // Top-left
          { x: width, y: y1 }, // Top-right
          { x: width, y: y2 }, // Bottom-right
          { x: width - swatchSize, y: y2 }, // Bottom-left
        ],
        '#ffd0d0'
      );
    }

    // Draw hole positions
    // Corner holes - at a distance of s/2 from both edges
    drawHole(swatchSize / 2, swatchSize / 2); // Top-left
    drawHole(width - swatchSize / 2, swatchSize / 2); // Top-right
    drawHole(swatchSize / 2, height - swatchSize / 2); // Bottom-left
    drawHole(width - swatchSize / 2, height - swatchSize / 2); // Bottom-right

    // Top edge holes (at the boundaries between swatches)
    for (let i = 1; i < swatchesPerWidthSide; i++) {
      const x = swatchSize + i * scaledTopBottomSwatchWidth;
      drawHole(x, swatchSize / 2);
    }

    // Bottom edge holes
    for (let i = 1; i < swatchesPerWidthSide; i++) {
      const x = swatchSize + i * scaledTopBottomSwatchWidth;
      drawHole(x, height - swatchSize / 2);
    }

    // Left edge holes
    for (let i = 1; i < swatchesPerHeightSide; i++) {
      const y = swatchSize + i * scaledLeftRightSwatchWidth;
      drawHole(swatchSize / 2, y);
    }

    // Right edge holes
    for (let i = 1; i < swatchesPerHeightSide; i++) {
      const y = swatchSize + i * scaledLeftRightSwatchWidth;
      drawHole(width - swatchSize / 2, y);
    }

    // Add text labels and dimensions
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';

    // Page dimensions
    ctx.fillText(`Page: ${W}" × ${H}"`, 10, height - 10);

    // Number of swatches and comparisons
    ctx.fillText(
      `Total swatches/comparisons: ${layoutData.totalSwatches}`,
      width - 200,
      height - 10
    );

    // Swatch size
    ctx.fillText(`Swatch size: ${s}"`, 10, height - 25);

    // Hole diameter
    ctx.fillText(`Hole diameter: ${d}"`, 10, height - 40);

    // Swatch widths
    ctx.fillText(
      `Top/Bottom width: ${(effectiveWidthSide / swatchesPerWidthSide).toFixed(3)}"`,
      width - 200,
      height - 25
    );
    ctx.fillText(
      `Left/Right width: ${(effectiveHeightSide / swatchesPerHeightSide).toFixed(3)}"`,
      width - 200,
      height - 40
    );

    // Usable area
    ctx.fillText(`Usable area: ${usablePercentage.toFixed(1)}%`, width - 200, height - 55);
  };

  return (
    // Apply Anthropic background, font, and padding
    <div className="min-h-[calc(100vh-4rem)] bg-background p-6 font-primary text-foreground">
      <h1 className="text-2xl font-semibold mb-6">Binary Comparison Swatch Generator</h1>

      {/* Controls Card */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dimension Inputs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-foreground mb-1">Page Width (in)</label>
              <input
                type="number"
                id="width"
                name="width"
                value={dimensions.width}
                onChange={handleInputChange}
                min="0" step="0.1"
                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary font-primary text-foreground bg-background"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-foreground mb-1">Page Height (in)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={dimensions.height}
                onChange={handleInputChange}
                min="0" step="0.1"
                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary font-primary text-foreground bg-background"
              />
            </div>
          </div>

          {/* Swatch/Hole Inputs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="swatchSize" className="block text-sm font-medium text-foreground mb-1">Swatch Size (in)</label>
              <input
                type="number"
                id="swatchSize"
                name="swatchSize"
                value={dimensions.swatchSize}
                onChange={handleInputChange}
                min="0.1" step="0.1"
                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary font-primary text-foreground bg-background"
              />
            </div>
            <div>
              <label htmlFor="holeDiameter" className="block text-sm font-medium text-foreground mb-1">Hole Diameter (in)</label>
              <input
                type="number"
                id="holeDiameter"
                name="holeDiameter"
                value={dimensions.holeDiameter}
                onChange={handleInputChange}
                min="0" step="0.01"
                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary font-primary text-foreground bg-background"
              />
            </div>
          </div>

          {/* Scale Input */}
          <div className="space-y-4">
             <div>
              <label htmlFor="scale" className="block text-sm font-medium text-foreground mb-1">Scale (pixels/inch)</label>
              <input
                type="number"
                id="scale"
                name="scale"
                value={scale}
                onChange={handleScaleChange}
                min="1" step="1"
                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary font-primary text-foreground bg-background"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Canvas and Layout Data Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Canvas Display */}
        <div className="md:col-span-2 border border-border rounded-lg overflow-hidden bg-white shadow-sm">
          <canvas ref={canvasRef} />
        </div>

        {/* Layout Data Display Card */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-4 md:col-span-1">
          <h3 className="text-md font-medium mb-3">Layout Details</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Total Swatches: <span className="font-medium text-foreground">{layoutData.totalSwatches}</span></li>
            <li>Corner Swatches: <span className="font-medium text-foreground">{layoutData.cornerSwatches}</span></li>
            <li>Regular Swatches: <span className="font-medium text-foreground">{layoutData.regularSwatches}</span></li>
            <li className="pt-2">Swatches (Top/Bottom): <span className="font-medium text-foreground">{layoutData.swatchesPerWidthSide}</span></li>
            <li>Swatch Width (T/B): <span className="font-medium text-foreground">{layoutData.topBottomSwatchWidth.toFixed(3)} in</span></li>
            <li className="pt-2">Swatches (Left/Right): <span className="font-medium text-foreground">{layoutData.swatchesPerHeightSide}</span></li>
            <li>Swatch Height (L/R): <span className="font-medium text-foreground">{layoutData.leftRightSwatchWidth.toFixed(3)} in</span></li>
            <li className="pt-2">Usable Swatch Width: <span className="font-medium text-foreground">{layoutData.usableWidth.toFixed(3)} in ({layoutData.usablePercentage.toFixed(1)}%)</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BinaryComparisonSwatchCard;
