from sqlalchemy.orm import Session
from backend.app.models import Topic


def get_topics(db: Session):
    return (
        db.query(Topic)
        .order_by(Topic.name)
        .all()
    )