import { Product } from "@/types/products";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: Product;
}

const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <View className="mb-4 w-[180px] bg-slate shadow-md rounded-md items-center">
      <View className="flex justify-center items-center content-center h-16 px-2">
        <Text className="text-lg font-bold text-center overflow-clip line-clamp-2">
          {item.name}
        </Text>
      </View>

      {item.image_url && (
        <View className="bg-white/40">
          <Image
            src={item.image_url}
            alt={item.name}
            width={180}
            height={180}
            style={{
              objectFit: "contain",
            }}
          />
        </View>
      )}

      {item.description && (
        <Text className="px-2 mt-2 flex-1">{item.description}</Text>
      )}

      <TouchableOpacity className="mt-4">
        <Text className="text-light text-xl h-10">
          Add ${(item.price / 100).toLocaleString("en-US")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
