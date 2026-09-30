# VO for Technology

Next.js App Router site with VO content in English (`/en`) and Arabic (`/ar`). The home page retains the State of AI Design motion/layout system and its animated collage hero; the company, service, product, Creatio and inquiry pages use the same visual language with VO imagery and copy. `/` redirects to `/en`.

## Run

```sh
npm install
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/ar`. For an Alloy session, run `docker compose -f docker-compose.alloy.yaml up -d`; the container runs the same development command on port 3000.

## Content

- `content/strings.ts`: home page English/Arabic copy mapped to the original layout.
- `content/vo.ts`: services and products in both languages.
- `content/creatio.ts`: Creatio's captured 2025 events and news in the source page's order. These are marked as archival, not current upcoming events.
- `components/home`: home layout and animations.
- `components/vo`: company, services, products, Creatio, inquiry and confirmation pages.
- `public/vo`: VO photography, client artwork, product artwork, Creatio media, framework marks and company profile PDF.
- `public/fonts/Figtree.woff2`: Figtree variable font used by the animated preloader wordmark. Its SIL Open Font License is in `public/fonts/Figtree-OFL.txt`.

The transparent framework marks use Simple Icons brand artwork and the official Creatio wordmark; Cloud and Cybersecurity use Lucide category icons (`public/vo/frameworks/lucide-LICENSE`). Brand marks remain the property of their respective owners. Creatio event and news images are locally saved copies of the media referenced by VO's original Creatio page.

The consultant and Ask VO forms are distinct; Join Team has a PDF-only CV picker and an archival job listing with working filters. Inquiry, CV, and profile interactions are preview-only: they **do not send or store submissions or files**. Connect a backend and add a privacy policy before accepting actual inquiries. The company profile download works without submitting personal information.
