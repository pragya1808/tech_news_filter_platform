from etl.config import TOPIC_KEYWORDS
from etl.transformers.text_utils import contains_keyword


def classify_topics(title: str, summary: str = ""):
    """
    Returns:
        topics
        topic_scores
    """

    text = f"{title} {summary}"

    scores = {}

    for topic, keywords in TOPIC_KEYWORDS.items():

        score = 0

        for keyword, weight in keywords.items():

            if contains_keyword(text, keyword):
                score += weight

        if score > 0:
            scores[topic] = score

    if not scores:
        return ["Other"], {}

    topics = sorted(
        scores,
        key=scores.get,
        reverse=True,
    )

    return topics, scores