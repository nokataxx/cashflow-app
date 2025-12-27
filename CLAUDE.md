# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cashflow App** - A React + TypeScript + Vite application with Tailwind CSS and Supabase integration.

**Tech Stack:**
- React 19.2.0 with TypeScript
- Vite 7.2.4 (build tool with HMR)
- Tailwind CSS 4.1.18 (utility-first styling)
- Supabase (backend/database)
- Radix UI (accessible UI components)
- Lucide React (icon system)

## Development Commands

**Start development server:**
```bash
npm run dev
```
Runs Vite dev server with Hot Module Replacement at http://localhost:5173

**Type checking:**
```bash
tsc -b
```
Runs TypeScript compiler in build mode to check types across the project

**Linting:**
```bash
npm run lint
```
Runs ESLint with TypeScript, React Hooks, and React Refresh rules

**Production build:**
```bash
npm run build
```
Runs type checking (tsc -b) then builds optimized production bundle to `dist/`

**Preview production build:**
```bash
npm run preview
```
Serves the production build locally for testing

## Project Architecture

### TypeScript Configuration

The project uses a composite TypeScript setup with three config files:
- `tsconfig.json` - Root config with project references
- `tsconfig.app.json` - Application code config (src/)
- `tsconfig.node.json` - Node/build tool config (vite.config.ts, etc.)

Strict mode is enabled with additional checks:
- `noUnusedLocals`, `noUnusedParameters`
- `noFallthroughCasesInSwitch`
- `noUncheckedSideEffectImports`

### Build System

**Vite** is used for development and production builds:
- Uses @vitejs/plugin-react with Babel for Fast Refresh
- Standard configuration without custom optimizations
- Development server provides HMR for instant feedback

### Styling System

**Tailwind CSS v4** is configured for utility-first styling:
- Dependencies: `tailwindcss`, `autoprefixer`, `postcss`
- Utilities: `tailwind-merge` (merge classes), `clsx` (conditional classes)
- Component variants: `class-variance-authority` for type-safe variant APIs

No Tailwind config file is present (using defaults or @config directives in CSS).

### UI Component Architecture

**Component Libraries:**
- **Radix UI**: Headless accessible components (Dialog, Label)
  - Provides accessibility and behavior without styling
  - Used as foundation for custom components
- **Lucide React**: Icon system
- **react-number-format**: Number/currency input formatting

Pattern: Build custom styled components using Radix primitives + Tailwind CSS.

### Backend Integration

**Supabase** (@supabase/supabase-js v2.89.0):
- Provides backend-as-a-service (database, auth, storage, realtime)
- Client initialization typically in separate config/service file
- Environment variables needed for Supabase URL and anon key

## Code Style

### ESLint Configuration

Flat config format with:
- TypeScript ESLint recommended rules
- React Hooks rules (enforces hooks best practices)
- React Refresh rules (for Vite HMR compatibility)
- Ignores `dist/` directory

### Import Conventions

React 19+ uses automatic JSX runtime:
- No need to import React for JSX
- Import only needed hooks/utilities: `import { useState } from 'react'`

### File Organization

```
src/
  main.tsx                          - React app entry point
  App.tsx                           - Main app component
  components/
    ui/                             - Reusable UI components (button, card, label, numeric-input)
    cashflow/                       - Feature-specific components (CashFlow)
  hooks/
    useAuth.ts                      - Authentication state management
    useCashFlow.ts                  - Financial data state and persistence
  lib/
    supabase.ts                     - Supabase client configuration
    utils.ts                        - Utility functions (cn for class merging)
  types/
    cashflow.ts                     - FinancialData type definitions
  utils/
    formatters.ts                   - Number/currency formatting utilities
  index.css                         - Global styles
  App.css                           - App-specific styles
  assets/                           - Static assets
```

**Path alias**: `@/` maps to `src/` directory (configured in vite.config.ts and tsconfig.app.json)

## Environment Setup

**Required environment variables** (create `.env.local`):
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Vite exposes env vars prefixed with `VITE_` to client code via `import.meta.env`.

## Development Workflow

1. **Feature development:**
   - Run `npm run dev` for live development
   - Use TypeScript strictly (no `any` types)
   - Follow React Hooks rules (enforced by ESLint)

2. **Before committing:**
   - Run `npm run lint` to catch linting issues
   - Run `tsc -b` to verify type correctness
   - Test build with `npm run build`

3. **Component development:**
   - Use Radix UI primitives for accessible interactive components
   - Style with Tailwind utilities
   - Use `class-variance-authority` for variant patterns
   - Use `tailwind-merge` to safely merge Tailwind classes

## Data Architecture

### Financial Data Model

The app uses a complex nested `FinancialData` interface defined in [types/cashflow.ts](src/types/cashflow.ts) that represents a complete cash flow statement with:

- **Balance Sheet Sections** (each with `prev` and `current` periods):
  - `currentAssets`: Cash, receivables, inventory, securities, short-term loans, deferred tax assets, other current assets
  - `fixedAssets`: Tangible/intangible assets, investment securities, long-term loans, deferred tax assets, other fixed assets
  - `deferredAssets`: Deferred assets
  - `currentLiabilities`: Accounts payable, short-term borrowings, income tax payable, deferred tax liabilities, bonus reserve, retirement benefits, other current liabilities
  - `fixedLiabilities`: Long-term borrowings, deferred tax liabilities, retirement benefits, other fixed liabilities
  - `equity`: Capital stock, retained earnings, treasury stock

- **Income Statement**: Pretax income, net income, depreciation, interest income/expense, securities gain/loss, fixed asset gain/loss

- **Appropriation**: Dividends, executive bonuses

### State Management Pattern

**useCashFlow Hook** ([hooks/useCashFlow.ts](src/hooks/useCashFlow.ts)):
- Central hook for managing financial data state and Supabase persistence
- Provides granular update functions for each section (e.g., `updateCurrentAssets`, `updateEquity`)
- Auto-saves to Supabase with 2-second debounce
- Returns loading/error states and metadata (company name, fiscal year)
- Pattern: Use updater functions for immutable state updates

```typescript
const { currentAssets, updateCurrentAssets, loading, isSaving } = useCashFlow(userId)

// Update a single field
updateCurrentAssets(prev => ({
  ...prev,
  current: { ...prev.current, cash: 1000000 }
}))
```

**useAuth Hook** ([hooks/useAuth.ts](src/hooks/useAuth.ts)):
- Manages Supabase authentication state
- Exposes `user`, `session`, `loading` states
- Provides `signIn`, `signUp`, `signOut` methods
- Automatically subscribes to auth state changes

### Database Schema

**cash_flow_statements table** (Supabase):
- `id` (UUID primary key)
- `user_id` (references auth.users)
- `company_name` (text)
- `fiscal_year` (text)
- `financial_data` (JSONB - stores entire FinancialData object)
- `created_at`, `updated_at` (timestamps)

The `useCashFlow` hook automatically creates a record on first load if none exists for the user.

## UI Component Patterns

### Fast Refresh Compatibility

**IMPORTANT**: Vite's Fast Refresh only works when files export **only React components**. If you export both components and non-component values (constants, functions, types), Fast Refresh will be disabled.

**Pattern to avoid Fast Refresh warnings**:
- Keep component exports pure (only components)
- Move shared constants/functions to separate files
- Example: If `buttonVariants` is exported from `button.tsx`, extract it to `button-variants.ts`

### Component Variant System

Uses `class-variance-authority` (CVA) for type-safe variant props:
```typescript
const buttonVariants = cva(baseStyles, {
  variants: { variant: { ... }, size: { ... } },
  defaultVariants: { ... }
})

// Component uses VariantProps<typeof buttonVariants> for type safety
```

Combine with `cn()` utility from `lib/utils.ts` for conditional class merging.

## Notes

- No test framework configured yet
- No routing library configured yet
