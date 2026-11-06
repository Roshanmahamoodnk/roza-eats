# Roza Eats: whole-journey design audit

7 November 2026 (India time). Starting point: published main `00b2a322d30a5625488bd41ba446f9c5bce8481f`. This is newly requested design work; no failed production deployment was found at the start.

## Published evidence, not an invented jury verdict

[CSS Design Awards' process](https://www.cssdesignawards.com/about/) separates panel-scored Website of the Day recognition from public UI, UX and Innovation awards, which combine voting with judge scores. Its entries describe UI as interface aesthetics/effects, UX as experience/functionality, and Innovation as design/development ideas.

The supplied entries publish scores, credits and descriptions. **No written jury explanation of why these four sites won was found in their entries or the focused official-source search.** Our interpretation below is design analysis, not reconstructed jury commentary. Awards do not prove accessibility, conversion uplift, speed or nutrition efficacy.

| Official entry | Website of the Day | Final score | Published scope |
| --- | --- | --- | --- |
| [Hungry Tiger](https://www.cssdesignawards.com/sites/hungry-tiger/47670/) / Artemii Lebedev | 29 June 2025 | 7.95 | Animated, fullscreen, typographic food presentation. |
| [Promeat](https://www.cssdesignawards.com/sites/promeat/47856/) / Chipsa | 2 August 2025 | 8.28 | Editorial layout and a WebGL sequence presenting product and craft. |
| [Root Food](https://www.cssdesignawards.com/sites/root-food/44099/) / ET Studio | 7 October 2023 | 8.34 | Photographic, grid and typographic presentation. |
| [More Nutrition](https://www.cssdesignawards.com/sites/more-nutrition/48168/) / FUTURE THREE | 7 October 2025 | 8.20 | A self-initiated Matcha Latte concept study, not a verified production ordering journey. |

[Communication Arts' Root Food feature](https://www.commarts.com/webpicks/root-food) contains **responses by ET Studio**, not a jury assessment. The creators describe connected recipe-book chapters, natural colours by category, consistent imagery, minimal page changes, horizontal desktop navigation, vertical mobile navigation and compressed WebP images. These explain design intent, not commercial outcomes.

The earlier reference board and ingredient-story pass remain useful context. No reference branding, copy, images or layouts were copied into Roza.

## Research translated into original decisions

| Reference | Our design analysis | Roza application |
| --- | --- | --- |
| Hungry Tiger | A memorable food object and decisive typography make the offer concrete. More motion is not automatically more useful. | Food-led meal-studio entrance, larger meal names, readable ingredient choices, direct catalogue/ingredient actions. Existing Roza photography concepts retain disclosures. |
| Promeat | Editorial sequencing can explain craft without making every detail compete with the next decision. | Optional cooked-portion details, a readable summary, and three evidence categories: published guidance, illustrative estimates, still to verify. Allergen and estimate warnings remain visible. |
| Root Food | A coherent story can continue across practical tools through repeated cues and clear next steps. Mobile should follow ordinary reading habits. | Existing day/plate/week orientation, snapshot section links, vertical phone choices, earlier mobile food imagery and readable explanatory text. |
| More Nutrition | Product staging helps recognise the current selection. Colour should explain context, not imply an unearned result. | Forest green for habit/builder focus, sage for familiar choices, peach for practice, muted lilac for evidence context. Short state transitions without WebGL or continuous effects. |

These colour roles, rounded controls, Manrope hierarchy, restrained serif emphasis and Malayalam typography extend Roza's established identity. Selected controls use borders, checks and pressed states as well as colour.

## Audit across every important step

Fresh desktop screenshots were captured before source edits for steps 1-8 and inspected together. Updated desktop and phone screenshots were captured during verification. Step 9 was inspected directly during functional testing. These are task-flow and visual observations; screenshots alone do not establish accessibility compliance.

| Step / output | Observed friction | Implemented change | Current health / limit |
| --- | --- | --- | --- |
| **1. Homepage** - `index.html` | Strong food identity; small supporting copy and dock labels. | Larger supporting text, labels and help controls. Existing ingredient and measurement stories preserved. | Desktop/mobile checked; images remain illustrative. |
| **2. Discovery** - `menu.html#meals` | Text dominated the opening; food appeared later. | Food-led entrance, two clear entry actions, catalogue heading, larger cards and announced filter count. Earlier photo on phones. | Filters and meal-to-builder selection checked; no fabricated prices. |
| **3. Builder** - `menu.html#build` | Small text, tall decoration and independently scrolling summary. | Compact ingredient image, shorter bilingual introduction, readable controls, natural-height summary, native cooked-portion disclosure. | Portion changes checked; estimates and allergens remain visible. |
| **4. Weekly practice** - `my-week.html` | Entry count competed with habit; setup/check-in required searching. | Habit-led hierarchy, smaller labelled count, direct setup/check-in links, dated controls and warm reflection note. | Time change, keyboard check-in, save/restore/removal checked; no health score. |
| **5. Evidence/privacy** - `evidence.html` | Long page; weak distinction between guidance, assumptions and obligations. | Three linked reading categories, active-section index, mobile horizontal index and practical next-step footer. | Chapter navigation checked; sources and privacy facts preserved. |
| **6. Help** - shared Ask Roza dialog | Small type and close targets. | Larger text/controls, notice treatment and consistent spacing. | Contact status, Escape and focus return checked; explicitly not live chat. |
| **7. Questionnaire** - `routine.html` | Important phone choices and explanations were small. | Larger choices, vertical phone location/challenge lists, clearer selected states and short question-entry transition. | Eight-step ordinary/review-first paths and keyboard selection checked. |
| **8. Results** - after assessment | Habit, calculation context and next actions had similar visual weight. | Habit leads in green; estimate/review context sits beside it; local section links and a distinct practice invitation. | Estimate, withholding, ingredient-review blocking, download and weekly handoff checked. |
| **9. Schedule/review** - `menu.html#plan` | Small fields and supporting text. | Readable date/slot controls, bag actions and review typography. | Three-day review and dialog focus return checked; no order or reservation created. |

## Motion and performance

Native scrolling remains. No wheel interception, gesture-required reading or animation-dependent answers. Existing oil, rice and chicken scenes remain independent examples from the same model.

The new question-entry transition lasts 240 ms; its class is removed afterwards so choosing an answer does not replay it. Desktop hover feedback is restrained. The site motion switch was tested and the operating-system CSS path inspected; [MDN documents this preference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

The shared CSS/JS layer adds approximately 27.8 KB raw / 6.8 KB gzip, excluding changed HTML. No framework, animation library, tracking, network API or new image file was added. The existing hero image is reused on the menu page. No Lighthouse score or conversion uplift is asserted.

## Verification and limits

All **29 existing model tests** passed: food composition, portions, preferences, clinical/adult guards, scheduling boundaries, calendars, privacy allowlists and independent scroll examples. Changed JavaScript parsed; Git whitespace and local asset/page checks passed; static IDs were unique. Protected calculation modules, contact configuration and Nano Banana image bytes are unchanged.

Browser QA covered desktop and 360/390 px outer phone frames (345/375 px content widths with the preview scrollbar), English/Malayalam, all five routes, meal filters, ingredient portions/details, ordinary and professional-review assessment paths, result section links, snapshot export, weekly handoff, time update, check-in, optional save/restore/removal, schedule review, Escape/focus return and motion-off chapter/measurement navigation. No horizontal document overflow was observed in checked narrow views.

The standalone snapshot was opened locally: expected fictional-profile estimate and no-booking notice verified. Logs inspected showed browser-extension metadata errors, with no Roza-script error identified in those entries.

This is targeted design/functional QA, not comprehensive accessibility certification, a screen-reader study, native Malayalam editorial sign-off or real-device performance lab. Existing missing business inputs remain: verified Roza contact, prices, coverage/fees, launch date/capacity, final recipes and professional credentials. None was fabricated.

## Observed interruptions and recovery

Browser actions reported command-dispatch/CDP mouse-event deadlines. Fresh state showed selected answers without progression; state-checked retry/keyboard action continued successfully. Some screenshots immediately after actions showed earlier paint while the accessibility tree had advanced; settled captures were used. Some selector misses were QA locator mistakes, corrected from the visible DOM rather than classed as site defects.

[Playwright's actionability documentation](https://playwright.dev/docs/actionability) explains ordinary action checks and timeouts but does not establish a cause for this browser's transport deadlines. The underlying cause remains unknown. Preview source synchronization coincided with the mobile harness returning to its initial page; the saved week restored afterwards. No production outage is inferred and no external publication was in flight.

Publish the checked tree once with a latest-head lease, then finish Pages before optional changes. The task result records actual publication/live verification. Subsequent runs should preserve newer commits and resume only concrete unfinished work.
