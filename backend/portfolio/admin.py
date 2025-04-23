from django.contrib import admin
from .models import Resume, Experience, Education, Skill, Project

# Register your models here.

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'updated_at')
    search_fields = ('title', 'summary')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('company', 'position', 'start_date', 'end_date')
    list_filter = ('start_date', 'end_date', 'current')
    search_fields = ('company', 'position', 'description')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('institution', 'degree', 'field_of_study', 'end_date')
    list_filter = ('start_date', 'end_date', 'current')
    search_fields = ('institution', 'degree', 'field_of_study')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency')
    list_filter = ('category', 'proficiency')
    search_fields = ('name', 'category')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'current')
    list_filter = ('start_date', 'end_date', 'current')
    search_fields = ('title', 'description', 'technologies')
