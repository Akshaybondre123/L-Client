import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function App() {
  return <CaseStatus />;
}

export function CaseStatus() {
  // Adjusted slices with correct color and placement
  const slices = [
    { label: "Active", percentage: 45, color: "#775DA6" },   // Left side
    { label: "Pending", percentage: 45, color: "#FFB1B7" },  // Right side
    { label: "Closed", percentage: 10, color: "#70B6C1" },
  ];

  const cx = 50;
  const cy = 50;
  const radius = 50;

  const degToRad = (deg: number) => (deg * Math.PI) / 180;

  const describeArc = (startAngle: number, endAngle: number) => {
    const start = degToRad(startAngle - 90);
    const end = degToRad(endAngle - 90);

    const xStart = cx + radius * Math.cos(start);
    const yStart = cy + radius * Math.sin(start);

    const xEnd = cx + radius * Math.cos(end);
    const yEnd = cy + radius * Math.sin(end);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `
      M ${cx} ${cy}
      L ${xStart} ${yStart}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${xEnd} ${yEnd}
      Z
    `;
  };

  const labelPosition = (startAngle: number, endAngle: number) => {
    const midAngle = (startAngle + endAngle) / 2;
    const rad = degToRad(midAngle - 90);
    const labelRadius = radius * 0.65;
    return {
      x: cx + labelRadius * Math.cos(rad),
      y: cy + labelRadius * Math.sin(rad),
    };
  };

  let cumulativeAngle = 0;

  return (
    <div
      className="rounded-lg shadow-sm border p-6 font-sans max-w-sm mx-auto"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-800">Case Status</h2>
          <p className="text-sm text-gray-500">March 2020</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Pie Chart */}
      <div className="aspect-square max-w-[211px] mx-auto my-6">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {slices.map(({ percentage, color }, i) => {
            const startAngle = cumulativeAngle;
            const endAngle = cumulativeAngle + percentage * 3.6;
            const path = describeArc(startAngle, endAngle);
            cumulativeAngle = endAngle;

            return (
              <path
                key={i}
                d={path}
                fill={color}
                stroke="white"
                strokeWidth={1}
              />
            );
          })}

          {/* Labels */}
          {(() => {
            let labelAngle = 0;
            return slices.map(({ percentage }, i) => {
              const startAngle = labelAngle;
              const endAngle = labelAngle + percentage * 3.6;
              const { x, y } = labelPosition(startAngle, endAngle);
              labelAngle = endAngle;

              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  fontSize="8"
                  fill="white"
                  fontWeight="600"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {percentage}%
                </text>
              );
            });
          })()}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4">
        {slices.map(({ color, label }, i) => (
          <StatusLegend key={i} color={color} label={label} />
        ))}
      </div>
    </div>
  );
}

function StatusLegend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}
