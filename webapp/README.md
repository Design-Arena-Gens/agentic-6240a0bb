## Code Pattern Atelier

Code Pattern Atelier is a curated catalogue of ready-to-ship engineering snippets. Choose a recurring task, flip between language implementations, and copy the snippet that fits your stack. Every entry includes inline guidance, algorithmic complexity, and deployment tips.

### Tech Stack

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS v4 for styling
- React server components with interactive client islands
- Geist font pairings for professional typography

### Local Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to browse the catalogue. The UI updates instantly thanks to hot module reloading.

Additional scripts:

- `npm run lint` — run ESLint with Next.js rules
- `npm run build` — create an optimized production build
- `npm run start` — serve the production build locally

### Deployment

The project is optimised for Vercel. After running `npm run build`, deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-6240a0bb
```

Once the command succeeds, confirm the live site at https://agentic-6240a0bb.vercel.app.
