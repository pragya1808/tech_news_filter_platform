import logging
from datetime import datetime, UTC

import feedparser

from etl.config import RSS_FEEDS

logger = logging.getLogger(__name__)


def fetch_feed(url: str):
    return feedparser.parse(url)


def get_rss_articles():
    articles = []

    logger.info("Fetching RSS articles...")

    for source, url in RSS_FEEDS.items():
        logger.info(f"Fetching articles from {source}...")

        try:
            feed = fetch_feed(url)

            if feed.bozo:
                logger.warning(f"Malformed RSS feed from {source}")

            for entry in feed.entries:
                try:
                    article = {
                        "title": entry.get("title", ""),
                        "author": entry.get("author", "Unknown"),
                        "summary": entry.get(
                            "summary",
                            entry.get("description", ""),
                        ),
                        "published_at": entry.get("published", ""),
                        "url": entry.get("link", ""),
                        "source": source,
                        "extracted_at": datetime.now(UTC).isoformat(),
                    }

                    articles.append(article)

                except Exception as e:
                    logger.warning(
                        f"Skipping malformed article from {source}: {e}"
                    )

        except Exception as e:
            logger.error(f"Failed to fetch RSS feed from {source}: {e}")

    logger.info(f"Fetched {len(articles)} RSS articles.")

    return articles