# WealthWise — Personal Finance Tracker

> A full-stack personal finance tracker built with the MERN stack. WealthWise helps users track income, expenses, and savings with a clean, responsive, and professional UI — featuring real-time charts, transaction management, CSV export, and dark/light mode.

**Live Demo → [wealthwisebd.netlify.app](https://wealthwisebd.netlify.app)**

---

## Screenshots

### Light Mode — Dashboard
![WealthWise Dashboard Light Mode](https://i.ibb.co.com/fY8kbQDc/Wealth-Wise.png)

### CSV Export — Excel
> Users can export all their transactions as a `.csv` file, which opens directly in Excel or Google Sheets with full data including date, type, category, note, and amount.

![CSV Export in Excel](https://i.ibb.co.com/JRjMqQx9/csv.png)

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| Tailwind CSS v4 | Utility-first styling |
| DaisyUI v5 | Component library & theming |
| React Router v7 | Client-side routing |
| Firebase Auth | Authentication (Email + Google) |
| Axios | HTTP client |
| Recharts | Charts & data visualization |
| React Hook Form | Form handling & validation |
| React Toastify | Toast notifications |
| React Fast Marquee | Marquee animations |
| ImgBB API | Profile image upload |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB ODM |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

### Deployment
| Service | Purpose |
|---|---|
| Netlify | Frontend hosting |
| Vercel | Backend API hosting |
| MongoDB Atlas | Database hosting |

---

## Features

- **Authentication** — Email/password register & login, Google OAuth via Firebase
- **Dashboard Overview** — Live balance, income, expense & savings rate stat cards
- **Charts** — Balance growth (12-month area chart), income vs expenses (bar chart), spending categories (pie chart)
- **Transaction Management** — Add, edit, delete transactions with category, type, date & note
- **Filters & Search** — Filter by type (income/expense), category, and search by keyword
- **Pagination** — Server-side paginated transaction list (10 per page)
- **CSV Export** — Download all transactions as `.csv` — opens in Excel with date, type, category, note, amount columns
- **Profile Management** — Update display name and profile photo (uploaded to ImgBB)
- **Dark / Light Mode** — Toggle with persistent preference saved to localStorage
- **Responsive Design** — Fully mobile-friendly across all pages
- **Protected Routes** — Dashboard, transactions, and profile require authentication

---

## Pages

| Page | Route | Protected |
|---|---|---|
| Home (Landing) | `/` | No |
| Pricing | `/pricing` | No |
| Login | `/login` | No |
| Register | `/register` | No |
| Dashboard Overview | `/dashboard/overview` | Yes |
| Transactions | `/dashboard/transactions` | Yes |
| Add / Edit Transaction | `/dashboard/transaction` | Yes |
| Profile | `/dashboard/profile` | Yes |

---

## API Endpoints

### Users
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/users` | Create or upsert a user |
| `GET` | `/users/:uid` | Get user by Firebase UID |
| `PATCH` | `/users/:uid` | Update name, photo, currency, budget |

### Transactions
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/transactions` | Add a new transaction |
| `GET` | `/transactions/:uid` | Get paginated transactions (`?page=1&limit=10`) |
| `PATCH` | `/transactions/:id` | Edit a transaction by ID |
| `DELETE` | `/transactions/:id` | Delete a transaction by ID |

---

## Installation & Local Development

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project with Email/Password and Google auth enabled

### 1. Clone the repository
```bash
git clone https://github.com/your-username/wealthwise.git
cd wealthwise
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```env
MONGO_DB_URI=your_mongodb_connection_string
PORT=3000
```

Start the server:
```bash
npm run dev
```

### 3. Setup the frontend
```bash
cd client
npm install
```

Create a `.env` file in `/client`:
```env
VITE_API_URL=http://localhost:3000
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

Start the frontend:
```bash
npm run dev
```

---

## Deployment

### Frontend → Netlify
1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add all `VITE_*` environment variables in Netlify → Site settings → Environment variables
6. Add a `public/_redirects` file with: `/*    /index.html   200`

### Backend → Vercel
1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add `MONGO_DB_URI` in Vercel environment variables
4. Add a `vercel.json`:
```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

### Firebase — Required after deploy
Go to Firebase Console → Authentication → Settings → Authorized domains → Add your Netlify domain:
```
your-app.netlify.app
```

---

## Future Improvements

- [ ] Payment gateway integration (Stripe / SSLCommerz)
- [ ] Auto-update user plan status after real payment
- [ ] Email confirmation after purchase
- [ ] Plan expiry and renewal system
- [ ] Recurring transactions
- [ ] Monthly PDF report generation
- [ ] Budget alerts and spending limits
- [ ] Multi-currency support

---

## Credits

- 404 animated SVG — Original by [Jon Kantner](https://codepen.io/jkantner) on CodePen

---

## License

MIT © [WealthWise](https://wealthwisebd.netlify.app)