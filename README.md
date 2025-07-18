# 📡 Broadcast Event App

A React application with cross-tab communication and session management capabilities.

## ✨ Features

- **🔐 Login System** - Simple username/password authentication
- **📡 Cross-Tab Broadcasting** - Send messages across browser tabs/windows
- **🔄 Real-time Session Sync** - Login/logout synchronization across all tabs
- **📱 Responsive Design** - Optimized for Galaxy Z Fold 5 (cover & main screens)

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.18.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/dinodorinna/broadcast-event.git
cd broadcast-event
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in terminal)

## 🎮 How to Use

### Login Flow

1. Enter any username and password
2. Click "Login" to access the home page
3. Open multiple tabs - no need to login again!

### Cross-Tab Broadcasting

1. On the home page, click "Broadcast Message"
2. Open multiple tabs of the app
3. Click the button in any tab - see alerts in all other tabs!

### Session Management

- **Login in one tab** → All tabs automatically logged in
- **Logout in one tab** → All tabs automatically logged out
- **Refresh any tab** → Session maintained across refreshes

### Test Login/Logout Sync:

1. Open 2-3 tabs of the app
2. Login in one tab
3. Check other tabs - should auto-redirect to home
4. Logout in any tab - all tabs should redirect to login

### Test Message Broadcasting:

1. Login and open multiple tabs
2. Go to home page in all tabs
3. Click "Broadcast Message" in any tab
4. See alerts appear in all other tabs

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 Documentation

- `SESSION_MANAGEMENT.md` - Cross-tab session management details
- `CLEANUP_GUIDE.md` - Resource cleanup best practices
- `LOGOUT_IMPLEMENTATION_GUIDE.md` - Step-by-step logout implementation
- `DEVELOPER_HANDOFF.md` - Instructions for next developer

## 🐛 Troubleshooting

### Common Issues

**Messages not broadcasting across tabs:**

- Check if BroadcastChannel names match
- Ensure channels are properly initialized
- Verify cleanup functions are working

**Session not syncing:**

- Check localStorage in Developer Tools
- Verify auth channel is working
- Ensure event listeners are properly set up

**Responsive layout issues on Galaxy Z Fold:**

- Check CSS media queries
- Verify viewport meta tag is correct
- Test both folded and unfolded states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test cross-tab functionality
5. Submit a pull request

---

**Built with ❤️ for Samsung Galaxy Z Fold 5**
