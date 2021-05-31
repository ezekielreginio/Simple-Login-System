from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login
from allauth.account.views import SignupView
from django.http import JsonResponse

import json

from .forms import Login,Signup

# class AccountSignup(SignupView):
#     template_name = 'app_applicant/signup.html'
#     form_class = Signup
#     view_name = 'register'

# register = AccountSignup.as_view()

def register(request):
    response = {}
    if request.method == "POST":
        #print(request.POST.get['username'])
        register_form = Signup(request.POST)
        if register_form.is_valid():
            user = register_form.save()
            login(request,user, backend='django.contrib.auth.backends.ModelBackend')
            response['data'] = {'code': 200}
        else:
            response['data'] = register_form.errors.get_json_data()
    return JsonResponse(response)

# Create your views here.
def login_dashboard(request):
    #content = json.loads(request.body)
    username = request.POST.get('username')
    #password = content['password']
    error = ""
    code = 200
    if request.method == "POST":
        login_form = Login(request.POST)
        if login_form.is_valid():
            user = authenticate(request, username=request.POST.get("login"), password=request.POST.get("password"))
            login(request,user)
            code = 200
        else:
            code = 403
        
    data={
        'username': username,
        'code': code
    }
    return JsonResponse(data)

def dashboard(request):
    return render(request, "./dashboard.html")