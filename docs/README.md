# Frontend Docs

Next.js 16 (App Router, `src/` layout), React 19, TypeScript, Tailwind CSS 4, TanStack Query. See [../../docs/overall-plan.md](../../docs/overall-plan.md) for the full design.

Each frontend version needs the **backend version with the same number** to be finished first.

| Version | Guide | You will learn |
|---|---|---|
| v0.1 | [Project structure](v0.1-project-structure.md) | `src/` layout, path aliases, rewrites, layouts |
| v0.2 | [UI mocks](v0.2-ui-mocks.md) | Shared theme, hardcoded screens for every module |
| v0.3 | [Products page](v0.3-products-page.md) | API client, typed services, TanStack Query, reusable table and form input |
| v0.4 | [Branches page](v0.4-branches-page.md) | Repeating the pattern, shared hooks |
| v0.5 | [Inventory and movements](v0.5-inventory-and-movements.md) | Search params, dependent queries, dynamic forms, cache invalidation |
| v0.6 | [Login and role navigation](v0.6-login-and-role-navigation.md) | Auth context, tokens, route guards, role-based UI |
| v0.7 | [Users page](v0.7-users-page.md) | Role-aware forms |
| v0.8 | [Audit page](v0.8-audit-page.md) | Filters, expandable rows, JSON display |
| v0.9 | [Scan and import](v0.9-scan-and-import.md) | Camera API, barcode decoding, file upload, two-step workflows |
| v1.0 | [Dashboard and polish](v1.0-dashboard-and-polish.md) | Aggregated views, loading and error boundaries, accessibility |

## Final structure

```
frontend/src/
  app/
    layout.tsx  page.tsx  globals.css  providers.tsx  error.tsx  not-found.tsx
    login/page.tsx
    products/page.tsx
    inventory/page.tsx
    movements/page.tsx  movements/new/page.tsx
    branches/page.tsx  users/page.tsx  audit/page.tsx
    scan/page.tsx  import/page.tsx
  components/
    Sidebar.tsx  DataTable.tsx  FormInput.tsx  FormSelect.tsx  Modal.tsx
    ProductSelect.tsx  BranchSelect.tsx  AuthProvider.tsx  RequireAuth.tsx  BarcodeScanner.tsx
  services/
    productService.ts  inventoryService.ts  movementService.ts  branchService.ts
    userService.ts  authService.ts  auditService.ts  importService.ts
  types/
    common.ts  product.ts  inventory.ts  movement.ts  branch.ts  user.ts  audit.ts  import.ts
  lib/
    apiClient.ts  queryClient.ts  format.ts  auth.ts
```

## Layer rules
- **Pages** compose components and call hooks. They don't call `fetch` directly.
- **Services** are plain functions that call `apiClient`. They don't contain React code.
- **Types** mirror the backend DTOs exactly. When a DTO changes, update its type first.
- **Components** in `components/` are reusable and don't know which page they are on.

## Commands
```powershell
pnpm dev     # http://localhost:3000
pnpm lint
pnpm build   # type-check + production build
```
