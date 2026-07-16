from typing import Annotated
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from backend.app.core.dependencies import get_db
from backend.app.crud import articles as crud
from backend.app.schemas import (
    ArticleResponse,
    ArticleListResponse,
)

router = APIRouter(tags=["Articles"])

DBSession = Annotated[Session, Depends(get_db)]


@router.get(
    "/articles",
    response_model=ArticleListResponse,
    summary="Get articles",
)
def get_articles(
    db: DBSession,
    topic: str | None = None,
    source: str | None = None,
    from_date: date | None = None,
    to_date: date | None = None,
    days: int | None = None,
    sort: str = "published_at",
    order: str = "desc",
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),

):
    articles = crud.get_articles(
        db=db,
        topic=topic,
        source=source,
        from_date=from_date,
        to_date=to_date,
        days=days,
        sort=sort,
        order=order,
        skip=skip,
        limit=limit,
    )

    total = crud.get_article_count(
        db=db,
        topic=topic,
        source=source,
        from_date=from_date,
        to_date=to_date,
        days=days,
    )

    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "items": articles,
    }


@router.get(
    "/articles/search",
    response_model=ArticleListResponse,
    summary="Search articles",
)
def search_articles(
    q: str,
    db: DBSession,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
):
    articles = crud.search_articles(
        db=db,
        query=q,
        skip=skip,
        limit=limit,
    )
    total = crud.get_search_count(
        db=db,
        query=q,
    )
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "items": articles,
    }


@router.get(
    "/articles/latest",
    response_model=list[ArticleResponse],
    summary="Latest articles",
)
def latest_articles(
    db: DBSession,
    limit: int = Query(default=20, ge=1, le=100),
):
    return crud.get_latest_articles(
        db,
        limit,
    )


@router.get(
    "/articles/{article_id}",
    response_model=ArticleResponse,
    summary="Get article by ID",
)
def get_article(
    article_id: int,
    db: DBSession,
):
    article = crud.get_article(
        db,
        article_id,
    )

    if article is None:
        raise HTTPException(
            status_code=404,
            detail="Article not found",
        )

    return article