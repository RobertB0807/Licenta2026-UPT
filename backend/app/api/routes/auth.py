from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User
from app.models.user import UserRegister, UserLogin, UserResponse, UserWithToken, Token
from app.core.security import get_password_hash, create_access_token, verify_password

router = APIRouter()

@router.post("/register", response_model=UserWithToken, status_code=201)
async def register(credentials: UserRegister, db: Session = Depends(get_db)):
    # Verifică dacă email-ul există deja
    existing_user = db.query(User).filter(User.email == credentials.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Verifică dacă username-ul există deja
    existing_username = db.query(User).filter(User.username == credentials.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Hash password
    hashed_password = get_password_hash(credentials.password)
    
    # Creează user nou
    new_user = User(
        username=credentials.username,
        email=credentials.email,
        hashed_password=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Creează token
    access_token = create_access_token(data={"sub": new_user.email})
    
    # Returnează user cu token
    return UserWithToken(
        user=UserResponse(
            id=new_user.id,
            email=new_user.email,
            username=new_user.username,
            is_active=new_user.is_active,
            created_at=new_user.created_at
        ),
        token=Token(
            access_token=access_token,
            token_type="bearer"
        )
    )


@router.post("/login", response_model=UserWithToken)
async def login(login_data: UserLogin, db: Session = Depends(get_db)):
    # Găsește user-ul după email
    user = db.query(User).filter(User.email == login_data.email).first()
    
    # Verifică dacă user-ul există
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Verifică parola
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Verifică dacă user-ul este activ
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is inactive")
    
    # Creează token
    access_token = create_access_token(data={"sub": user.email})
    
    # Returnează user cu token
    return UserWithToken(
        user=UserResponse(
            id=user.id,
            email=user.email,
            username=user.username,
            is_active=user.is_active,
            created_at=user.created_at
        ),
        token=Token(
            access_token=access_token,
            token_type="bearer"
        )
    )