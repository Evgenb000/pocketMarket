import { ProductsService } from "@/services/products";
import { Product } from "@/types/products";
import { create } from "zustand";

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  currentCategoryFilter: string | null; // Добавляем отслеживание текущего фильтра

  fetchProducts: (
    options?: Parameters<typeof ProductsService.getProducts>[0]
  ) => Promise<void>;
  fetchMoreProducts: (categoryId?: string) => Promise<void>; // Обновляем для учета категории
  fetchProductById: (id: string) => Promise<void>;
  clearProducts: () => void;
  clearError: () => void;
  setCurrentProduct: (product: Product | null) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  currentCategoryFilter: null,

  fetchProducts: async (options) => {
    set({ loading: true, error: null });

    try {
      const response = await ProductsService.getProducts({
        ...options,
        page: 1,
      });

      set({
        products: response.data,
        hasMore: response.hasMore,
        currentPage: 1,
        currentCategoryFilter: options?.categoryId || null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
        loading: false,
      });
    }
  },

  fetchMoreProducts: async (categoryId) => {
    const { currentPage, hasMore, loading, currentCategoryFilter } = get();

    if (!hasMore || loading) return;

    set({ loading: true });

    try {
      const response = await ProductsService.getProducts({
        page: currentPage + 1,
        categoryId: categoryId || currentCategoryFilter || undefined,
      });

      set((state) => ({
        products: [...state.products, ...response.data],
        hasMore: response.hasMore,
        currentPage: currentPage + 1,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Ошибка загрузки",
        loading: false,
      });
    }
  },

  fetchProductById: async (id: string) => {
    set({ loading: true, error: null, currentProduct: null });

    try {
      const product = await ProductsService.getProductById(id);
      set({ currentProduct: product, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Товар не найден",
        loading: false,
      });
    }
  },

  clearProducts: () => {
    set({
      products: [],
      currentPage: 1,
      hasMore: true,
      currentCategoryFilter: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },

  setCurrentProduct: (product) => {
    set({ currentProduct: product });
  },
}));
