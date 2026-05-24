# Admin Portfolio Dashboard

Admin dashboard for managing portfolio content.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3001
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3001/admin](http://localhost:3001/admin)

## Features

- Blog post management
- Project management
- Research paper management
- About page editor
- Site settings
- Image uploads via Cloudinary
- Dark/Light mode

## Deployment

Deploy to Vercel and set environment variables in the dashboard.
