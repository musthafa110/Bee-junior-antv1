export const initialProducts = [
  {
    id: "bj-001",
    name: "Relaxed Fit T-Shirt",
    slug: "relaxed-fit-t-shirt",
    category: "Boys",
    subCategory: "Tops",
    mrp: 899,
    price: 649,
    rating: 4.9,
    reviewsCount: 38,
    image: "/images/relaxed-tee.jpg",
    images: [
      "/images/relaxed-tee.jpg",
      "/images/boy-henley.jpg",
      "/images/WhatsApp Image 2026-09-15 at 12.23.21 PM (2).jpeg"
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    badge: "Best Seller",
    description: "Super soft 100% organic cotton Henley t-shirt with wooden buttons and front pocket. Designed for gentle comfort on delicate skin and everyday playtime freedom.",
    details: [
      "100% Certified Organic Cotton",
      "Natural wooden button placket",
      "Ribbed collar and tagless neckline",
      "Pre-washed for extra softness",
      "Machine wash cold, tumble dry low"
    ],
    sizes: ["1-2Y", "2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    colors: [
      { name: "Beige Stripe", hex: "#D6C7B2" },
      { name: "Sage Green", hex: "#8FA89B" },
      { name: "Soft Cream", hex: "#F3EFE9" }
    ],
    stock: 24,
    status: "Published"
  },
  {
    id: "bj-002",
    name: "Floral Dress",
    slug: "floral-dress",
    category: "Girls",
    subCategory: "Dresses",
    mrp: 1299,
    price: 999,
    rating: 5.0,
    reviewsCount: 42,
    image: "/images/floral-dress.jpg",
    images: [
      "/images/floral-dress.jpg",
      "/images/floral-long-dress.jpg",
      "/images/girls-banner.jpg"
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    badge: "Popular",
    description: "Delicate cream floral flutter-sleeve dress with 3 wooden buttons on the chest and gathered empire waist. Airy, lightweight and made for sunny childhood memories.",
    details: [
      "100% Premium Muslin Cotton",
      "Delicate peach floral sprig print",
      "Functional wooden button placket",
      "Gentle elasticated flutter sleeves",
      "Hypoallergenic and AZO-free dyes"
    ],
    sizes: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
    colors: [
      { name: "Cream Floral", hex: "#F8F1E6" },
      { name: "Peach Blossom", hex: "#F2D8D1" }
    ],
    stock: 18,
    status: "Published"
  },
  {
    id: "bj-003",
    name: "Linen Shirt",
    slug: "linen-shirt",
    category: "Boys",
    subCategory: "Tops",
    mrp: 1199,
    price: 899,
    rating: 4.8,
    reviewsCount: 29,
    image: "/images/linen-shirt.jpg",
    images: [
      "/images/linen-shirt.jpg",
      "/images/why-us-boy.jpg"
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    badge: "Classic",
    description: "Breathable pure linen-cotton button-down shirt with a clean camp collar. Classic tailoring tailored with a relaxed, modern kids fit.",
    details: [
      "70% Cotton, 30% Pure Flax Linen",
      "Breathable weave keeps kids cool",
      "Genuine wooden buttons",
      "Reinforced double-stitch seams",
      "Designed for play and special occasions"
    ],
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    colors: [
      { name: "Sky Blue", hex: "#9EC1D5" },
      { name: "Ivory White", hex: "#FAF7F2" },
      { name: "Soft Sage", hex: "#9CB5A6" }
    ],
    stock: 15,
    status: "Published"
  },
  {
    id: "bj-004",
    name: "Linen Shorts",
    slug: "linen-shorts",
    category: "Bottoms",
    subCategory: "Bottoms",
    mrp: 899,
    price: 699,
    rating: 4.9,
    reviewsCount: 31,
    image: "/images/linen-shorts.jpg",
    images: [
      "/images/linen-shorts.jpg",
      "/images/boy-henley.jpg"
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    badge: "Essential",
    description: "Elasticated waistband shorts with drawstring tie and wooden bead finish. Soft textured linen-cotton blend for completely unrestricted movement.",
    details: [
      "Linen & Organic Cotton blend",
      "Non-pinching soft elastic waistband",
      "Functional drawstring with wooden beads",
      "Deep slant side pockets for small treasures",
      "Pre-shrunk fabric"
    ],
    sizes: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
    colors: [
      { name: "Oatmeal Beige", hex: "#E8DFD3" },
      { name: "Olive Sage", hex: "#8A9A86" }
    ],
    stock: 22,
    status: "Published"
  },
  {
    id: "bj-005",
    name: "Striped Fox Pocket Tee",
    slug: "striped-fox-pocket-tee",
    category: "Boys",
    subCategory: "Tops",
    mrp: 999,
    price: 799,
    rating: 5.0,
    reviewsCount: 23,
    image: "/images/striped-fox-tee.png",
    images: [
      "/images/striped-fox-tee.png"
    ],
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    badge: "New Arrival",
    description: "Playful nautical long-sleeve tee with yarn-dyed horizontal stripes and a cute felt fox peaking out of the charcoal chest pocket.",
    details: [
      "100% Combed Jersey Cotton",
      "Drop back hem for coverage during play",
      "Embroidered animal pocket character",
      "Durable non-stretch collar band"
    ],
    sizes: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
    colors: [
      { name: "Charcoal & Cream", hex: "#3A3D40" }
    ],
    stock: 14,
    status: "Published"
  },
  {
    id: "bj-006",
    name: "Minimalist Sage Lounge Set",
    slug: "minimalist-sage-lounge-set",
    category: "Sets",
    subCategory: "Sets",
    mrp: 1599,
    price: 1299,
    rating: 4.9,
    reviewsCount: 45,
    image: "/images/sage-set.png",
    images: [
      "/images/sage-set.png"
    ],
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    badge: "Set",
    description: "Matching 2-piece set featuring striped tee with subtle 'bee' embroidery paired with matching drawstring shorts. Everyday luxury for lounging and adventures.",
    details: [
      "Includes Tee + Shorts",
      "Ultra-soft 190 GSM organic jersey",
      "Tag-free labels inside",
      "Adjustable drawstring waist"
    ],
    sizes: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
    colors: [
      { name: "Sage Stripe", hex: "#8DA495" }
    ],
    stock: 12,
    status: "Published"
  },
  {
    id: "bj-007",
    name: "Bumblebee Striped Polo",
    slug: "bumblebee-striped-polo",
    category: "Boys",
    subCategory: "Tops",
    mrp: 1099,
    price: 849,
    rating: 4.8,
    reviewsCount: 19,
    image: "/images/striped-polo.jpg",
    images: [
      "/images/striped-polo.jpg",
      "/images/WhatsApp Image 2026-09-15 at 12.23.24 PM.jpeg"
    ],
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    badge: "New Arrival",
    description: "Classic collar long-sleeve polo shirt with heather grey and ivory stripes, 3 real wooden buttons, and a signature bumblebee embroidery on chest.",
    details: [
      "100% Cotton Jersey 190 GSM",
      "Bee signature flight path chest stitch",
      "Contrast knit collar and button placket",
      "Style Code: BJ-PL-001"
    ],
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    colors: [
      { name: "Heather Stripe", hex: "#9EA1A5" }
    ],
    stock: 20,
    status: "Published"
  },
  {
    id: "bj-008",
    name: "Floral Ruffle Tiered Dress",
    slug: "floral-ruffle-tiered-dress",
    category: "Girls",
    subCategory: "Dresses",
    mrp: 1499,
    price: 1199,
    rating: 5.0,
    reviewsCount: 27,
    image: "/images/floral-long-dress.jpg",
    images: [
      "/images/floral-long-dress.jpg"
    ],
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    badge: "New Arrival",
    description: "Full-length long-sleeve dress with all-over botanical wildflowers, gathered tiered skirt, and soft elastic wrist ruffles.",
    details: [
      "100% Breathable Muslin Cotton",
      "Elasticated soft ruffle cuffs",
      "Back wooden button closure",
      "Lined with soft organic voile"
    ],
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    colors: [
      { name: "Ivory Wildflower", hex: "#F5EFE7" }
    ],
    stock: 16,
    status: "Published"
  }
];

export const categoriesList = [
  { id: "boys", name: "Boys Collection", slug: "boys", icon: "shirt", bg: "var(--accent-sage-bg)", color: "var(--accent-sage-dark)" },
  { id: "girls", name: "Girls Collection", slug: "girls", icon: "dress", bg: "var(--accent-mustard-bg)", color: "var(--accent-mustard-dark)" },
  { id: "baby", name: "Baby Collection", slug: "baby", icon: "baby", bg: "var(--accent-sage-bg)", color: "var(--accent-sage-dark)" },
  { id: "new", name: "New Arrivals", slug: "new-arrivals", icon: "star", bg: "var(--accent-blue-bg)", color: "var(--accent-blue-dark)" }
];
