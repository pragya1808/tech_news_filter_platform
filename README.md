# 📰 Tech News Platform

Tech News Platform is an application that automatically collects technology news from multiple trusted sources, organizes it into one place, and makes it easy to browse through a web interface and REST API.

Instead of checking several websites every day, this platform continuously gathers new articles, processes them, stores them in a database, and keeps everything updated automatically.

---

## Why this project?

Technology news is spread across many websites like TechCrunch, Hacker News, Reddit, and various RSS feeds.

This project brings all of that information together into a single platform where users can:

- Read the latest technology news
- Search articles
- Filter by topic or source
- View analytics about recent news
- Access the data through an API

The data is automatically updated on a schedule, so the platform always stays current.

---

## Features

- 📰 Collects news from multiple sources
- 🔄 Automatically updates articles
- 🔍 Search for articles
- 🏷 Browse articles by topic
- 📊 View analytics and statistics
- 🚀 REST API for developers
- 🐳 Fully containerized with Docker
- ⏰ Automated data pipeline using Apache Airflow

---

## How it works

```
News Sources
      │
      ▼
Collect Articles
      │
      ▼
Clean & Organize Data
      │
      ▼
Store in Database
      │
      ▼
REST API
      │
      ▼
Web Dashboard
```

The entire process runs automatically, ensuring that new articles are added without any manual work.

---

## Technologies Used

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Apache Airflow
- React
- Docker

---

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd tech_news_platform
```

### Start the application

```bash
docker compose up --build
```

This starts:

- PostgreSQL database
- FastAPI backend
- Apache Airflow
- React frontend

---

## Access the application

### Frontend

```
http://localhost:5173
```

### API Documentation

```
http://localhost:8001/docs
uvicorn backend.app.main:app --reload --port 8001
```

### Airflow Dashboard

```
http://localhost:8080
```

Default login:

```
Username: admin
Password: admin
```

---

## API Overview

The API provides endpoints to:

- Retrieve all articles
- View the latest articles
- Search articles
- Browse topics
- View analytics
- Access platform statistics

Interactive API documentation is available through Swagger.

---

## Project Structure

```
airflow/      → Workflow automation
app/          → FastAPI backend
etl/          → Data collection and processing
frontend/     → React web application
docker/       → Docker configuration
```

---

## Future Improvements

Some planned features include:

- Better search capabilities
- Trending topics
- Company and keyword analysis
- Sentiment analysis
- User authentication
- Cloud deployment

---

## License

This project was built for learning, experimentation, and portfolio purposes.