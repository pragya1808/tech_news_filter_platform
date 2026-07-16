from app.core.database import Base
from app.core.database import engine

import app.models

Base.metadata.create_all(bind=engine)

print("Tables created.")

