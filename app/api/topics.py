from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.schemas import TopicResponse
from app.crud import topics as crud

router = APIRouter(tags=["Topics"])


@router.get(
    "/topics",
    response_model=list[TopicResponse],
)
def get_topics():

    db: Session = SessionLocal()

    try:
        return crud.get_topics(db)

    finally:
        db.close()