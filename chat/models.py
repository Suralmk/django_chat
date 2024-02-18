from django.db import models
from django.contrib.auth import get_user_model

User =  get_user_model()
# Create your models here.



class Chat(models.Model):
    content = models.CharField(max_length = 200)
    time_stamp = models.DateTimeField(auto_now_add = True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey("ChatRoom", on_delete=models.CASCADE)


class ChatRoom(models.Model):
    name = models.CharField(max_length=1006)
