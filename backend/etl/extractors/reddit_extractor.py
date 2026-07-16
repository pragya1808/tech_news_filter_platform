import feedparser
from datetime import datetime, UTC
from backend.etl.config import REDDIT_FEEDS


def get_reddit_articles():
    articles = []

    for subreddit, url in REDDIT_FEEDS.items():
        print(f"Fetching r/{subreddit}...")

        feed = feedparser.parse(url)

        for entry in feed.entries:
            article = {
                "title": entry.get("title", ""),
                "author": entry.get("author", "Unknown"),
                "summary": entry.get("summary", entry.get("description", "")),
                "published_at": entry.get("published", ""),
                "url": entry.get("link", ""),
                "source": f"Reddit - r/{subreddit}",
                "extracted_at": datetime.now(UTC).isoformat(),
            }

            articles.append(article)

    return articles