from __future__ import annotations

from datetime import datetime
from typing import Any

import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
import os

load_dotenv()

DATABASE_URL = os.getenv("AIRFLOW_URL")

engine = create_engine(DATABASE_URL)


class PostgresLoader:

    @staticmethod
    def _parse_datetime(value):

        if value is None:
            return None

        if pd.isna(value):
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

    def load(self, articles: list[dict[str, Any]]):

        inserted = 0
        skipped = 0

        with engine.begin() as conn:

            for article in articles:

                # Check duplicate URL
                exists = conn.execute(
                    text(
                        """
                        SELECT id
                        FROM articles
                        WHERE url = :url
                        """
                    ),
                    {"url": article["url"]},
                ).fetchone()

                if exists:
                    skipped += 1
                    continue

                # Insert article
                article_id = conn.execute(
                    text(
                        """
                        INSERT INTO articles
                        (title, summary, author, source, url,
                         published_at, extracted_at)

                        VALUES
                        (:title, :summary, :author,
                         :source, :url,
                         :published_at, :extracted_at)

                        RETURNING id
                        """
                    ),
                    {
                        "title": article["title"],
                        "summary": article.get("summary"),
                        "author": article.get("author"),
                        "source": article["source"],
                        "url": article["url"],
                        "published_at": self._parse_datetime(
                            article.get("published_at")
                        ),
                        "extracted_at": self._parse_datetime(
                            article.get("extracted_at")
                        ),
                    },
                ).scalar_one()

                # Handle topics
                for topic in article.get("topics", []):

                    topic_row = conn.execute(
                        text(
                            """
                            SELECT id
                            FROM topics
                            WHERE name=:name
                            """
                        ),
                        {"name": topic},
                    ).fetchone()

                    if topic_row:

                        topic_id = topic_row[0]

                    else:

                        topic_id = conn.execute(
                            text(
                                """
                                INSERT INTO topics(name)
                                VALUES(:name)
                                RETURNING id
                                """
                            ),
                            {"name": topic},
                        ).scalar_one()

                    conn.execute(
                        text(
                            """
                            INSERT INTO article_topics
                            (article_id, topic_id)

                            VALUES
                            (:article_id, :topic_id)
                            """
                        ),
                        {
                            "article_id": article_id,
                            "topic_id": topic_id,
                        },
                    )

                inserted += 1

        print(f"Inserted : {inserted}")
        print(f"Skipped  : {skipped}")