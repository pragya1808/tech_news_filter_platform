from sqlalchemy.orm import Session
from sqlalchemy import select, func
from datetime import datetime, UTC

from app.models import Article, Topic

def get_stats(db: Session):

    today = datetime.now(UTC).date()

    total_articles = db.scalar(
        select(func.count()).select_from(Article)
    )

    total_topics = db.scalar(
        select(func.count()).select_from(Topic)
    )

    total_sources = db.scalar(
        select(func.count(func.distinct(Article.source)))
    )

    articles_today = db.scalar(
        select(func.count())
        .select_from(Article)
        .where(func.date(Article.published_at) == today)
    )

    last_updated = db.scalar(
        select(func.max(Article.published_at))
    )

    return {
        "total_articles": total_articles,
        "total_topics": total_topics,
        "total_sources": total_sources,
        "articles_today": articles_today,
        "last_updated": last_updated,
    }