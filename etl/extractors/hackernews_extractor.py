import requests
from datetime import datetime, UTC
from etl.config import TOP_STORIES_URL,ITEM_URL




def fetch_top_story_ids(limit=50):
    response = requests.get(TOP_STORIES_URL, timeout=30)
    response.raise_for_status()

    return response.json()[:limit]


def fetch_story(story_id):
    response = requests.get(ITEM_URL.format(story_id), timeout=30)
    response.raise_for_status()

    return response.json()


def get_hackernews_articles(limit=50):
    articles = []

    story_ids = fetch_top_story_ids(limit)

    for story_id in story_ids:
        story = fetch_story(story_id)

        if not story:
            continue

        article = {
            "title": story.get("title", ""),
            "author": story.get("by", "Unknown"),
            "summary": "",
            "published_at": datetime.fromtimestamp(
                story.get("time", 0),
                UTC
            ).isoformat(),
            "url": story.get(
                "url",
                f"https://news.ycombinator.com/item?id={story_id}"
            ),
            "source": "Hacker News",
            "extracted_at": datetime.now(UTC).isoformat(),
        }

        articles.append(article)

    return articles