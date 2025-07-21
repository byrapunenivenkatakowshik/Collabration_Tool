
# Real-Time Collaborative Document Editor
# please open the documentation in word format only
# video link :-
# end to end design of files using mind map for speed implementation 
```
https://boardmix.com/app/share/CAE.CKz-jQEgASoQJRq8a36Kd8Ix9ysMB9CizjAGQAE/mLFvYZ，
Click the link to collaborate in the file [Untitled] on Boardmix
```

##  Features

###  Core Features
-  **Real-Time Collaborative Editing** - Multiple users can edit simultaneously with live cursor tracking
-  **Rich Text Editor** - TipTap-powered WYSIWYG editor with advanced formatting
-  **Smart Comments** - Add, reply, and resolve comments on any text selection
-  **Suggestion System** - Propose changes for review and approval
-  **User Presence** - See who's online with live cursor and mouse positions
-  **Document Management** - Create, organize, share, and manage documents
-  **Secure Authentication** - JWT-based auth with bcrypt password hashing

###  Technical Features
-  **Real-Time Sync** - Socket.IO for instant updates across all users
-  **WebRTC Support** - Peer-to-peer backup communication
-  **Responsive Design** - Works seamlessly on desktop and mobile
-  **Theme Support** - Light and dark mode toggle
-  **Role-Based Access** - Owner, editor, and viewer permission levels
-  **Progressive Web App** - Installable web application

---



### Tech Stack
- **Frontend**: React 18, TipTap, Socket.IO Client, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, Socket.IO, JWT, bcryptjs
- **Database**: Firebase Firestore
- **Real-time**: Socket.IO + WebRTC fallback

---

##  Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **Firebase Account** - [Create here](https://console.firebase.google.com/)

###  Installation  {use bun if npm doesnt work}

1. **Clone the repository**
   ```bash
   git clone https://github.com/byrapunenivenkatakowshik/Collabration_Tool
   cd collaboration-tool
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install test dependencies**
   ```bash
   cd ../tests
   npm install
   ```

###  Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Enter project name (e.g., "collaboration-tool")
   - Follow the setup wizard

2. **Enable Firestore Database**
   - In Firebase Console, click "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" for development
   - Select a location closest to your users

3. **Enable Authentication**
   - Click "Authentication" in the sidebar
   - Go to "Sign-in method" tab
   - Enable "Email/Password" authentication

4. **Generate Service Account**
   - Click the gear icon ⚙️ → "Project settings"
   - Go to "Service accounts" tab
   - Click "Generate new private key"
   - Download the JSON file
   -  **Keep this file secure and never commit it to Git**

###  Environment Configuration

1. **Backend Environment Setup**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Configure Backend `.env`**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d

   # Firebase Configuration (from your service account JSON)
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY_ID=your-private-key-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_CLIENT_ID=your-client-id

   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
   ```

   >  **Tip**: Generate a secure JWT secret with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

3. **Frontend Configuration**
   - The frontend automatically connects to `http://localhost:5000` in development
   - For production, update `frontend/src/config/config.js`

###  Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
    You should see: "Server running on port 5000"

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
    You should see: "Local: http://localhost:5173/"

3. **Access the Application**
   - Open your browser and go to [http://localhost:5173](http://localhost:5173)
   - Create an account or login
   - Start collaborating!

###  Running Tests

```bash
cd tests
npm test
```

This runs the complete test suite including:
- Authentication tests
- Document management tests
- Comment system tests

---



##  System Architecture
<img width="797" height="420" alt="image" src="https://github.com/user-attachments/assets/8c13d723-fcb9-49eb-aa6b-60c180b785b7" />

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │◄──►│   Backend       │◄──►│   Firebase      │
│   (React)       │    │   (Node.js)     │    │   (Firestore)   │
│   Port: 5173    │    │   Port: 5000    │    │   Cloud         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
              Socket.IO + WebRTC
           Real-time Collaboration
```


## How Web application works 
<img width="853" height="807" alt="image" src="https://github.com/user-attachments/assets/78c6ac57-591b-4af8-91a3-ec4fc758ded9" />

<img width="996" height="632" alt="image" src="https://github.com/user-attachments/assets/5e9d3db2-4b57-4c01-ab6a-4b9015014af8" />



## Use Cases 
<img width="1000" height="543" alt="image" src="https://github.com/user-attachments/assets/479c27e7-9239-4c6d-a69d-dd8f7c1f6683" />

##  Project Structure

```
collaboration-tool/
├── README.md                    # This file
├── backend/                     # Node.js backend
│   ├── config/                  # Firebase & configuration
│   │   ├── firebase.js          # Firebase Admin SDK setup
│   │   └── mockFirebase.js      # Mock Firebase for development
│   ├── middleware/              # Express middleware
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/                  # API route handlers
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── comments.js          # Comment system API
│   │   └── documents.js         # Document management API
│   ├── server.js                # Main server file
│   └── package.json             # Backend dependencies
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Editor.jsx       # TipTap rich text editor
│   │   │   ├── CommentSidebar.jsx # Comment management
│   │   │   ├── SuggestionSidebar.jsx # Suggestion system
│   │   │   └── ...              # Other components
│   │   ├── contexts/            # React contexts
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   └── styles/              # CSS styles
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration
├── docs/                        # Documentation
    ├── API_DOCUMENTATION.md     # Complete API reference
    ├── ARCHITECTURE.md          # System architecture details
    ├── DEPLOYMENT_GUIDE.md      # Production deployment guide



---

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Documents
- `GET /api/documents` - List user's documents
- `POST /api/documents` - Create new document
- `GET /api/documents/:id` - Get specific document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

### Comments
- `GET /api/comments/document/:documentId` - Get document comments
- `POST /api/comments/document/:documentId` - Add new comment
- `PUT /api/comments/:commentId/resolve` - Resolve/unresolve comment

>  **Full API Documentation**: See [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)

---

##  Real-Time Features

### Socket.IO Events

**Client → Server**
- `join-document` - Join document editing session
- `content-change` - Send document content changes
- `cursor-position` - Send cursor position updates
- `comment-added` - Broadcast new comment

**Server → Client**
- `content-updated` - Receive content changes
- `user-joined` - User joined notification
- `comment-notification` - New comment notification

---

##  Development

### Development Scripts

**Backend**
```bash
npm start          # Start production server
npm run dev        # Start with nodemon (auto-restart)
```

**Frontend**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Check code quality
```

### Code Style & Linting

The project includes ESLint configuration for consistent code style:
```bash
cd frontend
npm run lint       # Check for linting errors
```

## output 
## ui pages 

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/9e4f5a6b-1cda-4899-b3b1-df0c0b9dfb2f" />
<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/9885ddb0-4869-4a2d-9127-861c9a670e30" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/cdb0c48c-09fe-4c26-806c-1ea5e49ab897" />
<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/5771e9f1-e77d-4c33-8250-0fafc6fde70e" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/01795893-54ab-476d-be90-b82e8f31cb09" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/d5723eeb-f90e-4c65-959d-8ec17b4622c3" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/dc095947-a782-4174-bc85-568e97f87d05" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/dbec31f6-8d41-4404-8d85-70c2dc33b6f2" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/3e22ccad-69ec-49c7-9cfb-6af3a2feb11e" />
<img width="958" height="1020" alt="image" src="https://github.com/user-attachments/assets/397ea2b0-f62d-42c0-8e2b-d1935b53f992" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/aac28cc5-f6e3-4c19-a500-8f6cf67c6ce7" />
<img width="1918" height="1077" alt="image" src="https://github.com/user-attachments/assets/b5987c65-224b-4843-ad3f-92b8486b14e9" />
<img width="1907" height="1078" alt="image" src="https://github.com/user-attachments/assets/ce6131cc-9f48-492d-a415-d59894660277" />
