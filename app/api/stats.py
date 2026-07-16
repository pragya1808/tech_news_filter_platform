from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.crud import stats as crud

router = APIRouter(tags=["Statistics"])


@router.get("/stats")
def get_stats():

    db: Session = SessionLocal()

    try:
        return crud.get_stats(db)

    finally:
        db.close()