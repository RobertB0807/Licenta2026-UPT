from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


#User Registration
class UserRegister(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)


#User Login
class UserLogin(BaseModel): 
    email: EmailStr
    password: str 


#Token Response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer" 

#User Response(what we send back, no password)
class UserResponse(BaseModel):
    id: int
    email: str 
    username: str 
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


#User with Token (after registration/login)
class UserWithToken(BaseModel):
    user: UserResponse
    token: Token