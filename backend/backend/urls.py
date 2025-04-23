"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from users.views import UserViewSet, LoginView
from portfolio.views import ResumeViewSet, ExperienceViewSet, EducationViewSet, SkillViewSet, ProjectViewSet
from blog.views import PostViewSet, CommentViewSet
from artifacts.views import ArtifactViewSet

# Customize admin site
admin.site.site_header = 'Foliance Administration'
admin.site.site_title = 'Foliance Admin Portal'
admin.site.index_title = 'Welcome to Foliance Administration'

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'resumes', ResumeViewSet, basename='resume')
router.register(r'experiences', ExperienceViewSet, basename='experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'artifacts', ArtifactViewSet, basename='artifact')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', LoginView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
