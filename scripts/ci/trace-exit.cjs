const { createHook } = require('node:async_hooks');
const { isMainThread } = require('node:worker_threads');

if (isMainThread) {
  const active = new Map();
  const types = new Set(['TCPWRAP', 'TLSWRAP', 'GETADDRINFOREQWRAP', 'WORKER', 'Timeout']);
  createHook({
    init(id, type, triggerId, resource) {
      if (!types.has(type)) return;
      if (type === 'Timeout' && resource._idleTimeout < 1000) return;
      active.set(id, { type, resource: new WeakRef(resource), stack: new Error().stack });
    },
    destroy(id) {
      active.delete(id);
    },
  }).enable();
  const write = process.stdout.write.bind(process.stdout);
  let reported = false;
  function report() {
    const resources = [...active.values()]
      .filter(({ resource }) => {
        const value = resource.deref();
        return value && (!value.hasRef || value.hasRef());
      })
      .map(({ type, resource, stack }) => ({
        type,
        timeout: resource.deref()?._idleTimeout,
        stack,
      }));
    write(
      `\n[BENCH-EXIT-20260918] ${JSON.stringify({ pid: process.pid, resources: process.getActiveResourcesInfo(), active: resources })}\n`
    );
  }
  process.stdout.write = function (chunk, ...args) {
    const result = write(chunk, ...args);
    if (!reported && String(chunk).includes('test your build locally')) {
      reported = true;
      report();
      setTimeout(report, 5000).unref();
      setTimeout(report, 15000).unref();
      setTimeout(report, 60000).unref();
    }
    return result;
  };
}
