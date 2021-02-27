# Setup

- A .sample-env alapján egy .env fájlt létre kell hozni
- A `test` mappa tartalma szükségtelen így meg lehet tőle szabadulni

## Szükséges

- [Node.js](https://nodejs.org/en/)
- pnpm / npm

## Jó, ha van

- git

## A Node és az npm telepítése után opcionális a pnpm telepítése

```sh
# E helyett lehet szimplán az npm-et használni a pnpm-ek helyett
npm i -g pnpm
```

## Build készítés

Ha production buildet akarsz készíteni állítsd a root mappa .env fájljában a `NODE_ENV`-et `production`-re a `LOGGER`-t meg `common`-re.

```sh
pnpm i --production
```

## Futtatás Docker-ben
