from django.urls import path
from .views import AuthCheck, LoginView, expire_session_view

urlpatterns = [
    path('auth-check', AuthCheck.as_view(), name='auth_check'),
    path('login/', LoginView.as_view(), name='login'),
    path('expire-session/<str:session_key>/',
         expire_session_view, name='expire_session'),
]
