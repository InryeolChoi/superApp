from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework import status
from django.conf import settings
from django.shortcuts import redirect
from django.contrib.auth import get_user_model, authenticate
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer, UserSerializer
from django.core.mail import send_mail, get_connection
from django.utils import timezone
from .models import Post, UserProfile
from .serializers import PostSerializer, PostCreateSerializer, UserSerializer, OTPSerializer
from random import randint
import requests, smtplib

class PostListCreateAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostDetailAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return None

    def get(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response({'detail': "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response({'detail': "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response({'detail': "Not found."}, status=status.HTTP_404_NOT_FOUND)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        return Response({'detail': "로그인 실패"}, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'detail': "로그아웃 성공"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': "로그아웃 실패"}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

User = get_user_model()
class OAuthLoginView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        ft_oauth_url = 'https://api.intra.42.fr/oauth/authorize'
        params = {
            'client_id': settings.FT_OAUTH_CLIENT_ID,
            'redirect_uri': settings.FT_OAUTH_REDIRECT_URI,
            'response_type': 'code',
            'scope': 'public',
            'state': 'random_state_string',
        }
        query_string = '&'.join([f'{key}={value}' for key, value in params.items()])
        return redirect(f"{ft_oauth_url}?{query_string}")

class OAuthCallbackView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        code = request.GET.get('code')
        state = request.GET.get('state')

        # State 검증 로직을 추가해야 합니다.
        if state != 'random_state_string':
            return Response({'detail': 'Invalid state'}, status=status.HTTP_400_BAD_REQUEST)

        token_url = 'https://api.intra.42.fr/oauth/token'
        token_data = {
            'grant_type': 'authorization_code',
            'client_id': settings.FT_OAUTH_CLIENT_ID,
            'client_secret': settings.FT_OAUTH_CLIENT_SECRET,
            'code': code,
            'redirect_uri': settings.FT_OAUTH_REDIRECT_URI,
        }
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        token_res = requests.post(token_url, data=token_data, headers=headers)
        token_json = token_res.json()

        if 'error' in token_json:
            return Response({'detail': token_json.get('error_description', 'Unknown error')}, status=status.HTTP_400_BAD_REQUEST)
        access_token = token_json.get('access_token')

        user_info_url = 'https://api.intra.42.fr/v2/me'
        user_info_res = requests.get(user_info_url, headers={'Authorization': f'Bearer {access_token}'})
        user_info = user_info_res.json()
        username = user_info['login']
        email = user_info['email']

        user, created = User.objects.get_or_create(username=username, defaults={'email': email})
        refresh = RefreshToken.for_user(user)

        redirect_url = 'http://localhost:3000/board'
        response = redirect(redirect_url)
        response.set_cookie('refresh', str(refresh))
        response.set_cookie('access', str(refresh.access_token))
        return response

class SendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        print(f"Received email: {email}")  # 디버그 출력
        try:
            user = User.objects.get(email=email)
            print(f"Found user: {user}")  # 디버그 출력
        except User.DoesNotExist:
            print("User not found")  # 디버그 출력
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        otp = randint(100000, 999999)
        user_profile, created = UserProfile.objects.get_or_create(user=user)
        user_profile.otp = str(otp)
        user_profile.otp_created_at = timezone.now()
        user_profile.save()

        try:
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp}',
                'from@example.com',
                [email],
                fail_silently=False,
            )
            print("OTP email sent")  # 디버그 출력
        except Exception as e:
            print(f"Failed to send email: {e}")  # 디버그 출력
            return Response({'detail': 'Failed to send email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'detail': 'OTP sent'}, status=status.HTTP_200_OK)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            otp = serializer.validated_data['otp']
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
            user_profile = UserProfile.objects.get(user=user)
            if user_profile.otp == otp and (timezone.now() - user_profile.otp_created_at).seconds < 300:
                # OTP is valid and not expired
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)