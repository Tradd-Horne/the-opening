from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'core/index.html'


class MissionView(TemplateView):
    template_name = 'core/mission.html'


class PracticeView(TemplateView):
    template_name = 'core/practice.html'


class WorkView(TemplateView):
    template_name = 'core/work.html'


class ContactView(TemplateView):
    template_name = 'core/contact.html'
