// src/hooks/useOverlay.ts
import { useContext } from 'react';
import { OverlayContext } from './OverlayContext';

// Hook pour utiliser le contexte
export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay doit être utilisé dans un OverlayProvider');
  }
  return context;
};