from django.forms import ModelForm
from django import forms
from django.contrib.auth.models import User
from .models import Features

class UploadFeatures(ModelForm):
    phoneNumber = forms.CharField()
    weather = forms.BooleanField()
    weatherData = forms.CharField()
    email = forms.BooleanField()
    emailData = forms.CharField()
    emailPriority = forms.CharField()
    eta = forms.BooleanField()
    etaData = forms.CharField()
    class Meta:
        model = Features
        fields = ["user", "phoneNumber", "weather", "weatherData", "email", "emailData", "emailPriority", "eta", "etaData"]

    # phoneNumber = models.CharField(max_length=10, null=True, blank=True)
    # weather = models.BooleanField(default=True)
    # weatherData = models.CharField(max_length=50, null=True, blank=True)
    # email = models.BooleanField(default=False)
    # emailData = models.CharField(max_length=50, null=True, blank=True)
    # emailPriority = models.CharField(max_length=50, null=False, blank=False)
    # eta = models.BooleanField(default=False)
    # etaData = models.CharField(max_length=50, null=True, blank=True)