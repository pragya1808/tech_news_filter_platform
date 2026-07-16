from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import or_
from sqlalchemy import func

from app.models import Article, Topic

def get_stats(db: Session):

    total_articles = db.scalar(
        select(func.count()).select_from(Article)
    )

    total_topics = db.scalar(
        select(func.count()).select_from(Topic)
    )

    return {
        "total_articles": total_articles,
        "total_topics": total_topics,
    }