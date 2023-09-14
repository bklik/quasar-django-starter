from django.contrib.auth import login
from django.contrib.sessions.models import Session
from django.http import HttpResponseRedirect
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LoginSerializer, UserSerializer


class AuthCheck(APIView):
    permission_classes = []

    def get(self, request):
        if request.user.is_authenticated:
            user = UserSerializer(request.user, context={'request': request})
            return Response({"isAuthenticated": True, "user": user.data})
        else:
            return Response({"isAuthenticated": False})


class LoginView(APIView):
    authentication_classes = []
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            return Response({"detail": "Login successful."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def expire_session_view(request, session_key):
    try:
        session = Session.objects.get(session_key=session_key)
        session.delete()
    except Session.DoesNotExist:
        pass
    return HttpResponseRedirect('/admin/sessions/session/')
