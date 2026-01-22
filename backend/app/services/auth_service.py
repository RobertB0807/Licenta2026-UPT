from datetime import timedelta
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.db.models import User
from app.models.user import UserRegister, UserLogin, Token, UserResponse, UserWithToken
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.config import settings


def register_user(user_data: UserRegister, db: Session) -> UserWithToken:
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    #Hash the password
    hashed_password = get_password_hash(user_data.password)

    #Create the user
    new_user = User(email=user_data.email, username=user_data.username, hashed_password=hashed_password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(
        data={"sub": new_user.email},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return UserWithToken(
        user = UserResponse.from_orm(new_user),
        token = Token(access_token=access_token)
    )


def login_user(login_data: UserLogin, db: Session) -> UserWithToken:
    user = db.query(User).filter(User.email == login_data.email).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is inactive")
    
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return UserWithToken(
        user=UserResponse.from_orm(user),
        token=Token(access_token=access_token)
    )
