from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.models import Article, Topic


def get_overview(db: Session):
    total_articles = db.scalar(
        select(func.count(Article.id))
    )

    total_sources = db.scalar(
        select(func.count(func.distinct(Article.source)))
    )

    total_topics = db.scalar(
        select(func.count(Topic.id))
    )

    latest_article = db.scalar(
        select(func.max(Article.published_at))
    )

    return {
        "total_articles": total_articles,
        "total_sources": total_sources,
        "total_topics": total_topics,
        "latest_article": latest_article,
    }


def get_articles_per_source(db: Session):
    stmt = (
        select(
            Article.source,
            func.count(Article.id).label("count"),
        )
        .group_by(Article.source)
        .order_by(func.count(Article.id).desc())
    )

    rows = db.execute(stmt).all()

    return [
        {
            "source": source,
            "count": count,
        }
        for source, count in rows
    ]


def get_articles_per_topic(db: Session):
    stmt = (
        select(
            Topic.name,
            func.count(Article.id).label("count"),
        )
        .join(Topic.articles)
        .group_by(Topic.id)
        .order_by(func.count(Article.id).desc())
    )

    rows = db.execute(stmt).all()

    return [
        {
            "topic": topic,
            "count": count,
        }
        for topic, count in rows
    ]


def get_articles_per_day(db: Session):
    stmt = (
        select(
            func.date(Article.published_at).label("date"),
            func.count(Article.id).label("count"),
        )
        .group_by(func.date(Article.published_at))
        .order_by(func.date(Article.published_at))
    )

    rows = db.execute(stmt).all()

    return [
        {
            "date": date,
            "count": count,
        }
        for date, count in rows
    ]