import { colors } from "@/const/colors";
import { tabs } from "@/const/tabs";
import { Tabs } from "expo-router";
import { House, ShoppingCart, User } from "lucide-react-native";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        },
        tabBarStyle: {
          backgroundColor: colors.light,
          borderRadius: 48,
          marginHorizontal: 24,
          marginBottom: 36,
          height: 48,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.light,
        },
      }}
    >
      {tabs.map((tab) => {
        return (
          <Tabs.Screen
            key={tab}
            name={tab}
            options={{
              title: tab,
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <View className="flex flex-row gap-2 bg-red mt-3 w-36 h-14 justify-center items-center content-center rounded-full">
                    {tab === "home" ? (
                      <House color={colors.light} />
                    ) : tab === "cart" ? (
                      <ShoppingCart color={colors.light} />
                    ) : (
                      tab === "profile" && <User color={colors.light} />
                    )}
                    <Text className="text-light">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                  </View>
                ) : (
                  <View className="w-36 h-12 justify-center mt-3 items-center rounded-full">
                    <Text className="text-blue-slate">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                  </View>
                ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
