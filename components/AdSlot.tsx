interface AdSlotProps {
  slot: 'header' | 'table' | 'match';
  className?: string;
}

export default function AdSlot({ slot, className = '' }: AdSlotProps) {
  const slotStyles = {
    header: 'w-full max-w-screen-xl mx-auto',
    table: 'w-full',
    match: 'w-full md:w-1/3 px-2',
  };

  const labelStyles = 'text-xs text-slate-400 text-center mb-1 font-medium';

  if (process.env.NODE_ENV === 'development') {
    const slotHeights = {
      header: 'min-h-[90px]',    // 728x90 Leaderboard
      table: 'min-h-[250px]',    // In-Feed Native
      match: 'min-h-[250px]',    // 300x250 Medium Rectangle
    };
    return (
      <div className={`${slotStyles[slot]} ${className}`} role="complementary" aria-label="Publicidade">
        <div className={labelStyles}></div>
        <div className={`bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-slate-400 text-sm font-mono ${slotHeights[slot]}`}>
          
        </div>
      </div>
    );
  }

  // Produção: insira o código real do AdSense aqui
  // Exemplo para header:
  // <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
  // (window.adsbygoogle = window.adsbygoogle || []).push({});

  return (
    <div className={`${slotStyles[slot]} ${className}`} role="complementary" aria-label="Publicidade">
      <div className={labelStyles}>Publicidade</div>
      <div className="aspect-video bg-gray-50 border border-gray-200 rounded-lg" />
    </div>
  );
}