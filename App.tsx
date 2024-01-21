import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"; // import navigationcontainer
import Overview from "./app/screens/Overview"; // import list
import Details from "./app/screens/Details";
import Login from "./app/screens/Login";
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";

const Stack = createNativeStackNavigator(); // Create Stack const from external library (React Navigator)
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Overview" component={Overview} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user',user);
      setUser(user);

    });
  }, []);

  return (
    // Make the navigation of the app.
    // "List" and "Details" are screens I made in app\screens
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false}} />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
        )};

      </Stack.Navigator>
    </NavigationContainer>
  );
}
