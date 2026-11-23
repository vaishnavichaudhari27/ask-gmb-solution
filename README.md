# ASK GMB Solution website

React, Vite, and React Router website for ASK GMB Solution.

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; run ESLint with `npm run lint`.

## Site configuration

Edit `src/siteConfig.js` to update the company details, address, phone, WhatsApp link, Maps location, social links, Calendly URL, and website URL. Keep `siteUrl` blank until the production domain is confirmed; canonical URLs and the XML sitemap are generated only after a verified HTTPS origin is set.

The production build generates `robots.txt` and, when `siteUrl` is configured, `sitemap.xml`. Do not use a placeholder domain. The `_redirects` file provides SPA route fallback on static hosts that support Netlify-style redirects.

## Enquiry form integration

The contact form validates its required fields in the browser. Without an endpoint, it opens a prefilled email draft and clearly tells the visitor that the enquiry still needs to be sent.

To enable direct submissions, set `contactFormEndpoint` in `src/siteConfig.js` to an HTTPS endpoint that accepts a JSON `POST` with `name`, `phone`, `email`, `businessType`, `serviceNeeded`, and `message` properties. The endpoint must allow requests from the deployed site and return a successful HTTP status only after it has accepted the enquiry.

## Routes

- `/` — Home
- `/about` — About
- `/services` — Service categories and service links
- `/industries-we-serve` — Industries
- `/our-process` — Working process
- `/google-business-profile`, `/google-maps-ranking`, `/local-seo`, `/search-engine-optimization`, `/google-reviews-management`, `/gbp-verification-suspension` — Digital growth services
- `/website-design-development`, `/react-development`, `/wordpress-development`, `/website-maintenance-hosting`, `/custom-web-solutions` — Technology services
- `/mobile-app-development` — Mobile app development
- `/blogs` and `/blogs/:slug` — Articles
- `/contact` — Contact details, enquiry form, and map
- `/privacy-policy`, `/terms-and-conditions` — Policies

The legacy `/digital-marketing` and `/technologies` URLs redirect to `/services`.
