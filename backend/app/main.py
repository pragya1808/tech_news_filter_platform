from fastapi import FastAPI
from app.api.sources import router as sources_router
from app.api.articles import router as articles_router
from app.api.topics import router as topics_router
from app.api.stats import router as stats_router
from app.api.health import router as health_router
from app.api import analytics
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Tech News API",
)

app.include_router(articles_router)
app.include_router(topics_router)
app.include_router(stats_router)
app.include_router(health_router)
app.include_router(analytics.router)
app.include_router(sources_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)