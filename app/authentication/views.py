from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = get_object_or_404(User, username=username)

    if not user.check_password(password):
        return Response({'message': 'Invalid password'}, status=404)

    token, created = Token.objects.get_or_create(user=user)

    return Response({'token': token.key, 'user': UserSerializer(user).data}, status=200)


@api_view(['GET'])
def logout(request):

    if request.method == 'GET':
        request.user.auth_token.delete()
        return Response({'message': 'Logout successful'})

    return Response({'message': 'Logout page'})

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()

        token = Token.objects.create(user=user)
        return Response({'token': token.key, "user": serializer.data}, status=201)


    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def profile(request):
    serializer = UserSerializer(instance=request.user)
    return Response(serializer.data, status=200)
@api_view(['POST'])
def change_password(request):
    return Response({'message': 'Change password page'})

@api_view(['POST'])
def forgot_password(request):
    return Response({'message': 'Forgot password page'})