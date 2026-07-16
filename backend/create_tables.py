from backend.app.core.database import Base
from backend.app.core.database import engine

import backend.app.models

Base.metadata.create_all(bind=engine)

print("Tables created.")

