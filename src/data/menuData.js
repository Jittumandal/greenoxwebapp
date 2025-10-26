export const categories = [
    { id: 1, name: "Special" },
    { id: 2, name: "Breakfast" },
    { id: 3, name: "Launch" },
    { id: 4, name: "Dinner" },
    { id: 5, name: "Sneaks" }
];

export const menuItems = {
    special: [
        {
            id: 1,
            name: "ABC Red Nutritional Juice",
            price: 199,
            description:
                "Apple Beetroot Carrot Ginger Lime Freshly Cold Pressed Juice - No Sugar No Water No Preservatives",
            img: "/img/menu/ABC Red Nutritional Juice.jpg",
            nutritionInfo: { calories: "120 Cal", protein: "1g", carbs: "28g", fat: "0g" },
            allergens: [],
            pairs: []
        },
        {
            id: 2,
            name: "Cottage Cheese Salad",
            price: 249,
            description:
                "Cottage Cheese Grilled Pineapple Bellpepper Cherry Tomato Mix Lettuce Tomato Cucumber Carrot Coriander Mix Herb Choice of Salad Dressing",
            img: "/img/menu/Assorted Veggies & Quinoa Salad .jpg",
            nutritionInfo: { calories: "420 Cal", protein: "18g", carbs: "20g", fat: "28g" },
            allergens: ["Milk"],
            pairs: []
        },
        {
            id: 3,
            name: "Basil Pesto Pasta Salad",
            price: 279,
            description: "Mixed grilled vegetables on a bed of quinoa with lemon herb dressing",
            img: "/img/menu/Basil Pesto Pasta Salad- 3.jpg",
            nutritionInfo: { calories: "380 Cal", protein: "12g", carbs: "48g", fat: "10g" },
            allergens: [],
            pairs: []
        },
        {
            id: 4,
            name: "Corn Sandwich ( Cheese_ Paneer )",
            price: 199,
            description: "Whole wheat sandwich filled with marinated paneer tikka and veggies",
            img: "/img/menu/Corn Sandwich ( Cheese_ Paneer ).jpg",
            nutritionInfo: { calories: "430 Cal", protein: "20g", carbs: "50g", fat: "14g" },
            allergens: ["Milk", "Wheat"],
            pairs: []
        },
        {
            id: 5,
            name: "Mediterranean Protein Bowl",
            price: 319,
            description: "Falafel, hummus, olives, cucumber and greens with mixed grains",
            img: "/img/menu/Exotic Fruit Salad - 2.jpg",
            nutritionInfo: { calories: "520 Cal", protein: "18g", carbs: "60g", fat: "20g" },
            allergens: ["Sesame", "Nuts"],
            pairs: []
        },
        {
            id: 6,
            name: "Exotic Fruit Salad - 3",
            price: 149,
            description: "Assorted seasonal fruits served fresh and chilled",
            img: "/img/menu/Exotic Fruit Salad - 3.jpg",
            nutritionInfo: { calories: "150 Cal", protein: "2g", carbs: "35g", fat: "0.5g" },
            allergens: [],
            pairs: []
        }
    ],

    breakfast: [
        {
            id: 11,
            name: "Exotic Fruit Salad - 4",
            price: 159,
            description: "Creamy oatmeal with fresh fruits, nuts and a drizzle of honey",
            img: "/img/menu/Exotic Fruit Salad - 4.jpg",
            nutritionInfo: { calories: "320 Cal", protein: "12g", carbs: "52g", fat: "8g" },
            allergens: ["Oats", "Nuts"],
            pairs: []
        },
        {
            id: 12,
            name: "Exotic Fruit Salad",
            price: 189,
            description: "Whole wheat protein pancakes served with fresh berries",
            img: "/img/menu/Exotic Fruit Salad.jpg",
            nutritionInfo: { calories: "450 Cal", protein: "24g", carbs: "48g", fat: "16g" },
            allergens: ["Wheat", "Eggs"],
            pairs: []
        },
        {
            id: 13,
            name: "Extravaganza Veggies Salad ",
            price: 169,
            description: "Multigrain toast topped with smashed avocado and seeds",
            img: "/img/menu/Extravaganza Veggies Salad - 2.jpg",
            nutritionInfo: { calories: "310 Cal", protein: "8g", carbs: "30g", fat: "16g" },
            allergens: ["Wheat", "Seeds"],
            pairs: []
        },
        {
            id: 14,
            name: "Extravaganza Veggies Salad ",
            price: 179,
            description: "Spiced omelette wrapped with fresh greens and whole wheat wrap",
            img: "/img/menu/Extravaganza Veggies Salad - 3.jpg",
            nutritionInfo: { calories: "350 Cal", protein: "18g", carbs: "28g", fat: "18g" },
            allergens: ["Eggs", "Wheat"],
            pairs: []
        },
        {
            id: 15,
            name: "Extravaganza Veggies Salad",
            price: 149,
            description: "Greek yogurt layered with granola and seasonal fruits",
            img: "/img/menu/Extravaganza Veggies Salad - 4.jpg",
            nutritionInfo: { calories: "260 Cal", protein: "15g", carbs: "32g", fat: "6g" },
            allergens: ["Milk", "Nuts"],
            pairs: []
        },
        {
            id: 16,
            name: "Extravaganza Veggies Salad",
            price: 139,
            description: "Semolina upma cooked with mixed vegetables and mild spices",
            img: "/img/menu/Extravaganza Veggies Salad.jpg",
            nutritionInfo: { calories: "300 Cal", protein: "6g", carbs: "54g", fat: "6g" },
            allergens: [],
            pairs: []
        }
    ],

    launch: [
        {
            id: 21,
            name: "Grilled Chicken Barbecue Sandwich",
            price: 279,
            description: "Nutrient-rich quinoa bowl with roasted vegetables and tahini dressing",
            img: "/img/menu/Grilled Chicken Barbecue Sandwich- 2.jpg",
            nutritionInfo: { calories: "520 Cal", protein: "18g", carbs: "68g", fat: "22g" },
            allergens: ["Sesame", "Nuts"],
            pairs: []
        },
        {
            id: 22,
            name: "Grilled Chicken Barbecue Sandwich",
            price: 229,
            description: "Hummus and falafel wrap with fresh vegetables",
            img: "/img/menu/Grilled Chicken Barbecue Sandwich.jpg",
            nutritionInfo: { calories: "480 Cal", protein: "16g", carbs: "62g", fat: "20g" },
            allergens: ["Wheat", "Sesame"],
            pairs: []
        },
        {
            id: 23,
            name: "Grilled Chicken Barbecue Sandwich",
            price: 299,
            description: "Grilled chicken breast, mixed greens, cherry tomatoes and vinaigrette",
            img: "/img/menu/Grilled Chicken Barbecue Sandwich.jpg",
            nutritionInfo: { calories: "420 Cal", protein: "36g", carbs: "12g", fat: "22g" },
            allergens: [],
            pairs: []
        },
        {
            id: 24,
            name: "Icy Strawberry Shake",
            price: 249,
            description: "Whole wheat pasta tossed with basil pesto and roasted veggies",
            img: "/img/menu/Icy Strawberry Shake.jpg",
            nutritionInfo: { calories: "560 Cal", protein: "18g", carbs: "78g", fat: "18g" },
            allergens: ["Wheat", "Nuts"],
            pairs: []
        },
        {
            id: 25,
            name: "Kulhad Chai",
            price: 199,
            description: "Soya chunks with steamed rice and a side of sauteed greens",
            img: "/img/menu/Kulhad Chai -2.jpg",
            nutritionInfo: { calories: "480 Cal", protein: "32g", carbs: "60g", fat: "8g" },
            allergens: ["Soy"],
            pairs: []
        },
        {
            id: 26,
            name: "Peri Peri Paneer Burrito Bowl",
            price: 259,
            description: "Creamy risotto with mushrooms, spinach and parmesan",
            img: "/img/menu/Peri Peri Paneer Burrito Bowl- 3.jpg",
            nutritionInfo: { calories: "510 Cal", protein: "12g", carbs: "72g", fat: "16g" },
            allergens: ["Milk"],
            pairs: []
        }
    ],

    dinner: [
        {
            id: 31,
            name: "Peri Peri Paneer Burrito Bowl",
            price: 299,
            description: "Marinated tofu with grilled vegetables and chimichurri",
            img: "/img/menu/Peri Peri Paneer Burrito Bowl.jpg",
            nutritionInfo: { calories: "420 Cal", protein: "28g", carbs: "32g", fat: "24g" },
            allergens: ["Soy"],
            pairs: []
        },
        {
            id: 32,
            name: "Protein Packed Salad ( Veg )",
            price: 319,
            description: "Mixed grains with chicken, avocado and roasted seeds",
            img: "/img/menu/Protein Packed Salad ( Veg ) - 2.jpg",
            nutritionInfo: { calories: "580 Cal", protein: "42g", carbs: "48g", fat: "26g" },
            allergens: ["Nuts"],
            pairs: []
        },
        {
            id: 33,
            name: "Soya Paneer Rice Bowl ",
            price: 399,
            description: "Oven baked salmon with herb crust and lemon butter sauce",
            img: "/img/menu/Soya Paneer Rice Bowl .jpg",
            nutritionInfo: { calories: "610 Cal", protein: "38g", carbs: "6g", fat: "44g" },
            allergens: ["Fish", "Milk"],
            pairs: []
        },
        {
            id: 34,
            name: "Protein Packed Salad ( Veg )",
            price: 289,
            description: "Mixed vegetables simmered in fragrant green curry with coconut milk",
            img: "/img/menu/Protein Packed Salad ( Veg ) - 4.jpg",
            nutritionInfo: { calories: "520 Cal", protein: "10g", carbs: "60g", fat: "24g" },
            allergens: ["Coconut"],
            pairs: []
        },
        {
            id: 35,
            name: "Protein Packed Salad ( Veg )",
            price: 249,
            description: "Hearty lentil filling topped with creamy mashed potatoes",
            img: "/img/menu/Protein Packed Salad ( Veg ).jpg",
            nutritionInfo: { calories: "480 Cal", protein: "20g", carbs: "58g", fat: "14g" },
            allergens: [],
            pairs: []
        },
        {
            id: 36,
            name: "Icy Strawberry Shake",
            price: 279,
            description: "Bell peppers stuffed with quinoa, beans and spices, baked to perfection",
            img: "/img/menu/Icy Strawberry Shake.jpg",
            nutritionInfo: { calories: "360 Cal", protein: "14g", carbs: "46g", fat: "10g" },
            allergens: [],
            pairs: []
        }
    ],

    sneaks: [
        {
            id: 41,
            name: "Soya Paneer Rice Bowl ",
            price: 149,
            description: "Protein-packed energy bites with dates and nuts",
            img: "/img/menu/Soya Paneer Rice Bowl .jpg",
            nutritionInfo: { calories: "220 Cal", protein: "8g", carbs: "24g", fat: "12g" },
            allergens: ["Nuts"],
            pairs: []
        },
        {
            id: 42,
            name: "Hara Bhara Kebab Wrap",
            price: 129,
            description: "Homemade granola bar with mixed dried fruits",
            img: "/img/menu/Hara Bhara Kebab Wrap.jpg",
            nutritionInfo: { calories: "180 Cal", protein: "6g", carbs: "26g", fat: "8g" },
            allergens: ["Nuts", "Seeds"],
            pairs: []
        },
        {
            id: 43,
            name: "Peri Peri Paneer Burrito Bowl",
            price: 89,
            description: "Crispy roasted chickpeas with light seasoning",
            img: "/img/menu/Peri Peri Paneer Burrito Bowl- 3.jpg",
            nutritionInfo: { calories: "150 Cal", protein: "7g", carbs: "20g", fat: "4g" },
            allergens: ["None"],
            pairs: []
        },
        {
            id: 44,
            name: "Peri Peri Paneer Burrito Bowl",
            price: 99,
            description: "Lightly salted baked kale chips for a crunchy, healthy snack",
            img: "/img/menu/Peri Peri Paneer Burrito Bowl.jpg",
            nutritionInfo: { calories: "90 Cal", protein: "4g", carbs: "12g", fat: "3g" },
            allergens: [],
            pairs: []
        },
        {
            id: 45,
            name: "Grilled Chicken Burger",
            price: 139,
            description: "Chia seeds soaked in almond milk with a touch of vanilla and honey",
            img: "/img/menu/Grilled Chicken Burger -3.jpg",
            nutritionInfo: { calories: "200 Cal", protein: "6g", carbs: "24g", fat: "8g" },
            allergens: ["Nuts", "Seeds"],
            pairs: []
        },
        {
            id: 46,
            name: "Soya Paneer Rice Bowl ",
            price: 129,
            description: "Small whole wheat wrap filled with crunchy veggies and light spread",
            img: "/img/menu/Soya Paneer Rice Bowl .jpg",
            nutritionInfo: { calories: "210 Cal", protein: "6g", carbs: "28g", fat: "8g" },
            allergens: ["Wheat"],
            pairs: []
        }
    ]
};