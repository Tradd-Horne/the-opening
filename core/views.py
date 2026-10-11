from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'core/index.html'


class AboutView(TemplateView):
    template_name = 'core/about.html'


class ServicesView(TemplateView):
    template_name = 'core/services.html'


class ContactView(TemplateView):
    template_name = 'core/contact.html'
