# Roza Eats — a trainer for your food routine

An English–Malayalam experience for familiar Kerala meals, thoughtful portions and a repeatable food routine. A Caroza Pvt Ltd brand; Roza Labs is the menu research and development arm.

**Public website:** https://roshanmahamoodnk.github.io/roza-eats/

## Experience

- `index.html`: interactive daily-life prompts, swipeable/filterable six-meal discovery, a scroll-linked routine story, live portion estimates and Roza Labs.
- `routine.html`: eight conversational steps with answer-specific acknowledgements, an evolving visual companion, expandable explanations, optional body measurements, preference-based meal ideas and a downloadable summary.
- `menu.html`: six Kerala meal ideas, dietary filters, customizable bowls, ingredient-based reference estimates, lunch bag and proposed next-day schedule.
- `my-week.html`: one habit, seven dated check-ins, an optional device-only save, bilingual download and print layout. Assessment handoff carries only a habit and meal preference.
- `evidence.html`: primary sources, calculation assumptions, privacy, imagery disclosures and launch status.

`experience.css` and `experience.js` provide the shared app-style navigation, contextual help dialog, meal discovery and visual layer across all five routes. Help is a clearly labelled guide, not a simulated live nutritionist. It never submits information or claims a callback is booked.

The responsive design preserves the existing Nano Banana 2.1 assets and adds a forest-green/ivory/lime identity with a warm orange accent, scroll reveals, sticky navigation and a persistent navigation dock, English/Malayalam switching and reduced-motion controls. AI images are labelled concepts, not customers, staff or verified serving photographs.

## Run and validate

This is a buildless static website. No package installation is required.

```sh
python3 -m http.server 8000
node --test nutrition.test.cjs routine.test.cjs week.test.cjs scroll-lab.test.cjs
```

Open http://localhost:8000. GitHub Pages serves `main` from `/ (root)`.

The 29 automated checks cover ingredient calculations, component scaling, valid preferences, bag validation, exact 24-hour IST cutoffs, Sunday exclusions, repeat schedules, maintenance-estimate guards, dietary recommendations, walking arithmetic and contact configuration, calendar boundaries, future-day check-in restrictions, saved-state validation and private-field exclusion. Browser QA covers desktop and narrow layouts, Malayalam, normal and review-first assessment paths, portion controls, meal customization, schedule review and reset. Snapshot download and file content are verified in a standalone browser tab. Planner QA additionally covers assessment handoff, optional save/reload/removal, date-change confirmation and cancel, future-day controls, and 390/360 px English/Malayalam layouts. The Malayalam planner TXT download was inspected. A print stylesheet and native print control are included; browser-to-PDF output has not been independently verified.

## Contact activation

Set the verified Roza business destination in `contact-config.js`. `whatsapp` takes international digits including the country code, without a plus or spaces. `email` is used when a valid WhatsApp number is absent.

Leave both blank until the business destination is supplied. The site then clearly says callback requests are not open. Once configured, visitors review a short message, explicitly choose to share it and open WhatsApp/email to send it themselves. No automatic message, callback booking, order or payment occurs. Measurements, allergy answers, activity and sleep answers are excluded from the contact message.

## Nutrition and calculation limits

`nutrition.js` and `nutrition-reference.json` retain the ingredient-reference model. Jeerakasala uses generic cooked white-rice data, fish uses tilapia, ragi puttu has an assumed yield, and soy is specified dry before hydration. Oil, coconut, yogurt and a spice proxy are included. Sodium and carbohydrate claims are not displayed because needed specifications/conventions are incomplete.

`routine-engine.js` combines the published Mifflin–St Jeor resting-energy equation with broad FAO population PAL bands to illustrate a maintenance range, not prescribe calories or forecast weight loss. It withholds estimates for review/skip routes, health-related goals, missing adult confirmation, unsupported ages/body sizes and unsuitable target weights. Meal ideas match taste and preference only. Ingredient-review requests block recommendations pending kitchen review.

**Meal nutrition is an illustrative recipe estimate, not validated Roza product nutrition.** Final recipes, cooked yield, suppliers, allergens, salt and appropriate nutrition/claim validation must be established before product claims. No restaurant comparison, disease treatment, universal keto harm, guaranteed weight loss or health score is asserted. Source institutions do not endorse Roza.

## Data and launch status

Assessment answers exist only in current-page memory and disappear on reload or clear. No assessment backend or marketing analytics is installed. Language, motion and lunch-bag preferences use local storage. The weekly habit planner is saved locally only by explicit opt-in and excludes the assessment profile; its one-time handoff uses tab session storage for two preference fields only. Downloads are generated locally; full snapshots can contain measurements the visitor entered. Hosting, fonts and user-chosen messaging apps have their own ordinary network requests/policies.

This is a prelaunch experience and planning prototype. The proposed pilot is Kozhikode lunch, Monday–Saturday, at least 24 hours ahead in India Standard Time. It does not reserve capacity, charge customers or activate subscriptions. Pricing, service zones, staff credentials, support contacts, terms and fulfillment must be finalized before commerce. See `DESIGN-AND-LAUNCH.md`.

Brand names and artwork remain with their respective owners; no open-source licence has been granted by this repository.

## Experience upgrade · 6 November 2026

The latest redesign makes the first action personal: choose a daily difficulty, receive a short relevant reply, then carry that choice into the assessment. Homepage meals can be filtered or swiped; each opens its existing recipe in the meal studio. The narrative's day widget follows the three service steps while scrolling. The shared “Ask Roza” dialog explains delivery, professional support and contact status without inventing live availability.

Verification for this upgrade: all 25 existing tests passed; all changed scripts parsed; local assets and HTML anchor targets checked. Browser checks covered desktop and narrow English/Malayalam layouts, 360/390 px phone frames, meal filters and builder portion/protein changes, challenge handoff, ordinary results, health/ingredient review routes, weekly habit handoff, dialog close/Escape/focus return, motion preference and root scroll behaviour. Existing Nano Banana files, calculations, scheduling rules and blank contact destinations were preserved.


## Measured-food scroll story · 7 November 2026 (IST)

The homepage now includes a three-scene sticky measurement board after the visitor's daily difficulty: oil, cooked brown rice and the protein/energy trade-off. Oil fill, grams, energy counters, a portion ruler and meal-image movement follow native scrolling. Chapter buttons let visitors skip ahead; the final scene opens M2 in the existing meal studio. The hero and kitchen photo have restrained movement. No scrolling is intercepted, and no animation library or tracking was added.

`scroll-lab-model.js` derives independent examples from the existing ingredient data: 10→5 g added coconut oil changes oil energy by 44.6 kcal; 200→150 g cooked brown rice changes M2 by 61.5 kcal; 100→150 g chicken plus proportional marinade adds 15.67 g protein and 92.25 kcal. These are illustrations, not tested product improvements, personal portions or cumulative savings. The evidence page documents assumptions and source records.

All 29 tests pass. Additional browser checks cover all three scenes, changing counters, desktop/360/390 px layouts, Malayalam, chapter navigation, keyboard activation, motion-off endpoint values, expandable methods and the M2 studio handoff. Static equivalent explanations remain available to assistive technology; rapidly changing counters are excluded from announcements. Existing Nano Banana assets and launch/contact configuration are unchanged.
