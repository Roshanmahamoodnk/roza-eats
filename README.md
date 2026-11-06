# Roza Eats — a trainer for your food routine

An English–Malayalam experience for familiar Kerala meals, thoughtful portions and a repeatable food routine. A Caroza Pvt Ltd brand; Roza Labs is the menu research and development arm.

**Public website:** https://roshanmahamoodnk.github.io/roza-eats/

## Experience

- `index.html`: local daily-life storytelling, the understand → plan → schedule → review service, meal discovery, interactive portions, walking time/distance and Roza Labs.
- `routine.html`: eight conversational steps with explanations, optional body measurements, preference-based meal ideas, a practical first habit and a downloadable summary.
- `menu.html`: six Kerala meal ideas, dietary filters, customizable bowls, ingredient-based reference estimates, lunch bag and proposed next-day schedule.
- `evidence.html`: primary sources, calculation assumptions, privacy, imagery disclosures and launch status.

The responsive design preserves the existing Nano Banana 2.1 assets and adds a forest-green/ivory/lime identity, scroll reveals, sticky navigation, English/Malayalam switching and reduced-motion controls. AI images are labelled concepts, not customers, staff or verified serving photographs.

## Run and validate

This is a buildless static website. No package installation is required.

```sh
python3 -m http.server 8000
node --test nutrition.test.cjs routine.test.cjs
```

Open http://localhost:8000. GitHub Pages serves `main` from `/ (root)`.

The 19 automated checks cover ingredient calculations, component scaling, valid preferences, bag validation, exact 24-hour IST cutoffs, Sunday exclusions, repeat schedules, maintenance-estimate guards, dietary recommendations, walking arithmetic and contact configuration. Browser QA covers desktop and narrow layouts, Malayalam, normal and review-first assessment paths, portion controls, meal customization, schedule review and reset. Snapshot download and file content are verified in a standalone browser tab.

## Contact activation

Set the verified Roza business destination in `contact-config.js`. `whatsapp` takes international digits including the country code, without a plus or spaces. `email` is used when a valid WhatsApp number is absent.

Leave both blank until the business destination is supplied. The site then clearly says callback requests are not open. Once configured, visitors review a short message, explicitly choose to share it and open WhatsApp/email to send it themselves. No automatic message, callback booking, order or payment occurs. Measurements, allergy answers, activity and sleep answers are excluded from the contact message.

## Nutrition and calculation limits

`nutrition.js` and `nutrition-reference.json` retain the ingredient-reference model. Jeerakasala uses generic cooked white-rice data, fish uses tilapia, ragi puttu has an assumed yield, and soy is specified dry before hydration. Oil, coconut, yogurt and a spice proxy are included. Sodium and carbohydrate claims are not displayed because needed specifications/conventions are incomplete.

`routine-engine.js` combines the published Mifflin–St Jeor resting-energy equation with broad FAO population PAL bands to illustrate a maintenance range, not prescribe calories or forecast weight loss. It withholds estimates for review/skip routes, health-related goals, missing adult confirmation, unsupported ages/body sizes and unsuitable target weights. Meal ideas match taste and preference only. Ingredient-review requests block recommendations pending kitchen review.

**Meal nutrition is an illustrative recipe estimate, not validated Roza product nutrition.** Final recipes, cooked yield, suppliers, allergens, salt and appropriate nutrition/claim validation must be established before product claims. No restaurant comparison, disease treatment, universal keto harm, guaranteed weight loss or health score is asserted. Source institutions do not endorse Roza.

## Data and launch status

Assessment answers exist only in current-page memory and disappear on reload or clear. No assessment backend or marketing analytics is installed. Language, motion and lunch-bag preferences use local storage. Downloads are generated locally; full snapshots can contain measurements the visitor entered. Hosting, fonts and user-chosen messaging apps have their own ordinary network requests/policies.

This is a prelaunch experience and planning prototype. The proposed pilot is Kozhikode lunch, Monday–Saturday, at least 24 hours ahead in India Standard Time. It does not reserve capacity, charge customers or activate subscriptions. Pricing, service zones, staff credentials, support contacts, terms and fulfillment must be finalized before commerce. See `DESIGN-AND-LAUNCH.md`.

Brand names and artwork remain with their respective owners; no open-source licence has been granted by this repository.
