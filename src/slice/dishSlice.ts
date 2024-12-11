import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../config";
import { dishes } from "../interface/dishes";

// Interface pour les catégories avec leurs plats
interface CategoryWithDishes {
  category: {
    _id: string;
    name: string;
  };
  dishes: dishes[];
}
const customFetchBase = fetchBaseQuery({
  baseUrl: API.defaults.baseURL,
  prepareHeaders: (headers) => {
    const language = localStorage.getItem("i18nextLng") || "fr";
    headers.set("lang", language);
    return headers;
  },
});



export const dishesApi = createApi({
  reducerPath: "dishesApi",
  baseQuery: customFetchBase,

  endpoints: (builder) => ({
    // Récupère tous les plats avec transformResponse pour renvoyer directement le tableau 'dishes'
    getDishes: builder.query<dishes[], void>({
      query: () => "/dishes",
      transformResponse: (response: { dishes: dishes[] }) => response.dishes, // Récupère directement le tableau 'dishes'
    }),

    // Récupère un plat spécifique par son ID (sans transformation de réponse)
    fetchSingleDish: builder.query<dishes, string>({
      query: (id) => `/dishes/${id}`,
    }),

    // Recherche de plats par terme de recherche (sans transformation de réponse)
    searchDish: builder.query<dishes[], string>({
      query: (searchTerm) => `/dishes/search?search=${searchTerm}`,
      transformResponse: (response: { dishes?: dishes[] }, meta) => {
        console.log(meta)
        if (meta?.response?.status === 404) {
          return []; // Retourner un tableau vide en cas de 404
        }
        console.log(response)
        return response as dishes[] || [];
      },
    }),

    // Récupère les menus par catégories (sans transformation de réponse)
    fetchMenuByCategories: builder.query<CategoryWithDishes[], void>({
      query: () => "/dishes/getMenuCategories",
    }),

    // Récupère les plats par une catégorie spécifique (sans transformation de réponse)
    fetchMenuByCategory: builder.query<CategoryWithDishes[], string>({
      query: (id) => `/dishes/getByCategories/${id}`,
    }),
  }),
});

export const {
  useGetDishesQuery,
  useFetchSingleDishQuery,
  useSearchDishQuery,
  useFetchMenuByCategoriesQuery,
  useFetchMenuByCategoryQuery,
} = dishesApi;
