from sqlalchemy import select, or_, func, desc
from sqlalchemy.orm import Session, selectinload

from backend.app.models import Article, Topic


def get_articles(
    db: Session,
    topic: str | None = None,
    source: str | None = None,
    skip: int = 0,
    limit: int = 20,
):
    stmt = (
        select(Article)
        .options(selectinload(Article.topics))
    )

    if source:
        stmt = stmt.where(
            Article.source == source
        )

    if topic:
        stmt = (
            stmt.join(Article.topics)
            .where(Topic.name == topic)
        )

    stmt = (
        stmt
        .order_by(desc(Article.published_at))
        .offset(skip)
        .limit(limit)
    )

    return db.scalars(stmt).unique().all()


def get_article(
    db: Session,
    article_id: int,
):
    stmt = (
        select(Article)
        .options(selectinload(Article.topics))
        .where(Article.id == article_id)
    )

    return db.scalar(stmt)


def search_articles(
    db: Session,
    query: str,
    skip: int = 0,
    limit: int = 20,
):
    stmt = (
        select(Article)
        .options(selectinload(Article.topics))
        .where(
            or_(
                Article.title.ilike(f"%{query}%"),
                Article.summary.ilike(f"%{query}%"),
            )
        )
        .order_by(desc(Article.published_at))
        .offset(skip)
        .limit(limit)
    )

    return db.scalars(stmt).unique().all()


def get_latest_articles(
    db: Session,
    limit: int = 20,
):
    stmt = (
        select(Article)
        .options(selectinload(Article.topics))
        .order_by(desc(Article.published_at))
        .limit(limit)
    )

    return db.scalars(stmt).unique().all()


def get_article_count(
    db: Session,
    topic: str | None = None,
    source: str | None = None,
):
    stmt = select(func.count(Article.id))

    return db.scalar(stmt)