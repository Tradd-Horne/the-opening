#!/usr/bin/env python3
"""Render every page to plain HTML in dist/, ready to serve from any static host.

Every view is a TemplateView, so the site needs no server-side code in production.
    SECRET_KEY=x python3 export_static.py
"""
import os
import pathlib
import shutil

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'theopening.settings')
os.environ.setdefault('DEBUG', 'False')
os.environ.setdefault('ALLOWED_HOSTS', 'theopening.com.au')

import django  # noqa: E402
django.setup()

from django.core.management import call_command  # noqa: E402
from django.test import Client  # noqa: E402

SITE = 'https://theopening.com.au'
PAGES = ['/', '/about/', '/services/', '/contact/']
DIST = pathlib.Path(__file__).resolve().parent / 'dist'

call_command('collectstatic', '--noinput', '--clear', verbosity=0)
if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()

client = Client(HTTP_HOST='theopening.com.au')
for url in PAGES:
    r = client.get(url, secure=True)
    assert r.status_code == 200, (url, r.status_code)
    out = DIST / url.strip('/') / 'index.html'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(r.content)

shutil.copytree(pathlib.Path(__file__).resolve().parent / 'staticfiles', DIST / 'static')
(DIST / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
(DIST / 'sitemap.xml').write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + ''.join(f'  <url><loc>{SITE}{u}</loc></url>\n' for u in PAGES)
    + '</urlset>\n')
print(f'wrote {len(PAGES)} pages to {DIST}')
