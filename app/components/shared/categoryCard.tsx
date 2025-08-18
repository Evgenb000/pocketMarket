import { Category } from "@/types/products";
import { clsx } from "clsx";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: Category;
  setCurrentCategory: (category: Category | null) => void;
  isActive?: boolean;
  resetToAllCategories: () => void;
}

const CategoryCard: React.FC<Props> = ({
  item,
  setCurrentCategory,
  isActive = false,
  resetToAllCategories,
}) => {
  const handlePress = () => {
    if (isActive) {
      setCurrentCategory(null);
      resetToAllCategories();
    } else {
      setCurrentCategory(item);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        className={clsx(
          "bg-slate shadow-md rounded-xl items-center w-fit h-fit p-2",
          isActive ? "bg-slate" : "bg-slate/50"
        )}
      >
        {item.image_url && (
          <View className="bg-white/40">
            <Image
              src={item.image_url}
              alt={item.name}
              width={40}
              height={40}
              style={{
                objectFit: "contain",
              }}
            />
          </View>
        )}

        <Text className="text-sm text-center">{item.name}</Text>

        {/* {item.description && (
        <Text className="px-2 mt-2 flex-1">{item.description}</Text>
      )} */}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
