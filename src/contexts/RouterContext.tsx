import { createContext, useContext, useState, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  push: (path: string) => void;
  back: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentPath, setCurrentPath] = useState('/');
  const [history, setHistory] = useState<string[]>(['/']);

  const push = (path: string) => {
    setCurrentPath(path);
    setHistory(prev => [...prev, path]);
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousPath = newHistory[newHistory.length - 1];
      setCurrentPath(previousPath);
      setHistory(newHistory);
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, push, back }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
