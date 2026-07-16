import pandas as pd
from backend.etl.transformers.topic_classifier import classify_topics
from backend.etl.transformers.text_utils import clean_html


def classify(row):
    return classify_topics(
        row["title"],
        row["summary"]
    )

def transform_articles(articles):
    """
    Transform raw extracted articles into a clean DataFrame.
    """


    # Convert list of dictionaries to DataFrame
    df = pd.DataFrame(articles)
    df["summary"] = df["summary"].fillna("").apply(clean_html)
    # Remove duplicate URLs
    df = df.drop_duplicates(subset="url")

    # Remove rows missing essential fields
    df = df.dropna(subset=["title", "url"])

    # Fill missing values
    df["author"] = df["author"].fillna("Unknown")
    df["source"] = df["source"].fillna("Unknown")

    # Convert publication dates
    df["published_at"] = pd.to_datetime(
        df["published_at"],
        errors="coerce",
        utc=True,
    )
    df["published_at"] = df["published_at"].apply(lambda x: x.to_pydatetime() if pd.notna(x) else None)

    # Sort newest first
    df = df.sort_values(
        by="published_at",
        ascending=False,
        na_position="last"
    )

    results = df.apply(classify, axis=1)

    df["topics"] = results.apply(lambda x: x[0])
    df["topic_scores"] = results.apply(lambda x: x[1])


    # Reset row numbers
    df = df.reset_index(drop=True)
    return df.to_dict(orient="records")