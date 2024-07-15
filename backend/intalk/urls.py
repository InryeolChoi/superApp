from django.urls import path
from .views import ChatRoomListCreateAPIView, MessageListCreateAPIView

urlpatterns = [
    path('chatrooms/', ChatRoomListCreateAPIView.as_view()),
    path('chatrooms/<int:chatroom_id>/messages/', MessageListCreateAPIView.as_view()),
]