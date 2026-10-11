
#RUN PROJECT LOCALLY
docker compose -f docker-compose.dev.yml up
Then visit http://localhost:8000/

# PRODUCTION (theopening.com.au)
The live site is static. Every view is a TemplateView, so it is rendered to plain HTML:

    SECRET_KEY=build DATABASE_URL=sqlite:////tmp/opening.db python3 export_static.py

Then rsync `dist/` to the rank-and-rent factory droplet at `/srv/sites/theopening.com.au/`
(Cloudflare -> Traefik -> shared static nginx). See DEPLOY.md in the rank-and-rent-fleet repo.
