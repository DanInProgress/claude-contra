# Migration Plan: Current to Desired Structure (Tailwind v4 / ShadCN CLI Update)

This document outlines the detailed step-by-step actions for us to migrate from the current repository structure to the desired structure defined in `desired-repo-structure.md`, incorporating Tailwind CSS v4, modern ShadCN CLI practices, and Vite configuration.

## Goals

1.  Align with the structure defined in `desired-repo-structure.md`.
2.  Improve organization and maintainability.
3.  Establish consistent patterns for artifacts.
4.  Separate concerns (UI, pages, logic).
5.  Utilize Tailwind CSS v4 features (CSS-based config).
6.  Integrate correctly with the `shadcn` CLI (`pnpm dlx shadcn@latest`).
7.  Ensure proper Vite and TypeScript configuration for path aliases.
8.  Preserve artifact loading and dynamic routing.

## Concrete Task List

### Phase 1: Preparation and Branching

- [x] Please create a feature branch for restructuring: `git checkout -b feat/repo-restructure-v4`
- [x] Please ensure all current work is committed.
- [x] (Optional but Recommended) Please consider cleaning the workspace if safe: `git clean -fdx` (Removes untracked files/dirs, use caution!)

### Phase 2: Configuration Verification and Updates

- [x] **Verify/Update Vite (`vite.config.ts`):**
  - I will check if the `@tailwindcss/vite` plugin is present. (Already confirmed: Yes)
  - I will check if `resolve.alias` for `@/*` is set correctly. (Already confirmed: Yes)
  - _No changes currently expected based on checks._
- [x] **Verify/Update TypeScript (`tsconfig.json` & `tsconfig.app.json`):**
  - I will check if `baseUrl` and `paths` for `@/*` are set correctly in both files. (Already confirmed: Yes)
  - _No changes currently expected based on checks._
- [x] **Move and Verify Tailwind CSS (`src/index.css` -> `src/styles/index.css`):**
  - [x] I will propose moving the existing `src/index.css` to `src/styles/index.css`.
  - I will verify the content contains `@import 'tailwindcss';` and `@theme inline { ... }`. (Already confirmed: Yes)
- [x] **Update ShadCN Config (`components.json`):**
  - [x] I will propose edits to `components.json` to:
    - Add `"tailwind": { "config": "" }` (leaving existing `css`, `baseColor`, `cssVariables`).
    - Update `tailwind.css` to `"src/styles/index.css"`.
    - Change `style` from `"default"` to `"new-york"`.
    - Add missing aliases: `"ui": "@/components/ui"`, `"lib": "@/lib"`, `"hooks": "@/lib/hooks"`.
- [x] **Update `main.tsx` CSS Import:**
  - [x] I will propose an edit to `main.tsx` to change the CSS import path from `src/index.css` to `@/styles/index.css`.

### Phase 3: Directory Structure Creation and File Migration

- [x] **Create Base Directories:**
  - [x] I will propose terminal commands (`mkdir`) to create the following directories if they don't exist:
    ```
    src/components/layout
    src/components/nav
    src/components/shared
    src/lib/hooks
    src/pages/home
    src/pages/artifacts
    src/pages/research
    src/pages/demos
    src/types
    src/styles (should contain index.css after Phase 2 move)
    ```
    (Note: `src/components/ui` should already exist)
- [x] **Move/Create Utility Files:**
  - [x] I will propose moving `src/lib/ArtifactContext.tsx` if it exists. I will propose edits to update its internal imports if needed.
  - [x] I will check `src/lib/utils.ts` to ensure it contains the `cn` function (ShadCN init should ensure this). I can propose moving other utils if you identify them.
- [x] **Move Layout Components:**
  - [x] I will propose terminal commands (`mv`) to move:
    - `src/components/app-sidebar.tsx` -> `src/components/layout/sidebar.tsx`
    - [x] Move `src/components/ArtifactNav.tsx` -> `src/components/layout/artifact-nav.tsx`
  - [ ] I will then propose edits to update the internal imports within these moved files.
- [x] **Move Navigation Components:**
  - [x] I will propose a terminal command (`mv`) to move `src/components/nav-*.tsx` to `src/components/nav/` (We might need your help refining the command if filenames need changing, e.g., removing the `nav-` prefix).
  - [ ] I will propose edits to update the internal imports within these moved files.
- [x] **Move/Extract Page Components:**
  - [x] I will propose creating the following files and moving the relevant component code into them from `main.tsx` (or wherever they currently reside). I'll also add necessary imports:
    - [x] `src/pages/home/index.tsx` (for `RootWelcomePage`)
    - [x] `src/pages/artifacts/index.tsx` (for `ArtifactsWelcomePage`)
    - [x] `src/pages/research/index.tsx` (for `ResearchPage`)
    - [x] `src/pages/demos/index.tsx` (for `DemosPage`)
- [x] **Organize Artifacts:**
  - [x] I will propose terminal commands (`mkdir`, `mv`) to create version directories (`v1`) and move existing flat artifact files (like `counter.tsx`, `binary-compare-swatch.tsx`) into their respective `v1/index.tsx` paths. Please let me know if there are other flat artifacts.
- [x] **Organize Types:**
  - [x] I will propose creating `src/types/index.ts` and `src/types/artifacts.ts`.
  - [x] I will propose edits to move relevant interfaces (e.g., `ArtifactVersion`, `ArtifactGroup`, types from `ArtifactContext.tsx`) into `artifacts.ts`.
  - [x] I will propose edits to `src/types/index.ts` to export types (e.g., `export * from './artifacts';`).
  - [ ] _Updating imports for types will be part of the next phase._

### Phase 4: Update Imports and Routing

- [x] **Globally Update Imports:**
  - [x] This is often the trickiest part. I can attempt to update imports in key files like `App.tsx`, `main.tsx`, and maybe the moved layout/nav components.
  - [ ] **However, I will likely need your help here.** Please review the edits I propose carefully, and be prepared to manually update imports in other components (`/src/components/shared`, `/src/pages/*`, etc.) or guide me on specific files. Using your IDE's find/replace or refactoring tools might be efficient.
- [x] **Update Routing (`App.tsx` or `main.tsx`):**
  - [x] I will propose edits to ensure `<Route>` elements import page components correctly from `@/pages/*`.
- [x] **Update Artifact Loading Logic (`main.tsx` or relevant hook/context):**
  - [x] I will propose edits to update the `import.meta.glob` pattern to only capture `src/artifacts/**/v*/index.tsx`.
  - [x] I will propose edits to adjust `getArtifactName` / `getVersion` functions if needed based on the new path structure. Your review here would be helpful.

### Phase 5: Reinstall ShadCN UI Components

- [x] **Identify Used ShadCN Components:**
  - [x] I can try to find components using `grep`, but it might miss some.
  - [x] **Please help verify the list of shadcn/ui components currently used**:
    - alert
    - breadcrumb
    - button
    - card
    - collapsible
    - dialog
    - dropdown-menu
    - input
    - navigation-menu
    - popover
    - separator
    - sheet
    - sidebar
    - skeleton
    - sonner
    - tabs
    - tooltip
- [x] **Remove Existing UI Components (Recommended):**
  - [x] **Please confirm if it's safe to remove the contents of `src/components/ui/`**. We should only remove components intended to be replaced by the standard ShadCN versions. If you have heavily customized components in here, we should skip removing those specific ones.
  - [x] If confirmed, I will propose `rm -rf src/components/ui/*`.
- [x] **Re-install Components using CLI:**
  - [x] Based on the verified list (and excluding any heavily customized ones you want to keep), I will propose `pnpm dlx shadcn@latest add [component-name]` commands for each component.
  - [x] If we didn't remove components, I'll add the `--overwrite` flag.

### Phase 6: Testing

- [x] **Start/Restart Development Server:** The human will have likely been running a dev server. **Please restart it and let me know if there are any immediate compilation errors.**
- [x] **Check Browser Console:** **Please open the browser's developer console and report any errors.**
- [x] **Test Core Functionality:** **Please manually test the following and report success or issues:**
  - [x] Navigation works (links, active states).
  - [x] All pages load without errors (`/`, `/artifacts`, `/research`, `/demos`).
  - [x] Layout components (sidebar, header) render correctly.
  - [x] Basic styling is applied (background, text color, fonts).
- [x] **Test ShadCN Components:** **Please manually test the following and report success or issues:**
  - [x] Standard components (Buttons, inputs, cards, etc.) render and function correctly.
  - [x] Styling matches the `new-york` theme and chosen base color.
  - [x] Any heavily customized components that were _not_ reinstalled still function correctly.
- [x] **Test Artifact Loading:** **Please manually test the following and report success or issues:**
  - [x] Artifact list/gallery page loads correctly.
  - [x] Navigating to individual artifacts works.
  - [x] Artifact components render correctly.
  - [x] Artifact versioning logic works.
- [x] **Fix Issues:** Based on your reports, I will attempt to propose fixes. This may involve iterating on previous configuration or import steps.

### Phase 7: Clean-up and Documentation

- [x] **Remove Old Files:**
    - [x] **Crucial:** Once we are both confident everything is working correctly, **please confirm it's safe to remove the original files/directories** that were moved or replaced (e.g., old flat artifacts, old `nav-*` components, `src/index.css`, `app-sidebar.tsx`, etc.).
    - [x] Upon your confirmation, I will propose the necessary `rm` commands.
- [x] **Update `README.md`:**
    - [x] I will propose edits to update the README with the new structure, referencing `desired-repo-structure.md` and documenting key configurations/patterns.
- [x] **Update `CONTRIBUTING.md` (If exists):**
    - [x] I will propose edits to update contribution guidelines based on the new structure and tooling.
- [x] **Format Code:**
    - [x] I can propose running `pnpm run format` (or your project's specific command) if you confirm the command exists and is configured.
- [x] **Final Review:**
    - [x] **Please perform a final review of the changes using `git status` and `git diff` before committing.**

### Phase 8: Commit and Merge

- [ ] Commit changes: I can suggest a commit message like `git commit -m "feat: restructure repository to align with Tailwind v4 and ShadCN best practices"`
- [ ] Push branch and create Pull Request: Please handle the push and PR creation via your Git interface.
- [ ] Review, get approval, and merge: Please handle the final merge.

This revised plan should better reflect our collaboration during the migration process.
