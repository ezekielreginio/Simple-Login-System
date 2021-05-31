from allauth.account.forms import LoginForm, SignupForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper
from crispy_forms.layout import ButtonHolder, Div, Field, Fieldset, HTML, Layout, Submit
from . import validators
class Login(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class Signup(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    last_name = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])

    class Meta:
        model = User
        fields = ("first_name", "last_name", "username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(Signup, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user