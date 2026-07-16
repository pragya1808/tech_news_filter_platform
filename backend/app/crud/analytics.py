from sqlalchemy import select, func
from sqlalchemy.orm import Session

from backend.app.models import Article, Topic


def get_overview(db: Session):
    total_articles = db.scalar(
        select(func.count(Article.id))
    ) or 0

    total_sources = db.scalar(
        select(func.count(func.distinct(Article.source)))
    ) or 0

    total_topics = db.scalar(
        select(func.count(Topic.id))
    ) or 0

    first_article = db.scalar(
        select(func.min(Article.published_at))
    )

    latest_article = db.scalar(
        select(func.max(Article.published_at))
    )

    if first_article and latest_article:
        days = (
            latest_article.date()
            - first_article.date()
        ).days + 1

        avg_articles_per_day = round(
            total_articles / days,
            2,
        )
    else:
        avg_articles_per_day = 0

    return {
        "total_articles": total_articles,
        "total_sources": total_sources,
        "total_topics": total_topics,
        "first_article": first_article,
        "latest_article": latest_article,
        "avg_articles_per_day": avg_articles_per_day,
    }


def get_articles_per_source(
    db: Session,
    limit: int = 10,
):
    stmt = (
        select(
            Article.source,
            func.count(Article.id).label("count"),
        )
        .group_by(Article.source)
        .order_by(func.count(Article.id).desc())
        .limit(limit)
    )

    rows = db.execute(stmt).all()

    return [
        {
            "source": source,
            "count": count,
        }
        for source, count in rows
    ]


def get_articles_per_topic(
    db: Session,
    limit: int = 10,
):
    stmt = (
        select(
            Topic.name,
            func.count(Article.id).label("count"),
        )
        .join(Topic.articles)
        .group_by(Topic.id, Topic.name)
        .order_by(func.count(Article.id).desc())
        .limit(limit)
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