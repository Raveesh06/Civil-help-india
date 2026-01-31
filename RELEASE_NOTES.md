# Release Notes — v1.0.0

Release: v1.0.0
Date: 2026-01-31

Summary:
- Fixed white blank screen when navigating back by adding dark-mode support to header and navigation.
- Improved contrast for language and theme toggle buttons.
- Updated "Choose Filing Method" text color for light/dark themes.
- Changed complaint detail box to a dark background with readable text.
- Replaced gavel logo with a custom scales-of-justice SVG.
- Fixed multiple light-mode font visibility issues across the app.

How collaborators can get these changes:

1. Update `main` and fetch tags:

   git checkout main
   git fetch origin
   git pull origin main
   git fetch --tags

2. Run the app locally:

   npm install
   npm run dev

If you have local uncommitted changes, stash before pulling:

   git stash push -m "WIP before pulling upstream"
   git pull origin main
   git stash pop

Release URL: https://github.com/Raveesh06/Civil-help-india/releases/tag/v1.0.0

If collaborators still do not see changes, ask them to report their `git remote -v`, `git branch --show-current`, and `git status` output so we can diagnose.
