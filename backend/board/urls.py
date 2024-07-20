from django.urls import path
from .views import PostListCreateAPIView, PostDetailAPIView, LoginView, \
                    LogoutView, RegisterView, OAuthLoginView, OAuthCallbackView, \
                    SendOTPView, VerifyOTPView
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenVerifyView,
)

urlpatterns = [
    path('posts/', PostListCreateAPIView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetailAPIView.as_view(), name='post-detail'),
    # 로그인 / 회원가입
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    # 토큰 관련
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    # oauth 로그인
    path('oauth/login/', OAuthLoginView.as_view(), name='oauth_login'),
    path('oauth/callback/', OAuthCallbackView.as_view(), name='oauth_callback'),
    # OTP 관련
    path('otp/send/', SendOTPView.as_view(), name='send_otp'),
    path('otp/verify/', VerifyOTPView.as_view(), name='verify_otp'),
]