# **Lumina AI Hub – Your Personalized AI Role Manager**

Lumina AI Hub is a beautifully designed, fully customizable platform where users can select, search, filter, and create custom AI "roles" (Illuminations).
These roles act like tailored personas for ChatGPT, each with its own description, category, personality, and prompt.

The system supports:
- Role browsing
- Role search
- Category-based filtering
- Highlighting matched text
- Creation of new custom roles
- Local storage persistence for fast loading
- Smooth UI with Tailwind + Framer Motion
- Complete modular structure with hooks & components
---

## **Features**

### **1. Dynamic Role Management**

* Predefined roles (doctor, coach, interviewer, coder, teacher, etc.)
* User-created roles saved persistently

### **2. Powerful Search System**

* Search by:

  * name
  * description
  * category
  * prompt
* Real-time filtering using `useMemo`

### **3. Categories & Icons**

* Role categories dynamically shown using a central `CATEGORY_ICONS` mapping
* Sorted categories UI

### **4. Custom Role Creation**

* User can create a new AI role using the custom modal
* Passed to parent with `onAddNewRole`
* Saved in localStorage using your custom `useRoles()` hook

### **5. Fast Loading**

* The app first loads from `localStorage` (instant)
* Then loads network roles asynchronously
* Prevents UI delay or flicker

### **6. Modern UI / UX**

* Full TailwindCSS design
* Gradient effects
* Smooth hover states
* Framer Motion animations
* Dark/Light theme compatibility

---

# **Project Structure**

```
frontend/
│── public/
│   ├── logo.svg
│   └── ...
│── src/
│    │── api/
│    │   ├── chatAPI.js
│    │   └── roleAPI.js
│    │
│    │── components/
│    │   ├── ChatBox.jsx
│    │   ├── NewRoleFormModel.jsx
│    │   ├── RagCard.jsx
│    │   ├── Sidebar.jsx
│    │   └── ThemeToggle.jsx
│    │
│    │── constants/
│    │   └── index.jsx
│    │
│    │── hooks/
│    │   ├── useChat.js
│    │   ├── useRoles.js
│    │   └── useTheme.js
│    │
│    │── pages/
│    │   ├── Dashboard.jsx
│    │   └── Chat.jsx
│    │
│    │── utils/
│    │   └── helper.js
│    │
│    │── App.jsx
│    │── index.css
│    └── main.jsx
│
│─── .gitignore
│─── eslint.config.js
│─── index.html
│─── package.json
└─── vite.config.js


backend/
│── src/
│    │── configs/
│    │   ├── __init__.py
│    │   └── config.py
│    │
│    │── db/
│    │   ├── __init__.py
│    │   └── database.py
│    │
│    │── logger/
│    │   ├── __init__.py
│    │   └── logger.jsx
│    │
│    │── routes/
│    │   ├── __init__.py
│    │   ├── chat_routes.py
│    │   └── role_routes.py
│    │
│    │── utils/
│    │   ├── __init__.p
│    │   └── groq_client.jsx
│    │
│    │── __init__.py
│    └── app.py
│
│─── .env
│─── .gitignore
└─── requirements.txt

```

---

# **Tech Stack**

### **Frontend**

* React (Vite)
* Tailwind CSS
* Framer Motion
* Lucide Icons

### **State & Data**

* Custom hooks (`useRoles`)
* LocalStorage for persistence
* JSON role definitions

---

# **Installation**

### 1️ Clone the repository

```bash
git clone https://github.com/your-username/lumina-ai-hub.git
cd lumina-ai-hub
```

### 2️ Install dependencies

```bash
npm install
```

### 3️ Run in development mode

```bash
npm run dev
```

### 4️ Build for production

```bash
npm run build
```

---

# **How Roles Work**

Each role contains:

```js
{
  id: "doctor",
  name: "Friendly Doctor",
  category: "Healthcare",
  emoji: "🩺",
  description: "Provides calm, patient-first guidance.",
  prompt: "You are a friendly professional doctor...",
  color: "border-green-300 hover:border-green-400",
}
```

Users can:
* Select a role
* Open role details
* Start a chat
* Create their own roles

---

# **useRoles Hook Explanation**

### Handles:

* Loading default roles
* Merging custom roles
* Saving user-created roles to localStorage
* Updating UI instantly

```js
const { customRoles, addRole, deleteRole } = useRoles();
```

---

# **UI Highlights**

### Dashboard

* Search bar with live filtering
* Category filter button group
* Roles grouped by category
* Multi-section grid layout

### RagCard

* Smooth animations
* Emoji + gradient header
* Highlighted search text
* Click to open or chat

### New Role Modal

* Shiny gradient buttons
* Form for role creation
* Passed to parent `onAddNewRole`

---

# **How to Add a New Role Programmatically**

```js
onAddNewRole({
  id: "custom-123",
  name: "AI Investor",
  category: "Finance",
  emoji: "💹",
  description: "Helps with stock market insights.",
  prompt: "You are an experienced financial advisor...",
});
```

Saved automatically.

---

# **Local Storage Keys Used**

| Key                | Purpose                  |
| ------------------ | ------------------------ |
| `lumina_roles`     | Stores user custom roles |
| `lumina_theme`     | Dark/Light theme         |
| `lumina_last_role` | Last selected role       |

---
# Author
Harsh
---