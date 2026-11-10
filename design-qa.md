# Human routine design QA — 10 November 2026

Final result: passed for this bounded prelaunch design release.

## Target and scope

Blend the selected ordinary-day homepage, conversational assessment and familiar-plate menu directions from the Roza Eats Human Service and UX Blueprint. This is an adaptation into the existing bilingual product, not a pixel-identical reproduction of the concept images. Existing navigation, safety disclosures, six assessment choices and eight steps remain. The current visitor request rejects disturbing scroll motion; native scrolling takes precedence over earlier motion references.

Reference image IDs: `exec-3e86d363-a2d0-473a-a189-59782bbc74d5.png` (home), `exec-e9e28f73-6a19-4e9e-84c4-849f2b4f8f38.png` (assessment), `exec-85d66324-9dda-46d5-a7dc-1f12d8ae31bb.png` (meal studio). Source concept package: Roza Eats Human Service and UX Blueprint, delivered before this implementation.

## Visual review

Desktop screenshots at 1348 × 936 CSS/screenshot pixels; mobile responsive frames at 390 and 360 × 844 (15px desktop-rendered scrollbar). Actual phone hardware was not used. Homepage, questionnaire, menu, week, evidence and health guide inspected. English and Malayalam assessment and health content checked; this is not a native-language linguistic certification. No horizontal overflow observed in the inspected 390px assessment, menu, health, week or evidence documents.

Combined reference/implementation boards reviewed in the same images: `comparison-home.jpg`, `comparison-menu.jpg`, `comparison-routine.jpg` under the session QA directory `/workspace/shared/roza-human-qa/`. Screenshots include `home-desktop.png`, `home-mobile.png`, `routine-mobile.png`, `routine-mobile-final.png`, `menu-desktop.png`. Reference and implementation are scaled side by side; their source dimensions differ, so this is a direction/hierarchy comparison, not a pixel-diff claim.

Iteration: corrected low-contrast meal-photo caption to explicit white/opacity 1; verified computed color and visual output. Tightened mobile assessment photo and progress spacing, removed the bottom navigation dock during questions to keep choices accessible, and adjusted the photo crop toward the face. Existing six choices intentionally require more vertical room than the four-option concept; review disclosures and translation room are retained. Menu service explanation remains on the homepage while the menu leads directly into the working catalog/builder. These are intentional functional adaptations.

## Functional checks

- 29/29 existing Node tests passed: reference nutrition, portion changes, bounded combinations, clinical-review exclusions, dietary filters, 24-hour IST cutoff, Sundays, invalid schedules, weekly state validation and privacy allowlists.
- JavaScript syntax checks and git whitespace check passed.
- Six HTML pages scanned: one initial h1 each, no duplicate IDs or missing local asset/file references.
- Browser: challenge → area → goal → food/allergy → timing → activity/rest → review → optional measurements → result completed.
- Synthetic eligible adult example (35 years, 170 cm, 75 kg, male equation) showed broad maintenance range and BMI 26.0 with limitations. Malayalam switch preserved the result/answers. Edit returned to the first step with selections retained.
- Professional-review route withheld energy and BMI even after body values had previously been entered.
- Blank contact configuration produced no callback submission and explicit unavailable status.
- Meal builder changed rice from 150g to 100g: illustrative estimate changed from about 540 to 470 kcal. Bag and scheduled plan dialog worked and explicitly stated no order/booking/payment.
- Health deep link opened the correct disclosure; Enter closed it using native keyboard behavior.
- Motion remains off by default with OS reduced-motion support; no new scroll listeners, parallax, pinning or reveal dependencies.

## Observed interruption and recovery

Local Playwright Chromium failed before loading the app: process_singleton_posix socket() returned Operation not permitted; crash handler also reported ptrace denied. This is an executor permission restriction, not evidence of a site defect. Used the already working shared cloud browser for responsive and interaction checks; no security settings were changed. Initial iframe screenshots captured before paint were blank, while subsequent settled screenshots and accessibility trees rendered normally. Cloud browser logs included extension metadata errors under a chrome-extension URL; these were not site script errors. No application error surfaced in the tested journeys. Do not report exhaustive automated browser coverage.

## Launch boundaries

Still prelaunch. No contacts, prices, team credentials, outcomes or coverage invented. Medical editorial review, native Malayalam review, real product photos/recipe validation and operational launch inputs remain necessary. No claim that these tests validate clinical effectiveness, accessibility certification or measured conversion improvement.
