from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy import distinct
from backend.app.models import Article

def get_sources(db: Session):

    stmt = (
        select(distinct(Article.source))
        .order_by(Article.source)
    )

    return db.scalars(stmt).all()