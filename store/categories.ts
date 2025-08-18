import { CategoriesService } from "@/services/categories";
import { Category } from "@/types/products";
import { create } from "zustand";

interface CategoriesState {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;

  fetchCategories: (
    options?: Parameters<typeof CategoriesService.getCategories>[0]
  ) => Promise<void>;
  fetchMoreCategories: () => Promise<void>;
  clearCategories: () => void;
  clearError: () => void;
  setCurrentCategory: (category: Category | null) => void;
  resetToAllCategories: () => void; // Новый метод для сброса фильтра
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,

  fetchCategories: async (options) => {
    set({ loading: true, error: null });

    try {
      const response = await CategoriesService.getCategories({
        ...options,
        page: 1,
      });

      set({
        categories: response.data as unknown as Category[],
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

  fetchMoreCategories: async () => {
    const { currentPage, hasMore, loading } = get();

    if (!hasMore || loading) return;

    set({ loading: true });

    try {
      const response = await CategoriesService.getCategories({
        page: currentPage + 1,
      });

      set((state) => ({
        categories: [
          ...state.categories,
          ...(response.data as unknown as Category[]),
        ],
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

  clearCategories: () => {
    set({ categories: [], currentPage: 1, hasMore: true });
  },

  clearError: () => {
    set({ error: null });
  },

  setCurrentCategory: (category) => {
    set({ currentCategory: category });
  },

  resetToAllCategories: () => {
    set({ currentCategory: null });
  },
}));
