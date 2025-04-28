import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

interface IPWhitelistOptions {
  whitelist: string[];
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  showToast?: boolean;
}

export function useIPWhitelist(options: IPWhitelistOptions) {
  const { whitelist, onError, onSuccess, showToast = true } = options;
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const { toast } = useToast();

  const checkIP = useCallback(
    async (ip: string) => {
      try {
        // Check if IP is in whitelist
        const allowed = whitelist.includes(ip);
        setIsAllowed(allowed);

        if (!allowed) {
          const error = new Error('IP address not allowed');
          onError?.(error);
          if (showToast) {
            toast({
              variant: 'destructive',
              title: 'Access Denied',
              description: 'Your IP address is not allowed to access this resource.',
            });
          }
          return false;
        }

        onSuccess?.();
        return true;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('IP check failed');
        onError?.(err);
        if (showToast) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: err.message,
          });
        }
        return false;
      }
    },
    [whitelist, onError, onSuccess, showToast, toast]
  );

  const addIP = useCallback(
    (ip: string) => {
      if (!whitelist.includes(ip)) {
        whitelist.push(ip);
        if (showToast) {
          toast({
            variant: 'success',
            title: 'IP Added',
            description: `IP address ${ip} has been added to the whitelist.`,
          });
        }
      }
    },
    [whitelist, showToast, toast]
  );

  const removeIP = useCallback(
    (ip: string) => {
      const index = whitelist.indexOf(ip);
      if (index > -1) {
        whitelist.splice(index, 1);
        if (showToast) {
          toast({
            variant: 'success',
            title: 'IP Removed',
            description: `IP address ${ip} has been removed from the whitelist.`,
          });
        }
      }
    },
    [whitelist, showToast, toast]
  );

  const clearWhitelist = useCallback(() => {
    whitelist.length = 0;
    if (showToast) {
      toast({
        variant: 'success',
        title: 'Whitelist Cleared',
        description: 'All IP addresses have been removed from the whitelist.',
      });
    }
  }, [whitelist, showToast, toast]);

  return {
    checkIP,
    addIP,
    removeIP,
    clearWhitelist,
    isAllowed,
    whitelist,
  };
} 