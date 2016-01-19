from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, JsonResponse
from django.core.urlresolvers import reverse
from models import Document
from forms import DocumentForm
# Create your views here.
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def list(request):
    # Handle file upload
    print request
    if request.method == 'POST':
        print "inside POST ", request.POST
        print "files", request.FILES
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(docfile=request.FILES['docfile'])
            newdoc.save()

            # Redirect to the document list after POST
            return JsonResponse({'success': 'true'})
    else:
        form = DocumentForm()  # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()
    print documents
    # Render list page with the documents and the form
    return JsonResponse({'failure': 'true'})
