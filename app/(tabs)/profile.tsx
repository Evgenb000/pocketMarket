import { useProductsStore } from "@/store/products";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const { products, loading, error, fetchProducts } = useProductsStore();

  console.log(products);

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
    <ScrollView>
      {products[0].image_url && (
        <Image source={{ uri: products[0].image_url }} resizeMode="contain" />
      )}

      <View>
        <Text>{products[0].name}</Text>

        <Text>{products[0].price.toLocaleString("ru-RU")} ₽</Text>

        {products[0].description && <Text>{products[0].description}</Text>}

        <View>
          <Text>Характеристики:</Text>
          <Text>Артикул: {products[0].sku || "Не указан"}</Text>
          <Text>В наличии: {products[0].stock_quantity} шт.</Text>
          {products[0].weight && <Text>Вес: {products[0].weight} г</Text>}
        </View>

        <TouchableOpacity>
          <Text>Добавить в корзину</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
