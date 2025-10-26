# 🧾 Sales Management System

A full-stack Sales Management System built using **Laravel (backend)** and **React (frontend)**.  
This system helps manage sales, products, customers, and reports efficiently with a modern user interface.

---

## 🚀 Features

### 👨‍💼 Admin Features
- Add, update, delete products
- Manage users
- Approve orders

### 🧍‍♂️ User Features
- Register and login
- View and purchase products
- Manage profile
- View order history

---
## ⚙️ Setup Instructions

Follow these steps to set up and run the project locally:


### 🔹 1. Clone the Repository
```bash
git clone https://github.com/utshathapa/Sales-management-system.git
cd Sales-management-system
```
###🔹 2. Backend Setup (Laravel)
```bash
cd backend
cp .env.sample .env
composer install
php artisan key:generate
php artisan migrate
```
###🔹 3. Frontend Setup (React)
```bash
cd frontend
npm install
```
###🔹 4. Run the project
```bash
cd  Sales-management-system
npm run dev
```
### 🧠 Tech Stack
Frontend: React, Vite, Axios, Tailwind CSS
Backend: Laravel, PHP, MySQL
Tools: Composer, Node.js, Git, VS Code, Postman

## 📸 Screenshots

### User Interface
- **Landing Page**  
  ![Landing Page](screenshots/landingpage.png)

- **Home Page**  
  ![Home Page](screenshots/homepage.png)

- **Products**  
  ![Products](screenshots/product_page.png)

- **Shopping Cart**  
  ![Cart](screenshots/cart.png)

- **Login**  
  ![Login](screenshots/login.png)

- **Sign Up**  
  ![Sign Up](screenshots/signup.png)

### Admin Panel
- **Dashboard**  
  ![Dashboard](screenshots/dashboard.png)

- **Customer Management**  
  ![Customers](screenshots/customer.png)

- **Add Product**  
  ![Add Product](screenshots/addp.png)

- **Order Management**  
  ![Orders](screenshots/neworder.png)
  ![Order Details](screenshots/view_new_order_details.png)

