from sqlalchemy.orm import Session
from app.models import Topic


def get_topics(db: Session):
    return (
        db.query(Topic)
        .order_by(Topic.name)
        .all()
    )