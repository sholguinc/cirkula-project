
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from './screens/HomeScreen';
import StoreDetailScreen from "./screens/StoreDetailScreen"; 

export type RootStackParamList = {
  Home: undefined;
  StoreDetail: { storeId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: "Stores" }}
          />
          <Stack.Screen 
            name="StoreDetail" 
            component={StoreDetailScreen} 
            options={{ title: "Store Detail" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
