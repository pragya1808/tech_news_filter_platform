from backend.etl.merge import merge_articles
from backend.etl.transformers.transform import transform_articles
from backend.etl.loaders.postgres_loader_airflow import PostgresLoader


def main():
    articles = merge_articles()
    transformed = transform_articles(articles)

    loader = PostgresLoader()
    loader.load(transformed)


if __name__ == "__main__":
    main()