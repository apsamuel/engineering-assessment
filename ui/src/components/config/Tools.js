import * as emoji from 'node-emoji'

const categories = {
  [['peruvian']]: 'peru',
  [['noodle', 'noodles', 'ramen']]: 'ramen',
  [['fries', 'french fries']]: 'fries',
  [['burger', 'burgers']]: 'hamburger',
  [['taco']]: 'taco',
  [['soup', ]]: 'bowl_with_spoon',
  [['fried rice', 'chinese rice']]: 'curry',
  [['bacon', ]]: 'bacon',
  [['eggs', ]]: 'fried_egg',
  [['drinks', ]]: 'tropical_drink',
  [['chips', ]]: 'potato',
  [['candy', ]]: 'candy',
  [['cookies', ]]: 'cookie',


  [['burrito']]: 'burrito',
  [['quesadilla', 'quesadillas']]: 'cheese',
  [['pizza']]: 'pizza',
  [['hot dog', 'hot dogs']]: 'hotdog',
  [['hot chocolate', 'hot coffee']]: '☕',
  [['hot tea', 'tea']]: 'tea',
  [['pastries']]: 'croissant',
  [['sandwich', 'sandwiches', 'melts']]: 'sandwich',
  [['chicken']]: 'chicken',
  [['bbq', 'ribs']]: 'steak',
  [['sushi']]: 'sushi',
  [['seafood']]: 'lobster',
  [['salad']]: 'green_salad',
  [['dessert']]: 'dessert',
  [['beverage']]: '🥤',
  [['pork', 'pork loin']]: 'pig2',
  [['lobster', 'lobster rolls']]: 'lobster',
  [['crab', 'crab rolls']]: 'crab',
  ['other']: 'plate_with_cutlery'
}

const vendors = {
  'senor sisig': {
    siteLink: 'https://www.senorsisig.com/',
    menuLink: 'https://www.senorsisig.com/menu',
    imageLink: 'https://static1.squarespace.com/static/59dbdc4851a58476eaaad8ae/t/5b244c4088251ba762b55857/1529105472875/pig-logo-no-text.png'
  },
  'truly food': {
    siteLink: 'https://www.trulyfoodtrucksf.com/',
    menuLink: 'https://www.trulyfoodtrucksf.com/#ourmenus',
    imageLink: 'https://www.trulyfoodtrucksf.com/wp-content/uploads/logo-nuevo.png'
  },
  'bay area mobile catering': {
    siteLink: 'https://taqueriaangelicas.com',
    menuLink: 'https://taqueriaangelicas.com/menu',
    imageLink: 'https://img1.wsimg.com/isteam/ip/2ece6c20-2d38-49e0-952d-df367733cfff/blob-bc23e06.png/:/cr=t:11.26%25,l:0%25,w:88.74%25,h:88.74%25/rs=w:1280,h:721'
  },
  'bowld acai': {
    siteLink: 'https://bowldacai.com/',
    menuLink: 'https://bowldacai.com/menus',
    imageLink: 'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/store/header/a7e529a7-e3bd-4f55-a698-15975ba7601f.jpg'
  },
  'brazuca grill': {
    siteLink: 'https://www.brazucagrill.com',
    menuLink: 'https://www.brazucagrill.com/s/order#8',
    imageLink: 'https://1bbdd6adf98e420636ce.cdn6.editmysite.com/uploads/b/1bbdd6adf98e420636ce2e6494d3bd163a56fa2a133f99a6ff681a6c65344ab9/Logo_Brazuca_1615869278.png?width=512&optimize=medium'
  },
  'buenafe': {
    siteLink: null,
    menuLink: null,
    imageLink: null
  },
  'cardonas food truck': {
    siteLink: 'https://cardonasfoodtruck.com',
    menuLink: 'https://cardonasfoodtruck.com',
    imageLink: 'https://img1.wsimg.com/isteam/stock/100416/:/rs=w:720,h:540,cg:true,m/cr=w:720,h:540'
  },
  'casita vegana': {
    siteLink: 'https://casitaveganasf.com',
    menuLink: 'https://casitaveganasf.com/?post_type=product',
    imageLink: 'https://casitaveganasf.com/wp-content/uploads/2021/06/cropped-cropped-Casita-Vegana.png'
  },
  'do uc us mobile catering': {
    siteLink: null,
    menuLink: null,
    imageLink: null
  },
  'el alambre': {
    siteLink: 'https://roaminghunger.com/el-alambre/',
    menuLink: 'https://roaminghunger.com/el-alambre/',
    imageLink: 'https://photos.roaminghunger.com/1200x/221ddade-cf8a-400b-a4a7-e1a31845cc5c.png'
  },
  'el calamar': {
    siteLink: 'https://roaminghunger.com/el-calamar/',
    menuLink: 'https://roaminghunger.com/el-calamar/',
    imageLink: 'https://photos.roaminghunger.com/1200x/475141e1-bfa1-4c31-88b0-8d3460d20dc0.jpg'
  },
  'evas catering': {
    siteLink: 'https://www.yelp.com/biz/evas-catering-santa-ana',
    menuLink: 'https://www.yelp.com/biz/evas-catering-santa-ana',
    imageLink: 'https://s3-media0.fl.yelpcdn.com/bphoto/agbj5el4iA39-VrRHojL0Q/l.jpg'
  },
  'la jefa': {
    siteLink: 'https://roaminghunger.com/la-jefa/',
    menuLink: 'https://roaminghunger.com/la-jefa/',
    imageLink: 'https://photos.roaminghunger.com/1200x/7681187f-173a-4af4-9f22-02ddf7f044eb.png'
  },
  'leos hot dogs': {
    siteLink: 'https://www.yelp.com/biz/leos-hot-dogs-san-francisco',
    menuLink: 'https://www.yelp.com/biz/leos-hot-dogs-san-francisco',
    imageLink: 'https://s3-media0.fl.yelpcdn.com/bphoto/8LXo2WFF0PEiHLn-5BCSrw/348s.jpg'
  },
  'momo innovation': {
    siteLink: 'https://www.momonoodle.com',
    menuLink: 'https://www.momonoodle.com/menu',
    imageLink: 'https://www.momonoodle.com/wp-content/uploads/2021/02/momo-logo.png'
  },
  'natans catering': {
    siteLink: null,
    menuLink: null,
    imageLink: null
  },
  'off the grid': {
    siteLink: 'https://offthegrid.com',
    menuLink: 'https://offthegrid.com',
    imageLink: 'https://offthegrid.com/wp-content/themes/offthegrid/library/img/otg-logo.svg'
  },
  'papolote inc': {
    siteLink: 'https://www.papalote-sf.com/food-truck',
    menuLink: 'https://www.papalote-sf.com/menu',
    imageLink: 'https://popmenucloud.com/cdn-cgi/image/width%3D3840%2Cheight%3D3840%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/pmcnbstq/31f9e6b1-3e03-416a-8423-0387f10fc11a.jpg'
  },
  'philz coffee truck': {
    siteLink: 'https://philzcoffee.com',
    menuLink: 'https://philzcoffee.com',
    imageLink: 'https://philzcoffee.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBak1MIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2a46dd8f856e426653c11d57ddf66049bba3854f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2QzNKbGMybDZaVWtpRFRJME5IZ3hNRFErQmpzR1ZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--43c6c87ddb43f7bedcd9a050cfac436ed72583d6/logo-new-web-2.0.png'
  },
  'plaza garibaldy': {
    siteLink: 'https://www.yelp.com/biz/plaza-garibaldy-san-francisco',
    menuLink: 'https://www.yelp.com/biz/plaza-garibaldy-san-francisco',
    imageLink: 'https://s3-media0.fl.yelpcdn.com/bphoto/qVitgdRddU9HgiU7Kj8VSw/258s.jpg'
  },
  'ritas catering': {
    siteLink: 'https://roaminghunger.com/ritas-catering-eatery/',
    menuLink: 'https://roaminghunger.com/ritas-catering-eatery/',
    imageLink: 'https://photos.roaminghunger.com/1200x/04e516e7-b8c7-4090-8a47-84cf1b93ab95.jpg'
  },
  'roadside rotisserie corporation': {
    siteLink: 'http://roadsidesf.com',
    menuLink: 'http://roadsidesf.com/#our-story',
    imageLink: 'https://images.squarespace-cdn.com/content/v1/520ae0fde4b089db01daf33e/1451500044863-EIKS3VGIUNYQFQ68XFWQ/OSsq_9480.jpg?format=750w'
  },
  'san franciscos hometown creamery': {
    siteLink: 'https://www.sfhometowncreamery.com',
    menuLink: 'https://www.sfhometowncreamery.com/menus',
    imageLink: 'https://static.wixstatic.com/media/675aef_342e0cb9a24842049061cfe6ca0db29b~mv2.png/v1/fill/w_402,h_402,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/168971963581448803.png'
  },
  'san panchos tacos': {
    siteLink: 'https://roaminghunger.com/san-panchos-tacos/',
    menuLink: 'https://roaminghunger.com/san-panchos-tacos/',
    imageLink: 'https://photos.roaminghunger.com/1200x/6e041f4e-285e-4373-9774-1b33a6b17555.jpg'
  },
  'tacos el flaco': {
    siteLink: null,
    menuLink: null,
    imageLink: null
  },
  'the new york frankfurter': {
    siteLink: 'https://www.annieshotdogs.com',
    menuLink: 'https://www.annieshotdogs.com',
    imageLink: 'https://images.squarespace-cdn.com/content/v1/5b982b7970e8029c0b71555c/1539186651159-1ES7K2QYIC8XDQ26OKMA/IMG_0065.jpg?format=2500w'
  },
  'think is good': {
    siteLink: null,
    menuLink: null,
    imageLink: null
  },
  'ting ting mini mobile deli': {
    siteLink: null,
    menuLink: null,
    imageLink: null
  },
  'zuri food facilities': {
    siteLink: null,
    menuLink: null,
    imageLink: null
  }
}
const categoryToEmoji = (category) => {
  let results = emoji.find('🍽️').emoji
  try {
    for (const entry of Object.entries(categories)) {

      let [key, value] = entry
      if (
        key.split(',').includes(category) ||
        key.split(',').some((item) => category.toLowerCase().includes(item.toLowerCase()))

      ) {
        results = emoji.find(value).emoji
        break;
      }
    }
    return results
  } catch (error) {
    console.error('error', error)

  }

}

const vendorToEnrichment = (foodVendors) => {
  let results = {
    siteLink: null,
    menuLink: null,
    imageLink: null
  }
  foodVendors = foodVendors.toLowerCase().replace(new RegExp('[\'.,:]', 'g'), '')
  for (const entry of Object.entries(vendors)) {
    let [key, value ] = entry
    if (foodVendors.includes(key)) {
      results = value
      break;
    }
  }

  return results
}

const parseFoodItems = (fooditems) => {
  if (fooditems) {
    return fooditems
      .split(new RegExp('[:;.]', 'g'))
      .map((item) => item.trim())
      .map((item) => item.toLowerCase())
      .map((item) => item.replace(
        new RegExp(`(${[
          'all types of food except for bbq on site per fire safety',
          'various menu items & drinks',
          'multiple food trucks & food types'
        ]})`, 'g')
      ), 'General Market')
      .map((item) => item.replace(
        'asian fusion - japanese sandwiches/sliders/misubi', 'Asian Fusion'
      ))
      .map((item) => item.replace('vegetable and meat sandwiches filled with asian-flavored meats and vegetables', 'Sandwiches'))
      .map((item) => item.replace('daily rotating menus consisting of various local & organic vegetable', 'Local Organic'))
      .map((item) => item.replace('pre-packaged swiches', 'Sandwiches'))
      .map((item) => item.replace('peruvian food served hot', 'Peruvian Cuisine'))
      .map((item) => {
        return item === 'tacos burritos quesadillas tortas pupusas flautas tamales' ?  ['tacos', 'burritos', 'quesadillas', 'tortas', 'pupusas', 'flautas', 'tamales'] : item;
      })
      .filter(Boolean)
      // upper case first letter of each word
      .map((item) =>
        item.split ? item.split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') : item
      )
      // .map((item) => item.replace(/[^\s+|\s+$]/g, ''))
      .flat()
  }
  return [];
}


export {
  categoryToEmoji,
  vendorToEnrichment,
  parseFoodItems
}