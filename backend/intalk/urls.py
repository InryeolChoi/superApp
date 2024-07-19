from django.urls import path
from .views import ChatRoomListCreateAPIView, ChatRoomDetailAPIView, MessageListCreateAPIView

urlpatterns = [
    path('chatrooms/', ChatRoomListCreateAPIView.as_view()),
    path('chatrooms/<int:pk>/', ChatRoomDetailAPIView.as_view(), name='chatroom-detail'),
    path('chatrooms/<int:chatroom_id>/messages/', MessageListCreateAPIView.as_view()),
]