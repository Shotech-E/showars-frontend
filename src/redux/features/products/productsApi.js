import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: "include",
    }),

    tagTypes: ["Products"],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({ category, colour, minPrice, maxPrice, page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    category: category || "",
                    colour: colour || "",
                    minPrice: minPrice || "",
                    maxPrice: maxPrice || "",
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
                return `/?${queryParams}`;
            },
            providesTags: ["Products"]
        }),

        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),

        AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
                credentials: "include"
            }),
            invalidatesTags: ["Products"],
        }),

        fetchRelatedProducts: builder.query({
            query: (id) => `/related-products/${id}`,
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...product }) => ({
                url: `/update-product/${id}`,
                method: "PATCH",
                body: product,
                credentials: "include"
            }),
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: (result, error, id) => [{ type: "Products", id }],
        }),
    })
})

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useFetchRelatedProductsQuery
} = productsApi

export default productsApi