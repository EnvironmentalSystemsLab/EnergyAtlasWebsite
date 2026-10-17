# EnergyAtlas Website

Astro source for https://www.energyatlas.io.

## Local development

```sh
npm ci
npm run dev
```

Run `npm run build` to generate the static site in `dist/`.

## Deployment

`main` is the production branch. Open pull requests against `main`; the
GitHub Actions workflow builds them for validation without deploying a preview
or changing the live site.

Pushes to `main` build and deploy `dist/` to GitHub Pages. The workflow can also
be run manually on `main` to redeploy. Other branches cannot deploy.

Repository settings:

- Pages build and deployment source: **GitHub Actions**.
- Custom domain: **www.energyatlas.io**.
- A repository administrator should restrict the `github-pages` environment
  to **main** only. The workflow independently blocks deployment from other branches.

Do not enable branch-based Pages publishing alongside the Astro workflow;
it publishes repository files instead of the generated site and creates a
competing deployment.
