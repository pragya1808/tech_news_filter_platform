from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from backend.app.core.dependencies import get_db
from backend.app.crud import analytics as crud
from backend.app.schemas import (
    AnalyticsOverviewResponse,
    SourceAnalyticsResponse,
    TopicAnalyticsResponse,
    DailyAnalyticsResponse,
)

router = APIRouter(tags=["Analytics"])

DBSession = Annotated[Session, Depends(get_db)]


@router.get(
    "/analytics/overview",
    response_model=AnalyticsOverviewResponse,
    summary="Analytics overview",
)
def overview(
    db: DBSession,
):
    return crud.get_overview(db)


@router.get(
    "/analytics/sources",
    response_model=list[SourceAnalyticsResponse],
    summary="Articles grouped by source",
)
def sources(
    db: DBSession,
    limit: int = Query(default=10, ge=1, le=100),
):
    return crud.get_articles_per_source(
        db=db,
        limit=limit,
    )


@router.get(
    "/analytics/topics",
    response_model=list[TopicAnalyticsResponse],
    summary="Articles grouped by topic",
)
def topics(
    db: DBSession,
    limit: int = Query(default=10, ge=1, le=100),
):
    return crud.get_articles_per_topic(
        db=db,
        limit=limit,
    )


@router.get(
    "/analytics/daily",
    response_model=list[DailyAnalyticsResponse],
    summary="Daily article counts",
)
def daily(
    db: DBSession,
):
    return crud.get_articles_per_day(db)