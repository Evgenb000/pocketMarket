import { ProductsService } from "@/services/products";
import { Product } from "@/types/products";
import { create } from "zustand";

interface ProductsState {
  // Состояние
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;

  // Действия
  fetchProducts: (
    options?: Parameters<typeof ProductsService.getProducts>[0]
  ) => Promise<void>;
  fetchMoreProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  clearProducts: () => void;
  clearError: () => void;
  setCurrentProduct: (product: Product | null) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  // Начальное состояние
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,

  // Загрузка списка товаров
  fetchProducts: async (options) => {
    set({ loading: true, error: null });

    try {
      const response = await ProductsService.getProducts({
        ...options,
        page: 1, // Сбрасываем на первую страницу
      });

      set({
        products: response.data,
        hasMore: response.hasMore,
        currentPage: 1,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
        loading: false,
      });
    }
  },

  // Загрузка дополнительных товаров (пагинация)
  fetchMoreProducts: async () => {
    const { currentPage, hasMore, loading } = get();

    if (!hasMore || loading) return;

    set({ loading: true });

    try {
      const response = await ProductsService.getProducts({
        page: currentPage + 1,
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

  // Загрузка конкретного товара
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

  // Очистка списка
  clearProducts: () => {
    set({ products: [], currentPage: 1, hasMore: true });
  },

  // Очистка ошибки
  clearError: () => {
    set({ error: null });
  },

  // Установка текущего товара
  setCurrentProduct: (product) => {
    set({ currentProduct: product });
  },
}));
