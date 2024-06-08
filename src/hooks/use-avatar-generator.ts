import { useState, useRef, useEffect, useCallback } from 'react';
import { IconUtils } from '../utils/icon-utils';
import { IconOptions, CanvasOptions } from '../utils/@types/icon-utils.requirements';
import { 
  AVATAR_GENERATION_INTERVAL,
  AVATAR_GENERATION_TIMEOUT,
  CANVAS_SIZE,
  SEED_MULTIPLIER 
} from '../utils/@types/constants';

export const useAvatarGenerator = (setImageMetadata: (imageMetadata: string) => void) => {
  const [canvasUrl, setCanvasUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAvatar = useCallback(() => {
    const canvas = canvasRef.current;
  
    if (!canvas) return;
  
    const iconOptions: IconOptions = {
      size: CANVAS_SIZE,
      seed: Math.floor(Math.random() * SEED_MULTIPLIER).toString(16),
    };
    const builtOptions: CanvasOptions = IconUtils.buildOptions(iconOptions);
    
    IconUtils.renderIcon(builtOptions, canvas);
    setCanvasUrl(canvas.toDataURL());
  
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;
  
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    if (!imageData) return;
  
    const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <img src="${canvas.toDataURL()}" alt="Identity Icon" />
          </div>
        </foreignObject>
      </svg>
    `;
    setImageMetadata(svgCode.trim());
  }, [setImageMetadata]);

  const startMultipleAvatarGeneration = useCallback(() => {
    const intervalId = setInterval(generateAvatar, AVATAR_GENERATION_INTERVAL);
    setTimeout(() => clearInterval(intervalId), AVATAR_GENERATION_TIMEOUT);
  }, [generateAvatar]);

  useEffect(() => {
    generateAvatar();
  }, [generateAvatar]);

  return {
    canvasUrl,
    canvasRef,
    generateAvatar,
    startMultipleAvatarGeneration,
  };
};
