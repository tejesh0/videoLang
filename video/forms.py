from django import forms


class VideoForm(forms.Form):
    docfile = forms.FileField(
        label='Select a file',
        help_text='max. 2014 megabytes'
    )
