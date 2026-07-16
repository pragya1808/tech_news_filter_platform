from fastapi import APIRouter
from sqlalchemy.orm import Session

from backend.app.core.database import SessionLocal
from backend.app.crud import analytics as crud

router = APIRouter(tags=["Analytics"])


@router.get("/analytics/overview")
def overview():
    db: Session = SessionLocal()

    try:
        return crud.get_overview(db)
    finally:
        db.close()


@router.get("/analytics/sources")
def sources():
    db: Session = SessionLocal()

    try:
        return crud.get_articles_per_source(db)
    finally:
        db.close()


@router.get("/analytics/topics")
def topics():
    db: Session = SessionLocal()

    try:
        return crud.get_articles_per_topic(db)
    finally:
        db.close()


@router.get("/analytics/daily")
def daily():
    db: Session = SessionLocal()

    try:
        return crud.get_articles_per_day(db)
    finally:
        db.close()