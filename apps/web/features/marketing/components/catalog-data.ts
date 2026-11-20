export type ProductItem = { readonly name: string; readonly image: string; readonly alt: string; readonly price?: number; readonly featured?: boolean };

export const shopCategories = [
  { title: "Cakes", emoji: "🧁", slug: "cakes", image: "/cakes/chocolate-cream-sheet-cake.png", alt: "Chocolate cherry sheet cake from the cake collection" },
  { title: "Cookies", emoji: "🍪", slug: "cookies", image: "/cookies/cookie-02.png", alt: "Fresh chocolate chunk cookies" },
  { title: "Bakery Items", emoji: "🥐", slug: "bakery-items", image: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants" },
  { title: "Sweets", emoji: "🍡", slug: "sweets", image: "/sweets/mithai-19.png", alt: "Fresh orange motichoor ladoos from the sweets collection" },
  { title: "Nimko", emoji: "🥣", slug: "nimko", image: "/nimko/nimko-spicy-bowl.png", alt: "A bowl of crunchy spicy nimko" },
  { title: "Gift Packs", emoji: "🎁", slug: "gift-packs", image: "/bakery-gallery/dessert-table.png", alt: "A celebration table with bakery treats for sharing" }
] as const;
export const cakeDesigns = [
  { name: "Little Bear Pond Cake", style: "Kids", image: "/cakes/cake-01.png", alt: "Playful white cake with a blue pond, fruit and little bear decorations" },
  { name: "Safari Island Cake", style: "Kids", image: "/cakes/cake-02.png", alt: "White safari themed cake with palm trees and animal decorations" },
  { name: "Pakistan Flag Cake", style: "Celebration", image: "/cakes/cake-03.png", alt: "Green and white celebration cake decorated with the Pakistan flag colours" },
  { name: "Three Friends Cake", style: "Kids", image: "/cakes/cake-04.png", alt: "White cake with three playful pink character decorations" },
  { name: "Safari Cake Side View", style: "Kids", image: "/cakes/cake-05.png", alt: "Side view of a safari themed cake with palm trees and animal figures" },
  { name: "Jungle Pond Cake", style: "Kids", image: "/cakes/cake-06.png", alt: "Top view of a green pond themed cake with small animal decorations" },
  { name: "Little Bear Cake Top View", style: "Kids", image: "/cakes/cake-07.png", alt: "Top view of a colorful bear and pond themed cake" },
  { name: "The Hunt Is Over Cake", style: "Chocolate", image: "/cakes/cake-08.png", alt: "Dark chocolate cake with red heart candles and a The Hunt Is Over topper" },
  { name: "Football Birthday Cake", style: "Birthday", image: "/cakes/cake-09.png", alt: "Two tier birthday cake decorated with footballs and a number two candle" },
  { name: "Candlelit Chocolate Cake", style: "Chocolate", image: "/cakes/cake-10.png", alt: "Small chocolate cake with one lit candle on a plate" },
  { name: "Heart Sprinkle Cake", style: "Birthday", image: "/cakes/cake-11.png", alt: "White cake decorated with red hearts" },
  { name: "Chocolate Celebration Cake", style: "Chocolate", image: "/cakes/cake-12.png", alt: "Chocolate cake with decorative chocolate toppers" },
  { name: "Red Rose Wedding Cake", style: "Wedding", image: "/cakes/cake-13.png", alt: "Tiered white wedding cake decorated with red roses" },
  { name: "Chocolate Birthday Cake", style: "Chocolate", image: "/cakes/cake-14.png", alt: "Dark chocolate cake with cream decoration and a strawberry" },
  { name: "Rustic Floral Wedding Cake", style: "Wedding", image: "/cakes/cake-15.png", alt: "Rustic tiered cake decorated with dried flowers" },
  { name: "Raspberry Glaze Cake", style: "Celebration", image: "/cakes/cake-16.png", alt: "Glossy pink raspberry cake topped with fresh berries" },
  { name: "Chocolate Berry Cake", style: "Chocolate", image: "/cakes/cake-17.png", alt: "Chocolate cake decorated with berries and chocolate cream" },
  { name: "Anniversary Chocolate Cake", style: "Chocolate", image: "/cakes/cake-18.png", alt: "Dark celebration cake with a candle and cream decoration" },
  { name: "Butterfly Birthday Cake", style: "Birthday", image: "/cakes/cake-19.png", alt: "Pink and purple tiered birthday cake decorated with butterflies" },
  { name: "Chocolate Chip Cake", style: "Chocolate", image: "/cakes/cake-20.png", alt: "Chocolate cake topped with chocolate chips" },
  { name: "Sparkler Birthday Cake", style: "Birthday", image: "/cakes/cake-21.png", alt: "Birthday cake with a lit sparkler candle" },
  { name: "Blue Cream Celebration Cake", style: "Celebration", image: "/cakes/cake-22.png", alt: "Round cake decorated with pale blue and lavender cream" },
  { name: "Classic Birthday Cake", style: "Birthday", image: "/cakes/cake-23.png", alt: "Black and white birthday cake with candles and flower decorations" },
  { name: "Golden Birthday Cake", style: "Birthday", image: "/cakes/birthday-cake.png", alt: "Golden birthday cake decorated with cream and a happy birthday topper" },
  { name: "Chocolate Cherry Sheet Cake", style: "Chocolate", image: "/cakes/chocolate-cream-sheet-cake.png", alt: "Rectangular chocolate drip cake topped with whipped cream and bright cherries" },
  { name: "Chocolate Celebration Sheet Cake", style: "Chocolate", image: "/cakes/chocolate-cherry-sheet-cake.png", alt: "Angled view of a rectangular chocolate drip cake with cream swirls and cherries" }
] as const;

export const collections = {
  cookies: {
    title: "Cookies",
    eyebrow: "Freshly baked favourites",
    description: "Explore chocolate chip, jam-filled, butter cookies and classic tea biscuits.",
    heroImage: "/cookies/cookie-20.png",
    heroAlt: "A beautiful assortment of freshly baked cookies",
    items: [
      { name: "Jam Heart Cookies", image: "/cookies/cookie-01.png", alt: "Heart and star shaped jam filled cookies dusted with sugar" },
      { name: "Chocolate Chunk Cookies", image: "/cookies/cookie-02.png", alt: "Freshly baked chunky cookies with chocolate pieces" },
      { name: "Shaped Butter Cookies", image: "/cookies/cookie-03.png", alt: "Homemade cookies cut into playful shapes" },
      { name: "Classic Oat Cookies", image: "/cookies/cookie-04.png", alt: "Golden round cookies on a baking tray" },
      { name: "Double Chocolate Cookies", image: "/cookies/cookie-05.png", alt: "Dark chocolate cookies topped with chocolate chunks" },
      { name: "Freshly Baked Cookies", image: "/cookies/cookie-06.png", alt: "A tray of golden freshly baked cookies" },
      { name: "Chocolate Chip Cookies", image: "/cookies/cookie-07.png", alt: "Golden cookies with chocolate and fruit pieces" },
      { name: "Jam Thumbprint Cookies", image: "/cookies/cookie-08.png", alt: "Butter cookies with a dark jam centre" },
      { name: "Chocolate Chunk Bites", image: "/cookies/cookie-09.png", alt: "Chocolate chunk cookies cooling on parchment" },
      { name: "Piped Butter Cookies", image: "/cookies/cookie-10.png", alt: "Swirled butter cookies cooling on a wire rack" },
      { name: "Jam Window Cookies", image: "/cookies/cookie-11.png", alt: "Sugar dusted sandwich cookies with jam centres" },
      { name: "Chocolate Chip Cookies", image: "/cookies/cookie-12.png", alt: "Round chocolate chip cookies on a baking tray" },
      { name: "Swirled Chocolate Cookies", image: "/cookies/cookie-13.png", alt: "Piped swirl cookies with chocolate chips" },
      { name: "Tea Biscuits", image: "/cookies/cookie-14.png", alt: "Golden patterned tea biscuits" },
      { name: "Assorted Tea Biscuits", image: "/cookies/cookie-15.png", alt: "A large assortment of crisp tea biscuits" },
      { name: "Chocolate Drizzle Biscuits", image: "/cookies/cookie-16.png", alt: "Biscuits decorated with chocolate drizzle" },
      { name: "Classic Round Biscuits", image: "/cookies/cookie-17.png", alt: "Classic patterned round biscuits on a wooden board" },
      { name: "Sandwich Tea Biscuits", image: "/cookies/cookie-18.png", alt: "Golden sandwich tea biscuits stacked together" },
      { name: "Letter Cookies", image: "/cookies/cookie-19.png", alt: "Cookies arranged to spell a short word" },
      { name: "Assorted Cookie Platter", image: "/cookies/cookie-20.png", alt: "A colourful assortment of assorted cookies and biscuits" },
      { name: "Classic Tea Biscuits", image: "/cookies/cookie-21.png", alt: "Classic rectangular tea biscuits" },
      { name: "Pistachio Biscuits", image: "/cookies/cookie-22.png", alt: "Golden round biscuits topped with pistachio pieces" },
      { name: "Heart Sandwich Cookies", image: "/cookies/cookie-23.png", alt: "Heart shaped sandwich cookies with chocolate filling" },
      { name: "Soft Sugar Cookies", image: "/cookies/cookie-24.png", alt: "Soft pale sugar cookies on a baking tray" },
      { name: "Soft Sugar Cookies", image: "/cookies/cookie-25.png", alt: "Soft pale sugar cookies on a baking tray" },
      { name: "Golden Bakery Biscuits", image: "/cookies/cookie-26.png", alt: "A close view of golden freshly baked bakery biscuits" },
      { name: "Savory Seed Biscuits", image: "/cookies/cookie-27.png", alt: "Round savory biscuits topped with black seeds" },
      { name: "Soft Bakery Cookies", image: "/cookies/cookie-28.png", alt: "Pale golden soft cookies stacked on a white surface" },
      { name: "Almond Coconut Biscuits", image: "/cookies/cookie-29.png", alt: "Round coconut biscuits topped with almonds" },
      { name: "Almond Coconut Biscuits", image: "/cookies/cookie-30.png", alt: "Round coconut biscuits topped with almonds on a plate" },
      { name: "Fresh Bakery Cookies", image: "/cookies/cookie-31.png", alt: "Fresh round bakery cookies on a plate" }
    ]
  },
  "bakery-items": {
    title: "Bakery Items",
    eyebrow: "Fresh from the oven",
    description: "Golden croissants and bakery-counter favourites, prepared fresh with care.",
    heroImage: "/bakery-gallery/croissants.png",
    heroAlt: "Fresh golden almond croissants cooling on a rack",
    items: [
      { name: "Almond Croissants", image: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants cooling on a bakery rack" },
      { name: "Fresh Pastry Selection", image: "/bakery-gallery/bakery-display.png", alt: "Pastries arranged beneath glass cake stands" }
    ]
  },
  sweets: {
    title: "Traditional Sweets",
    eyebrow: "A little sweetness for every occasion",
    description: "Classic mithai favourites for sharing, celebrations and thoughtful gifting.",
    heroImage: "/bakery-gallery/sweet-aroma-hero-display.png",
    heroAlt: "Traditional mithai and bakery treats ready to share",
    items: [
      { name: "Pistachio Gulab Jamun", image: "/sweets/mithai-01.png", alt: "Pistachio dusted gulab jamun arranged on a serving plate" },
      { name: "Red Velvet Gulab Jamun", image: "/sweets/mithai-02.png", alt: "Ruby red gulab jamun garnished with edible silver" },
      { name: "Almond Barfi", image: "/sweets/mithai-03.png", alt: "Square almond barfi topped with almonds and silver leaf" },
      { name: "Kaju Katli", image: "/sweets/mithai-04.png", alt: "White cashew katli pieces topped with cashew halves" },
      { name: "Rasgulla", image: "/sweets/mithai-05.png", alt: "Soft yellow rasgulla sweets with red cherry centres" },
      { name: "Jodhpuri Laddu", image: "/sweets/mithai-06.png", alt: "Golden Jodhpuri laddus in a sweet shop display" },
      { name: "Kaju Roll", image: "/sweets/mithai-07.png", alt: "Sliced kaju rolls coated in silver leaf" },
      { name: "Coconut Ladoo", image: "/sweets/mithai-08.png", alt: "Pink coconut ladoos coated in shredded coconut" },
      { name: "Besan Barfi", image: "/sweets/mithai-09.png", alt: "Golden gram flour barfi cut into neat squares" },
      { name: "Chocolate Dry Fruit Roll", image: "/sweets/mithai-10.png", alt: "Chocolate and dry fruit rolls arranged in rows" },
      { name: "Dry Fruit Peda", image: "/sweets/mithai-11.png", alt: "Brown milk pedas decorated with chopped nuts" },
      { name: "White Peda", image: "/sweets/mithai-12.png", alt: "Soft white pedas arranged in a tray" },
      { name: "Golden Ladoo", image: "/sweets/mithai-13.png", alt: "Golden ladoos in a traditional sweet shop tray" },
      { name: "Milk Barfi", image: "/sweets/mithai-14.png", alt: "Creamy white milk barfi cut into square pieces" },
      { name: "Golden Sweet Sticks", image: "/sweets/mithai-15.png", alt: "Crispy golden sweet sticks ready to serve" },
      { name: "Boondi Ladoo", image: "/sweets/mithai-16.png", alt: "Small pale golden boondi ladoos" },
      { name: "Kesar Sweet Bites", image: "/sweets/mithai-17.png", alt: "Glossy orange kesar sweets arranged close together" },
      { name: "Mango Barfi", image: "/sweets/mithai-18.png", alt: "Golden mango barfi pieces in a takeaway tray" },
      { name: "Motichoor Laddu", image: "/sweets/mithai-19.png", alt: "Orange motichoor laddus topped with pistachio" },
      { name: "Motichoor Laddu Selection", image: "/sweets/mithai-20.png", alt: "A close view of orange motichoor laddus" },
      { name: "Classic Rasgulla", image: "/sweets/mithai-21.png", alt: "Soft white rasgullas in a traditional tray" },
      { name: "Golden Balushahi", image: "/sweets/mithai-22.png", alt: "Golden flaky balushahi sweets in a gift box" },
      { name: "Poppy Seed Pista Roll", image: "/sweets/mithai-23.png", alt: "Poppy seed coated pista rolls with a green centre" },
      { name: "Besan Laddu", image: "/sweets/mithai-24.png", alt: "Golden besan laddus decorated with almonds" },
      { name: "Boondi Mix", image: "/sweets/mithai-25.png", alt: "Colourful sweet boondi pearls with nuts and fruit" },
      { name: "Malai Barfi", image: "/sweets/mithai-26.png", alt: "Pale creamy malai barfi stacked in a display" },
      { name: "Gur Papdi", image: "/sweets/mithai-27.png", alt: "Rich jaggery papdi garnished with pistachio" },
      { name: "Almond Milk Cake", image: "/sweets/mithai-28.png", alt: "Almond milk cake sweets arranged on a white plate" },
      { name: "Kesar Peda", image: "/sweets/mithai-29.png", alt: "Golden kesar pedas served in a glass bowl" },
      { name: "Chocolate Barfi", image: "/sweets/mithai-30.png", alt: "Chocolate and vanilla barfi pieces on a wooden surface" },
      { name: "Sweet Celebration Selection", image: "/bakery-gallery/dessert-table.png", alt: "A colourful table of celebration sweets and cakes" }
    ]
  },
  nimko: {
    title: "Crispy Nimko",
    eyebrow: "Savoury favourites",
    description: "Pick a crunchy mix and message us to ask about available pack sizes.",
    heroImage: "/nimko/nimko-spicy-bowl.png",
    heroAlt: "A bowl of colorful crunchy spicy nimko",
    items: [
      { name: "Golden Rice Nimko", image: "/nimko/nimko-spicy-rice.png", alt: "Golden crispy rice nimko on a white plate" },
      { name: "Classic Nimko Mix", image: "/nimko/nimko-mix-pouch.png", alt: "Traditional assorted nimko mix in a serving pouch" },
      { name: "Crispy Flakes Mix", image: "/nimko/nimko-crispy-flakes.png", alt: "Crispy flakes nimko with peanuts" },
      { name: "Peanut Rice Mix", image: "/nimko/nimko-rice-peanuts.png", alt: "Rice crisps and peanuts served in a bowl" },
      { name: "Spicy Bowl Mix", image: "/nimko/nimko-spicy-bowl.png", alt: "Colorful spicy nimko mix in a white bowl" },
      { name: "Crunchy Nimko Bites", image: "/nimko/nimko-crispy-bites.png", alt: "Golden crunchy nimko bites in a wooden bowl" },
      { name: "Family Nimko Mix", image: "/nimko/nimko-mix-classic.png", alt: "Assorted classic nimko with peanuts and crunchy sticks" }
    ]
  },
  "gift-packs": {
    title: "Gift Packs",
    eyebrow: "Made for sharing",
    description: "Send a sweet surprise. Ask us about a gift selection for your occasion.",
    heroImage: "/bakery-gallery/dessert-table.png",
    heroAlt: "A styled dessert table prepared for sharing and celebration",
    items: [
      { name: "Sweet Aroma Celebration Box", image: "/bakery-gallery/dessert-table.png", alt: "A beautifully arranged bakery dessert table ready for a celebration" },
      { name: "Traditional Sweet Selection", image: "/sweets/mithai-04.png", alt: "Cashew sweets arranged in a traditional mithai tray" }
    ]
  }
} as const;

export type CollectionSlug = keyof typeof collections;
