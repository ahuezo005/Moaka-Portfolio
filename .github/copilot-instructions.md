# Copilot Instructions for art-portfolio

This project is a [Next.js](https://nextjs.org/) app (bootstrapped with `create-next-app`) using TypeScript, Tailwind CSS, and custom React components. Follow these guidelines to maximize productivity and maintain consistency:

## Project Structure & Key Files
- **`app/`**: Uses the Next.js App Router. Entry points: `layout.tsx` (global layout, imports `globals.css`), `page.tsx` (main page).
- **`components/`**: Shared React components (e.g., `FadeIn.tsx`).
- **`public/`**: Static assets (images, etc.).
- **`globals.css`**: Global styles, includes Tailwind layers and custom CSS variables.
- **`tailwind.config.js`**: Custom color palette (see `neon` and `dark` color groups). Tailwind scans `app/`, `components/`, and `pages/` for class usage.
- **`tsconfig.json`**: Uses `@/*` path alias for root imports.

## Developer Workflows
- **Development**: `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`).
- **Build**: `npm run build`
- **Start (production)**: `npm run start`
- **Lint**: `npm run lint` (uses `next/core-web-vitals` ESLint config)

## Patterns & Conventions
- **Component Style**: Prefer functional React components. Use TypeScript types/props for all components.
- **Styling**: Use Tailwind CSS utility classes. For custom colors, use `neon` and `dark` from `tailwind.config.js` (e.g., `bg-neon-pink`).
- **Animation**: Use `framer-motion` for animation (see `FadeIn.tsx` for example usage).
- **Imports**: Use `@/` alias for root-relative imports (configured in `tsconfig.json`).
- **Font Optimization**: Use `next/font` for Google Fonts (see README for details).

## Integration & Dependencies
- **Next.js**: Version 14.x, App Router structure.
- **Tailwind CSS**: Configured via `postcss.config.js` and `tailwind.config.js`.
- **framer-motion**: For animation.
- **clsx** and **tailwind-merge**: For conditional and merged class names.

## Additional Notes
- **No custom API routes or backend logic** are present by default.
- **Deployment**: Recommended via Vercel (see README).
- **Testing**: No test setup is present by default.

## Examples
- To add a new page, create a file in `app/` (e.g., `app/about/page.tsx`).
- To use a custom color: `<div className="bg-neon-pink text-dark-900">`.
- To animate a component: see `components/FadeIn.tsx` for `framer-motion` usage.

---
For more, see `README.md` and referenced config files. When in doubt, follow Next.js and Tailwind CSS best practices as reflected in this codebase.
