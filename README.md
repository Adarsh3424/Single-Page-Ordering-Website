# 🌟 Single-Page Ordering Website

A modern **single-page ordering application** built using **Next.js**, **Node.js (Express)**, and **MongoDB** for managing inventory and a shopping cart system.

---

## 🌐 Deploy Link  
🚀 **Live Demo**: [Order Application](https://order-frontend-beryl.vercel.app/)  

---

## ✨ Features
- 🛒 **Add, update, and delete items** in inventory.  
- 🔍 **Search items** by name or SKU.  
- 📦 **Manage your cart**: add, remove, or update item quantities.  
- 💰 **Real-time total** cart amount calculation.  

---

## 🚀 Installation and Setup

### ⚙️ Prerequisites
- 📦 **Node.js** (v14+)  
- 🗂️ **MongoDB**  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Set Up Environment Variables  
Create a `.env` file in the root directory with the following:  
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3️⃣ Install Dependencies  
Install backend and frontend dependencies:  
```bash
# Install server dependencies
cd backend
npm install

# Install client dependencies
cd ../frontend
npm install
```

### 4️⃣ Run the Application  
Start the backend and frontend servers:  
```bash
# Start the backend server
cd backend
npm start

# Start the frontend server
cd ../frontend
npm run dev
```

### 5️⃣ Open in Browser  
🌐 Visit **[http://localhost:3000](http://localhost:3000)** to view the application.  

---

## 🗂️ Folder Structure  
```plaintext
root/
├── backend/          # 🛠️ Express server and APIs
│   ├── models/       # 📦 Mongoose models (Item, Cart)
│   ├── routes/       # 🌐 API routes
│   └── server.js     # 🚀 Entry point for backend
├── frontend/         # 🖼️ Next.js application
│   ├── pages/        # 📄 React pages
│   ├── styles/       # 🎨 CSS files
│   └── _app.js       # 🛠️ Next.js app configuration
```

---

## 🌐 API Endpoints  
**Base URL**: `http://localhost:5000/api`  

- 📋 **GET** `/items` - Fetch all items.  
- ➕ **POST** `/items` - Add a new item.  
- ❌ **DELETE** `/items/:sku` - Delete an item.  
- 🛒 **POST** `/items/cart` - Add item to cart.  
- ❌ **DELETE** `/items/cart/:sku` - Remove item from cart.  
- 🔄 **PUT** `/items/cart/:sku` - Update item quantity in cart.  

---
