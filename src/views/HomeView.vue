<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl';




export default {
  data: function () {
    return {
      message1: "Huzzah!!!",
      message2: "Welcome to the Colorado Renaissance Festival App!",
    };
  },
  created: function () { },
  methods: {},
};


mapboxgl.accessToken = process.env.VUE_APP_MAP_ACCESS_TOKEN;
const bounds = [
  [-104.905, 39.2262], // Southwest coordinates
  [-104.895, 39.2311] // Northeast coordinates
];
// const eventCoordinates = [
//   [100.507, 13.745],
//   [98.993, 18.793],
//   [99.838, 19.924],
//   [102.812, 17.408],
//   [100.458, 7.001],
//   [100.905, 12.935]
// ];
const map = new mapboxgl.Map({
  container: 'map',
  // Replace YOUR_STYLE_URL with your style URL.
  style: 'mapbox://styles/thedoctorq/cl37o8i0x000416mym52v21zy',
  center: [-104.900015, 39.228226],
  pitch: 50, // starting position [lng, lat]
  zoom: 17, // starting zoom
  maxBounds: bounds, // Set the map's geographical boundaries.

});
map.on('load', () => {
  map.addSource('events', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Crown Stage</strong></p><br/><p style="text-align:center">Acrobatrix: 11:00AM, 12:15PM, 2:15PM, 4:00PM</p><p style="text-align:center">The Amazing Hypnotist: 1:15PM & 3:45PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.901358, 39.228154]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Jousting Arena</strong></p><br/><p style="text-align:center">The Knights Of Noble Cause: 11:30AM, 1:30PM, 4:30PM</p><p style="text-align:center">Knightwings: 12:30PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.897194, 39.227797]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Castle Rose Stage</strong></p><br/><p style="text-align:center">Celtic Legacy: 12:30PM, 3:30PM</p><p style="text-align:center">The Reelin’ Rogues: 11:00AM & 2:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900684, 39.228073]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Globe Stage</strong></p><br/><p style="text-align:center">Cy The Sword Swallower: 11:30AM, 4:30PM</p><p style="text-align:center">Dragonfire: 12:30PM<p style="text-align:center">The CRAIC Show: 1:30PM & 5:30PM'

          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899238, 39.228043]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Celestial Stage</strong></p><br/><p style="text-align:center">Kamikaze Fireflies: 11:45AM, 1:45PM, 3:45PM, 5:45PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.902504, 39.228826]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Fortune Stage</strong></p><br/><p style="text-align:center">London Broil: 12:00PM, 1:30PM, 4:00PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.897878, 39.228162]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Pirate Ship Stage</strong></p><br/><p style="text-align:center">The Angels-Heroines In Disguise: 12:30PM & 2:30PM</p><p style="text-align:center">The Washing Well Wenches: 1:30PM, 3:30PM, 5:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.902390, 39.228091]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Pirates Pub Stage</strong></p><br/><p style="text-align:center">The Crimson Pirates: 12:30PM & 2:30PM</p><p style="text-align:center">Music: The Gathering: 1:30PM, 3:30PM, 5:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899970, 39.228121]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>The Living Fountain</strong></p><br/><p style="text-align:center">Showtimes: 11:30AM, 1:30PM, 3:30PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899181, 39.227822]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Royal Procession</strong></p><br/><p style="text-align:center">Every Day at 12:30PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900814, 39.228547]
          }
        }
      ]
    }
  });
  // Add a layer showing the events.
  map.addLayer({
    'id': 'events',
    'type': 'circle',
    'source': 'events',
    'paint': {
      'circle-color': '#ccff33',
      'circle-radius': 4,
      'circle-stroke-width': 0,
      'circle-stroke-color': '#ffffff'
    }
  });

  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'events', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on('mouseleave', 'events', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
});
map.on('load', () => {
  // map.addSource('tileset_data', {
  //   "url": "mapbox://thedoctorq.cl33ejlp500h927pal6k79xqx-4r7vi",
  //   "type": "vector"
  // });

  map.addSource('feasts', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Canterbury Kitchens</strong></p><br/><p style="text-align:center">What you can enjoy there: Pork Tails ~ Turkey Legges ~ Chicken Teriyaki Croissant ~ Baron of Beef ~ Smashed Potatoes ~ Sausage ~ Pork Chop on a Stick ~ Barbecued Pork ~ Corn on the Cob ~ Fruit Cobbler ~ Ice Cream ~ Strawberry Shortcake'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900451, 39.227729]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Joust Arena Ale</strong></p><br/><p style="text-align:center">Beer, Hard Cider'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.897965, 39.227898]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Friar Tucks Bakery</strong></p><br/><p style="text-align:center">Cinnamon Rolls ~ Variety of Breads ~ Cakes and Pies ~ Cookies ~ Croissants ~ Gluten Free Goods ~ Chocolate Eclairs ~ Cream Puffs ~ Apple Dumplings ~ Bagels ~ Cheesecake on a Stick ~ Ice Cream Sandwiches ~ Brownies ~ Cannolis ~ Chai Tea ~ Gourmet Coffees ~ Herbal Teas ~ Juices'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.898173, 39.227871]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Joust Kitchens</strong></p><br/><p style="text-align:center">Chicken Wraps ~ Turkey Legges ~ Sausage on a Stick ~ Earl of Bratwurst ~ Baked Potatoes ~ Baron Of Beef Sandwich ~ Corn on the Cob ~ Bread Bowls filled with Soup or Salad ~ Ice Cream ~ Fruit cobbler</p>'

          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.898110, 39.228357]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Joust Kitchens Ale</strong></p><br/><p style="text-align:center">Beer, Hard Cider'

          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.897970, 39.228349]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Fudge Factory Royal Delights</strong></p><br/><p style="text-align:center">Chocolate Covered Strawberries, Fudge, Truffles, Caramel Apples, Caramel Grizzles, Sea Salt Caramels, Toffee'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.898226, 39.228098]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Kings Pantry</strong></p><br/><p style="text-align:center">Steak on a Stake ~ Sausage on a Stick ~ Meatball Pie ~ Fish & Chips ~ Onion Rings ~ Cheese Bread ~ Fried Ice Cream ~ Pretzels with Dips ~ Spinach Pie ~ Pretzel Dog ~ Popcorn Shrimp & Chips ~ Clam Strips & Chips ~ Iced Tea ~ Root Beer ~ Lemonade'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899417, 39.228151]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Pirates Pub</strong></p><br/><p style="text-align:center">Beer, Hard Cider'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899986, 39.228066]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Queens Beverages</strong></p><br/><p style="text-align:center">Beer, Wine, Hard Cider'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900718, 39.227755]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Queens Pantry</strong></p><br/><p style="text-align:center">Turkey Legs, Corn on the Cob'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900789, 39.227674]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>White Claw Castle</strong></p><br/><p style="text-align:center">White Claw Hard Seltzer'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900861, 39.227842]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Dancing Bear Pub</strong></p><br/><p style="text-align:center">Beer, Wine, Hard Cider'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.901123, 39.228100]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>International Food Court</strong></p><br/><p style="text-align:center">Pizza by the Slice ~ Bread Sticks ~ Yakitori Chicken ~ Lasagna ~ Smothered Burritos ~ Nachos ~ Meatball Sliders ~ Crepes ~ Apples with Caramel'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900789, 39.227674]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>International Court Beverages</strong></p><br/><p style="text-align:center">Water, Soft Drinks, Beer, Hard Cider, Wine'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900955, 39.228265]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Market Cross Beverages</strong></p><br/><p style="text-align:center">Water, Soft Drinks'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.901689, 39.228628]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Knights Kitchen</strong></p><br/><p style="text-align:center">What you can enjoy there: Knave Sandwich ~ Steak on a Stake ~ Sausage or Chicken on a Stick ~ Dragon Wings ~ Rueben Sandwich ~ Fried Cheese ~ Cheese Pie ~ Corn Dog ~ Sweet Potato Fries ~ Funnel Cakes ~ Fried Ice Cream ~ Onion Chips ~ Fried Pickles ~ Pretzels with Dips ~ Breaded Green Beans with peanut sauce ~ Potato Tots ~ Iced Tea ~ Orange Slush ~ Apple Cider ~ Orange Juice ~ Milk ~ Root Beer ~ Lemonade'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.901654, 39.228709]
          }
        }
      ]
    }
  });
  // Add a layer showing the feasts.
  map.addLayer({
    'id': 'feasts',
    'type': 'circle',
    'source': 'feasts',
    'paint': {
      'circle-color': '#2A60FE',
      'circle-opacity': 0.75,
      'circle-radius': 5
    }
  });

  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'feasts', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on('mouseleave', 'feasts', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
});
map.on('load', () => {
  // map.addSource('info_data', {
  //   "url": "mapbox://thedoctorq.cl37p4mgr0y3m21mi3p2hq8hc-9ydmw",
  //   "type": "vector"
  // });

  map.addSource('info', {
    'type': 'geojson',
    'data': {
      "features": [
        {
          "type": "Feature",
          "properties": {
            "description": "Emergency Exit"
          },
          "geometry": {
            "coordinates": [
              -104.902393,
              39.228978
            ],
            "type": "Point"
          },
          "id": "2ed2870e667b2f6c5e53545357f6ba24"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "ATMs"
          },
          "geometry": {
            "coordinates": [
              -104.900829,
              39.227544
            ],
            "type": "Point"
          },
          "id": "427e3910a284588e548a2e7a50fa77ff"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "ATMs"
          },
          "geometry": {
            "coordinates": [
              -104.900442,
              39.229111
            ],
            "type": "Point"
          },
          "id": "4396772027da3dee8d9938941a95a56f"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Main Entrance"
          },
          "geometry": {
            "coordinates": [
              -104.900623,
              39.229257
            ],
            "type": "Point"
          },
          "id": "713c81af1c75a9aa65e5748fef26795f"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Privy / Restroom"
          },
          "geometry": {
            "coordinates": [
              -104.897922,
              39.227556
            ],
            "type": "Point"
          },
          "id": "79177fb31fbc8976c3af90a9f516f445"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Privy / Restroom"
          },
          "geometry": {
            "coordinates": [
              -104.902627,
              39.229174
            ],
            "type": "Point"
          },
          "id": "82abc2148ae37b620d825e145a166f5b"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Emergency Exit"
          },
          "geometry": {
            "coordinates": [
              -104.898323,
              39.228372
            ],
            "type": "Point"
          },
          "id": "82fa3841da3baac76a5b40ac0d6d8516"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "First Aid"
          },
          "geometry": {
            "coordinates": [
              -104.900441,
              39.228832
            ],
            "type": "Point"
          },
          "id": "8e7eb81e36927e91de2a2f829f281454"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Costumer"
          },
          "geometry": {
            "coordinates": [
              -104.900986,
              39.229273
            ],
            "type": "Point"
          },
          "id": "a85b420739de0c20fc117b72db6ff6fb"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Privy / Restroom"
          },
          "geometry": {
            "coordinates": [
              -104.902196,
              39.227864
            ],
            "type": "Point"
          },
          "id": "ac7bc0f9b0c4c5ae5deeb3dcc97ce82f"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Privy / Restroom"
          },
          "geometry": {
            "coordinates": [
              -104.900838,
              39.227457
            ],
            "type": "Point"
          },
          "id": "b9bb7c91934f4b153ea5ebb91f4a768e"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Tickets"
          },
          "geometry": {
            "coordinates": [
              -104.900358,
              39.229148
            ],
            "type": "Point"
          },
          "id": "bbad1c215f0e9de6bf00d2f01bbd3f74"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Emergency Exit"
          },
          "geometry": {
            "coordinates": [
              -104.899545,
              39.228356
            ],
            "type": "Point"
          },
          "id": "d12b455ad0994d11db7b9c72fc372b90"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Privy / Restroom"
          },
          "geometry": {
            "coordinates": [
              -104.899346,
              39.22837
            ],
            "type": "Point"
          },
          "id": "e46b666961e60e96ecb3ac8d792a7ab3"
        }
      ],
      "type": "FeatureCollection"
    }
  });
  // Add a layer showing the feasts.
  map.addLayer({
    'id': 'info',
    'type': 'circle',
    'source': 'info',
    'paint': {
      'circle-color': '#DE3163',
      'circle-opacity': 0.75,
      'circle-radius': 4
    }
  });

  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'info', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on('mouseleave', 'info', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
});
map.on('load', () => {
  map.addSource('vendors', {
    'type': 'geojson',
    'data': {
      "features": [
        {
          "type": "Feature",
          "properties": {
            "description": "Busch Fine Art",
            "Variety": "Hand-carved ivory and bone artwork fit for a King."
          },
          "geometry": {
            "coordinates": [
              -104.900523,
              39.229004
            ],
            "type": "Point"
          },
          "id": "00c0db87b01879cf7e1fbdb02914c26e"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Clockwork Traveler",
            "Variety": "Wearable pieces of clock inspired art."
          },
          "geometry": {
            "coordinates": [
              -104.899742,
              39.227626
            ],
            "type": "Point"
          },
          "id": "06352d26318ea7be655253f937c08c76"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Burnt Mountain Crafts",
            "Variety": "A fine selection of wooden swords and shields for all ages."
          },
          "geometry": {
            "coordinates": [
              -104.900932,
              39.22884
            ],
            "type": "Point"
          },
          "id": "1682ca4bbe8f3bacc3738e698b973c87"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Firefly Fashions",
            "Variety": "Children’s costumes and renaissance accessories"
          },
          "geometry": {
            "coordinates": [
              -104.902961,
              39.229059
            ],
            "type": "Point"
          },
          "id": "198f32634519a2164a8a8c0a7eef1b65"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Artsmyths",
            "Variety": "Amazing sculpted leather masks with or without beaded accents, mosaics, and stained glass."
          },
          "geometry": {
            "coordinates": [
              -104.899645,
              39.228439
            ],
            "type": "Point"
          },
          "id": "1aa6f5d868b20a93678d804f68a228f7"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Elegancia Designs",
            "Variety": "Handmade metal & ceramic sculptures, you’re certain to find something you like!"
          },
          "geometry": {
            "coordinates": [
              -104.899195,
              39.228267
            ],
            "type": "Point"
          },
          "id": "1f2260a5020939a91a200cff29ed5cfc"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Kamala Perfumes",
            "Variety": "Perfumes, Incense, oils and aromatherapy for every need and occasion"
          },
          "geometry": {
            "coordinates": [
              -104.899094,
              39.228271
            ],
            "type": "Point"
          },
          "id": "20b41e5950efc9a9a0fc25b7c6d8849f"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Blazn Brazn Galleries",
            "Variety": "Watch as the Master Artisan hand-crafts metal sculptures, metal roses, and more."
          },
          "geometry": {
            "coordinates": [
              -104.89816,
              39.22749
            ],
            "type": "Point"
          },
          "id": "25db544ff001dece26e40af169335e4c"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Balt Design",
            "Variety": "Hand-crafted whimsical clay sculptures."
          },
          "geometry": {
            "coordinates": [
              -104.901125,
              39.227695
            ],
            "type": "Point"
          },
          "id": "2f1eabe4d2f6cb9214ecf94972f53ed0"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Boss Wench",
            "Variety": "A wonderful selection of women’s and children’s clothing."
          },
          "geometry": {
            "coordinates": [
              -104.901442,
              39.22864
            ],
            "type": "Point"
          },
          "id": "305aec77de33f35e652e1724446710a7"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Hollow Earth Swordworks",
            "Variety": "Handcrafted practice swords made from the finest woods in the Kingdom."
          },
          "geometry": {
            "coordinates": [
              -104.898658,
              39.2275
            ],
            "type": "Point"
          },
          "id": "38472cdcdd16ae0d391c7b03d2e101fb"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Beowolf",
            "Variety": "Men’s Apparel that’s certain to fit your needs, whether you’re a Pirate or a Prince."
          },
          "geometry": {
            "coordinates": [
              -104.900885,
              39.228939
            ],
            "type": "Point"
          },
          "id": "42148b0e86a55e2893070808854933fa"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Boars Head Leather",
            "Variety": "Handcrafted fine Leather work. Mugs, Pouches, Notebooks, Accessories and more."
          },
          "geometry": {
            "coordinates": [
              -104.899905,
              39.228472
            ],
            "type": "Point"
          },
          "id": "423bdb0e5eb9cb8f9a0c71b89d4b46a1"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Badger Blades",
            "Variety": "Fine edged Weaponry, Swords. Knives, and custom pieces"
          },
          "geometry": {
            "coordinates": [
              -104.900639,
              39.228674
            ],
            "type": "Point"
          },
          "id": "43bed0d06a6d0fc9e3eb87b387886940"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Leather By M. Ferrara",
            "Variety": "Hand-dyed and crafted leather apparel for both comfort and style."
          },
          "geometry": {
            "coordinates": [
              -104.900374,
              39.227599
            ],
            "type": "Point"
          },
          "id": "47b72a18f88ce771be340b55f7465080"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Bows Of The Risen Son",
            "Variety": "Traditional Archery equipment for all ages, handmade in the USA and family owned."
          },
          "geometry": {
            "coordinates": [
              -104.901995,
              39.228433
            ],
            "type": "Point"
          },
          "id": "49537ad2cefd8a015af18cef745fa602"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Dancing Glass Beadwork",
            "Variety": "Beaded jewelry and hair accessories."
          },
          "geometry": {
            "coordinates": [
              -104.898857,
              39.227554
            ],
            "type": "Point"
          },
          "id": "4a62ff095607a17166b4718be1f9150a"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Baby Fire Pits",
            "Variety": "Tabletop fire pits and metal artwork done by H&K Studios, a family business out of Colorado Springs."
          },
          "geometry": {
            "coordinates": [
              -104.898981,
              39.227567
            ],
            "type": "Point"
          },
          "id": "53aecb5cd0cab705844dabb367bf8496"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Fellowship Foundry",
            "Variety": "Pewter artwork of all kinds; goblets, mugs, jewelry, and more."
          },
          "geometry": {
            "coordinates": [
              -104.901761,
              39.228751
            ],
            "type": "Point"
          },
          "id": "598f1b97c36436709284422d311d7136"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Khatovar Chainmail",
            "Variety": "A household description for quality chainmail jewelry and accessories."
          },
          "geometry": {
            "coordinates": [
              -104.901208,
              39.228232
            ],
            "type": "Point"
          },
          "id": "5a4d00aeab61acaa948732f6e72798c4"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Hammocks By Linda",
            "Variety": "Hand-woven hammocks for both beauty and luxurious comfort."
          },
          "geometry": {
            "coordinates": [
              -104.902806,
              39.228794
            ],
            "type": "Point"
          },
          "id": "62bd3ae136ed7a67d72551ea3dac5a52"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "The Madd Hatter",
            "Variety": "Handmade hats of all kinds and feather wings!"
          },
          "geometry": {
            "coordinates": [
              -104.901214,
              39.228639
            ],
            "type": "Point"
          },
          "id": "6644ab32c30007505b627fd0dbdefcc4"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Grichels",
            "Variety": "Unique leather art with faces that look back at you!"
          },
          "geometry": {
            "coordinates": [
              -104.902776,
              39.229175
            ],
            "type": "Point"
          },
          "id": "684308ff62fc305ce72a1a6c7a33bbcf"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "The Honorable Company Of Metalsmiths",
            "Variety": "Historic scientific instruments, puzzle rings, astrolabs; one of a kind metal art."
          },
          "geometry": {
            "coordinates": [
              -104.90186,
              39.228478
            ],
            "type": "Point"
          },
          "id": "689418451804a308ae506d1e20ffcbf2"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Knotty Covers",
            "Variety": "Quilted and Embroidered bags, backpacks, purses, wall hangings and home goods. Featuring unique art inspired by Celtic designs and fantasy."
          },
          "geometry": {
            "coordinates": [
              -104.90097,
              39.227511
            ],
            "type": "Point"
          },
          "id": "6a0d4d840aa078ad511185b2eadd5d32"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Queen’s Fancy",
            "Variety": "Beautiful bodices, smocks, outerwear and more. Clothing for men, women, and children."
          },
          "geometry": {
            "coordinates": [
              -104.900611,
              39.228417
            ],
            "type": "Point"
          },
          "id": "7c3358a5b0399fad112abb2bac78611a"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Imperial Mongolian Armory",
            "Variety": "Replica and authentic period weaponry."
          },
          "geometry": {
            "coordinates": [
              -104.902268,
              39.228574
            ],
            "type": "Point"
          },
          "id": "89fd3c282b0f8d94968920577307da42"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Flying Clouds",
            "Variety": "Corsets, capes, skirts, and so much more!"
          },
          "geometry": {
            "coordinates": [
              -104.89863,
              39.227774
            ],
            "type": "Point"
          },
          "id": "9232e2de596ded0d7c5ce3640b9a7187"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "The Wandering Witch",
            "Variety": "Inclusive Wizarding Apparel for Magiks and Muggles alike."
          },
          "geometry": {
            "coordinates": [
              -104.902673,
              39.228701
            ],
            "type": "Point"
          },
          "id": "960bb142331b7602ec5b28dd5a688c46"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Schwartz Fyne Minerals",
            "Variety": "Beautiful rock and mineral sculptures."
          },
          "geometry": {
            "coordinates": [
              -104.902604,
              39.229074
            ],
            "type": "Point"
          },
          "id": "a03d98a72d4cfab8302528c32472d0bc"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "His Majesty’s Horns",
            "Variety": "Handmade drinking and blowing horns."
          },
          "geometry": {
            "coordinates": [
              -104.899742,
              39.228633
            ],
            "type": "Point"
          },
          "id": "a6609de82b263d336be0243fa8d3824e"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "D & U Leather Mugs",
            "Variety": "The Dragon and the Unicorn create one of a kind leather mugs and accessories"
          },
          "geometry": {
            "coordinates": [
              -104.901542,
              39.228408
            ],
            "type": "Point"
          },
          "id": "a7598d39ba9ec05ce8573ad9b63477a7"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Danny Boy Pipes",
            "Variety": "Hand-carved wooden pipes and accessories."
          },
          "geometry": {
            "coordinates": [
              -104.899837,
              39.227606
            ],
            "type": "Point"
          },
          "id": "a76f81844b38f8461e633ba86f50d251"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Catskill Mountain",
            "Variety": "High quality, handmade leather boots and shoes."
          },
          "geometry": {
            "coordinates": [
              -104.900322,
              39.228591
            ],
            "type": "Point"
          },
          "id": "b956fcbf53b6f4a01947551374da227b"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Arms & Honor",
            "Variety": "Wooden swords and shields for warriors of all ages!"
          },
          "geometry": {
            "coordinates": [
              -104.898202,
              39.22798
            ],
            "type": "Point"
          },
          "id": "bbabf0fe02c5eacd656381c7304c86bf"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Pearl’s Revenge",
            "Variety": "A shop for all your Pirate needs!"
          },
          "geometry": {
            "coordinates": [
              -104.900012,
              39.227835
            ],
            "type": "Point"
          },
          "id": "cccebb64b52f0217663d9a1153eec8f3"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Children’s Frockery",
            "Variety": "Children’s clothing sure to make them feel like Royalty."
          },
          "geometry": {
            "coordinates": [
              -104.901368,
              39.227819
            ],
            "type": "Point"
          },
          "id": "d298a4c184e4778421edbf7b1bd0bcde"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Storm Leather Werks",
            "Variety": "Sculpted Leather Armor of all kinds."
          },
          "geometry": {
            "coordinates": [
              -104.902236,
              39.228402
            ],
            "type": "Point"
          },
          "id": "d9c6d39d8815b0f5f5052d82b351e373"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Iron Wolf Forge",
            "Variety": "Stop by to see the Village Blacksmith at work!"
          },
          "geometry": {
            "coordinates": [
              -104.899592,
              39.227664
            ],
            "type": "Point"
          },
          "id": "db06db52f9ce417d577fb6b13b9f59e5"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Legacy Forge",
            "Variety": "Hand-crafted combat ready arms and armor from a variety of time periods."
          },
          "geometry": {
            "coordinates": [
              -104.901289,
              39.228398
            ],
            "type": "Point"
          },
          "id": "dba0cebf9e2e9da4f1b8ac54e7ed837c"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "The Bard’s Musik Shoppe",
            "Variety": "Bamboo flutes and musical instruments made with love."
          },
          "geometry": {
            "coordinates": [
              -104.902818,
              39.2292
            ],
            "type": "Point"
          },
          "id": "dd508ca501c7e03612a5214b10a4f867"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Dragons Lair Glass",
            "Variety": "Glass work, stained glass windows"
          },
          "geometry": {
            "coordinates": [
              -104.900522,
              39.228901
            ],
            "type": "Point"
          },
          "id": "ddd42a7a4bff82667d503982d6424ce4"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "John Coiner Pottery",
            "Variety": "Mugs, Horns, Drinking vessels, commemorative goblets and souvenirs."
          },
          "geometry": {
            "coordinates": [
              -104.902944,
              39.22918
            ],
            "type": "Point"
          },
          "id": "e45495d4e638c62833ab80e007937206"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Black Dragon",
            "Variety": "Handmade animal figurines; dragons, frogs, eagles, unicorns, and so much more."
          },
          "geometry": {
            "coordinates": [
              -104.900254,
              39.227527
            ],
            "type": "Point"
          },
          "id": "e57d47117ba1fb30d2d28713bc62fe74"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Enchanted Brooms & Walking Sticks",
            "Variety": "Hand-carved walking sticks, staves, brooms, and more!"
          },
          "geometry": {
            "coordinates": [
              -104.898149,
              39.227864
            ],
            "type": "Point"
          },
          "id": "e62afaba37a0b27d9789cee7414f7462"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Dan Thompson Fine Arts",
            "Variety": "Original Artwork in many styles; prints, coloring books, bookmarks, and more!"
          },
          "geometry": {
            "coordinates": [
              -104.901137,
              39.228678
            ],
            "type": "Point"
          },
          "id": "ec682af60884fdc680062a98b460e093"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Noblesse Oblige",
            "Variety": "An amazing selection of high quality Men’s and Women’s clothing, perfect for Royalty!"
          },
          "geometry": {
            "coordinates": [
              -104.901059,
              39.228478
            ],
            "type": "Point"
          },
          "id": "ec956316d3f6361121709c8bf8157e7f"
        },
        {
          "type": "Feature",
          "properties": {
            "description": "Domba Tribal",
            "Variety": "Bellydance outfits and accessories."
          },
          "geometry": {
            "coordinates": [
              -104.900488,
              39.22862
            ],
            "type": "Point"
          },
          "id": "f6d2fd9e0e4d7fee7e7db3eabf047d91"
        }
      ],
      "type": "FeatureCollection"
    }
  });
  // Add a layer showing the feasts.
  map.addLayer({
    'id': 'vendors',
    'type': 'circle',
    'source': 'vendors',
    'paint': {
      'circle-color': '#2AFEF3',
      'circle-opacity': 0.75,
      'circle-radius': 3
    }
  });

  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'vendors', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on('mouseleave', 'vendors', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
});
// map.on('click', () => {
//   for (const [index, coordinate] of eventCoordinates.entries()) {
//     setTimeout(() => {
//       map.jumpTo({ center: coordinate });
//     }, 2000 * index);
//   }
// });
// const geocoder = new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
//   flyTo: {
//     bearing: 0,
//     // Control the flight curve, making it move slowly and
//     // zoom out almost completely before starting to pan.
//     speed: 0.2, // Choose the speed at which the camera flies.
//     curve: 1, // Change the speed at which it zooms out.
//     // This can be any easing function: it takes a number between
//     // 0 and 1 and returns another number between 0 and 1.
//     easing: function (t) {
//       return t;
//     }
//   },
//   mapboxgl: mapboxgl
// });

// // Add the geocoder to the map/
// map.addControl(geocoder);

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
  })
);
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken

  }),
  'top-left'
);
// var directions = new MapboxDirections({
//   accessToken: process.env.VUE_APP_MAP_ACCESS_TOKEN,
//   unit: 'miles', // Use the metric system to display distances.
//   profile: 'mapbox/walking', // Set the initial profile to walking.
//   container: 'directions', // Specify an element thats not the map container.
//   //  controls: {instructions: false},
//   bearing: true,
//   steps: true,
//   controls: {
//     inputs: false,
//     instructions: true,
//     profileSwitcher: true
//   }
// });

// map.on('load', function () {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       directions.setOrigin([position.coords.longitude, position.coords.latitude]);
//     });
//   }
// });
// directions.on('route', function (e) {
//   console.log(e.route); // Logs the current route shown in the interface.
// });


</script>

<template>
  <div class="home">
    <h1>{{ message1 }}</h1>
    <h2>{{ message2 }}</h2>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 500px;
}

.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

body {
  background-image: url("https://www.toptal.com/designers/subtlepatterns/uploads/dynamic-style.png'");
  background-color: #cccccc;
}
</style>
