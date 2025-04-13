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

  const [scale, setScale] = useState(50); // Pixels per inch

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
    setDimensions((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  // Handle scale change
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
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
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Binary Comparison Swatch Card Design</h1>

      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col">
          <label className="mb-1">Page Width (inches)</label>
          <input
            type="number"
            name="width"
            value={dimensions.width}
            onChange={handleInputChange}
            step="0.5"
            min="5"
            max="20"
            className="mb-2 border p-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Page Height (inches)</label>
          <input
            type="number"
            name="height"
            value={dimensions.height}
            onChange={handleInputChange}
            step="0.5"
            min="5"
            max="30"
            className="mb-2 border p-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Swatch Size (inches)</label>
          <input
            type="number"
            name="swatchSize"
            value={dimensions.swatchSize}
            onChange={handleInputChange}
            step="0.25"
            min="0.5"
            max="2"
            className="mb-2 border p-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Hole Diameter (inches)</label>
          <input
            type="number"
            name="holeDiameter"
            value={dimensions.holeDiameter}
            onChange={handleInputChange}
            step="0.0625"
            min="0.125"
            max="0.5"
            className="mb-2 border p-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Scale (pixels per inch)</label>
          <input
            type="number"
            name="scale"
            value={scale}
            onChange={handleScaleChange}
            step="5"
            min="20"
            max="100"
            className="mb-2 border p-1"
          />
        </div>
      </div>

      <div className="overflow-auto border border-gray-300">
        <canvas ref={canvasRef} className="bg-white" />
      </div>

      <div className="mt-4 max-w-2xl">
        <h2 className="mb-2 text-xl font-bold">About This Design</h2>
        <p className="mb-2">
          This visualization shows a binary comparison swatch card design with diagonal corners. The
          design places swatches around the perimeter of the page with chamfered (mitered) corners.
        </p>
        <p className="mb-2">Key features:</p>
        <ul className="mb-2 list-disc pl-6">
          <li>Swatches are positioned along the perimeter of the page</li>
          <li>Diagonal corner boundaries optimize the layout</li>
          <li>
            Hole positions (red circles) are placed at swatch boundaries, at half the swatch height
            from the edge
          </li>
          <li>All holes remain within reach of a standard hole punch (≤1" from edge)</li>
        </ul>
        <p>
          You can adjust the parameters above to see how different page sizes, swatch sizes, and
          hole diameters affect the layout.
        </p>
      </div>
    </div>
  );
};

export default BinaryComparisonSwatchCard;
