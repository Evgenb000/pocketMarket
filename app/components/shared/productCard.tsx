import React from "react";
import { Text, View } from "react-native";

const ProductCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="bg-light rounded-full w-[45%] h-60">
      <Text>{children}</Text>
    </View>
  );
};

export default ProductCard;
