from django.shortcuts import render

# Create your views here.
from django.contrib.auth.decorators import login_required
from . models import Chat, ChatRoom


def home(request):
    return render(request, 'chat/home.html')

@login_required(login_url="account_login")
def index(request):
    return render(request, 'chat/index.html')

@login_required(login_url="account_login")
def room(request, room_name):
    room = ChatRoom.objects.filter(name=room_name).first()
    chats = []

    if room:
        chats = Chat.objects.filter(room=room)
    else:
        room = ChatRoom(name=room_name)
        room.save()
    return render(request, "chat/room.html", {"room_name": room_name, 'chats' : chats})


@login_required(login_url="account_login")
def chat_list(request):
    chats_set = set()
    chats = Chat.objects.filter(user=request.user).distinct()
    rooms = ChatRoom.objects.filter(chat__user=request.user).distinct()
    return render(request, 'chat/chat_list.html', {'rooms': rooms})
