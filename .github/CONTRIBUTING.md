# Contributing

This repository contains [lailai's personal website](https://lailai.one), built with Docusaurus.
Use Node.js 24 to match CI, install dependencies with `npm ci`, and run `npm start` for a local
preview (`npm run start:zh-Hans` for Simplified Chinese).

Keep changes focused and follow [AGENTS.md](../AGENTS.md) and its linked rules for architecture,
writing, localization, and components. Shared UI implementation belongs in
[ui](https://github.com/lailai0916/ui), published as `@lailai0916/ui`.

Run `npm run check` before committing. For UI changes, also verify the local preview; for build
or routing changes, run `npm run build`. Include the purpose of the change and relevant
verification results in a pull request.
