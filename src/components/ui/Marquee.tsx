interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function Marquee({ items, direction = 'left', speed = 40, className = '' }: MarqueeProps) {
  const text = items.join(' · ') + ' · ';

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        <span className="inline-block">{text}{text}{text}</span>
      </div>
    </div>
  );
}
