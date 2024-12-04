import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../config";
import { testimonial } from "../interface/testimonial";

// Création de l'API avec RTK Query pour les témoignages
export const testimonialApi = createApi({
  reducerPath: "testimonialApi",
  baseQuery: fetchBaseQuery({ baseUrl: API.defaults.baseURL }),
  endpoints: (builder) => ({
    getTestimonials: builder.query<testimonial[], void>({
      query: () => "/testimonials",
    }),
  }),
});

export const {
  useGetTestimonialsQuery, // Hook généré pour obtenir les témoignages
} = testimonialApi;

// Intégration dans le store (à ajouter dans le slice de store)
export default testimonialApi.reducer;
