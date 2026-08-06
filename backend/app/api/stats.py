from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.crud import stats as crud
from app.schemas import StatsResponse

router = APIRouter(tags=["Statistics"])

DBSession = Annotated[Session, Depends(get_db)]


@router.get(
    "/stats",
    response_model=StatsResponse,
    summary="Dashboard statistics",
)
def get_stats(db: DBSession):
    return crud.get_stats(db)