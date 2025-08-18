import { useProductsStore } from "@/store/products";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
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
    <ScrollView className="px-4 py-6">
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-lg font-bold">{item.name}</Text>

            {item.image_url && (
              <View className="mt-2">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={160}
                  height={240}
                  style={{ objectFit: "contain" }}
                />
              </View>
            )}

            <Text className="text-2xl">
              {(item.price / 100).toLocaleString("en-US")} $
            </Text>

            {item.description && (
              <Text className="mt-2">{item.description}</Text>
            )}

            <View className="mt-4">
              <Text className="font-bold">Характеристики:</Text>
              <Text className="mt-2">Артикул: {item.sku || "Не указан"}</Text>
              <Text className="mt-2">В наличии: {item.stock_quantity} шт.</Text>
              {item.weight && (
                <Text className="mt-2">Вес: {item.weight} г</Text>
              )}
            </View>

            <TouchableOpacity className="mt-4">
              <Text className="text-blue-500">Добавить в корзину</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      ></FlatList>
    </ScrollView>
  );
}
