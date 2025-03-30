'use client';

import { useEffect } from 'react';

export type ElevenLabsAudioProps = {
  audioUrl: string;
  textColorRgba?: string;
  backgroundColorRgba?: string;
  size?: 'small' | 'large';
  children?: React.ReactNode;
};

export const ElevenLabsAudioPlayer = ({
  audioUrl,
  size = 'small',
  textColorRgba = 'rgba(255, 255, 255, 1.0)',
  backgroundColorRgba = 'rgba(0, 0, 0, 0.5)',
  children,
}: ElevenLabsAudioProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/player/audioNativeHelper.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="elevenlabs-audionative-widget"
      data-height={size === 'small' ? '90' : '120'}
      data-width="100%"
      data-frameborder="no"
      data-scrolling="no"
      data-playerurl={audioUrl}
      data-small={size === 'small' ? 'True' : 'False'}
      data-textcolor={textColorRgba}
      data-backgroundcolor={backgroundColorRgba}
      className="rounded-lg overflow-hidden"
    >
      {children || 'Audio Player'}
    </div>
  );
};
