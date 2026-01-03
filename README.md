# The Jet Lag Chronicles - Frontend

A Next.js 15 travel blog application featuring country-specific landing pages, blog posts, and a sophisticated SEO schema system.

## 🚀 Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **React:** 19.0.0
- **TypeScript:** 5.x
- **Styling:** SCSS Modules
- **CMS:** Strapi Backend Integration
- **Package Manager:** pnpm
- **Deployment:** Vercel

## 📊 Rendering Strategy Auditor

This project includes a comprehensive system for analyzing and optimizing Next.js rendering strategies:

```bash
# Audit all pages for rendering strategy
pnpm audit:rendering

# Detailed analysis
pnpm audit:rendering:verbose

# Audit specific page
pnpm audit:rendering src/app/page.tsx
```

The auditor automatically:

- ✅ Detects current rendering mode (SSG, SSR, ISR, CSR, Hybrid)
- ✅ Provides optimization recommendations
- ✅ Calculates SEO and performance scores
- ✅ Identifies anti-patterns and warnings
- ✅ Suggests specific code changes

**Learn more:**

- [Full Documentation](docs/RENDERING_STRATEGY_AUDITOR.md)
- [Quick Reference](docs/RENDERING_CHEAT_SHEET.md)
- [Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md)

## 🛠️ Available Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm audit:rendering  # Audit rendering strategies
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── [categorySlug]/          # Dynamic country pages
│   ├── [categorySlug]/[blogSlug]/ # Blog post pages
│   ├── components/              # Page-specific components
│   └── utils/                   # Utility functions
├── api/                         # API client and types
├── components/                  # Reusable UI components
└── lib/                         # Shared libraries

.github/
├── instructions/                # Copilot instruction files
└── agents/                      # Copilot agent definitions

docs/                            # Project documentation
scripts/                         # Build and utility scripts
```

## 🎨 Rendering Strategies

This project uses optimized rendering strategies:

- **Homepage:** ISR with 1-hour revalidation (recommended)
- **Country Pages:** Static (SSG) for performance
- **Blog Posts:** ISR with 6-hour revalidation (recommended)
- **Blog Listing:** ISR with 30-minute revalidation (recommended)

See [Rendering Strategy Documentation](docs/RENDERING_STRATEGY_AUDITOR.md) for details.

## 🔍 SEO

The project includes a sophisticated SEO schema system with:

- Automatic site-wide schemas (Organization, WebSite)
- Page-specific schemas (WebPage, BlogPosting)
- Breadcrumb navigation
- Article metadata
- Development debug tools

See `.github/instructions/seo-schema-prompt.instructions.md` for implementation details.

## 📚 Development Guidelines

This project follows strict patterns and architectural decisions:

- ✅ Component structure patterns
- ✅ TypeScript type definitions
- ✅ SCSS module conventions
- ✅ SEO best practices
- ✅ Performance optimization

All guidelines are documented in `.github/instructions/` and enforced through Copilot instructions.

## 🤖 GitHub Copilot Integration

The project is optimized for GitHub Copilot with:

- Comprehensive instruction files
- Specialized agents (Design System, Rendering Strategy)
- Code generation templates
- Best practice enforcement

Use Copilot prompts from `.github/agents/` for guided development.

## 🧪 Testing

```bash
# Type checking
pnpm type-check

# Build verification
pnpm build

# Rendering strategy audit
pnpm audit:rendering
```

## 🚢 Deployment

Deployed on Vercel with automatic builds from the main branch.

**Environment Variables:**

- `NEXT_PUBLIC_STRAPI_URL` - Strapi CMS URL
- `NEXT_PUBLIC_STRAPI_API_TOKEN` - Strapi API token
- `NEXT_PUBLIC_SITE_URL` - Production site URL
- See `.github/instructions/environment.instructions.md` for complete list

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
