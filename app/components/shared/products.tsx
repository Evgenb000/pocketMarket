import React from "react";
import { FlatList, View } from "react-native";
import ProductCard from "./productCard";

const Products = () => {
  return (
    <View className="mt-4">
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={({ item: i }) => <ProductCard>{i}</ProductCard>}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 8,
          gap: 8,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginHorizontal: 8,
        }}
      ></FlatList>
    </View>
  );
};

export default Products;
