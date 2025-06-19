import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../api/api';
import { endpoints } from '../../api/endpoints';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        try {
            return await apiCall({ url: endpoints.products.list() });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: (_, { getState }) => {
            const { products } = getState();
            // Only fetch if not already cached
            return !products.list || products.list.length === 0;
        },
    }
);

export const fetchProductDetail = createAsyncThunk(
    'products/fetchProductDetail',
    async (id, thunkAPI) => {
        try {
            return await apiCall({ url: endpoints.products.detail(id) });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: (id, { getState }) => {
            const { products } = getState();
            // Only fetch if not already cached or if id is different
            return !products.detail || products.detail.id !== Number(id);
        },
    }
);

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (q, thunkAPI) => {
        try {
            return await apiCall({ url: endpoints.products.search(q) });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: (q, { getState }) => {
            const { products } = getState();
            // Only fetch if query is not cached
            return !products.searchCache || !products.searchCache[q];
        },
    }
);

export const fetchProductsPaginated = createAsyncThunk(
    'products/fetchProductsPaginated',
    async (params, thunkAPI) => {
        try {
            return await apiCall({ url: endpoints.products.list(params) });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: (params, { getState }) => {
            const { products } = getState();
            const key = JSON.stringify(params);
            return !products.paginatedCache || !products.paginatedCache[key];
        },
    }
);

export const fetchProductsSorted = createAsyncThunk(
    'products/fetchProductsSorted',
    async (params, thunkAPI) => {
        try {
            return await apiCall({ url: endpoints.products.list(params) });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: (params, { getState }) => {
            const { products } = getState();
            const key = JSON.stringify(params);
            return !products.sortedCache || !products.sortedCache[key];
        },
    }
);

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async (_, thunkAPI) => {
        try {
            return await apiCall({ url: endpoints.products.categories() });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: (_, { getState }) => {
            const { products } = getState();
            return !products.categories || products.categories.length === 0;
        },
    }
);

export const fetchCategoryList = createAsyncThunk(
    'products/fetchCategoryList',
    async (_, thunkAPI) => {
        try {
            return await apiCall({ url: endpoints.products.categoryList() });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: (_, { getState }) => {
            const { products } = getState();
            return !products.categoryList || products.categoryList.length === 0;
        },
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (cat, thunkAPI) => {
        try {
            return await apiCall({ url: endpoints.products.byCategory(cat) });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: (cat, { getState }) => {
            const { products } = getState();
            return !products.categoryCache || !products.categoryCache[cat];
        },
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        detail: null,
        loading: false,
        error: null,
        searchCache: {},
        searchResults: [],
        paginatedCache: {},
        sortedCache: {},
        categories: [],
        categoryList: [],
        categoryCache: {},
    },
    reducers: {
        clearProductList(state) {
            state.list = [];
        },
        clearProductDetail(state) {
            state.detail = null;
        },
        clearSearchResults(state) {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.products || [];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch products';
            })
            .addCase(fetchProductDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.detail = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch product detail';
            })
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload.products || [];
                if (action.meta && action.meta.arg) {
                    state.searchCache[action.meta.arg] = action.payload.products || [];
                }
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to search products';
            })
            .addCase(fetchProductsPaginated.fulfilled, (state, action) => {
                const key = JSON.stringify(action.meta.arg);
                state.paginatedCache[key] = action.payload.products || [];
            })
            .addCase(fetchProductsSorted.fulfilled, (state, action) => {
                const key = JSON.stringify(action.meta.arg);
                state.sortedCache[key] = action.payload.products || [];
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload || [];
            })
            .addCase(fetchCategoryList.fulfilled, (state, action) => {
                state.categoryList = action.payload || [];
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                const cat = action.meta.arg;
                state.categoryCache[cat] = action.payload.products || [];
            });
    },
});

export const { clearProductList, clearProductDetail, clearSearchResults } = productsSlice.actions;
export default productsSlice.reducer;
