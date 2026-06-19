export interface MenuItem {
  id: string;
  name: string;
  category: "Coffee" | "Tea & Matcha" | "Refresher" | "Frappuccino" | "Bakery & Food";
  description: string;
  price: number;
  calories: number;
  image: string;
  bgColor: string; // Dynamic background for full detail view
  textColor: string;
  accentColor: string;
  caffeine: string;
  sugar: string;
  fat: string;
  joke: string; // Witty sarcastic comment
  preset?: {
    base: string;
    milk: string;
    sweetener: string;
    topping: string;
    ice: string;
    size: string;
  };
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "chocolate-chip-cookie",
    name: "Chocolate Chip Cookie",
    category: "Bakery & Food",
    description: "A soft, chewy cookie loaded with premium chocolate chunks and baked to golden perfection.",
    price: 3.25,
    calories: 360,
    image: "/images/menu-1.jpeg",
    bgColor: "from-[#FAF6F0] via-[#EEDCC7]/45 to-[#8B5A2B]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#8B5A2B] text-white",
    caffeine: "0 mg",
    sugar: "32g",
    fat: "16g",
    joke: "For when you want to feel like a kid again, but with BBA-level student debt."
  },
  {
    id: "chocolate-croissant",
    name: "Pain au Chocolat",
    category: "Bakery & Food",
    description: "A flaky, buttery puff pastry envelope filled with two rich chocolate bars inside, served warm.",
    price: 4.25,
    calories: 340,
    image: "/images/menu-2.jpeg",
    bgColor: "from-[#FAF5EF] via-[#E6C5A9]/45 to-[#6E4E37]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#6E4E37] text-white",
    caffeine: "0 mg",
    sugar: "14g",
    fat: "18g",
    joke: "A fancy name for chocolate bread that exists solely to test if you know how to pronounce 'Chocolat'."
  },
  {
    id: "chilli-cheese-toast",
    name: "Chilli Cheese Toast",
    category: "Bakery & Food",
    description: "Crispy toasted French bread topped with a melted blend of mozzarella, cheddar, green chillies, and bell peppers.",
    price: 4.95,
    calories: 280,
    image: "/images/menu-3.jpeg",
    bgColor: "from-[#FCF9F2] via-[#F4E3BA]/45 to-[#C68B59]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#C68B59] text-white",
    caffeine: "0 mg",
    sugar: "2g",
    fat: "12g",
    joke: "Because plain toast is too boring and normal cheese toast doesn't make you look adventurous enough."
  },
  {
    id: "spinach-corn-sandwich",
    name: "Spinach & Corn Sandwich",
    category: "Bakery & Food",
    description: "Creamy spinach and sweet corn filling sandwiched between toasted high-fiber brown bread layers.",
    price: 5.45,
    calories: 310,
    image: "/images/menu-4.jpeg",
    bgColor: "from-[#F3F7F3] via-[#DCEAD6]/50 to-[#00704A]/15",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#00704A] text-[#F2F0EB]",
    caffeine: "0 mg",
    sugar: "4g",
    fat: "9g",
    joke: "Healthy spinach combined with sweet corn, so you can pretend this is a salad between two slices of carbs."
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Streusel Muffin",
    category: "Bakery & Food",
    description: "A moist, golden muffin bursting with sweet, juicy blueberries and topped with a crunchy streusel crumble.",
    price: 3.95,
    calories: 350,
    image: "/images/menu-5.jpeg",
    bgColor: "from-[#FAF5F7] via-[#EBCFE0]/40 to-[#9E4F8B]/25",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#9E4F8B] text-white",
    caffeine: "0 mg",
    sugar: "28g",
    fat: "14g",
    joke: "Basically a slice of cake disguised as breakfast so you don't feel guilty ordering it at 8:00 AM."
  },
  {
    id: "banana-loaf",
    name: "Banana Walnut Bread",
    category: "Bakery & Food",
    description: "Classic, cakey banana bread slice baked with real ripe bananas and loaded with crunchy walnuts.",
    price: 3.75,
    calories: 380,
    image: "/images/menu-6.jpeg",
    bgColor: "from-[#FAF7F0] via-[#ECCCA6]/45 to-[#8A5E38]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#8A5E38] text-white",
    caffeine: "0 mg",
    sugar: "26g",
    fat: "15g",
    joke: "The perfect excuse to eat cake for breakfast because it technically has 'banana' in the title."
  },
  {
    id: "ny-cheesecake",
    name: "New York Cheesecake",
    category: "Bakery & Food",
    description: "A dense, smooth, and creamy baked cheesecake slice on a buttery graham cracker biscuit crust.",
    price: 5.75,
    calories: 450,
    image: "/images/menu-7.jpeg",
    bgColor: "from-[#FDFBF7] via-[#F4EAD3]/50 to-[#D4A373]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#C68B59] text-[#1E3932]",
    caffeine: "0 mg",
    sugar: "30g",
    fat: "24g",
    joke: "Rich, heavy, and sweet—just like how your BBA student loans will feel in a few years."
  },
  {
    id: "spinach-egg-wrap",
    name: "Spinach & Feta Egg White Wrap",
    category: "Bakery & Food",
    description: "Egg whites, spinach, feta cheese, and sun-dried tomatoes wrapped in a toasted whole-wheat tortilla.",
    price: 5.25,
    calories: 290,
    image: "/images/menu-8.jpeg",
    bgColor: "from-[#F5F8F5] via-[#D6E6D6]/40 to-[#00704A]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#00704A] text-[#F2F0EB]",
    caffeine: "0 mg",
    sugar: "4g",
    fat: "8g",
    joke: "For people who go to the gym once and immediately start talking about macro-nutrients and high-protein intake."
  },
  {
    id: "pesto-chicken-wrap",
    name: "Pesto Chicken Wrap",
    category: "Bakery & Food",
    description: "Grilled chicken breast tossed in herby basil pesto, folded with mozzarella and spinach into a grilled wrap.",
    price: 6.45,
    calories: 480,
    image: "/images/menu-9.jpeg",
    bgColor: "from-[#FAF6EE] via-[#E8DEC9]/50 to-[#806B43]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#806B43] text-white",
    caffeine: "0 mg",
    sugar: "3g",
    fat: "19g",
    joke: "Basil pesto and chicken: because nothing says 'I eat clean' like eating green herb paste inside a flour tortilla."
  },
  {
    id: "falafel-wrap",
    name: "Paneer Falafel Wrap",
    category: "Bakery & Food",
    description: "Spiced chickpea falafel patties, paneer blocks, fresh vegetables, and tahini spread wrapped in a soft grilled flatbread.",
    price: 5.95,
    calories: 420,
    image: "/images/menu-10.jpeg",
    bgColor: "from-[#FAF6ED] via-[#DECDB7]/40 to-[#9E784F]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#9E784F] text-white",
    caffeine: "0 mg",
    sugar: "5g",
    fat: "14g",
    joke: "A cross-cultural marketing fusion for when you can't decide between Mediterranean or Indian street food."
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    category: "Bakery & Food",
    description: "Classic golden butter croissant with flaky layers and a soft, warm interior.",
    price: 3.75,
    calories: 250,
    image: "/images/menu-11.jpeg",
    bgColor: "from-[#FFFDF9] via-[#F4E3C5]/40 to-[#D4A373]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#C68B59] text-[#1E3932]",
    caffeine: "0 mg",
    sugar: "5g",
    fat: "14g",
    joke: "Flaky layers of pure butter designed to leave crumbs all over your expensive laptop keyboard."
  },
  {
    id: "caramel-frappuccino",
    name: "Caramel Frappuccino",
    category: "Frappuccino",
    description: "Buttery caramel syrup blended with coffee, milk, and ice, topped with whipped cream and caramel drizzle.",
    price: 5.45,
    calories: 380,
    image: "/images/menu-12.jpeg",
    bgColor: "from-[#FAF6ED] via-[#F0DFCD]/40 to-[#C68B59]/25",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#C68B59] text-white",
    caffeine: "90 mg",
    sugar: "54g",
    fat: "15g",
    joke: "A milkshake that took a marketing course and successfully rebranded itself as a premium coffee beverage.",
    preset: {
      base: "Caramel Gold",
      milk: "Whole Milk",
      sweetener: "Caramel Syrup",
      topping: "Whipped Cream",
      ice: "Regular",
      size: "Grande"
    }
  },
  {
    id: "iced-americano",
    name: "Iced Caffe Americano",
    category: "Coffee",
    description: "Rich, full-bodied espresso shots topped with cold water and served over ice for a bold coffee profile.",
    price: 3.95,
    calories: 15,
    image: "/images/menu-13.jpeg",
    bgColor: "from-[#F2ECE9] via-[#D7CCC8]/30 to-[#3E2723]/25",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#3E2723] text-white",
    caffeine: "225 mg",
    sugar: "0g",
    fat: "0g",
    joke: "Watered-down espresso for people who want you to know they drink black coffee, but also want it to last longer.",
    preset: {
      base: "Cold Brew",
      milk: "None",
      sweetener: "None",
      topping: "None",
      ice: "Regular",
      size: "Grande"
    }
  },
  {
    id: "hot-chocolate",
    name: "Signature Hot Chocolate",
    category: "Coffee",
    description: "Steamed milk and rich cocoa mocha sauce topped with whipped cream and a chocolate drizzle.",
    price: 4.65,
    calories: 370,
    image: "/images/menu-14.jpeg",
    bgColor: "from-[#FAF3EE] via-[#DECAC0]/40 to-[#4E2B1F]/25",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#4E2B1F] text-white",
    caffeine: "25 mg",
    sugar: "41g",
    fat: "16g",
    joke: "For when you accompany your friend to Starbucks but don't actually like the bitter taste of real coffee.",
    preset: {
      base: "Caramel Gold",
      milk: "Whole Milk",
      sweetener: "Vanilla Syrup",
      topping: "Whipped Cream",
      ice: "None",
      size: "Grande"
    }
  },
  {
    id: "mocha-frappuccino",
    name: "Mocha Frappuccino",
    category: "Frappuccino",
    description: "Mocha sauce blended with espresso, milk, and ice, topped with sweetened whipped cream.",
    price: 5.45,
    calories: 410,
    image: "/images/menu-15.jpeg",
    bgColor: "from-[#F9EFE6] via-[#DCBEA6]/40 to-[#4E2B1F]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#4E2B1F] text-white",
    caffeine: "100 mg",
    sugar: "61g",
    fat: "15g",
    joke: "Because chocolate milk is great, but chocolate milk with caffeine makes you feel like a productive adult.",
    preset: {
      base: "Caramel Gold",
      milk: "Whole Milk",
      sweetener: "Vanilla Syrup",
      topping: "Whipped Cream",
      ice: "Regular",
      size: "Grande"
    }
  },
  {
    id: "strawberry-frappuccino",
    name: "Strawberry Crème Frappuccino",
    category: "Frappuccino",
    description: "A blend of strawberry puree, milk, and ice, finished with a beautiful crown of whipped cream.",
    price: 5.65,
    calories: 370,
    image: "/images/menu-16.jpeg",
    bgColor: "from-[#FFF5F8] via-[#FFD3E3]/40 to-[#E05F8E]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#E05F8E] text-[#F2F0EB]",
    caffeine: "0 mg",
    sugar: "51g",
    fat: "15g",
    joke: "Zero caffeine, 100% sugar, and the official beverage of teenagers hanging out at the mall after school.",
    preset: {
      base: "Dragonfruit Refresher",
      milk: "Whole Milk",
      sweetener: "Classic Syrup",
      topping: "Whipped Cream",
      ice: "Regular",
      size: "Grande"
    }
  },
  {
    id: "double-chocolate-frappuccino",
    name: "Double Chocolate Chip Frappuccino",
    category: "Frappuccino",
    description: "Rich chocolate chips blended with mocha sauce, milk, and ice, layered with whipped cream and fudge.",
    price: 5.95,
    calories: 410,
    image: "/images/menu-17.jpeg",
    bgColor: "from-[#FAF0E6] via-[#DEC4B1]/40 to-[#4E3629]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#4E3629] text-white",
    caffeine: "15 mg",
    sugar: "47g",
    fat: "20g",
    joke: "For when you decide that a normal chocolate milkshake just isn't chocolatey enough for your cravings.",
    preset: {
      base: "Caramel Gold",
      milk: "Whole Milk",
      sweetener: "Classic Syrup",
      topping: "Whipped Cream",
      ice: "Regular",
      size: "Grande"
    }
  },
  {
    id: "iced-matcha-latte",
    name: "Iced Matcha Tea Latte",
    category: "Tea & Matcha",
    description: "Premium Japanese matcha green tea whisked with milk and served over ice for a smooth, refreshing, and earthy drink.",
    price: 5.25,
    calories: 200,
    image: "/images/menu-18.jpeg",
    bgColor: "from-[#E8F3E8] via-[#B8D8BA]/40 to-[#00704A]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#00704A] text-[#F2F0EB]",
    caffeine: "80 mg",
    sugar: "28g",
    fat: "5g",
    joke: "Earthy green tea whisked with milk, so you can drink grass and tell everyone you are practicing mindfulness.",
    preset: {
      base: "Matcha Green",
      milk: "Oat Milk",
      sweetener: "Classic Syrup",
      topping: "None",
      ice: "Regular",
      size: "Grande"
    }
  },
  {
    id: "hot-caramel-macchiato",
    name: "Caramel Macchiato",
    category: "Coffee",
    description: "Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.",
    price: 4.95,
    calories: 250,
    image: "/images/menu-19.jpeg",
    bgColor: "from-[#F7EFE5] via-[#E2B65C]/30 to-[#80411E]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#80411E] text-white",
    caffeine: "150 mg",
    sugar: "33g",
    fat: "7g",
    joke: "Espresso marked with milk and caramel, for when you want coffee but don't actually want to taste coffee.",
    preset: {
      base: "Caramel Gold",
      milk: "Whole Milk",
      sweetener: "Caramel Syrup",
      topping: "Cinnamon",
      ice: "None",
      size: "Grande"
    }
  },
  {
    id: "pink-drink",
    name: "Pink Drink",
    category: "Refresher",
    description: "Our Strawberry Açaí Refresher combined with creamy coconut milk, poured over ice with real strawberry pieces.",
    price: 5.35,
    calories: 140,
    image: "/images/menu-20.jpeg",
    bgColor: "from-[#FFF5F8] via-[#FFD3E3]/40 to-[#E05F8E]/20",
    textColor: "text-[#1E3932]",
    accentColor: "bg-[#E05F8E] text-[#F2F0EB]",
    caffeine: "45 mg",
    sugar: "24g",
    fat: "2.5g",
    joke: "The official beverage of Instagram aesthetic posts and Gen-Z lifestyle TikTok vlogs.",
    preset: {
      base: "Dragonfruit Refresher",
      milk: "Coconut Milk",
      sweetener: "None",
      topping: "None",
      ice: "Regular",
      size: "Grande"
    }
  }
];
