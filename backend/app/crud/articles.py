from sqlalchemy import select, or_, func, asc,desc
from sqlalchemy.orm import Session, selectinload
from datetime import datetime, timedelta,date
from backend.app.models import Article, Topic
from enum import Enum

class SortField(str, Enum):
    published_at = "published_at"
    title = "title"
    source = "source"

class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"

def get_articles(
    db: Session,
    topic: str | None = None,
    source: str | None = None,
    from_date: date | None = None
    to_date: date | None = None
    days: int | None = None
    sort: SortField = SortField.published_at
    order: SortOrder = SortOrder.desc
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

    if from_date:
        stmt = stmt.where(
            Article.published_at >= from_date
        )

    if to_date:
        stmt = stmt.where(
            Article.published_at <= to_date
        )

    if days:
        cutoff = datetime.now(UTC) - timedelta(days=days)

        stmt = stmt.where(
            Article.published_at >= cutoff
        )

    sort_columns = {
        "published_at": Article.published_at,
        "title": Article.title,
        "source": Article.source,
    }

    sort_column = sort_columns.get(sort, Article.published_at)

    if order.lower() == "asc":
        stmt = stmt.order_by(asc(sort_column))
    else:
        stmt = stmt.order_by(desc(sort_column))

    stmt = stmt.offset(skip).limit(limit)

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
    from_date=None,
    to_date=None,
    days=None,
):
    stmt = select(func.count(Article.id))

    if source:
        stmt = stmt.where(
            Article.source == source
        )

    if topic:
        stmt = (
            stmt.join(Article.topics)
            .where(Topic.name == topic)
        )

    if from_date:
        stmt = stmt.where(
            Article.published_at >= from_date
        )

    if to_date:
        stmt = stmt.where(
            Article.published_at <= to_date
        )

    if days:
        cutoff = datetime.utcnow() - timedelta(days=days)

        stmt = stmt.where(
            Article.published_at >= cutoff
        )

    return db.scalar(stmt)

def get_search_count(
    db: Session,
    query: str,
):
    stmt = (
        select(func.count(Article.id))
        .where(
            or_(
                Article.title.ilike(f"%{query}%"),
                Article.summary.ilike(f"%{query}%"),
            )
        )
    )

    return db.scalar(stmt)