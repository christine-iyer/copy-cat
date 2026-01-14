# Copy Cat - Auto App 

A full-stack application with a React Native/Expo client and Node.js/Express server.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) and npm
- **MongoDB** (local installation or MongoDB Atlas account)
- **Expo CLI** (optional, installed globally with `npm install -g expo-cli`)
- For iOS development: **Xcode** (macOS only)
- For Android development: **Android Studio**

## Project Structure

```
copy-cat/
├── client/          # React Native/Expo application
└── server/          # Node.js/Express API server
```

## Setup Instructions

### 1. Clone the Repository

```bash
cd copy-cat
```

### 2. Server Setup

#### 2.1 Install Server Dependencies

```bash
cd server
npm install
```

#### 2.2 Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cd server
touch .env
```

Copy the example below and add your actual values to `.env`:

```env
# ==========================================
# Database Configuration (REQUIRED)
# ==========================================

# MongoDB Atlas Connection String
# Format: mongodb+srv://username:password@cluster.mongodb.net/database-name
DB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database-name

# Alternative/Commented MongoDB URI (optional - for old/alternate connections)
# DB_URI_OLD=mongodb://localhost:27017/old-database-name


# ==========================================
# Server Configuration
# ==========================================

# Server Port (optional, defaults to 4000)
PORT=4000


# ==========================================
# Authentication Configuration (REQUIRED)
# ==========================================

# JWT Secret Key for token signing
# IMPORTANT: Use your actual JWT secret here
JWT_SECRET=your-actual-jwt-secret-here


# ==========================================
# Supabase Configuration (OPTIONAL - Not currently used)
# ==========================================

# Supabase Project URL
# Note: Not currently used in the codebase, but included for future use
SUPABASE_URL=https://your-project.supabase.co

# Supabase Anon (Public) API Key
# Note: Not currently used in the codebase, but included for future use
SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Required Environment Variables:**

- `DB_URI` - Your MongoDB Atlas connection string (REQUIRED)
- `JWT_SECRET` - Your JWT secret for authentication (REQUIRED)
- `PORT` - Server port (OPTIONAL, defaults to 4000)

**Optional Environment Variables:**

- `SUPABASE_URL` - Not currently used in the codebase
- `SUPABASE_ANON_KEY` - Not currently used in the codebase

**Important Notes:**

- Replace all placeholder values with your actual credentials
- The MongoDB Atlas connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database-name`
- Keep your `.env` file secure and never commit it to git (it's already in `.gitignore`)

#### 2.3 Start MongoDB

**Option A: Local MongoDB**

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**

- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `DB_URI` in your `.env` file

#### 2.4 Start the Server

**You can start the backend once you have:**

- ✅ Installed dependencies (`npm install` in `server/`)
- ✅ Created `.env` file with `DB_URI` and `JWT_SECRET` set

```bash
cd server
npm start
```

The server should start on `http://localhost:4000` (or the port specified in your `.env` file).

You should see:

```
🚀 Server is listening on http://localhost:4000
```

**If you see connection errors:**

- Verify your MongoDB Atlas connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas (Network Access section)
- Ensure your MongoDB Atlas username and password are correct

### 3. Client Setup

#### 3.1 Install Client Dependencies

Open a new terminal window:

```bash
cd client
npm install
```

#### 3.2 Start the Expo Development Server

**You can start the frontend once you have:**

- ✅ Installed dependencies (`npm install` in `client/`)
- ⚠️ Optional: Backend server running (if the app needs to connect to it)

```bash
cd client
npm start
```

This will start the Expo development server and open a QR code in your terminal.

#### 3.3 Run the App

You have several options:

**Option A: iOS Simulator (macOS only)**

```bash
npm run ios
```

**Option B: Android Emulator**

```bash
npm run android
```

(Requires Android Studio and an emulator set up)

**Option C: Expo Go App (Recommended for quick testing)**

1. Install the Expo Go app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code from your terminal
3. The app will load on your device

**Option D: Web Browser**

```bash
npm run web
```

## Quick Start Checklist

**To get both backend and frontend running:**

### Backend Setup:

1. ✅ `cd server && npm install`
2. ✅ Create `server/.env` with:
   - `DB_URI` (your MongoDB Atlas connection string)
   - `JWT_SECRET` (your JWT secret)
   - `PORT` (optional, defaults to 4000)
3. ✅ `cd server && npm start` (should see "🚀 Server is listening...")

### Frontend Setup:

1. ✅ `cd client && npm install`
2. ✅ `cd client && npm start` (or `npm run ios`, `npm run android`, `npm run web`)

### Answer: When can I open the backend and frontend?

**Backend:** You can start the backend as soon as you have:

- Dependencies installed (`npm install` in `server/`)
- `.env` file created with `DB_URI` and `JWT_SECRET` set

**Frontend:** You can start the frontend as soon as you have:

- Dependencies installed (`npm install` in `client/`)
- The backend doesn't need to be running to start the frontend (though you may need it for full functionality)

## Development Workflow

1. **Start MongoDB** (if using local MongoDB - skip if using MongoDB Atlas)
2. **Start the Server** (in one terminal):
   ```bash
   cd server
   npm start
   ```
3. **Start the Client** (in another terminal):
   ```bash
   cd client
   npm start
   ```

## API Endpoints

The server provides the following API routes:

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

(Additional routes may be available - check `server/routes/` directory)

## Troubleshooting

### Server Issues

**MongoDB Connection Error:**

- Ensure MongoDB is running locally or your Atlas connection string is correct
- Check that the `DB_URI` in `.env` is properly formatted
- Verify network connectivity if using MongoDB Atlas

**JWT_SECRET Error:**

- Ensure `JWT_SECRET` is set in your `.env` file
- The secret should be a long, random string

**Port Already in Use:**

- Change the `PORT` in `.env` to a different port (e.g., 4001)
- Or kill the process using the port:

  ```bash
  # macOS/Linux
  lsof -ti:4000 | xargs kill

  # Windows
  netstat -ano | findstr :4000
  taskkill /PID <PID> /F
  ```

### Client Issues

**Expo CLI Not Found:**

```bash
npm install -g expo-cli
```

**Node Modules Issues:**

```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

**Metro Bundler Cache Issues:**

```bash
cd client
npx expo start --clear
```

## Technologies Used

### Server

- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs
- CORS
- express-rate-limit

### Client

- React Native
- Expo
- Expo Router
- TypeScript

## Additional Notes

- The server uses `nodemon` for automatic restart during development
- Rate limiting is implemented on the server
- CORS is enabled for cross-origin requests
- Authentication uses JWT tokens stored securely

## Environment Variables Summary

**Currently Required:**

- `DB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - JWT authentication secret
- `PORT` - Server port (optional, defaults to 4000)

**Currently Optional (not used in codebase):**

- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anon API key

**Note:** The Supabase variables are included in case you plan to use them in the future. They are not currently referenced in the codebase.

## Contributing

Please ensure all environment variables are properly configured before running the application.

A Lesson In GitHub - How To Do Branches