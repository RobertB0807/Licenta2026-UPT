from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import UserRegister, UserLogin, UserWithToken
from app.services.auth_service import register_user, login_user


router = APIRouter()

@router.post("/register", response_model=UserWithToken, status_code=201)
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    return register_user(user_data, db)


@router.post("/login", response_model=UserWithToken)
async def login(login_data: UserLogin, db: Session = Depends(get_db)):
    return login_user(login_data, db)
