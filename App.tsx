import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"; // import navigationcontainer
import Overview from "./app/screens/Overview"; // import list
import Details from "./app/screens/Details";
import Login from "./app/screens/Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator(); // Create Stack const from external library (React Navigator)

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged
  })

  return (
    // Make the navigation of the app.
    // "List" and "Details" are screens I made in app\screens
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Overview" component={Overview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
