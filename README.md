# Groove Garage: Music Store Web App (Web Lab Mini Project)

A full-stack music store. You can browse albums, search and filter, view details, add to cart, check out, and manage albums from an admin page.

| Part | Technology | Folder | Port |
|------|-----------|--------|------|
| Front end (what users see) | HTML5, CSS3, JavaScript, **React** | `client` | 5173 |
| Back end API | **Node.js + Express** | `server` | 5000 |
| Recommendation service | **Flask (Python)** | `recommender` | 5001 |
| Database | **MongoDB** | (runs on your PC) | 27017 |

## How the pieces talk to each other

```
Browser (React)  --->  Express API (5000)  --->  MongoDB
       |                                             ^
       +---------->  Flask service (5001)  ----------+
```

React shows the pages. When it needs data it sends a request to Express, which reads or writes MongoDB. On the product page it also asks Flask for similar albums.

---

## PART 1: Install the tools (one time)

1. **VS Code**: https://code.visualstudio.com
2. **Node.js** (LTS version): https://nodejs.org. Check with `node -v` and `npm -v` in a terminal.
3. **Python 3**: https://www.python.org. Tick "Add Python to PATH" during install. Check with `python --version`.
4. **MongoDB Community Server**: https://www.mongodb.com/try/download/community. Choose "Install as a Service" so it starts automatically. (Optional: also install MongoDB Compass, a free app to see your data.)

## PART 2: Run the project

Open the `music-store` folder in VS Code. Use **Terminal > New Terminal**. You need **three terminals** open at once, one for each server.

**Terminal 1: Express back end**
```
cd server
npm install
npm run seed
npm start
```
`npm run seed` puts 12 sample albums in the database (do it only once). You should see "MongoDB connected" and "Express server running on http://localhost:5000".

**Terminal 2: Flask service**
```
cd recommender
pip install -r requirements.txt
python app.py
```
(On Mac/Linux use `python3` and `pip3`.)

**Terminal 3: React front end**
```
cd client
npm install
npm run dev
```
Open the link it prints, normally **http://localhost:5173**.

Quick check: open http://localhost:5000/api/products in the browser. You should see a list of albums as JSON.

---

## PART 3: Understand the code (so you can explain it)

### 1. HTML5, CSS3 and JavaScript (front-end basics)
- React components return HTML-like code (JSX). The page structure uses semantic tags: `header`, `nav`, `main`, `section`, `article`, `footer`.
- `client/src/index.css` holds all styling: Flexbox (navbar, rows), CSS Grid (album grid), colour variables, and a `@media` query that makes the site work on phones.
- JavaScript runs the logic: filtering, `fetch()` calls, and cart maths.

### 2. React (client/src)
- **Components**: small reusable pieces (`Navbar`, `ProductCard`) that make up pages.
- **useState**: remembers values like the search text or the form fields.
- **useEffect**: runs code when the page loads or a value changes, e.g. load albums from the server.
- **React Router** (`App.jsx`): moves between pages (`/`, `/cart`, `/admin`) without reloading.
- **Context** (`CartContext.jsx`): shares the cart between every page.

### 3. Node.js + Express (server/index.js)
Express exposes **routes**. Each route is a URL plus an action. This is a REST API:

| Action | Method | URL |
|--------|--------|-----|
| Create album | POST | `/api/products` |
| Read all albums (search/filter) | GET | `/api/products?search=daft&genre=Rock` |
| Read one album | GET | `/api/products/:id` |
| Update album | PUT | `/api/products/:id` |
| Delete album | DELETE | `/api/products/:id` |
| Save an order | POST | `/api/orders` |
| List orders | GET | `/api/orders` |

`cors()` lets React (port 5173) call Express (port 5000). `express.json()` lets Express read the JSON React sends.

### 4. MongoDB (server/models)
MongoDB stores data as documents, like JSON. **Mongoose** describes their shape. There are two collections: `products` (albums) and `orders`. CRUD = **C**reate, **R**ead, **U**pdate, **D**elete, and the Admin page does all four.

### 5. Flask (recommender/app.py)
A tiny Python web server with one route, `/recommend/<genre>`. It finds albums of the same genre in MongoDB and returns up to three as JSON. The product page shows them under "You may also like".

---

## PART 4: Test every feature (use this as your demo script)

1. **Shop page**: albums load from MongoDB. Search "daft" and click the "Jazz" chip.
2. **Album page**: click an album. Check "You may also like" (this comes from Flask).
3. **Cart**: add 2 albums, change the quantity, remove one, and watch the total update.
4. **Checkout**: fill the form and place the order.
5. **Admin page**: the order is listed. Add a new album, Edit its price, then Delete it.
6. Go back to the shop to show the changes appear.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `MongoDB error: connect ECONNREFUSED` | MongoDB isn't running. Start the "MongoDB Server" service (Windows: Services app) or run `mongod`. |
| Shop page is empty | You haven't run `npm run seed`, or Express isn't running. |
| "You may also like" is missing | Flask isn't running (Terminal 2). |
| `pip` or `python` not found | Reinstall Python and tick "Add to PATH". |
| `Port already in use` | Close old terminals and start again. |

## Ideas if you have extra time
- Add login with email and password.
- Add an `<audio>` tag to play a 30-second preview.
- Rebuild the Admin page in AngularJS to show both frameworks.
