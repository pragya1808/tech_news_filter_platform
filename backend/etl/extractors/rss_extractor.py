import feedparser
from datetime import datetime, UTC

from etl.config import RSS_FEEDS


def fetch_feed(url: str):
    """
    Fetch and parse an RSS feed.
    """
    return feedparser.parse(url)


def get_rss_articles():
    articles = []

    for source, url in RSS_FEEDS.items():
        print(f"Fetching articles from {source}...")

        feed = fetch_feed(url)

        for entry in feed.entries:
            article = {
                "title": entry.get("title", ""),
                "author": entry.get("author", "Unknown"),
                "summary": entry.get("summary", entry.get("description", "")),
                "published_at": entry.get("published", ""),
                "url": entry.get("link", ""),
                "source": source,
                "extracted_at": datetime.now(UTC).isoformat(),
            }

            articles.append(article)

    return articles