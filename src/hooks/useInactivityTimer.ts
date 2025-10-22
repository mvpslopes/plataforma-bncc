import { useEffect, useRef, useCallback } from 'react';

interface UseInactivityTimerProps {
  timeout: number; // em milissegundos
  onTimeout: () => void;
  events?: string[];
}

export const useInactivityTimer = ({ 
  timeout, 
  onTimeout, 
  events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'] 
}: UseInactivityTimerProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      
      // Só faz logout se realmente passou o tempo de inatividade
      if (timeSinceLastActivity >= timeout) {
        onTimeout();
      }
    }, timeout);
  }, [timeout, onTimeout]);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const getTimeRemaining = useCallback(() => {
    const timeSinceLastActivity = Date.now() - lastActivityRef.current;
    return Math.max(0, timeout - timeSinceLastActivity);
  }, [timeout]);

  useEffect(() => {
    // Adicionar listeners para os eventos
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Iniciar o timer
    resetTimer();

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearTimer();
    };
  }, [events, resetTimer, clearTimer]);

  return {
    resetTimer,
    clearTimer,
    getTimeRemaining
  };
};
