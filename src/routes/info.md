# Routes

## New

```rest
GET /event
GET /attendees
```

## Change?

```rest
GET /auth/:api
GET /auth/:api/redirect/
```

## Stayed same

```rest
POST /register
GET /auth/logout
DEL /admin/attendee
DEL /admin/attendees
PAT /admin/event
```

## Moved to front-end

Sent by one universal route on server

```rest
GET /
GET /signin
GET /admin/page
GET /admin/registered
GET /admin->/admin/page
404 /*
```
