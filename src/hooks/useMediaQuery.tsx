import { useEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
  const [result, setResult] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setResult(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => setResult(event.matches);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, [query]);

  return result;
};

export default useMediaQuery;
