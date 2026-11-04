# Roza Eats

A responsive English–Malayalam website for the Roza Eats Kerala meal-service concept, a brand under Caroza Pvt Ltd with menu development by Roza Labs.

**Public website:** https://roshanmahamoodnk.github.io/roza-eats/

## Experience

- Six familiar Kerala meal ideas with a customisable bowl builder.
- Jeerakasala rice, brown rice or ragi puttu; chicken, fish, egg–kadala or soy–kadala; vegetable and side choices.
- Vegetarian and egg-friendly filters, three starting portion levels, grain/protein/vegetable adjustments and spice preference.
- Live ingredient-based reference estimates for energy, protein, total fat and fibre, including model oil and coconut quantities.
- Contextual pairing suggestions and a transparent ingredient/source dialog.
- Editable multi-bowl lunch bag, quantities, device-local persistence and downloadable plan.
- Monday–Saturday lunch schedule, exact 24-hour cutoff in India Standard Time and 1/3/5/20-day repeat plans.
- Realistic concept photography, explicitly labelled AI lifestyle scenes, scroll animation and motion controls.
- English and Malayalam, responsive mobile layouts, keyboard controls and reduced-motion support.

## Run locally

This is a buildless static website. Serve this directory with a static web server:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. GitHub Pages serves `main` from `/ (root)`; there is no package installation or build step.

## Nutrition model

`nutrition.js` contains the ingredient references, provisional formulations, portion calculations and scheduling functions. `nutrition-reference.json` records sources and assumptions. `builder.js` renders the customer experience; `builder.css` supplies its styles. All data is local.

Reference data comes from USDA FoodData Central and the ICAR–Indian Institute of Millets Research publication referencing IFCT 2017. Jeerakasala uses generic cooked white-rice data; fish uses cooked tilapia; ragi puttu has an assumed hydration/yield; soy is measured dry and then hydrated. These proxies are disclosed. Oil, coconut, yogurt and a spice proxy are included. Final salt specifications are unavailable, so sodium is not estimated. Carbohydrate is not displayed because the selected source conventions are not harmonised.

**All displayed nutrition is illustrative, not verified Roza product nutrition.** No restaurant comparison, weight-loss outcome or final product nutrient claim is made. Before sale, final formulations, cooked yield, ingredient specifications, salt, allergens and appropriate nutrition/claim validation must be established. Source institutions do not endorse Roza Eats.

Run the calculation and date-boundary checks with Node.js:

```sh
node --test nutrition.test.cjs
```

The tests cover ingredient aggregation, grain scaling, oil/coconut contribution, dry-soy hydration, protein portions, valid combinations, persisted selection validation, 24-hour cutoffs, invalid dates and Sunday exclusions.

## Launch status

This is a visual and interaction prototype, not a live ordering or payment system. Saving or downloading a lunch plan does not send an order, book delivery capacity or activate a subscription. No price, payment, contact form or medical information collection is enabled. Final prices, service areas, delivery capacity, customer support and operating terms must be supplied before commerce launches.

The AI-created food and lifestyle images are representative concepts, not final product photos, real customers, actual staff or tested outcomes. No invented customer testimonials are used. The video is an animated concept, not filmed kitchen footage.

Language, motion and lunch-bag preferences are stored in the visitor’s browser. Downloaded plans are generated locally. No marketing analytics are included. Google Fonts supplies Manrope and Noto Sans Malayalam, with system fallbacks.

Brand names and artwork remain with their respective owners; no open-source licence has been granted by this repository.
