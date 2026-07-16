from datetime import datetime

from sqlalchemy import (
    Table,
    Column,
    ForeignKey,
    DateTime,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.core.database import Base


# Association table
article_topics = Table(
    "article_topics",
    Base.metadata,
    Column(
        "article_id",
        ForeignKey("articles.id"),
        primary_key=True,
    ),
    Column(
        "topic_id",
        ForeignKey("topics.id"),
        primary_key=True,
    ),
)


class Article(Base):
    __tablename__ = "articles"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    title: Mapped[str] = mapped_column(Text, nullable=False)

    summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    author: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    source: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    url: Mapped[str] = mapped_column(
        Text,
        unique=True,
        nullable=False,
    )

    published_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    extracted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False,
    )

    topics: Mapped[list["Topic"]] = relationship(
        secondary=article_topics,
        back_populates="articles",
    )


class Topic(Base):
    __tablename__ = "topics"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    articles: Mapped[list[Article]] = relationship(
        secondary=article_topics,
        back_populates="topics",
    )