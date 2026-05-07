export type MenuItem = {
  id: string
  name: string
  price: string
  description: string
  image?: string
}

export type CategoryData = {
  title: string
  description: string
  items: MenuItem[]
}

export const menuDatabase: Record<string, CategoryData> = {
  "thickshakes": {
    title: "Thickshakes",
    description: "Rich, dense, and deeply satisfying beverages blended to perfection.",
    items: [
      { id: "t1", name: "Oreo Crunch", price: "₹249", description: "Crushed oreos blended with dense vanilla ice cream.", image: "/item_thickshake.png" },
      { id: "t2", name: "Belgian Chocolate", price: "₹299", description: "Premium dark Belgian chocolate, thick and rich.", image: "/belgian_chocolate.png" },

      { id: "t3", name: "Strawberry Delight", price: "₹229", description: "Fresh strawberries, strawberry syrup, and cream.", image: "/strawberry_delight.png" },

      { id: "t4", name: "Mango Madness", price: "₹279", description: "Seasonal fresh alphonso mangoes blended thick.", image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=800&q=80" },
    ]
  },
  "milkshakes": {
    title: "Milkshakes",
    description: "Smooth, classic milkshakes to cool you down.",
    items: [
      { id: "m1", name: "Classic Vanilla", price: "₹149", description: "The timeless standard milkshake.", image: "/about-icecream.png" },
      { id: "m2", name: "Chocolate Swirl", price: "₹179", description: "Chocolate syrup spun into vanilla.", image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&q=80" },
    ]
  },
  "icecreams": {
    title: "Ice Creams",
    description: "Premium scoops stacked high.",
    items: [
      { id: "i1", name: "Double Ripple", price: "₹129", description: "Two scoops of pure vanilla and strawberry joy.", image: "/about-icecream.png" },
      { id: "i2", name: "Fruit Sorbet", price: "₹159", description: "Refreshing, dairy-free mixed fruit blast.", image: "/strawberry_delight.png" },
      { id: "i3", name: "Chocolate Fudge Brownie", price: "₹189", description: "Rich chocolate ice cream loaded with chewy brownie chunks.", image: "/belgian_chocolate.png" },
      { id: "i4", name: "Butterscotch Crunch", price: "₹169", description: "Creamy butterscotch with crunchy golden praline bits.", image: "/about-icecream.png" },
      { id: "i5", name: "Pistachio Perfection", price: "₹199", description: "Premium roasted Mediterranean pistachios in a silky base.", image: "/about-icecream.png" },
      { id: "i6", name: "Cookie Dough Symphony", price: "₹189", description: "Vanilla bean ice cream with huge chunks of chocolate chip cookie dough.", image: "/belgian_chocolate.png" },
      { id: "i7", name: "Strawberry Cheesecake", price: "₹179", description: "Creamy cheesecake ice cream with a lush strawberry swirl.", image: "/strawberry_delight.png" }
    ]
  },
  "lassi": { 
    title: "Lassi", 
    description: "Traditional churned yogurt drinks.", 
    items: [
      { id: "l1", name: "Sweet Lassi", price: "₹99", description: "Classic sweetened yogurt churn with cardamom.", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800&q=80" },
      { id: "l2", name: "Mango Lassi", price: "₹149", description: "Rich yogurt blended with sweet mango pulp.", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800&q=80" }
    ] 
  },
  "mojitos": { 
    title: "Mojitos", 
    description: "Minty fresh mocktails to beat the heat.", 
    items: [
      { id: "mo1", name: "Virgin Mint Mojito", price: "₹129", description: "Classic refreshing mint and lime cooler.", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80" },
      { id: "mo2", name: "Watermelon Mojito", price: "₹149", description: "Fresh watermelon chunks muddled with mint leaves.", image: "/item_iced_frappe.png" }
    ] 
  },
  "special-drinks": { 
    title: "Special Drinks", 
    description: "Our signature, secret blends.", 
    items: [
      { id: "sp1", name: "Iravath Special Punch", price: "₹199", description: "Our signature blend of tropical fruits and berries.", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80" },
      { id: "sp2", name: "Blue Lagoon", price: "₹169", description: "Vibrant blue curacao mocktail with sprite and lime.", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&q=80" }
    ] 
  },
  "goli-soda": { 
    title: "Goli Soda", 
    description: "Fizzy nostalgic refreshment in a glass bottle.", 
    items: [
      { id: "g1", name: "Classic Paneer Soda", price: "₹49", description: "Traditional rose essence (paneer) flavored marble soda.", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80" },
      { id: "g2", name: "Masala Cola", price: "₹59", description: "Spicy and tangy masala infused goli soda.", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80" }
    ] 
  },
  "cold-coffees": { 
    title: "Cold Coffees", 
    description: "Caffeinated chills", 
    items: [
      { id: "c1", name: "Iced Frappe", price: "₹219", description: "Rich coffee whipped with cream and ice.", image: "/item_iced_frappe.png" },
      { id: "c2", name: "Mocha Chino", price: "₹249", description: "Espresso, cold milk, and chocolate syrup.", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80" }
    ] 
  },
  "snacks": { 
    title: "Snacks", 
    description: "Crispy bites", 
    items: [
      { id: "sn1", name: "Peri Peri Fries", price: "₹129", description: "Crispy golden french fries tossed in spicy peri peri seasoning.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=80" },
      { id: "sn2", name: "Cheese Nachos", price: "₹179", description: "Crunchy tortilla chips loaded with hot jalapeno cheese sauce.", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80" },
      { id: "sn3", name: "Paneer Tikka Sandwich", price: "₹199", description: "Grilled sandwich loaded with spicy paneer tikka filling.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80" }
    ] 
  },
  "sodas": { 
    title: "Sodas", 
    description: "Bubbly sweetness", 
    items: [
      { id: "s1", name: "Sparkling Berry", price: "₹119", description: "Fizzy soda with mixed berry extract.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80" },
      { id: "s2", name: "Lemon Pop", price: "₹99", description: "Zesty lemon and lime sparkling cooler.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80" }
    ] 
  },
}
