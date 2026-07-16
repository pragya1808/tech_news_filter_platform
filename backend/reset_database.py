from backend.app.core.database import Base, engine
import backend.app.models

print("Dropping existing tables...")
Base.metadata.drop_all(bind=engine)

print("Creating tables...")
Base.metadata.create_all(bind=engine)

print("✅ Database reset complete!")