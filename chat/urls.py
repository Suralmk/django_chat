from django.urls import path
from . views import *

urlpatterns = [
    path('', home, name='home'),
    path('chat/', index, name='index'),
    path('chats/', chat_list, name='chats'),
    path("chat/<str:room_name>/",room, name="room"),

]