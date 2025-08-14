import { supabase } from "@/supabase/supabase";
import { ProductInsert, ProductUpdate } from "@/types/products";

export class ProductsService {
  static async getProducts(options?: {
    page?: number;
    limit?: number;
    categoryId?: string;
    searchQuery?: string;
    sortBy?: "name" | "price" | "created_at";
    sortOrder?: "asc" | "desc";
  }) {
    const {
      page = 1,
      limit = 20,
      categoryId,
      searchQuery,
      sortBy = "created_at",
      sortOrder = "desc",
    } = options || {};

    let query = supabase
      .from("products")
      .select(
        `
        *,
        categories:category_id (
          id,
          name,
          slug
        ),
        product_tags (
          tags (
            id,
            name,
            color
          )
        )
      `
      )
      .eq("is_available", true);

    // Фильтрация по категории
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    // Поиск по названию и описанию
    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
      );
    }

    // Сортировка
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    // Пагинация
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Ошибка загрузки товаров: ${error.message}`);
    }

    return {
      data: data || [],
      count: count || 0,
      hasMore: (count || 0) > page * limit,
    };
  }

  // Получить товар по ID
  static async getProductById(id: string) {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories:category_id (
          id,
          name,
          slug,
          description
        ),
        product_tags (
          tags (
            id,
            name,
            color
          )
        )
      `
      )
      .eq("id", id)
      .eq("is_available", true)
      .single();

    if (error) {
      throw new Error(`Ошибка загрузки товара: ${error.message}`);
    }

    return data;
  }

  // Создать новый товар (для админки)
  static async createProduct(product: ProductInsert) {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();

    if (error) {
      throw new Error(`Ошибка создания товара: ${error.message}`);
    }

    return data;
  }

  // Обновить товар
  static async updateProduct(id: string, updates: ProductUpdate) {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Ошибка обновления товара: ${error.message}`);
    }

    return data;
  }

  // Получить похожие товары
  static async getSimilarProducts(
    productId: string,
    categoryId: string,
    limit = 4
  ) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", categoryId)
      .eq("is_available", true)
      .neq("id", productId)
      .limit(limit);

    if (error) {
      throw new Error(`Ошибка загрузки похожих товаров: ${error.message}`);
    }

    return data || [];
  }

  // Получить товары со скидкой (если есть поле discount)
  static async getDiscountedProducts(limit = 10) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .not("meta_data->discount", "is", null)
      .eq("is_available", true)
      .limit(limit);

    if (error) {
      throw new Error(`Ошибка загрузки товаров со скидкой: ${error.message}`);
    }

    return data || [];
  }
}
