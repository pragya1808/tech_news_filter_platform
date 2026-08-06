import logging
from datetime import datetime, UTC

import feedparser

from etl.config import REDDIT_FEEDS

logger = logging.getLogger(__name__)


def get_reddit_articles():
    articles = []

    logger.info("Fetching Reddit articles...")

    for subreddit, url in REDDIT_FEEDS.items():
        logger.info(f"Fetching r/{subreddit}...")

        try:
            feed = feedparser.parse(url)

            if feed.bozo:
                logger.warning(f"Malformed RSS feed for r/{subreddit}")

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
                        "source": f"Reddit - r/{subreddit}",
                        "extracted_at": datetime.now(UTC).isoformat(),
                    }

                    articles.append(article)

                except Exception as e:
                    logger.warning(
                        f"Skipping malformed Reddit article from r/{subreddit}: {e}"
                    )

        except Exception as e:
            logger.error(f"Failed to fetch r/{subreddit}: {e}")

    logger.info(f"Fetched {len(articles)} Reddit articles.")

    return articles