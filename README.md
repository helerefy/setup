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
- `components/home`: home layout and animations.
- `components/vo`: company, services, products, Creatio, inquiry and confirmation pages.
- `public/vo`: VO photography, client artwork, product artwork and company profile PDF.

The inquiry and profile forms are preview-only. They show a confirmation but **do not send or store submissions**. Connect a backend and add a privacy policy before accepting actual inquiries. The company profile download works without submitting personal information.
