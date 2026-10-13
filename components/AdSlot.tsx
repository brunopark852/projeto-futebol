import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdSlotProps {
  slot: 'header' | 'table' | 'match';
  adSlotId?: string;
  className?: string;
}

export default function AdSlot({ slot, adSlotId, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  const slotStyles = {
    header: 'w-full max-w-screen-xl mx-auto my-3',
    table: 'w-full my-4',
    match: 'w-full md:w-1/3 px-2 my-2',
  };

  const slotHeights = {
    header: 'min-h-[90px]',
    table: 'min-h-[250px]',
    match: 'min-h-[250px]',
  };

  const slotIds: Record<string, string | undefined> = {
    header: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER,
    table: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TABLE,
    match: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MATCH,
  };

  const activeSlotId = adSlotId || slotIds[slot];

  useEffect(() => {
    if (isLoaded.current) return;
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (err) {
      console.error('Erro ao inicializar anúncio AdSense:', err);
    }
  }, []);

  return (
    <div className={`${slotStyles[slot]} ${className}`} role="complementary" aria-label="Publicidade">
      <div className="text-xs text-slate-400 text-center mb-1 font-medium">Publicidade</div>
      <div className={`overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg ${slotHeights[slot]}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '250px', width: '100%', textAlign: 'center' }}
          data-ad-client="ca-pub-6873487845862850"
          {...(activeSlotId ? { 'data-ad-slot': activeSlotId } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
