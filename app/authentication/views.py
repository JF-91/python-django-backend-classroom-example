from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.hashers import check_password
from rest_framework import status
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.core.validators import validate_email


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
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def change_password(request):
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')

    if not check_password(current_password, request.user.password):
        return Response({'message': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        validate_password(new_password)
    except ValidationError as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    request.user.set_password(new_password)
    request.user.save()

    return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')

    # Validar el correo electrónico
    try:
        validate_email(email)
    except ValidationError as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    user = User.objects.filter(email=email).first()

    if not user:
        return Response({'message': 'User with this email does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    current_site = get_current_site(request)
    mail_subject = 'Reset your password'
    message = render_to_string('reset_password_email.html', {
        'user': user,
        'domain': current_site.domain,
        'uid': uid,
        'token': token,
    })

    send_mail(mail_subject, message, 'noreply@class-room.com', [email])

    return Response({'message': 'Password reset email has been sent'}, status=status.HTTP_200_OK)