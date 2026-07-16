RSS_FEEDS = {
    "TechCrunch": "https://techcrunch.com/feed/",
    "The Verge": "https://www.theverge.com/rss/index.xml",
    "Wired": "https://www.wired.com/feed/rss",
    "Ars Technica": "https://feeds.arstechnica.com/arstechnica/index",
}
#hackernews
TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json"
ITEM_URL = "https://hacker-news.firebaseio.com/v0/item/{}.json"
#reddit
REDDIT_FEEDS = {
    "technology": "https://www.reddit.com/r/technology/new/.rss",
    "programming": "https://www.reddit.com/r/programming/new/.rss",
    "MachineLearning": "https://www.reddit.com/r/MachineLearning/new/.rss",
}

TOPIC_KEYWORDS = {
    "Artificial Intelligence": {
        "artificial intelligence": 5,
        "machine learning": 5,
        "deep learning": 5,
        "llm": 4,
        "gpt": 4,
        "chatgpt": 4,
        "openai": 4,
        "anthropic": 4,
        "claude": 4,
        "gemini": 4,
        "ai": 1,
    },

    "Programming": {
        "python": 5,
        "java": 4,
        "javascript": 5,
        "typescript": 4,
        "rust": 4,
        "go": 3,
        "c++": 4,
        "coding": 2,
        "developer": 2,
        "programming": 3,
        "software engineering": 5,
    },

    "Cloud Computing": {
        "aws": 5,
        "azure": 5,
        "gcp": 5,
        "cloud": 3,
        "docker": 5,
        "kubernetes": 5,
        "terraform": 4,
        "serverless": 4,
        "devops": 3,
    },

    "Cybersecurity": {
        "cybersecurity": 5,
        "security": 2,
        "malware": 5,
        "ransomware": 5,
        "phishing": 5,
        "breach": 4,
        "vulnerability": 4,
        "exploit": 4,
        "hack": 2,
        "windows": 2,
        "zero-day": 5,
        "0-day": 5,
        "patch": 3,
        "patches": 3,
        "cve": 5,
        "exploit": 4,
        "security update": 4,
    },

    "Hardware": {
        "gpu": 5,
        "cpu": 5,
        "processor": 4,
        "chip": 4,
        "nvidia": 5,
        "amd": 5,
        "intel": 5,
        "semiconductor": 5,
    },

    "Mobile": {
        "android": 5,
        "ios": 5,
        "iphone": 5,
        "ipad": 4,
        "mobile": 2,
    },

    "Gaming": {
        "gaming": 4,
        "game": 1,
        "steam": 5,
        "playstation": 5,
        "xbox": 5,
        "nintendo": 5,
    },

    "Startups": {
        "startup": 4,
        "funding": 3,
        "venture capital": 5,
        "vc": 2,
        "series a": 5,
        "series b": 5,
        "acquisition": 3,
        "spacex": 4,
    },

    "Open Source": {
        "linux": 5,
        "github": 4,
        "gitlab": 4,
        "open source": 5,
        "apache": 3,
        "mozilla": 3,
    },
    "Consumer Tech":{
    "apple": 4,
    "google": 4,
    "meta": 4,
    "microsoft": 4,
    "amazon": 4,
    "tesla": 3,
    "spotify": 3,
    "netflix": 3,
    "maps": 2,
    "iphone": 5,
    "android": 5,
}
}

