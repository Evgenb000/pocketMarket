import { supabase } from "@/supabase/supabase";

export class CategoriesService {
  static async getCategories(options?: {
    page?: number;
    limit?: number;
    searchQuery?: string;
    sortBy?: "name" | "created_at";
    sortOrder?: "asc" | "desc";
  }) {
    const {
      page = 1,
      limit = 20,
      searchQuery,
      sortBy = "created_at",
      sortOrder = "desc",
    } = options || {};

    let query = supabase.from("categories").select("*").eq("is_active", true);

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
      );
    }

    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Ошибка загрузки категорий: ${error.message}`);
    }

    return {
      data: data || [],
      count: count || 0,
      hasMore: (count || 0) > page * limit,
    };
  }

  // static async getCategoryById(id: string) {
  //   const { data, error } = await supabase
  //     .from("categories")
  //     .select("*")
  //     .eq("id", id)
  //     .eq("is_active", true)
  //     .single();

  //   if (error) {
  //     throw new Error(`Ошибка загрузки категории: ${error.message}`);
  //   }

  //   return data;
  // }
}
