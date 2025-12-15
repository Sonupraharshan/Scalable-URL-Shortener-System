# 🔗 Scalable URL Shortener System

**Live Backend URL:** [http://51.21.253.171](http://51.21.253.171)
**GitHub Repository:** [https://github.com/Sonupraharshan/Scalable-URL-Shortener-System](https://github.com/Sonupraharshan/Scalable-URL-Shortener-System)

A **production-grade, scalable URL shortening backend** inspired by TinyURL and Bitly.
This project demonstrates **real-world backend engineering**, including clean architecture, caching, cloud deployment, and production best practices.

---

## 📌 Project Overview

This system allows users to:

* Convert long URLs into short URLs
* Redirect users efficiently with low latency
* Track basic analytics (click counts)
* Run reliably in a real cloud environment

The primary goal of this project is to demonstrate **backend system design**, **scalability readiness**, and **production deployment**, not just CRUD APIs.

---

## 🎯 Design Goals

* **Scalability** – Stateless backend with externalized state
* **Maintainability** – Layered architecture with clear separation of concerns
* **Reusability** – Modular services and abstractions
* **Production Readiness** – Deployed on AWS EC2 with PM2 and NGINX

---

## 🏗️ System Architecture

```
Client (Browser / Postman)
        |
        v
NGINX (Reverse Proxy - Port 80)
        |
        v
Node.js + Express API (Port 3000)
        |
        |── Redis Cloud (Caching Layer)
        |
        └── MongoDB Atlas (Persistent Storage)
```

### Architectural Decisions

* **NGINX** handles incoming HTTP traffic and forwards requests to Node.js
* **Node.js (Express)** exposes REST APIs and redirect logic
* **Redis Cloud** provides fast in-memory caching for redirection
* **MongoDB Atlas** stores permanent URL mappings
* **PM2** ensures the application stays alive and restarts on failure
* **AWS EC2** provides a controllable production environment

---

## 🧰 Tech Stack

| Layer           | Technology           |
| --------------- | -------------------- |
| Runtime         | Node.js (ES Modules) |
| Framework       | Express.js           |
| Database        | MongoDB Atlas        |
| Cache           | Redis Cloud          |
| Reverse Proxy   | NGINX                |
| Process Manager | PM2                  |
| Hosting         | AWS EC2 (Ubuntu)     |

---

## 📂 Project Structure

```
Scalable-URL-Shortener-System/
│
├── src/
│   ├── app.js                     # Application entry point
│   ├── loaders/                   # Infrastructure initialization
│   │   ├── express.js             # Express app setup
│   │   ├── mongoose.js            # MongoDB connection
│   │   └── redis.js               # Redis connection
│   ├── models/                    # MongoDB schemas
│   │   └── url.model.js
│   ├── controllers/               # HTTP request handlers
│   │   └── url.controller.js
│   ├── services/                  # Business logic
│   │   └── url.service.js
│   ├── cache/                     # Redis abstraction
│   │   └── url.cache.js
│   ├── routes/                    # API routes
│   │   ├── url.routes.js
│   │   ├── analytics.routes.js
│   │   └── redirect.routes.js
│   └── middleware/                # Cross-cutting concerns
│       ├── rateLimiter.js
│       └── errorHandler.js
│
├── public/
│   └── index.html                 # Documentation landing page
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔁 How the System Works

### 1️⃣ URL Creation Flow

1. Client sends a `POST` request with a long URL
2. URL is validated
3. A unique short code is generated
4. Mapping is stored in **MongoDB**
5. Mapping is cached in **Redis**
6. Short URL is returned to the client

---

### 2️⃣ URL Redirection Flow

1. User accesses the short URL
2. Redis cache is checked first
3. If cache hit → instant redirect
4. If cache miss → MongoDB lookup → cache result → redirect

This design significantly reduces database load during high traffic.

---

## 🌐 Base URL

```
http://51.21.253.171
```

Opening this URL in a browser shows a **documentation page** explaining how to use the API.

---

## 📡 API Endpoints

### 🔹 Health / Documentation

```
GET /
```

Returns the documentation landing page and confirms the service is running.

---

### 🔹 Create Short URL

```
POST /api/v1/shorten
```

**Request Body**

```json
{
  "longUrl": "https://www.google.com"
}
```

**Response**

```json
{
  "shortUrl": "http://51.21.253.171/abc123"
}
```

---

### 🔹 Redirect to Original URL

```
GET /:shortCode
```

**Example**

```
http://51.21.253.171/abc123
```

Redirects the user to the original long URL.

---

### 🔹 Analytics

```
GET /api/v1/analytics/:shortCode
```

Returns basic analytics such as click count for a short URL.

---

## 🖥️ Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sonupraharshan/Scalable-URL-Shortener-System.git
cd Scalable-URL-Shortener-System
```

---

### Step 2: Install Dependencies

```bash
npm install
```

---

### Step 3: Configure Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=<MongoDB Atlas URI>
REDIS_HOST=<Redis Cloud Host>
REDIS_PORT=<Redis Port>
REDIS_PASSWORD=<Redis Password>
```

> The `.env` file is intentionally **not committed** to GitHub for security reasons.

---

### Step 4: Run Locally

```bash
node src/app.js
```

---

## ☁️ Production Deployment (AWS EC2)

### Step 1: Launch EC2 Instance

* Ubuntu Server
* Security group allows ports **22, 80, 3000**

---

### Step 2: Install System Dependencies

```bash
sudo apt update
sudo apt install -y nodejs npm nginx
```

---

### Step 3: Clone Repository on EC2

```bash
git clone https://github.com/Sonupraharshan/Scalable-URL-Shortener-System.git
cd Scalable-URL-Shortener-System
npm install
```

---

### Step 4: Configure `.env` on EC2

```bash
nano .env
```

(Add MongoDB Atlas and Redis Cloud credentials)

---

### Step 5: Whitelist EC2 IP in MongoDB Atlas

* MongoDB Atlas → Security → Network Access
* Add EC2 public IP (`/32`)

---

### Step 6: Run Application with PM2

```bash
sudo npm install -g pm2
pm2 start src/app.js --name url-shortener
pm2 save
pm2 startup
```

---

### Step 7: Configure NGINX Reverse Proxy

```nginx
server {
    listen 80;
    server_name 51.21.253.171;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### Step 8: Restart NGINX

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## ⚙️ Scalability Considerations

* Stateless backend allows horizontal scaling
* Redis minimizes database reads
* MongoDB Atlas supports replication
* NGINX enables future load balancing
* Architecture is **load-balancer ready**, though only one instance is currently running

---

## 🔐 Security Practices

* `.env` excluded from version control
* No secrets committed to GitHub
* MongoDB IP whitelisting enabled
* Redis authentication enabled
* Rate limiting middleware applied

---

## 🚧 Future Enhancements

* True load balancing (NGINX / AWS ALB)
* Custom domains per short URL
* Expiring links
* Advanced analytics dashboard
* CI/CD pipeline
* Frontend dashboard
