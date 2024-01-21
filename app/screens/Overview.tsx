import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native"; // generate with rnfe
import React, { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

export interface Time {
  title: string;
  done: boolean;
  id: string;
}

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Overview = ({ navigation }: RouterProps) => {
  const [times, setTimes] = useState<Time[]>([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const timeRef = collection(FIRESTORE_DB, "times");

    const subscriber = onSnapshot(timeRef, {
      next: (snapshot) => {
        console.log("UPDATED");

        const times: Time[] = [];
        snapshot.docs.forEach((doc) => {
          times.push({
            id: doc.id,
            ...doc.data(),
          } as Time);
        });
        setTimes(times);
      },
    });

    return () => subscriber();
  }, []);

  const addTime = async () => {
    console.log("ADD");
    try {
      const doc = addDoc(collection(FIRESTORE_DB, "times"), {
        // ERROR
        title: time,
        done: true,
      });
    } catch (err) {
      console.error("addDoc failed. reason :", err);
      setTime("");
    }
  };

  const renderTime = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `times/${item.id}`);

    const toggleDone = async () => {
      console.log("change") 
      
      try {
        updateDoc(ref, {done: !item.done});
      } catch (err) {
        console.error("updateDoc failed. reason :", err);
      }
      
    }; // change time from bad to good posture

    const deleteItem = async () => {   
      try {
        deleteDoc(ref);
      } catch (err) {
        console.error("deleteDoc failed. reason :", err);
      }
    };

    return (
      <View style={styles.timeContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.time}>
          {item.done && (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
          {!item.done && (
            <AntDesign name="closecircleo" size={24} color="red" />
          )}
          <Text style={styles.timeText}>{item.title}</Text>
        </TouchableOpacity>
        <AntDesign name="delete" size={24} color="black" onPress={deleteItem} />
      </View>
    );
  };

  // declared below const styles ...

  return (
    <View style={styles.container}>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new time"
          onChangeText={(text: string) => setTime(text)}
          value={time}
        />
        <Button onPress={addTime} title="Add Time" disabled={time === ""} />
      </View>
      {times.length > 0 && (
        <View>
          <FlatList
            data={times}
            renderItem={(item) => renderTime(item)}
            keyExtractor={(time: Time) => time.id}
          />
        </View>
      )}
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff", //#1F3B4D
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 4,
  },
  timeText: {
    flex: 1,
    paddingHorizontal: 10,
  },
  time: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
