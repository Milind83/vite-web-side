// All API endpoints and methods
export const API_BASE_URL = "https://dummyjson.com";

export const endpoints = {
    products: {
        list: (params = {}) => {
            // Support limit, skip, select, sortBy, order as query params
            let url = `/products`;
            const query = [];
            if (params.limit) query.push(`limit=${params.limit}`);
            if (params.skip) query.push(`skip=${params.skip}`);
            if (params.select) query.push(`select=${params.select}`);
            if (params.sortBy) query.push(`sortBy=${params.sortBy}`);
            if (params.order) query.push(`order=${params.order}`);
            if (query.length) url += `?${query.join("&")}`;
            return url;
        },
        detail: (id) => `/products/${id}`,
        create: () => `/products`,
        update: (id) => `/products/${id}`,
        delete: (id) => `/products/${id}`,
        search: (q) => `/products/search?q=${encodeURIComponent(q)}`,
        categories: () => `/products/categories`,
        categoryList: () => `/products/category-list`,
        byCategory: (cat) => `/products/category/${encodeURIComponent(cat)}`,
    },
    // Add more endpoints as needed
};
