from backend.etl.extractors.hackernews_extractor import get_hackernews_articles


def main():
    articles = get_hackernews_articles()

    print(f"\nCollected {len(articles)} articles\n")

    for article in articles[:5]:
        print("=" * 60)
        print(f"Title      : {article['title']}")
        print(f"Author     : {article['author']}")
        print(f"Published  : {article['published_at']}")
        print(f"Source     : {article['source']}")
        print(f"URL        : {article['url']}")
        print()


if __name__ == "__main__":
    main()