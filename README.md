# Setup

A sample.env alapján egy .env fájlt létre kell hozni, akár a .sample-env-et is át lehet nevezni

## Galéria

A gallery mappában legyenek tetszőlegesen elnevezett almappák (a név nem számít)
Ezekben kell létrehozni egy-egy ".metadata" nevű fájlt aminek ilyen nagyon komplikált tartalma van:

```env
name=<Az album címe>
date=<dátum YYYY.MM.DD formátumban>
index=<index kép címe relatív útvonallal>
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
