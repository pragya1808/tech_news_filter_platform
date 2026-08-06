                  News Sources
      ┌────────────┬─────────────┬────────────┐
      │ RSS Feeds  │ NewsAPI     │ Web Scraping
      └─────┬──────┴──────┬──────┴────────────┐
            │             │
         Airflow DAG (ETL)
            │
      Extract
            │
      Transform
      - Remove duplicates
      - Clean HTML
      - Standardize dates
      - Detect language
      - Extract keywords
            │
      Load
            │
      PostgreSQL
            │
      FastAPI Backend
            │
 REST APIs
            │
Dashboard / Postman / Frontend

I'd actually reorder the roadmap like this:

✅ Articles API
✅ Stats API
✅ Analytics API
Frontend Integration ← Connect everything and get a working dashboard.
Automatic Topic Classification
Company Extraction (spaCy NER)
Keyword Extraction (KeyBERT/YAKE)
Sentiment Analysis (VADER)
Pipeline Monitoring (once the ETL is stable)
Deployment