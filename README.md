
# Hungrèe

> Hungrèe manages your food truck habits at Estèe

```js
!! await handleAppetite()
```

![food-truck](./ui/public/truck.svg)

## Features

- we'll keep you safe by only returning approved vendors, with well defined locations and food categories
- we'll let you know the distance between you and your target truck!

## Prerequisites

- **docker-compose**

## Get Started

```sh
git clone https://github.com/apsamuel/engineering-assessment.git
cd engineering-assessment
docker-compose build
docker-compose up -d
```

## Details

After following the steps in [Get Started](#get-started) you will have three entrypoints available to food truck heaven.

- [Hungrèe UI](http://localhost:5173)
  - use your browser to navigate to the UI
- [Hungrèe API](http://localhost:8080)
  - you can use curl or a browser to play around with the API
- [Hungrèe CLI](./scripts/hungree-cli.js)
  - use `docker-compose` to run the hungree-cli script
  - `node scripts/hungree.js search -d 100000 -c taco`

## Tips

- Are you playing with this tool and not in the San Franciso Metropolitan area? No sweat, we got you covered

## To Dos

I am actively looking into [TODOs](./docs/TODOS.md)

## TLDR

[tldr](./docs/TLDR.md)
