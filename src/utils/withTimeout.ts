export class RequestTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Request timed out after ${timeoutMs}ms`);
    this.name = 'RequestTimeoutError';
  }
}

export async function withTimeout<T>(
  task: (signal: AbortSignal) => Promise<T>,
  signal: AbortSignal,
  timeoutMs: number
): Promise<T> {
  const taskController = new AbortController();
  let timedOut = false;
  const abortFromCaller = () => taskController.abort();

  if (signal.aborted) {
    taskController.abort();
  } else {
    signal.addEventListener('abort', abortFromCaller, { once: true });
  }

  const timeoutId = setTimeout(() => {
    timedOut = true;
    taskController.abort();
  }, timeoutMs);

  try {
    return await task(taskController.signal);
  } catch (error) {
    if (timedOut) throw new RequestTimeoutError(timeoutMs);
    throw error;
  } finally {
    clearTimeout(timeoutId);
    signal.removeEventListener('abort', abortFromCaller);
  }
}
