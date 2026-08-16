### Phase 1 — Basic Express Server ✅
**Goal:** Make sure Express works.

- Initialize Express + TypeScript.
- Create `src/index.ts`.
- Serve static files from `public/`.
- `GET /` → return `index.html`.
- Verify the page opens in the browser.

---

### Phase 2 — In-Memory State (No Socket.IO Yet) ✅
**Goal:** Render checkboxes from server state.

- Create an in-memory array.
  ```js
  [
    { id: 1, checked: false },
    { id: 2, checked: true },
    ...
  ]
  ```
- Create an API:
  - `GET /checkboxes`
- Frontend:
  - Fetch the array.
  - Loop through it.
  - Render checkboxes.
- **Do not worry about updating them yet.**

> **Change:** I would only display the data in this phase. Don't add updates yet.

---

### Phase 3 — Add Socket.IO ✅
**Goal:** Real-time synchronization.

- Integrate Socket.IO.
- When a checkbox changes:
  - Emit `{ id, checked }`.
- Server:
  - Update the in-memory array.
  - Broadcast the change.
- Clients:
  - Listen for updates.
  - Update only the changed checkbox.

---

### Phase 4 — Persist Data in MongoDB ✅
**Goal:** Replace the in-memory array.

- Create a MongoDB collection.
- On server startup:
  - Load checkbox states from MongoDB.
- When a checkbox changes:
  - Update MongoDB.
  - Update in-memory state (or use MongoDB directly if you prefer).
- New clients:
  - Receive the latest state.

---

## Final Roadmap

```
Phase 1
├── Express server
├── Serve static files
└── Show index.html

Phase 2
├── In-memory array
├── GET /checkboxes
├── Frontend fetches data
└── Render 1000 checkboxes

Phase 3
├── Socket.IO
├── Emit checkbox changes
├── Update server state
└── Broadcast to all clients

Phase 4
├── MongoDB
├── Persist checkbox states
├── Load state on startup
└── Keep Socket.IO in sync
```

This progression is incremental: **first server → then rendering → then real-time updates → then persistence**. Each phase builds on the previous one without introducing multiple new concepts at once.