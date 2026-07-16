import re
from bs4 import BeautifulSoup

def clean_html(text: str | None) -> str:
    if not text:
        return ""

    return BeautifulSoup(text, "html.parser").get_text(
        separator=" ",
        strip=True,
    )

def normalize_text(text: str) -> str:
    """
    Normalize text before keyword matching.
    """

    text = text.lower()

    text = re.sub(r"\s+", " ", text)

    return text.strip()


def contains_keyword(text: str, keyword: str) -> bool:
    """
    Match complete words or phrases.
    """

    text = normalize_text(text)
    keyword = normalize_text(keyword)

    pattern = rf"\b{re.escape(keyword)}\b"

    return re.search(pattern, text) is not None