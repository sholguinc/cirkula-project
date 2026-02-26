import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";

import StoresScreen from './screens/StoresScreen';
import StoreDetailScreen from "./screens/StoreDetailScreen"; 

import { Colors, Fonts, FontSizes } from './styles/theme';

export type RootStackParamList = {
  Home: undefined;
  StoreDetail: { storeId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.secondary,
  headerTitleStyle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.title,
  },
  headerTitleAlign: 'center',
  headerShadowVisible: false,
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen 
          name="Home" 
          component={StoresScreen} 
          options={{ title: "Tiendas" }}
        />          
        <Stack.Screen 
          name="StoreDetail" 
          component={StoreDetailScreen} 
          options={{ title: "Detalle" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

