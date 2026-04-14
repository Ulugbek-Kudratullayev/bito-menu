const menuData = [
  {
    category: "BURGERLAR",
    items: [
      {
        name: "Non Burger",
        image: "/images/non-burger.jpg",
        variants: [
          { label: "Kichik", price: "33,000" },
          { label: "Kattasi", price: "38,000" },
        ],
      },
      {
        name: "Tovuq Burger",
        image: "/images/tovuq-burger.jpg",
        variants: [
          { label: "Kotta", price: "33,000" },
          { label: "Kichik", price: "28,000" },
        ],
      },
      {
        name: "Burger",
        image: "/images/burger.jpg",
        variants: [
          { label: "Oddiy", price: "33,000" },
          { label: "Bigburger", price: "45,000" },
          { label: "Cheese Bigburger", price: "50,000" },
        ],
      },
    ],
  },
  {
    category: "PITSA",
    subtitle: "25 sm / 35 sm",
    items: [
      {
        name: "Peperoni",
        image: "/images/peperoni.jpg",
        variants: [{ label: "25 sm", price: "49,000" }, { label: "35 sm", price: "79,000" }],
      },
      {
        name: "Pizza Donar",
        image: "/images/pizza-donar.jpg",
        variants: [{ label: "25 sm", price: "59,000" }, { label: "35 sm", price: "99,000" }],
      },
      {
        name: "Pizza Assorti",
        image: "/images/pizza-assorti.jpg",
        variants: [{ label: "25 sm", price: "59,000" }, { label: "35 sm", price: "99,000" }],
      },
      {
        name: "Pizza Qazili",
        image: "/images/pizza-qazili.jpg",
        variants: [{ label: "25 sm", price: "79,000" }, { label: "35 sm", price: "119,000" }],
      },
      {
        name: "Pizza Chicken BBQ",
        image: "/images/peperoni.jpg",
        variants: [{ label: "25 sm", price: "49,000" }, { label: "35 sm", price: "79,000" }],
      },
    ],
  },
  {
    category: "LAVASH",
    items: [
      {
        name: "Lavash mol go'shti",
        image: "/images/lavash-goshti.jpg",
        variants: [
          { label: "Oddiy", price: "37,000" },
          { label: "Tandir", price: "40,000" },
          { label: "Sirli", price: "40,000" },
          { label: "Sirli tandir", price: "44,000" },
        ],
      },
      {
        name: "Lavash tovuqli",
        image: "/images/lavash-tovuq.jpg",
        variants: [
          { label: "Oddiy", price: "33,000" },
          { label: "Tandir", price: "35,000" },
          { label: "Sirli", price: "37,000" },
          { label: "Sirli tandir", price: "40,000" },
        ],
      },
    ],
  },
  {
    category: "HOT-DOGLAR",
    items: [
      {
        name: "Hotdog",
        image: "/images/hotdog.webp",
        variants: [
          { label: "Oddiy", price: "13,000" },
          { label: "Kanada", price: "16,000" },
        ],
      },
      {
        name: "Dvaynoy Hotdog",
        image: "/images/dvaynoy-hotdog.jpg",
        variants: [
          { label: "Oddiy", price: "16,000" },
          { label: "Kanada", price: "20,000" },
        ],
      },
      {
        name: "BBQ Hotdog",
        image: "/images/bbq-hotdog.jpg",
        variants: [
          { label: "Oddiy", price: "28,000" },
          { label: "Dvaynoy", price: "38,000" },
        ],
      },
    ],
  },
  {
    category: "HAGGI",
    items: [
      {
        name: "Haggi",
        image: "/images/haggi.jpg",
        variants: [
          { label: "Kichik", price: "33,000" },
          { label: "Kotta", price: "40,000" },
        ],
      },
    ],
  },
  {
    category: "FRI",
    items: [
      {
        name: "Fri",
        image: "/images/fri.jpg",
        variants: [
          { label: "Oddiy", price: "15,000" },
          { label: "Po derevenski", price: "20,000" },
        ],
      },
    ],
  },
  {
    category: "KOMBO SETLAR",
    items: [
      {
        name: "Student Kombo",
        description: "Hotdog + Fri + Cola 0,33",
        image: "/images/kombo1.jpg",
        variants: [{ price: "33,000" }],
      },
      {
        name: "Student Kombo 2",
        description: "Lavash tovuqli + Fri + Fanta 0,33 + Sous ketchup",
        image: "/images/kombo2.jpg",
        variants: [{ price: "50,000" }],
      },
    ],
  },
  {
    category: "ICHIMLIKLAR",
    items: [
      {
        name: "Cofe Qora",
        image: "/images/cola.jpg",
        variants: [{ price: "7,000" }],
      },
      {
        name: "Cofe Sutli",
        image: "/images/cola.jpg",
        variants: [{ price: "10,000" }],
      },
      {
        name: "Choy",
        image: "/images/fusetea-qora.jpg",
        variants: [{ price: "5,000" }],
      },
      {
        name: "Lemon Choy",
        image: "/images/fusetea-qora.jpg",
        variants: [{ price: "10,000" }],
      },
      {
        name: "Fanta",
        image: "/images/fanta.jpg",
        variants: [{ price: "7,000" }, { price: "12,000" }, { price: "15,000" }],
      },
      {
        name: "Cola",
        image: "/images/cola.jpg",
        variants: [{ price: "7,000" }, { price: "12,000" }, { price: "15,000" }],
      },
      {
        name: "FuseTea",
        image: "/images/fusetea-qora.jpg",
        variants: [{ price: "8,000" }, { price: "13,000" }],
      },
      {
        name: "Bonaqua",
        image: "/images/bonaqua.jpg",
        variants: [{ price: "4,000" }, { price: "6,000" }, { price: "8,000" }],
      },
      {
        name: "Cola/Fanta/Sprite (balnishniy)",
        image: "/images/cola-baln.jpg",
        variants: [{ price: "10,000" }],
      },
      {
        name: "Maxtio",
        image: "/images/maxito-laim.jpg",
        variants: [{ price: "20,000" }],
      },
    ],
  },
  {
    category: "DESERTLAR",
    items: [
      {
        name: "Chizkeyklar (4 xil)",
        image: "/images/chizkeyk-newyork.jpg",
        variants: [{ price: "32,000" }],
      },
      {
        name: "Maxroviy tort",
        image: "/images/maxroviy-tort.jpg",
        variants: [{ price: "20,000" }],
      },
      {
        name: "Fistashkali lenta",
        image: "/images/fistashkali-lenta.jpg",
        variants: [{ price: "42,000" }],
      },
      {
        name: "Rulet Snickers",
        image: "/images/rulet-snickers.jpg",
        variants: [{ price: "32,000" }],
      },
      {
        name: "Pirojniy Malinali",
        image: "/images/pirojniy-malinali.jpg",
        variants: [{ price: "20,000" }],
      },
      {
        name: "Spartak",
        image: "/images/spartak.jpg",
        variants: [{ price: "20,000" }],
      },
      {
        name: "Trayfl",
        image: "/images/trayfl.jpg",
        variants: [{ price: "25,000" }],
      },
    ],
  },
];

export default menuData;
