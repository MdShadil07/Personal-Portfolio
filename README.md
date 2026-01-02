# Personal-Portfolio

This repository contains two separate apps:

- `client/` — React + Vite frontend (Tailwind, Framer Motion, Lucide icons)
- `server/` — Node/Express backend (MongoDB via Mongoose)

Quick commands (from repository root, PowerShell):

```pwsh
# install dependencies for root, client and server
npm run install-all

# run both dev servers concurrently
npm run dev

# build frontend for production
cd client
npm run build

# start server (after installing dependencies)
cd ../server
npm start
```

Notes:
- The frontend builds using `vite build` and is optimized for production.
- The root `dev` script uses `concurrently` to run server and client in parallel.
- If you prefer separate terminals, run the client and server commands in different shells.