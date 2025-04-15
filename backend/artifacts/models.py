from django.db import models
from django.conf import settings

# Create your models here.

class Artifact(models.Model):
    CATEGORY_CHOICES = [
        ('certificate', 'Certificate'),
        ('award', 'Award'),
        ('publication', 'Publication'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    file = models.FileField(upload_to='artifacts/', blank=True, null=True)
    url = models.URLField(blank=True)
    date_received = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_received']

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"
