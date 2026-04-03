"""
WSGI config for theopening project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'theopening.settings')

application = get_wsgi_application()
