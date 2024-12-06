export const language = ["fr", "en", "pl"];

// Définition d'un type pour un plat unique
interface Dish {
  name: string; // Nom du plat
  description?: string; // Description du plat
  prices: {
    quantity: string; // Ex: "1/2", "entier", "500g"
    price: number; // Prix en PLN
  }[];
}

// Définition d'un type pour une catégorie de plats (Ex: Poulet, Bœuf)
export interface MenuCategory {
  categoryName: string; // Nom de la catégorie (ex: "Plats de Poulet")
  dishes: Dish[]; // Liste de plats dans la catégorie
}

// Définition du menu global avec ses différentes catégories
interface Menu {
  categories: MenuCategory[]; // Liste des catégories
}

// Exemple de l'objet Menu avec des données réelles tirées de ton menu
export const myMenu: Menu = {
  categories: [
    {
      categoryName: "Plats de Poulet",
      dishes: [
        {
          name: "Poulet rôti",
          description: "Poulet rôti au four, doré à la perfection",
          prices: [
            { quantity: "1/2", price: 80 },
            { quantity: "entier", price: 140 },
          ],
        },
        {
          name: "Poulet frit",
          description:
            "Poulet frit, parfumé et croustillant avec des épices maison.",
          prices: [
            { quantity: "Cuisse de poulet", price: 50 },
            { quantity: "1/2", price: 80 },
            { quantity: "entier", price: 140 },
          ],
        },
        {
          name: "Poulet mayo",
          description:
            "Recette traditionnelle congolaise : poulet entier dans une marinade crémeuse à la mayonnaise et des legumes.",
          prices: [
            { quantity: "1/2", price: 100 },
            { quantity: "entier", price: 180 },
          ],
        },
        {
          name: "Brochettes de poulet",
          description:
            "Recette traditionnelle congolaise : poulet entier dans une marinade crémeuse à la mayonnaise et des legumes.",
          prices: [{ quantity: "5 Pièces", price: 40 }],
        },
        {
          name: "Poulet Yassa",
          description:
            "Poulet mijoté dans une sauce à l'oignon et aux olives, typiquement sénégalaise",
          prices: [{ quantity: "Disponible", price: 60 }],
        },
        {
          name: "Poulet sauce arachide",
          description:
            "Poulet tendre mijoté dans une sauce onctueuse aux arachides",
          prices: [{ quantity: "Disponible", price: 60 }],
        },
        {
          name: "Ailes de poulet",
          description:
            "Ailes de poulet croustillantes, servies avec une sauce barbecue.",
          prices: [{ quantity: "5 Pièces", price: 40 }],
        },
        {
          name: "Gésier de poulet",
          description: "Gésiers de poulet épicés et grillés, tendres et juteux",
          prices: [{ quantity: "Dsiponible", price: 35 }],
        },
        {
          name: "Poulet pane",
          description:
            "Poulet enrobé de chapelure dorée, accompagné de légumes frais.",
          prices: [{ quantity: "Disponible", price: 60 }],
        },
        {
          name: "Poulet aux olives",
          description:
            "Poulet mijoté avec des olives et des herbes méditerranéennes.",
          prices: [{ quantity: "Disponible", price: 60 }],
        },
      ],
    },
    {
      categoryName: "Viandes de Chèvre et Agneau",
      dishes: [
        {
          name: "Viande de chèvre braisé",
          description: "Chèvre rôtie lentement, marinée aux épices africaines.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Ntaba mayo",
          description:
            "Viande de chèvre marinée dans une sauce mayonnaise à la congolaise.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Bouillon de viande de chèvre",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Viande d’agneau braisé",
          description:
            "Agneau grillé au charbon, à l'air fryer ou au barbecue électrique, relevé d'une marinade épicée.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Côtes d’agneau",
          description:
            "Côtes d'agneau grillées, tendres et parfumées, servies avec une sauce maison.",
          prices: [
            { quantity: "1kg", price: 250 },
            { quantity: "500g", price: 150 },
          ],
        },
      ],
    },
    {
      categoryName: "Viandes de Porc",
      dishes: [
        {
          name: "Porc frit",
          description:
            "Porc mariné et frit à la perfection, accompagné d'une sauce maison.",
          prices: [{ quantity: "Portion", price: 60 }],
        },
        {
          name: "Porc rôti",
          description:
            "Morceaux de porc cuits lentement au four, servis avec une sauce légère.",
          prices: [{ quantity: "Portion", price: 60 }],
        },
        {
          name: "Porc à la mayo",
          description:
            "Morceaux de porc dans une sauce crémeuse à la mayonnaise, inspirée de la cuisine congolaise.",
          prices: [{ quantity: "500g", price: 70 }],
        },
        {
          name: "Papillote de porc (Liboke ya Ngulu)",
          description:
            "Porc cuit à la vapeur dans des feuilles, mariné aux épices traditionnelles africaines.",
          prices: [{ quantity: "Portion", price: 120 }],
        },
        {
          name: "Porc sauté aux légumes",
          description:
            "Porc sauté avec des légumes croquants, parfumé aux épices douces.",
          prices: [{ quantity: "500g", price: 60 }],
        },
        {
          name: "Brochette de porc",
          description: "Brochettes de porc marinées et grillées.",
          prices: [{ quantity: "6 pièces", price: 50 }],
        },
        {
          name: "Côtes de porc",
          description:
            "Côtes de porc grillées, accompagnées d’une sauce au choix.",
          prices: [{ quantity: "Portion", price: 70 }],
        },
      ],
    },
    {
      categoryName: "Viandes de Bœuf",
      dishes: [
        {
          name: "Brochette de bœuf",
          description:
            "Bœuf grillé sur des brochettes, mariné dans des épices fines.",
          prices: [{ quantity: "5 pièces", price: 60 }],
        },
        {
          name: "Bœuf sauté aux légumes",
          description:
            "Bœuf sauté avec des légumes croquants et relevé d’une sauce épicée.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Bouillon de bœuf",
          description: "Bœuf mijoté lentement dans un bouillon parfumé.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Tripe",
          description: "Tripes de bœuf mijotées dans une sauce tomate épicée.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Rôti de bœuf",
          description:
            "Bœuf rôti lentement au four, accompagné d'une sauce au jus.",
          prices: [{ quantity: "500g", price: 120 }],
        },
        {
          name: "Rognons de bœuf",
          description:
            "Rognons à la sauce tomate ou sautés aux légumes, relevés d’épices africaines.",
          prices: [{ quantity: "500g", price: 50 }],
        },
        {
          name: "Foie de bœuf",
          description:
            "Foie de bœuf à la sauce tomate ou sauté aux légumes, tendre et savoureux.",
          prices: [{ quantity: "500g", price: 50 }],
        },
        {
          name: "Boulettes de bœuf",
          description:
            "Boulettes de bœuf juteuses, servies dans une sauce tomate épicée.",
          prices: [{ quantity: "6 pièces", price: 50 }],
        },
        {
          name: "Nids d’oiseau",
          description: "Bouchée de viande hachée et œuf, en forme de nid.",
          prices: [{ quantity: "3 pièces", price: 50 }],
        },
      ],
    },
    {
      categoryName: "Poissons",
      dishes: [
        {
          name: "Tilapia",
          description:
            "Tilapia grillé au feu de bois ou frit, servi avec une sauce citronnée.",
          prices: [{ quantity: "1 pièce", price: 80 }],
        },
        {
          name: "Thomson (Maquereaux)",
          description:
            "Poisson entier grillé au feu de bois ou frit, mariné aux herbes et épices.",
          prices: [{ quantity: "1 pièce", price: 70 }],
        },
        {
          name: "Poisson chat",
          description:
            "Poisson chat frit ou grillé, servi avec une sauce pimentée.",
          prices: [{ quantity: "1 pièce", price: 100 }],
        },
        {
          name: "Papillote de poisson chat",
          description:
            "Poisson chat cuit à la vapeur dans des feuilles, mariné aux épices traditionnelles africaines.",
          prices: [{ quantity: "1 pièce", price: 150 }],
        },
        {
          name: "Saumon grillé",
          description: "Filet de saumon grillé au feu de bois ou frit.",
          prices: [
            { quantity: "1 filet", price: 70 },
            { quantity: "Fillet entier", price: 250 },
          ],
        },
        {
          name: "Poisson salé",
          description:
            "Poisson salé et grillé, avec une sauce blanche, une sauce tomate ou une sauce à l’aubergine.",
          prices: [{ quantity: "1 pièce", price: 100 }],
        },
        {
          name: "Boulettes de poisson",
          description:
            "Boulettes de poisson épicées, croustillantes à l'extérieur, fondantes à l'intérieur.",
          prices: [{ quantity: "6 pièces", price: 50 }],
        },
      ],
    },
    {
      categoryName: "Légumes",
      dishes: [
        {
          name: "Feuilles de manioc (Pondu)",
          description: "",
          prices: [{ quantity: "1 portion", price: 50 }],
        },
        {
          name: "Gombo grillé",
          description: "Gombo grillé avec une sauce tomate.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Gombo gluant",
          description:
            "Gombo mijoté dans une sauce parfumée aux épices africaines avec des fruits de mer, la peau et la viande de bœuf.",
          prices: [{ quantity: "1 portion", price: 80 }],
        },
        {
          name: "Choux de Chine",
          description: "Choux sautés à la sauce tomate ou arachide.",
          prices: [{ quantity: "1 portion", price: 35 }],
        },
        {
          name: "Épinards simples",
          description:
            "Épinards frais sautés avec des oignons et des épices douces.",
          prices: [{ quantity: "1 portion", price: 23 }],
        },
        {
          name: "Épinards à la viande",
          description:
            "Épinards frais cuisinés avec des morceaux de bœuf tendre.",
          prices: [{ quantity: "1 portion", price: 50 }],
        },
        {
          name: "Aubergines simples",
          description:
            "Aubergines grillées, relevées d’une sauce blanche ou d’une sauce tomate maison.",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Haricots",
          description: "Haricots blancs mijotés relevés d’une sauce tomate.",
          prices: [{ quantity: "1 portion", price: 50 }],
        },
        {
          name: "Haricots à la viande de porc",
          description:
            "Haricots mijotés avec de la viande de porc, relevés d’une sauce tomate.",
          prices: [{ quantity: "1 portion", price: 80 }],
        },
        {
          name: "Haricots à la viande de bœuf",
          description:
            "Haricots mijotés avec de la viande de bœuf, relevés d’une sauce tomate.",
          prices: [{ quantity: "1 portion", price: 100 }],
        },
        {
          name: "Amarante",
          description:
            "Légumes verts africains sautés, riches en goût et nutrition, à la sauce tomate ou arachide.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
      ],
    },
    {
      categoryName: "Accompagnements",
      dishes: [
        {
          name: "Chikwang",
          description: "",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Pommes de terre sautées",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Frites de pommes de terre",
          description: "",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Purée de pomme de terre",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Fufu",
          description: "",
          prices: [{ quantity: "1 portion", price: 10 }],
        },
        {
          name: "Riz blanc",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Riz (rouge, jaune, grillé)",
          description:
            "Riz parfumé avec des légumes, une sauce tomate ou épicée.",
          prices: [{ quantity: "1 portion", price: 28 }],
        },
        {
          name: "Frites de manioc",
          description: "Manioc frit croustillant, servi avec une sauce épicée.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Banane plantain grillée ou vapeur",
          description:
            "Banane plantain grillée ou cuite à la vapeur, accompagnée de sauces maison.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
      ],
    },
    {
      categoryName: "Boissons",
      dishes: [
        {
          name: "Bissap",
          description:
            "Jus de fleurs d’hibiscus, rafraîchissant et légèrement sucré.",
          prices: [{ quantity: "1 verre", price: 15 }],
        },
        {
          name: "Jus de gingembre",
          description:
            "Boisson piquante et énergisante à base de gingembre frais.",
          prices: [{ quantity: "1 verre", price: 15 }],
        },
        {
          name: "Limonade",
          description: "Limonade maison, douce et acidulée.",
          prices: [{ quantity: "1 verre", price: 15 }],
        },
      ],
    },
    {
      categoryName: "Sauces",
      dishes: [
        {
          name: "Piment",
          description:
            "Sauce au piment aromatisée, parfaite pour accompagner vos plats.",
          prices: [{ quantity: "1 portion", price: 3 }],
        },
        {
          name: "Sauce tomate rouge",
          description: "Sauce tomate maison, légèrement épicée.",
          prices: [{ quantity: "1 portion", price: 12 }],
        },
        {
          name: "Sauce blanche à la crème fraîche",
          description:
            "Sauce onctueuse à base de crème fraîche, idéale pour les viandes.",
          prices: [{ quantity: "1 portion", price: 15 }],
        },
        {
          name: "Sauce fromagère",
          description:
            "Sauce au fromage fondant, parfaite pour accompagner les frites ou tacos.",
          prices: [{ quantity: "1 portion", price: 17 }],
        },
        {
          name: "Sauce au champignon",
          description:
            "Sauce crémeuse aux champignons frais, pour sublimer vos viandes.",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Sauce au chocolat (noir, blanc, au lait)",
          description:
            "Sauce chocolatée, idéale pour accompagner vos desserts.",
          prices: [{ quantity: "1 portion", price: 6 }],
        },
      ],
    },
    {
      categoryName: "Desserts et Amuse-gueules",
      dishes: [
        {
          name: "Nems (poulet, porc, crevettes, viande hachée, légumes)",
          description:
            "Délicieux rouleaux frits farcis au choix de viande ou légumes, croustillants à l'extérieur.",
          prices: [{ quantity: "7 pièces", price: 40 }],
        },
        {
          name: "Samusa",
          description:
            "Délicieux triangles feuilletés, garnis de viande hachée, de poulet, de porc ou de légumes.",
          prices: [{ quantity: "5 pièces", price: 35 }],
        },
        {
          name: "Beignet de crevettes",
          description:
            "Beignets croustillants de crevettes enrobées de pâte légère.",
          prices: [{ quantity: "7 pièces", price: 30 }],
        },
        {
          name: "Tacos",
          description:
            "Tacos farcis au choix de poulet, bœuf ou porc, servis avec une sauce au choix.",
          prices: [{ quantity: "1 portion", price: 28 }],
        },
        {
          name: "Croquant (croquette)",
          description:
            "Petites croquettes croustillantes, parfaites pour accompagner vos apéritifs.",
          prices: [{ quantity: "1 portion", price: 17 }],
        },
        {
          name: "Beignets",
          description: "Beignets dorés et moelleux, saupoudrés de sucre.",
          prices: [{ quantity: "15 pièces", price: 25 }],
        },
        {
          name: "Crêpes",
          description:
            "Crêpes fines et légères, servies avec du sucre ou du sirop.",
          prices: [{ quantity: "10 pièces", price: 25 }],
        },
        {
          name: "Pancakes",
          description:
            "Pancakes moelleux, légers et dorés, servis avec du sirop d’érable ou une sauce au choix.",
          prices: [{ quantity: "10 pièces", price: 30 }],
        },
        {
          name: "Gaufres",
          description:
            "Gaufres croustillantes à l'extérieur, moelleuses à l'intérieur, servies avec une sauce chocolat au choix.",
          prices: [{ quantity: "5 pièces", price: 25 }],
        },
        {
          name: "Cupcake",
          description: "Petit gâteau moelleux à la vanille ou au chocolat.",
          prices: [{ quantity: "5 pièces", price: 30 }],
        },
        {
          name: "Pain perdu sucré",
          description:
            "Pain brioché doré, fourré au chocolat et servi avec un sirop d'érable.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Pain perdu salé",
          description:
            "Pain brioché doré, enrobé d’œufs et servi avec une sauce au choix.",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
      ],
    },
    // Ajoute d'autres catégories ici...
  ],
};
