from etl.transformers.topic_classifier import classify_topics

samples = [
    (
        "OpenAI releases GPT-5 for enterprise customers",
        "The new AI model supports coding and reasoning."
    ),

    (
        "NVIDIA unveils next generation GPU",
        "The new processor targets AI workloads."
    ),

    (
        "Docker and Kubernetes simplify cloud deployment",
        "Azure and AWS integrations are now available."
    ),

    (
        "Python 3.15 released",
        "Developers can now use new language features."
    ),

    (
        "Manchester United wins dramatic football match",
        "Fans celebrate the victory."
    ),
]

for title, summary in samples:
    topics, scores = classify_topics(title, summary)

    print("=" * 70)
    print(title)
    print("Topics:", topics)
    print("Scores:", scores)