
# Hungrèe

> Use Hungrèe to manage your food truck habits at Estèe

```js
!! await handleAppetite()
```

![food-truck](./ui/public/truck.svg)

## features

- we'll keep you safe by only returning approved vendors, with well defined locations and food categories
- we'll let you know the distance between you and your target truck!
- ...

## Prerequisites

- docker

## Getting Started

```sh
git clone https://github.com/apsamuel/engineering-assessment.git
cd engineering-assessment
docker-compose build
docker-compose up -d
```

## Details

After following the steps in [Getting Started](#getting-started) you will have three entrypoints available to the food truckverse.

- [Hungrèe CLI](./scripts/hungree-cli.js)
  - use `docker-compose` to run the hungree-cli script
  - `node scripts/hungree.js search -d 100000 -c taco`
- [Hungrèe UI](http://localhost:5173)
  - use your browser to navigate to the UI
- [Hungrèe API](http://localhost:8080)
  - you can use curl or a browser to play around with the API

## TLDR

[tldr](./docs/TLDR.md)
