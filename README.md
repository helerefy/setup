# VO for Technology

Developed and designed by : Hazem Elerefy for VO Technology.

Next.js App Router site with VO content in English (`/en`) and Arabic (`/ar`). The site includes company, service, product, Creatio and inquiry pages with VO imagery and copy. `/` redirects to `/en`.

## Develop

```sh
npm ci
npm run dev
```

Use Node.js 22 or newer. Open `http://localhost:3000/en` or `http://localhost:3000/ar`.

## Deploy

```sh
npm ci
npm run build
npm start
```

The production server listens on port 3000. A Next.js-compatible host can run the same build and start scripts. No environment variables or external services are needed to display the site. The inquiry forms and CV selection are preview-only, not production intake.

## Content

- `content/strings.ts`: home page English/Arabic copy.
- `content/vo.ts`: services and products in both languages.
- `content/creatio.ts`: Creatio's captured 2025 events and news in the source page's order. These are marked as archival, not current upcoming events.
- `components/home`: home layout and animations.
- `components/vo`: company, services, products, Creatio, inquiry and confirmation pages.
- `public/vo`: VO photography, client artwork, product artwork, Creatio media, framework marks and company profile PDF.
- `public/fonts/Figtree.woff2`: Figtree variable font used by the animated preloader wordmark. Its SIL Open Font License is in `public/fonts/Figtree-OFL.txt`.

The transparent framework marks use Simple Icons brand artwork and the official Creatio wordmark; Cloud and Cybersecurity use Lucide category icons (`public/vo/frameworks/lucide-LICENSE`). Brand marks remain the property of their respective owners. Creatio event and news images are locally saved copies of the media referenced by VO's original Creatio page.

The consultant and Ask VO forms are distinct; Join Team has a PDF-only CV picker and an archival job listing with working filters. Inquiry, CV, and profile interactions are preview-only: they **do not send or store submissions or files**. Connect a backend and add a privacy policy before accepting actual inquiries. The company profile download works without submitting personal information.

## Credit and rights

Hazem Elerefy is credited for the website implementation and VO-specific design work. See `LICENSE.md` for the scope of his original contributions. The home page also incorporates State of AI Design layout and motion; VO content and media, partner marks, and third-party fonts/icons are not relicensed by Hazem's notice. Obtain the relevant permissions before public redistribution.

The downloadable company profile uses the 2025 source profile, retained in the repository's history for reference. PDF layout and editorial work are by Hazem Elerefy for VO Technology. To rebuild it, install `reportlab==4.4.9` for Python 3 and run `python3 scripts/build_profile.py`. Names and marks from the source remain the property of their owners; the profile does not present application areas as verified case studies.
