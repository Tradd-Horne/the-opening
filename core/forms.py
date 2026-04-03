from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Your name',
            'autocomplete': 'name',
        }),
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'placeholder': 'Your email',
            'autocomplete': 'email',
        }),
    )
    subject = forms.CharField(
        max_length=200,
        widget=forms.TextInput(attrs={
            'placeholder': 'Subject',
        }),
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={
            'placeholder': 'Your message',
            'rows': 5,
        }),
    )
