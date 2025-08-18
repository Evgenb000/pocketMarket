import { useProductsStore } from "@/store/products";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import ProductCard from "./productCard";

export default function Products() {
  const { products, loading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !products) {
    return (
      <View>
        <Text>{error || "Товар не найден"}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="px-4 py-6"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item}></ProductCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      ></FlatList>
    </ScrollView>
  );
}
