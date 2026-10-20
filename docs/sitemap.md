# Sitemap and content plan

Step 2 of the YehMee Beauty Lounge website. Services and prices live in
[`content/services.json`](../content/services.json), the single source for the
home page, the price list and the booking system.

## Pages

```
/                     Home
/leistungen           Services & prices
/galerie              Gallery
/buchen               Booking (multi-step)
  /buchen/bestaetigt  Booking confirmed
/konto                My account: upcoming & past appointments
  /anmelden           Log in / register / reset password
/gutschein            Gift vouchers
/hinweise             Before your appointment & booking rules
/kontakt              Contact, hours, map
/impressum            Imprint (legally required)
/datenschutz          Privacy policy (legally required)
/agb                  Booking terms
/admin                Owner dashboard (calendar, services, hours, gallery)
```

## Home page, top to bottom

| # | Section | Content | Main action |
|---|---------|---------|-------------|
| 1 | Header | Logo, menu (Leistungen, Galerie, Hinweise, Kontakt), Log in | **Jetzt buchen** |
| 2 | Hero | "Hello Beautiful! Deine Schönheit, Unser Anspruch", large photo | **Jetzt buchen** |
| 3 | Deposit banner | "15 € Anzahlung bei Terminbuchung erforderlich" | |
| 4 | Services | Two columns: Wimpern / Nägel, name + price only (no duration) | Book a service |
| 5 | Gallery strip | Classic Lashes, Volume Lashes, Milky French, Burgundy Nails | See gallery |
| 6 | About me | "Hallo Beautiful! ♡ Ich bin Melissa …" with portrait | |
| 7 | Before your appointment | Clean lashes, inspiration photo, punctuality, companion | Read all notes |
| 8 | Instagram | @yehmeeeyes, @yehmeenudenails: "Das könntest du sein ♡" | Follow |
| 9 | Hours & contact | Tue–Fri 10:00–19:30, Sat 10:00–18:00, Sun & Mon closed; address, phone, WhatsApp, email, map | **Jetzt buchen** |
| 10 | Footer | Menu, social links, language, Impressum, Datenschutz, AGB | |

## Showing durations

- The home page and the services page show **name and price only**, never the duration.
- The duration appears **only during booking**: next to each service when choosing it,
  and in the booking summary.
- Format **h:min**, from `durationMin` in `services.json`:

  | durationMin | Shown as |
  |---|---|
  | 20 | 0:20 h |
  | 60 | 1:00 h |
  | 75 | 1:15 h |
  | 120 | 2:00 h |
  | 165 | 2:45 h |

  Rule: hours = `Math.floor(min / 60)`, minutes = `min % 60` padded to two digits.

## Booking rules (become system behaviour)

- Online booking only; 15 € deposit paid online, deducted from the total
- A YehMee gift voucher replaces the deposit
- Free cancellation or rescheduling up to 48 hours before the appointment; after that the deposit is kept
- Remaining amount paid in the salon, cash or card
- Confirmation email after booking

## Open questions

- [ ] Real treatment durations (the ones in `services.json` are estimates)
- [ ] Correct email: yehmeeeyes@gmail.com or yemeeeyes@gmail.com
- [ ] Languages: German + English, or also French
- [ ] Photos: permission to use the Instagram pictures, and a logo file
