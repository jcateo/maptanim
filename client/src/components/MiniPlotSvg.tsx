import React from 'react';
import { cn } from '../lib/utils';

export interface GridCell {
  x: number;
  y: number;
  cropId?: number;
  cropName?: string;
  color?: string;
}

interface MiniPlotSvgProps {
  width?: number;
  height?: number;
  cols?: number;
  rows?: number;
  cells: GridCell[];
  className?: string;
}

export default function MiniPlotSvg({
  width = 300,
  height = 300,
  cols = 5,
  rows = 5,
  cells,
  className
}: MiniPlotSvgProps) {
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-neutral-200 shadow-sm bg-earth-50", className)}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Draw grid background */}
        <rect width={width} height={height} fill="#fdf8f0" />

        {/* Draw grid lines */}
        {Array.from({ length: cols + 1 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * cellWidth}
            y1={0}
            x2={i * cellWidth}
            y2={height}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: rows + 1 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * cellHeight}
            x2={width}
            y2={i * cellHeight}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        {/* Draw cells */}
        {cells.map((cell, i) => {
          if (!cell.color) return null;

          return (
            <g key={`cell-${i}`}>
              <rect
                x={cell.x * cellWidth}
                y={cell.y * cellHeight}
                width={cellWidth}
                height={cellHeight}
                fill={cell.color}
                opacity={0.8}
                className="transition-all duration-300 hover:opacity-100"
              />
              {/* Optional: Add a subtle pattern overlay for the planted cells */}
              <circle
                cx={(cell.x * cellWidth) + (cellWidth / 2)}
                cy={(cell.y * cellHeight) + (cellHeight / 2)}
                r={Math.min(cellWidth, cellHeight) * 0.25}
                fill="rgba(0,0,0,0.1)"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
