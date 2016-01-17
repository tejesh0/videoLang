from django.shortcuts import render

# Create your views here.

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
import logging
import pdb

logger = logging.getLogger('simple_example')
logger.setLevel(logging.DEBUG)
# create file handler which logs even debug messages
fh = logging.FileHandler('spam.log')

def signup(request):
    if request.method == 'POST':
        logger.debug('debug POST request', request.POST)
        pdb.set_trace()
        User.objects.create_user(request.POST['username'], request.POST['email'], request.POST['password'])
        return JsonResponse({'status': 'Success'})

    JsonResponse({'status': 'Failure'})