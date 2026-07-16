# Tech News Platform

A data engineering project that automatically collects technology news from multiple sources, cleans and organizes the data, stores it in a database, and exposes it through a REST API.

The goal of this project is to build a complete end-to-end data pipeline using modern data engineering tools.

---

## What does this project do?

Instead of manually visiting different websites for technology news, this application automatically:

- Collects articles from multiple news sources
- Cleans and standardizes the data
- Removes duplicate articles
- Extracts useful metadata like keywords and companies
- Stores everything in PostgreSQL
- Makes the data available through a FastAPI backend
- Runs automatically on a schedule using Apache Airflow

---

## How it works

```
News Sources
(RSS, Reddit, Hacker News)
          │
          ▼
      Airflow ETL
          │
   Extract Articles
          │
          ▼
 Transform Data
 - Clean HTML
 - Remove duplicates
 - Normalize dates
 - Extract keywords
 - Detect companies
          │
          ▼
 Store in PostgreSQL
          │
          ▼
     FastAPI Backend
          │
          ▼
   REST API Endpoints
```

---

## Technologies Used

- Python
- PostgreSQL
- SQLAlchemy
- FastAPI
- Apache Airflow
- Docker & Docker Compose
- RSS feeds
- Reddit API
- Hacker News API

---

## Current Features

- Automated data ingestion
- Multiple news sources
- Duplicate removal
- Data cleaning
- Keyword extraction
- Company extraction
- PostgreSQL storage
- REST API
- Scheduled ETL with Airflow
- Fully containerized with Docker

---

## Project Structure

```
tech_news_platform/
│
├── airflow/          # Airflow DAGs and configuration
├── app/              # FastAPI application
├── data/             # Local data files
├── docker/           # Dockerfiles
├── etl/              # Extract, Transform, Load pipeline
├── tests/            # Tests
│
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

## Running the project

### Clone the repository

```bash
git clone <repository-url>
cd tech_news_platform
```

### Start all services

```bash
docker compose up --build
```

This starts:

- PostgreSQL database
- FastAPI server
- Airflow scheduler
- Airflow webserver

---

## Access the application

### FastAPI

```
http://localhost:8000
```

Interactive API documentation:

```
http://localhost:8000/docs
```

### Airflow

```
http://localhost:8080
```

Default credentials:

```
Username: admin
Password: admin
```

---

## Data Pipeline

The Airflow DAG runs the following steps:

1. Fetch articles from multiple sources
2. Clean and normalize the data
3. Remove duplicate articles
4. Extract keywords and company names
5. Store the processed data in PostgreSQL

The pipeline can be triggered manually or scheduled to run automatically.

---

## Example API Endpoints

```
GET /articles
```

Returns all stored articles.

```
GET /articles/{id}
```

Returns a specific article.

```
GET /health
```

Checks whether the API is running.

---

## Future Improvements

- NewsAPI integration
- React dashboard
- Elasticsearch for full-text search
- Machine Learning based article categorization
- Sentiment analysis
- Named Entity Recognition
- Docker deployment to cloud
- CI/CD pipeline using GitHub Actions
- Monitoring with Prometheus and Grafana

---

## Why this project?

This project demonstrates practical data engineering concepts including:

- ETL Pipelines
- Data Cleaning
- Workflow Orchestration
- REST API Development
- Database Design
- Docker Containerization
- Automated Scheduling
- End-to-End Data Pipelines

---

## License

This project is intended for learning and portfolio purposes.