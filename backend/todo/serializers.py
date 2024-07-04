from rest_framework import serializers
from .models import Todo

class TodoSimpleSerializers(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'complete', 'important')

class TodoDetailSerilaizers(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 
                  'created', 'complete', 'important')
    
class TodoCreateSerilaizers(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('title', 'description', 'important', 'complete')