import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
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
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            horizontal
            renderItem={({ item: i }) => (
              <View className="bg-light rounded-full w-20 h-20">
                <Text className="text-center text-blue">{i}</Text>
              </View>
            )}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 12 }}
            showsHorizontalScrollIndicator={false}
          ></FlatList>
        </View>
        <Products></Products>
      </ScrollView>
    </View>
  );
}
