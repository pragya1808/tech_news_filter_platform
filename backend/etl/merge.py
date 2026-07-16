from backend.etl.extractors.rss_extractor import get_rss_articles
from backend.etl.extractors.reddit_extractor import get_reddit_articles
from backend.etl.extractors.hackernews_extractor import get_hackernews_articles


def merge_articles():
    """
    Collect articles from all sources.
    """
    articles = []

    print("Fetching RSS articles...")
    articles.extend(get_rss_articles())

    print("Fetching Reddit articles...")
    articles.extend(get_reddit_articles())

    print("Fetching Hacker News articles...")
    articles.extend(get_hackernews_articles())

    return articles