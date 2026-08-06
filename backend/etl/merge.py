import logging

from etl.extractors.rss_extractor import get_rss_articles
from etl.extractors.reddit_extractor import get_reddit_articles
from etl.extractors.hackernews_extractor import get_hackernews_articles

logger = logging.getLogger(__name__)


def merge_articles():
    """
    Collect articles from all sources.
    """
    articles = []

    extractors = [
        ("RSS", get_rss_articles),
        ("Reddit", get_reddit_articles),
        ("Hacker News", get_hackernews_articles),
    ]

    for name, extractor in extractors:
        logger.info(f"Fetching {name} articles...")

        try:
            extracted_articles = extractor()
            logger.info(
                f"{name}: Successfully fetched {len(extracted_articles)} articles."
            )
            articles.extend(extracted_articles)

        except Exception as e:
            logger.exception(f"{name} extractor failed: {e}")

    logger.info(f"Total merged articles: {len(articles)}")

    return articles