import React from "react";
import { ScrollView, Text, View } from "react-native";
import Categories from "../components/shared/categories";
import Products from "../components/shared/products";
import Searchbar from "../components/ui/searchbar";

export default function Home() {
  return (
    <View className="flex-1 bg-blue">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="pt-12 pb-6">
          <Text className="text-2xl text-center text-light">Pocket Market</Text>
        </View>
        <Searchbar></Searchbar>
        <View className="mt-4">
          <Categories></Categories>
        </View>
        <Products></Products>
      </ScrollView>
    </View>
  );
}
