# nginx-node-redis-lab

A sample full-stack project demonstrating a React (Vite) frontend, Node.js/Express backend, Redis cache, and Nginx reverse proxy — all running together with Docker Compose. The stack serves static frontend assets via Nginx, proxies API requests to the backend, and uses Redis for caching. Built to learn how Docker Compose and Nginx orchestrate multi-service apps.

---

## 🚀 Project Structure

```
my-app/
  api/              # Node.js + Express backend
  frontend/         # React + Vite frontend source
  nginx/
    static/         # Built frontend files (copied from frontend/dist)
    site.conf       # Nginx server block configuration
  docker-compose.yml (later)
  README.md
  .gitignore
```

---

## 🔧 How It Works

### 1. **Frontend (React + Vite)**

* Source code lives in `frontend/`.
* Built with:

  ```bash
  cd frontend
  npm run build
  ```
* Output (`dist/`) is copied into `nginx/static/`.
* Served by Nginx at `http://localhost/`.

### 2. **Backend (Node + Express)**

* Source lives in `api/`.
* Routes:

  * `GET /api/health` → check API & Redis connection
  * `GET /api/cache/set?key=foo&val=bar&ttl=10` → set key
  * `GET /api/cache/get?key=foo` → get key
* Runs on port `3000`.

### 3. **Redis**

* Runs in a Docker container:

  ```bash
  docker run -d -p 6379:6379 -p 8001:8001 redis/redis-stack
  ```
* API connects via host (`localhost`) or via service name (`redis`) if using Compose.
* Used for caching values and quick storage.

### 4. **Nginx**

* Acts as **reverse proxy** and **static file server**.
* Config (`site.conf`) rules:

  * `/` → serves frontend static files.
  * `/api/` → proxies requests to Node backend (`127.0.0.1:3000`).
* Runs as a Linux service on Ubuntu.

---

## ⚙️ How Nginx Works (in simple words)

* Nginx is a **web server** that listens on ports (`80`/`443`).
* It can serve static files **directly from disk**.
* It can forward traffic to backend apps (**reverse proxy**).
* Common pattern:

  ```
  Browser → Nginx (port 80/443) → Backend apps (Node, Python, etc.)
                                 → Static files (/index.html, CSS, JS)
  ```

---

## 🐳 How Docker Works

* Docker runs apps in **isolated containers** with all dependencies.
* Instead of installing Redis directly, we ran:

  ```bash
  docker run -d -p 6379:6379 redis:7
  ```
* That started Redis in a container, accessible on port `6379`.
* With Docker Compose, we can later describe **all services** (`api`, `nginx`, `redis`) in one `docker-compose.yml`.

---

## 💾 How Redis Works

* Redis is an **in-memory key-value database**.
* Great for caching, fast lookups, and ephemeral data.
* Example:

  * `SET foo bar EX 15` → stores `"bar"` at key `"foo"` for 15s.
  * `GET foo` → returns value or `(nil)` if expired.

---

## ⚡ Development Flow

1. Start backend:

   ```bash
   cd api
   npm install
   node src/server.js
   ```

   Runs on `http://127.0.0.1:3000`.

2. Build frontend:

   ```bash
   cd frontend
   npm run build
   cp -r dist/* ../nginx/static/
   ```

3. Start Nginx:

   ```bash
   sudo systemctl start nginx
   sudo systemctl reload nginx
   ```

4. Visit app:

   * Frontend: `http://localhost/`
   * API: `http://localhost/api/health`

---

## 🏗️ Deployment (EC2 example)

1. Provision **EC2 Ubuntu** VM.
2. Install Node.js + Nginx + Docker.
3. Copy backend (`api/`) and build it.
4. Copy frontend build into `/var/www/my-app`.
5. Place `site.conf` in `/etc/nginx/sites-enabled/`.
6. Run backend with **PM2** or Docker.
7. Start Redis with Docker or use AWS ElastiCache.
8. Secure with **Let’s Encrypt**:

   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d example.com -d www.example.com
   ```

---

## 📚 Future Improvements

* Switch to Docker Compose for the whole stack.
* Add **CI/CD pipeline** (GitHub Actions) to auto-deploy builds.
* Host frontend on **S3 + CloudFront**, backend on **ECS/EKS**.
* Use **AWS ElastiCache** for Redis in production.
* Add **HTTPS**, logging, monitoring.

---
 Developed with ❤️ by Narendra Jethi X ChatGPT.\
 I would like to thank ChatGPT for this wonderful Documentation.\
 Thank you!
