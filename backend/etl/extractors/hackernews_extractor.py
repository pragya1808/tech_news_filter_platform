import logging
from datetime import datetime, UTC

import requests

from etl.config import TOP_STORIES_URL, ITEM_URL, LIMIT

logger = logging.getLogger(__name__)


def fetch_top_story_ids(limit=LIMIT):
    response = requests.get(TOP_STORIES_URL, timeout=30)
    response.raise_for_status()
    return response.json()[:limit]


def fetch_story(story_id):
    response = requests.get(ITEM_URL.format(story_id), timeout=30)
    response.raise_for_status()
    return response.json()


def get_hackernews_articles(limit=LIMIT):
    articles = []

    logger.info("Fetching Hacker News articles...")

    try:
        story_ids = fetch_top_story_ids(limit)
    except requests.RequestException as e:
        logger.error(f"Failed to fetch Hacker News story IDs: {e}")
        return []

    for story_id in story_ids:
        try:
            story = fetch_story(story_id)

            if not story:
                continue

            article = {
                "title": story.get("title", ""),
                "author": story.get("by", "Unknown"),
                "summary": "",
                "published_at": datetime.fromtimestamp(
                    story.get("time", 0),
                    UTC,
                ).isoformat(),
                "url": story.get(
                    "url",
                    f"https://news.ycombinator.com/item?id={story_id}",
                ),
                "source": "Hacker News",
                "extracted_at": datetime.now(UTC).isoformat(),
            }

            articles.append(article)

        except requests.RequestException as e:
            logger.warning(f"Failed to fetch story {story_id}: {e}")

        except Exception as e:
            logger.warning(f"Skipping malformed Hacker News story {story_id}: {e}")

    logger.info(f"Fetched {len(articles)} Hacker News articles.")

    return articles