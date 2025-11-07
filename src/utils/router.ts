// Simple router utilities for navigation
export const router = {
  push: (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  },
};

export const useRouter = () => {
  return {
    push: router.push,
  };
};
