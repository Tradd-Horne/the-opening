from django.views.generic import TemplateView, FormView
from django.urls import reverse_lazy
from .forms import ContactForm


class IndexView(TemplateView):
    template_name = 'core/index.html'


class AboutView(TemplateView):
    template_name = 'core/about.html'


class WorkView(TemplateView):
    template_name = 'core/work.html'


class CollectiveView(TemplateView):
    template_name = 'core/collective.html'


class ContactView(FormView):
    template_name = 'core/contact.html'
    form_class = ContactForm
    success_url = reverse_lazy('contact')

    def form_valid(self, form):
        # TODO: send email or store submission
        return super().form_valid(form)
