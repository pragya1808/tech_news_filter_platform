from backend.etl.transformers.topic_classifier import classify_topics

topics, scores = classify_topics(
    "DSLs Enable Reliable Use of LLMs",
    ""
)

print(topics)
print(scores)