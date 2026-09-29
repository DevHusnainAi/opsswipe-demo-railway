# OpsSwipe demo on Railway

A tiny Node web app that [OpsSwipe](https://github.com/DevHusnainAi/opsswipe) watches on Railway. `/api/price`
breaks when `RELEASE_OK` is `false` (a path the tests don't cover, like a real regression): OpsSwipe reports the
500s, suggests a rollback or a revert PR, proves the fix in CI by replaying the failing requests, and merges it.

Railway deploys every push to `main`. Env vars: `OPSSWIPE_REPORT_URL` and `REPORT_SECRET` (from the app),
`CHAOS_KEY` (any random string).

Break it: `DEMO_REPO=../opsswipe-demo-railway DEMO_URL=https://<your-app-url> ../opsswipe/infra/chaos.sh release`
