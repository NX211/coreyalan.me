import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

interface AuditLog {
  id: string;
  timestamp: number;
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  details: Record<string, any>;
  status: 'success' | 'failure';
  error?: string;
}

interface UseAuditOptions {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  showToast?: boolean;
}

export function useAudit(options: UseAuditOptions = {}) {
  const { onError, onSuccess, showToast = true } = options;
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const { toast } = useToast();

  const log = useCallback(
    async (
      action: string,
      entity: string,
      entityId: string,
      userId: string,
      details: Record<string, any>,
      fn: () => Promise<any>
    ) => {
      const logEntry: AuditLog = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        action,
        entity,
        entityId,
        userId,
        details,
        status: 'success',
      };

      try {
        const result = await fn();
        setLogs((prev) => [...prev, logEntry]);
        onSuccess?.();
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Operation failed');
        const failedLog = {
          ...logEntry,
          status: 'failure' as const,
          error: err.message,
        };
        setLogs((prev) => [...prev, failedLog]);
        onError?.(err);

        if (showToast) {
          toast({
            variant: 'destructive',
            title: 'Audit Log',
            description: `Failed to ${action} ${entity}: ${err.message}`,
          });
        }

        throw err;
      }
    },
    [onError, onSuccess, showToast, toast]
  );

  const getLogs = useCallback(
    (filters?: {
      action?: string;
      entity?: string;
      entityId?: string;
      userId?: string;
      status?: 'success' | 'failure';
      startTime?: number;
      endTime?: number;
    }) => {
      return logs.filter((log) => {
        if (filters?.action && log.action !== filters.action) return false;
        if (filters?.entity && log.entity !== filters.entity) return false;
        if (filters?.entityId && log.entityId !== filters.entityId) return false;
        if (filters?.userId && log.userId !== filters.userId) return false;
        if (filters?.status && log.status !== filters.status) return false;
        if (filters?.startTime && log.timestamp < filters.startTime) return false;
        if (filters?.endTime && log.timestamp > filters.endTime) return false;
        return true;
      });
    },
    [logs]
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    log,
    getLogs,
    clearLogs,
    logs,
  };
} 