import { colors } from "@/const/colors";
import { useSearchStore } from "@/store/searchValue";
import { Search, X } from "lucide-react-native";
import React from "react";
import { TextInput, View } from "react-native";

const Searchbar = () => {
  const { searchValue, setSearchValue } = useSearchStore();

  return (
    <View className="px-4 relative">
      <TextInput
        className="bg-light rounded-full px-12"
        placeholder="Search..."
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <Search
        color={colors.slate}
        style={{ position: "absolute", left: 24, top: 8 }}
      ></Search>
      {searchValue && (
        <X
          color={colors.slate}
          size={16}
          style={{ position: "absolute", right: 28, top: 12 }}
          onPress={() => setSearchValue("")}
        ></X>
      )}
    </View>
  );
};

export default Searchbar;
