const width = 1074;
const height = 300;
const left = 54;
const right = 4;
const top = 46;
const bottom = 34;

export function LineChart({ values, max, ticks, labels, unit }: { values: number[]; max: number; ticks: number[]; labels: string[]; unit: string }) {
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const x = (index: number) => left + (index / (values.length - 1)) * plotW;
  const y = (value: number) => top + plotH - (value / max) * plotH;
  const points = values.map((value, index) => [x(index), y(value)] as const);
  const line = points.map(([px, py], index) => `${index === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const area = `${line} L${x(values.length - 1)},${top + plotH} L${left},${top + plotH} Z`;
  const peak = values.indexOf(Math.max(...values));
  const [peakX, peakY] = points[peak];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Line chart">
      <defs>
        <linearGradient id="line-chart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4880FF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4880FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} className="stroke-divider" strokeWidth="1" />
          <text x="0" y={y(tick) + 4} className="fill-faint text-xs font-semibold">
            {tick}
          </text>
        </g>
      ))}
      {labels.map((label, index) => (
        <text
          key={label}
          x={left + (index / (labels.length - 1)) * plotW}
          y={height - 6}
          textAnchor={index === 0 ? "start" : index === labels.length - 1 ? "end" : "middle"}
          className="fill-faint text-xs font-semibold"
        >
          {label}
        </text>
      ))}
      <path d={area} fill="url(#line-chart-fill)" />
      <path d={line} fill="none" stroke="#4880FF" strokeWidth="1.5" strokeLinejoin="round" />
      {points.map(([px, py], index) =>
        index % 3 === 0 || index === peak ? <circle key={index} cx={px} cy={py} r="4" fill={index === peak ? "#FFA756" : "#4880FF"} /> : null,
      )}
      <g transform={`translate(${peakX}, ${peakY - 14})`}>
        <rect x="-46" y="-22" width="92" height="22" rx="2" fill="#4880FF" />
        <path d="M-5 0 L5 0 L0 5 Z" fill="#4880FF" />
        <text y="-7" textAnchor="middle" className="fill-white text-xs font-bold">
          {values[peak]} {unit}
        </text>
      </g>
    </svg>
  );
}
