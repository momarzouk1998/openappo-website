export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config.js");
  }
}

export async function onRequestError(...args) {
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(...args);
}
