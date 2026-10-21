# beauty-lounge-webpage

The YehMee Beauty Lounge website. The booking app
([yehmeebeautylounge-booking](https://github.com/AlainAhuili/yehmeebeautylounge-booking))
is included as a git submodule in `booking/`.

## Run locally

```sh
npm install
npm run setup   # fetches booking/ and installs its packages
npm run dev     # website + booking, both restart when files change
```

- Website: http://localhost:8000 (`PORT` to change)
- Booking: http://localhost:3000 (`BOOKING_PORT` to change; `buchen.html` links here)

## Database (MariaDB)

The booking module stores accounts, sessions, bookings, vouchers and photo
records in MariaDB when `booking/.env` has a `DATABASE_URL`; without it, it falls
back to `booking/data/db.json`. Tables are created on startup from
`booking/db/schema.sql`.

```sh
cp booking/.env.example booking/.env     # then fill in user and password
npm --prefix booking run db:import       # once: copies db.json into an empty database
```

Locally MariaDB comes from XAMPP (`C:\xampp\mysql`); start it from the XAMPP
Control Panel. Uploaded photo files stay in `booking/data/uploads/` (not in git).

## Update the booking module

```sh
git submodule update --remote booking
```
