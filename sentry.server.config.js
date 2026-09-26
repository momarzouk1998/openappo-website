import * as Sentry from "@sentry/nextjs";

// Inert until SENTRY_DSN is set — no events are ever sent without it.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: Boolean(process.env.SENTRY_DSN),
  tracesSampleRate: 0.1,
});
