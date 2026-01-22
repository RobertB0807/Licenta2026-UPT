from pydantic_settings import BaseSettings



class Settings(BaseSettings):
    APP_NAME: str = "Social Engineering Education API"
    API_VERSION: str = "v1"
    DEBUG: bool = True

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    DATABASE_URL: str = "postgresql://localhost/social_engineering_db"


    ALLOWED_ORIGINS: str = "http://localhost:8081,http://localhost:19006"

    class Config:
        env_file = ".env"  
        case_sensitive = True

    @property
    def origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]


settings = Settings()