# Roza Eats: routine coach experience

## Positioning

**Your Kerala food. A routine that fits you.**

Roza's useful difference is coordinated support: understand a person's actual day, develop familiar meals with repeatable portions, plan the next lunch, then review what they can keep doing. The offer earns trust through kitchen consistency and qualified support. A calorie number alone is not the product.

The first audience is busy adults in Kozhikode who enjoy local food and want less daily decision-making. Recognize late lunches, tea breaks, meetings, family meals and evening walks. Do not imply a fifty-year operating history or blame Kerala cuisine.

## Visitor journey

| Stage | Visitor thought | Interface and next action |
| --- | --- | --- |
| Recognition | This sounds like my day. | Familiar-food hero and three ordinary-day moments; start with timing, portions or tea-time habits. |
| Understanding | What does Roza do? | Understand, plan, schedule, review; explain nutrition, chef and fitness roles as the service model. |
| Appetite | Can I keep food I enjoy? | Six familiar meals, customization, portions and ingredients. |
| Trust | Why should I believe this? | Primary sources, transparent estimates, visible assumptions and prelaunch status. |
| Relevance | Would it fit me? | Eight short assessment steps with why each question matters; no signup before results. |
| Value | I learned something useful. | First habit, preference-based ideas, optional broad maintenance estimate and general activity/rest guidance. |
| Practice | Can I start now? | An optional seven-day habit planner with a chosen meal time, honest check-ins, local save and printable export; no signup or health score. |
| Conversation | Can someone help me? | One contact destination, reviewable message and explicit choice to send. |

## Visual and motion direction

Forest green, warm ivory, lime and small orange accents form a familiar food brand. Oversized English headings and separately tuned Malayalam type give both languages room. The wordmark uses original typography, not an imitation of Zomato or Uber Eats.

Existing Nano Banana food assets stay consistent across stories, cards and the builder. Images are illustrative and do not change with exact gram selections. Captions explain this. Scroll reveals introduce sections; sticky navigation and a mobile CTA keep the next action available. Motion can be paused and operating-system reduced-motion preferences are respected. No autoplay video or simulated clinical outcome is used.

## Evidence and honest persuasion

| Message | Basis and boundary |
| --- | --- |
| Familiar food can belong in a varied pattern | WHO healthy-diet guidance and ICMR–NIN 2024. Portions, quality and the overall pattern matter. |
| Fat is needed; amount and type matter | WHO. Count oil, coconut and other sources rather than calling fat a villain. |
| Protein and strength activity belong together | WHO diet/activity guidance. No promise that a meal builds muscle or all low-carb diets cause weakness. |
| Sustainable plans need ongoing support | NIDDK. DIETFITS found no significant 12-month weight-loss difference between its healthy low-fat/low-carb groups; it was not a Roza or universal keto trial. |
| Activity and sleep matter | WHO adult activity and CDC sleep guidance. Distance is time × pace, never a requirement to burn off biriyani. |
| Body estimates are optional and approximate | Mifflin predicts resting energy; FAO PAL bands are broad population references. Individual targets need appropriate professional review. |

Primary sources and exact limitations are published in `evidence.html`.

## Operational proof before selling the promise

1. **Recipe version control:** assign SKU/formula revisions; record raw/cooked weights, yield, oil/coconut/salt, specifications, allergens and serving tolerance. Tie website estimates to approved formulas.
2. **Structured trials:** compare a small number of oil/portion/process variants using a prespecified trial sheet. Record taste, texture, aroma, appearance, hunger feedback, portion acceptance and delivery-hold quality. Define taste and safety acceptance criteria; a tasting does not establish health outcomes.
3. **Commercial validation:** calculate ingredient, packaging, labor, waste and route costs from quotes and pilot records. Finalize price and capacity before accepting orders.
4. **Qualified review:** publish real staff names, roles and relevant credentials with consent. Define when a nutritionist or clinician reviews needs before recommendations.
5. **Fulfillment proof:** establish food safety, holding temperatures, allergen controls, delivery windows, complaint handling and rescheduling rules; log actual dispatch/arrival times and exceptions.
6. **Progress evidence:** with consent, track adherence, satisfaction, hunger feedback and operational reliability. Clinical measures belong with qualified professionals. Use genuine, consented customer accounts. Reward useful feedback or consistency, never specified weight loss or positive testimonials.

## Pilot and conversion learning

Start with six lunch meals and a defined Kozhikode route. Set real enrollment capacity from kitchen and delivery capability. Publish an early-bird offer only after its benefit, eligibility, dates and terms are approved. No fake scarcity or unverified discount is included now.

After contact activation, track aggregate visits, assessment starts/completions, message opens, enquiries received, qualified conversations, paid trials, repeats and cancellations with a consent-respecting implementation. A message open is not an enquiry or booked callback. No analytics is installed in this version; health/body answers must not go to analytics.

Test one material change at a time, such as “Find my food routine” versus “Plan a better lunch.” Define outcome and observation period first. Review completion/drop-off alongside qualified enquiries, not clicks alone.

## Outstanding inputs

- Verified Roza business WhatsApp or email to activate the single contact flow.
- Prices, confirmed service zones/windows, capacity, terms and support process before orders.
- Approved formulations, product nutrition, ingredient/allergen specifications, real team profiles and consented product/customer photos.
- Native Malayalam editorial review before paid campaigns, especially nuanced nutrition wording.

The current site openly describes prelaunch limits while providing the complete exploration interface.


## Continuation checkpoint · 6 November 2026

The assessment-to-practice journey is implemented in `my-week.html`. It carries only a habit and meal preference into a seven-day plan, offers optional device saving, and never creates a delivery booking, health score or automatic reminder. Existing Nano Banana assets and blank contact configuration are preserved.

Verification: 25 calculation, scheduling, assessment and planner tests; browser checks of handoff, save/reload/removal, check-ins, date-change confirmation/cancel, narrow English/Malayalam layouts and Malayalam TXT download. Print CSS and the native print control are present; generated PDF output remains unverified.

A reproducible planner issue was found during QA: after a date change, the reset-confirmation panel was below the viewport (top about 1,575 px in a 936 px viewport). The update explicitly scrolls the confirmation into view before focusing it; recheck placed the panel within the viewport and cancel preserved existing entries. A one-off browser-control click during assessment scrolling opened the nearby evidence link; the cause was not established. Returning to the result and clicking the same verified planner link succeeded, carrying the correct habit and meal. This is not evidence of a site outage.

Next resumable work: verify the deployment of this commit, then stop if it succeeds and no new defect or instruction exists. Commerce and enquiries continue to wait for the outstanding business inputs above. Do not create extra changes merely for continuity checks.

## App experience upgrade · 6 November 2026

Newly authorized work: make the existing website feel like a polished food app with a human, low-reading journey. Implemented a bolder food-led homepage, short choice-and-response interaction, filtered swipeable meals, a scroll-linked routine story, an always-available five-action dock, and a native help dialog across all pages. The assessment now has contextual acknowledgements and an evolving visual companion; explanations are available on demand. Critical clinical-review information remains visible. No new claims, staff identities, customer stories, prices or contact destinations were invented.

Design references: [Apple motion guidance](https://developer.apple.com/design/human-interface-guidelines/motion), [Apple onboarding guidance](https://developer.apple.com/design/human-interface-guidelines/onboarding), [Google Material](https://m3.material.io/), and [Gary Der's Uber Eats design case study](https://garyder.design/uber-eats). These informed short interactions, helpful feedback and clear next actions, not copied branding or a claim of equivalent conversion performance. Conversion improvement still needs real measurement after launch.

Observed issue and repair: during mobile QA, the root `html` element had the `motion-off` class but computed `scroll-behavior: smooth`. The descendant motion rule did not affect the root. [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior) explains that the root setting controls viewport scrolling, and [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) explains that `auto` follows the computed CSS setting. Added an explicit `html.motion-off` override; browser recheck returned `auto`, and the complete professional-review assessment path then succeeded. A failed automated selection during scrolling was observed; the click's precise failure mechanism was not independently established.

Other QA corrections: reduced the Malayalam hero/stamp sizing after an 8 px horizontal overflow; the revised 360 px frame measured equal 345 px content/scroll widths (the remaining 15 px is the desktop browser's frame scrollbar). Corrected the old menu link to the renamed homepage “how” anchor. A help-close attempt found the dialog already hidden after preview updates; current state was inspected and testing continued, with no duplicate submission or production change. This was a local preview/test interruption, not evidence of a public outage.

Validation: 25 existing automated tests pass. Desktop/narrow English/Malayalam checks cover the new navigation, intent handoff, meals, portion/protein controls, ordinary and review-first assessment results, weekly handoff, help state and motion. All nutrition/scheduling calculations and Nano Banana assets remain unchanged. No new analytics or sensitive-data persistence was added.

Next checkpoint: publish this upgrade, wait for its GitHub Pages run, and verify the public experience before any optional follow-up push. Enquiry activation and commerce still depend on the outstanding launch inputs above.

### Publication checkpoint: connection recovered

The first ordinary `git push origin main` returned `fatal: could not read Username for 'https://github.com': No such device or address`. A subsequent API read confirmed remote `main` remained `eedc1e9f2dc0978a80705710426389bf28484a38`; its last Pages run was successful `42255426270`. No new deployment started from that attempt. This was a publishing-authentication blocker, not a site outage or build failure. The reason the earlier connection was unavailable is unknown.

The user then connected GitHub during the same turn. Publication resumed through the connected repository API, preserving the existing tree and using a checked parent/head for a single atomic branch update. [GitHub's authentication guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github) distinguishes public reads from authenticated access. No credentials were guessed, copied from another account, or exposed.

Next resumable step: inspect the latest branch and this redesign's Pages run, finish any pending deployment, and verify the public homepage/assessment. The final task result records the observed deployment outcome. Do not push optional follow-up documentation while Pages is still running. All outstanding launch inputs remain as listed above.
