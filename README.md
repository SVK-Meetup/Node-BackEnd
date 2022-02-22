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

### Harbor.Sch

```sh
docker build -t harbor.sch.bme.hu/org-svk/svkmeetup:latest .
docker push harbor.sch.bme.hu/org-svk/svkmeetup:latest
```

### Tar-ba exportálás

```sh
docker save -o ./svk_server.tar harbor.sch.bme.hu/org-svk/svkmeetup:latest
```


## Futtatás Docker-ben

A futtató eszköz 5000-es portját rendeli a container 8080-portjához

```sh
docker run -p 5000:8080 harbor.sch.bme.hu/org-svk/svkmeetup:latest
```

### Importálás .tar-ból

```sh
docker load -i <path to image tar file>/svk_server.tar
```
