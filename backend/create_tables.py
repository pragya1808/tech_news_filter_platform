from app.core.database import Base
from app.core.database import engine

from app import models

Base.metadata.create_all(bind=engine)

print("Tables created.")

