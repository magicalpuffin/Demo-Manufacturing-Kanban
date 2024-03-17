# Demo-Manufacturing-Kanban

A demo web of a manufacturing kanban system. Create workorders, locations and parts. Drag workorder cards to between different locations. Data is stored in a database.

AWS, SST, SvelteKit, Drizzle, Tailwindcss, sortablejs, svelte toast

## How to run

- Run dev to start SST dev
- Run frontend

```
npm run dev
cd packages/frontend
npm run dev
```

- Deploy

```
npx sst deploy --stage <STAGENAME>
```
