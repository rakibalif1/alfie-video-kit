# Brand safety for the illustrated UK backgrounds

This lowers risk. It is not legal advice and gives no legal certainty. If the video is commercial or widely distributed, ask a solicitor.

## What we do (lower risk)
- Real shop, bank and airline names appear only as plain text, in our own lettering (Arial Black or Georgia) and our own simple colours.
- They are incidental background that sets the scene (a high street), not the subject of any scene.
- Names come only from the list in `brands.json`.

## What we never do
- No logos, logo shapes, mascots or exact brand typefaces.
- No exact brand colour schemes or shop layouts that look like a specific chain.
- No negative use: a real name never sits next to litter, scams, accidents, mess, queues-for-nothing jokes or crime. Those gags use generic places (Chippy, Newsagent, Pub).
- No implied endorsement: no brand speaks, recommends, pays or is praised or mocked in the voice-over.
- No real brand on a character's clothing, product claims or prices.

## Disclaimer line (put in every video description)
Brand names shown are for illustrative setting only; no affiliation or endorsement.

## Switching real names off
Set `window.NO_BRANDS = true` before the modules run. Every module reads brand strings from its `UK_BRANDS` array and, when the flag is true, uses the generic name from `genericReplacements` in `brands.json` (SUPERMARKET, BANK, PHARMACY, COFFEE, BAKERY, AIRLINE). Do this for any platform or client that is nervous about names.

## Sources
I could not search the web in this run (no web tool), so no sources are cited and nothing above was checked against UK guidance. Before publishing, read the UK Intellectual Property Office trade mark guidance on gov.uk and take advice on honest, incidental use of names.
