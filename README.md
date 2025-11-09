# Code Pattern Atelier

Code Pattern Atelier is a web application that curates production-ready code templates across common programming languages. Each template includes context, implementation guidance, complexity notes, and a copy-friendly snippet so you can drop the pattern directly into your project.

The site lives inside [`webapp/`](webapp) and is built with Next.js 16, the App Router, Tailwind CSS v4, and TypeScript. It is ready for one-click deployment to Vercel.

## Features

- Scenario-driven catalogue covering debouncing, memoization, “top K” selection, and HTTP wrappers
- Multi-language support (TypeScript, JavaScript, Python, Go, Java) with automatic fallback per task
- Toggleable inline comments to switch between mentoring mode and production-ready output
- Complexity callouts and implementation checklists for fast comprehension
- Copy-to-clipboard helper for effortless reuse

## Getting Started

```bash
cd webapp
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the templates locally. Run `npm run build` to produce a production build, or `npm run lint` to verify code quality.

## Deployment

The project is optimised for Vercel. After building locally you can deploy with:

```bash
cd webapp
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-6240a0bb
```

Once DNS propagation completes, the site will be accessible at https://agentic-6240a0bb.vercel.app.
