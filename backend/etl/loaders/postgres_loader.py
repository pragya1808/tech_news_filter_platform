from __future__ import annotations
import pandas as pd

from datetime import datetime
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models import Article, Topic


class PostgresLoader:
    """Loads transformed articles into PostgreSQL."""

    def __init__(self):
        self.session: Session = SessionLocal()

    @staticmethod
    def _parse_datetime(value):

        if value is None:
            return None

        if pd.isna(value):      # Handles NaT
            return None

        if isinstance(value, pd.Timestamp):
            return value.to_pydatetime()

        if isinstance(value, datetime):
            return value

        if isinstance(value, str):
            return datetime.fromisoformat(
                value.replace("Z", "+00:00")
            )

        return None

    def _load_existing_urls(self) -> set[str]:
        """
        Load all existing article URLs.
        """

        urls = self.session.scalars(
            select(Article.url)
        ).all()

        return set(urls)

    def _load_existing_topics(self) -> dict[str, Topic]:
        """
        Load all topics into memory.
        """

        topics = self.session.scalars(
            select(Topic)
        ).all()

        return {topic.name: topic for topic in topics}

    def _create_article(self, data: dict[str, Any]) -> Article:
        """
        Create an Article ORM object.
        """

        article = Article(
            title=data["title"],
            summary=data.get("summary"),
            author=data.get("author"),
            source=data["source"],
            url=data["url"],
            published_at=self._parse_datetime(
                data.get("published_at")
            ),
            extracted_at=self._parse_datetime(
                data.get("extracted_at")
            ),
        )

        self.session.add(article)

        return article

    def load(self, articles: list[dict[str, Any]]) -> None:
        """
        Load articles into PostgreSQL.
        """

        inserted = 0
        skipped = 0

        existing_urls = self._load_existing_urls()
        existing_topics = self._load_existing_topics()

        try:
            for data in articles:

                url = data["url"]

                if url in existing_urls:
                    skipped += 1
                    continue

                article = self._create_article(data)

                for topic_name in data.get("topics", []):

                    topic = existing_topics.get(topic_name)

                    if topic is None:
                        topic = Topic(name=topic_name)
                        self.session.add(topic)
                        self.session.flush()

                        existing_topics[topic_name] = topic

                    article.topics.append(topic)

                existing_urls.add(url)
                inserted += 1

            self.session.commit()

            print(f"Inserted : {inserted}")
            print(f"Skipped  : {skipped}")

        except Exception as e:
            self.session.rollback()
            print(f"Error: {e}")
            raise

        finally:
            self.session.close()