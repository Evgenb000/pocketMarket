import { useCategoriesStore } from "@/store/categories";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CategoryCard from "./categoryCard";

export default function Categories() {
  const {
    categories,
    loading,
    error,
    currentCategory,
    setCurrentCategory,
    fetchCategories,
    resetToAllCategories,
  } = useCategoriesStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !categories) {
    return (
      <View>
        <Text>{error || "Категории не найдены"}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      renderItem={({ item, index }) => {
        return (
          <CategoryCard
            key={index}
            item={item}
            setCurrentCategory={setCurrentCategory}
            isActive={currentCategory?.id === item?.id}
            resetToAllCategories={resetToAllCategories}
          />
        );
      }}
      keyExtractor={(item, index) =>
        index === 0 ? "all" : categories[index].id.toString()
      }
      contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
}
