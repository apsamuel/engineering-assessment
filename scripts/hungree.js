import https from 'node:https';
import { publicIpv4 } from 'public-ip';
import haversine from 'haversine-distance';
import compileData from '../api/lib/compileData.js';
import { Command } from 'commander';

const program = new Command();

async function getLocationFromIP() {
  const ip = await publicIpv4();
  return new Promise((resolve, reject) => {
    https
      .get(
        `https://ipapi.co/${ip}/json/`,
        {
          headers: {
            'User-Agent': 'curl/7.64.1'
          }
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve(JSON.parse(data));
          });
        }
      )
      .on('error', (err) => {
        reject(err);
      });
  });
}

program.name('truckFinder').description('').version('0.0.1');

program
  .command('list')
  .description('List all the trucks')
  .action(async () => {
    const compiled = (await compileData())
      .filter(
        (truck) =>
          truck[':id'] &&
          truck.applicant &&
          truck.fooditems &&
          truck.latitude &&
          truck.latitude !== '0' &&
          truck.longitude &&
          truck.longitude !== '0' &&
          // approved recently
          truck.status &&
          truck.status === 'APPROVED' &&
          truck.approved &&
          new Date(truck.approved).getFullYear() >= 2023
      )
      .map((truck) => {
        return {
          ...truck,
          fooditems: truck.fooditems
            .split(new RegExp('[;:.]', 'g'))
            .map((item) => item.trim())
            .map((item) => item.toLowerCase())
        };
      });
    console.log(JSON.stringify(compiled, null, 2));
  });

program
  .command('search')
  .description('search trucks by distance, food category, or vendor')
  .option('-d, --distance <distance>', 'Within Distance (Km)', 100)
  .option('-c, --category <category>', 'Food Category', null)
  .option('-v, --vendor <vendor>', 'Vendor Name', null)
  .action(async (options) => {
    let { distance, category, vendor } = options;
    distance = Number(distance);
    const { latitude, longitude } = await getLocationFromIP();
    let compiled = (await compileData(false))

      .filter(
        (truck) =>
          truck[':id'] &&
          truck.applicant &&
          truck.fooditems &&
          truck.latitude &&
          truck.latitude !== '0' &&
          truck.longitude &&
          truck.longitude !== '0' &&
          // approved recently
          truck.status &&
          truck.status === 'APPROVED' &&
          truck.approved &&
          new Date(truck.approved).getFullYear() >= 2023
      )
      .map((truck) => {
        return {
          latitude: Number(truck.latitude),
          longitude: Number(truck.longitude),
          vendor: truck.applicant,
          address: truck.address,
          type: truck.facilitytype,
          fooditems: truck.fooditems
            .split(new RegExp('[;:.]', 'g'))
            .map((item) => item.trim())
            .map((item) => item.toLowerCase())
        };
      })
      .filter((truck) => {
        // console.log(truck)
        const dist = haversine(
          [latitude, longitude],
          [Number(truck.latitude), Number(truck.longitude)]
        ) / 1000;
        return dist <= distance;
      })
      .map((truck) => {
        return {
          ...truck,
          distance: Math.round(haversine(
              [latitude, longitude],
              [Number(truck.latitude), Number(truck.longitude)]
            ) / 1000
          ) + ' km'
        }
      })

    if (category) {
      compiled = compiled.filter((truck) => truck.fooditems.includes(category));
    }

    // remove any duplicates
    compiled = Array.from(new Set(compiled))

    // if (vendor) {
    //   compiled = compiled.filter((truck) => truck.applicant === vendor);
    // }

    console.log(JSON.stringify(compiled, null, 2));
  });

program.parse(process.argv);
