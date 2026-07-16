from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.crud import sources as crud

router = APIRouter(tags=["Sources"])


@router.get(
    "/sources",
    response_model=list[str],
)
def get_sources():

    db: Session = SessionLocal()

    try:
        return crud.get_sources(db)

    finally:
        db.close()