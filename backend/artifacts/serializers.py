from rest_framework import serializers
from .models import Artifact

class ArtifactSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Artifact
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')
