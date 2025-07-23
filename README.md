# File Storage Portal

A **fullstack web application** for uploading, listing, downloading, and deleting files via **Spring Boot**, **React (Vite)**, **AWS S3**, and **Docker**.

---

# Tech Stack

| Layer     | Technologies                            |
|-----------|------------------------------------------|
| Frontend  | React + Vite, Fetch API, CSS             |
| Backend   | Spring Boot, AWS SDK (S3), Swagger, JUnit|
| Storage   | AWS S3                                   |
| DevOps    | Docker, Docker Compose                   |

---

# Features

- Upload files to AWS S3
- View a list of uploaded files
- Open/download files via public S3 links
- Delete files from UI and S3
- Connect React frontend to Spring Boot API
- Run everything via Docker Compose

---

# Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/file-storage-portal.git
cd file-storage-portal

# 2. Create a .env file in the frontend folder with the API URL
echo "VITE_API_URL=http://localhost:8080/api" > frontend/.env

# 3. Start the fullstack app
docker-compose up --build

     Backend: http://localhost:8080/swagger-ui
     Frontend: http://localhost:5173
