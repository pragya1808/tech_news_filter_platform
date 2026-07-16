from datetime import datetime
from pydantic import BaseModel


# -------------------------
# Topics
# -------------------------

class TopicResponse(BaseModel):
    id: int
    name: str

    model_config = {
        "from_attributes": True
    }


# -------------------------
# Articles
# -------------------------

class ArticleResponse(BaseModel):
    id: int

    title: str
    summary: str | None

    author: str | None
    source: str
    url: str

    published_at: datetime | None
    extracted_at: datetime

    topics: list[TopicResponse]

    model_config = {
        "from_attributes": True
    }


class ArticleListResponse(BaseModel):
    total: int
    skip: int
    limit: int
    items: list[ArticleResponse]


# -------------------------
# Analytics
# -------------------------

class StatsResponse(BaseModel):
    total_articles: int
    total_sources: int
    total_topics: int
    latest_article: datetime | None


class SourceAnalyticsResponse(BaseModel):
    source: str
    count: int


class TopicAnalyticsResponse(BaseModel):
    topic: str
    count: int


class DailyAnalyticsResponse(BaseModel):
    date: datetime | str
    count: int