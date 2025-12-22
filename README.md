# Cloud Login Demo

Minimal login page served via Express on port `5000`, containerized with Docker, and ready for GitHub + Jenkins pipeline deployment.

## Run locally
```bash
npm install
npm start
# open http://localhost:5000
```

## Docker (manual)
```bash
docker build -t cloud-login-demo:latest .
docker run -p 5000:5000 cloud-login-demo:latest
```

## GitHub
- Create a repo and push this folder: `git init`, `git add .`, `git commit -m "init"`, then `git remote add origin <your-repo>` and `git push -u origin main`.
- Add a GitHub Personal Access Token or use SSH for Jenkins checkout.

## Jenkins pipeline
- Create credentials named `docker-registry` (Username/Password) for your registry in Jenkins.
- Create a Multibranch or Pipeline job pointing to the repo; Jenkinsfile is at repo root.
- Stages: checkout → npm install → npm test → docker build → optional push → deploy (runs container on port 5000).
- Ensure the Jenkins agent has Docker + Node 20 available.
- Override `IMAGE_NAME`/`IMAGE_TAG` in Jenkins job params if desired.

## Notes
- The login form is front-end only (no auth backend). Hook up real auth in `server.js` or behind a reverse proxy as needed.
- Default port can be overridden with `PORT` env var for non-default deployments.

