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

Ha production buildet akarsz készíteni állítsd a root mappa .env fájljában a `NODE_ENV`-et `production`-re.

Csinálunk egy docker image-et

```sh
docker build -t wingsmc/svk:1.0 .
```

A build a végén kiírja az image nevét egy hexadecimális számként

Exportájuk egy .tar fájlba

```sh
docker save -o ./svk_server.tar wingsmc/svk:1.0
```

Ezt a .tar fájlt kéne a KSZK-nak elküldeni.

## Futtatás Docker-ben

A futtató eszköz 5000-es portját rendeli a virtuális gép 8080-portjához

```sh
docker run -p 5000:8080 wingsmc/svk:1.0
```

Importálás .tar-ból

```sh
docker load -i <path to image tar file>/svk_server.tar
```
