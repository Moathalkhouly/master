import { LogBox, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider, extendTheme } from "native-base";

//Navigators
import Main from "./Navigators/Main";

//Screens
import Header from "./Shared/Header";

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';


LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Header />
        <Main />
      </NativeBaseProvider>
    </NavigationContainer>
    </Provider>
  );
}

const newColorTheme = {
  brand: {
    900: "#5B8DF6",
    800: "#ffffff",
    700: "#cccccc",
  },
};

const theme = extendTheme({
  colors: newColorTheme,
});
