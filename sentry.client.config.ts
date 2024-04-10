import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://867608a9d67d45f981364e81ee66aed8@glitchtip.prolab.sh/1",
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
