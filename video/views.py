from django.http import JsonResponse
from models import Video
from forms import VideoForm
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from serializers import VideoSerializer
from rest_framework import generics
from rest_framework import pagination


@csrf_exempt
def list(request):
    # Handle file upload
    print request
    if request.method == 'POST':
        print "inside POST ", request.POST
        print "files", request.FILES
        form = VideoForm(request.POST, request.FILES)
        print "form is ", form
        if form.is_valid():
            print "inside form valid"
            newdoc = Video(docfile=request.FILES['docfile'])
            newdoc.save()

            # Redirect to the document list after POST
            return JsonResponse({'success': 'true'})
    else:
        form = VideoForm()  # A empty, unbound form

    # Load videos for the list page
    videos = Video.objects.all()
    print videos
    # Render list page with the videos and the form
    return JsonResponse({'failure': 'true'})


class VideoListPagination(pagination.LimitOffsetPagination):
    default_limit = 30
    limit_query_param = 'size'
    offset_query_param = 'from'
    max_limit = 30


class VideoList(generics.ListAPIView):
    """
    class based restframework api for video
    """
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    pagination_class = VideoListPagination