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
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface Time {
  title: string;
  done: boolean;
  id: string;
}
const Overview = ({ navigation }: any) => {
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
        title: "time",
        done: false,
      });
    } catch (err) {
      console.error("addDoc failed. reason :", err);
      setTime("");
    }
  };

  //{!item.done && <Ionicons name="md-checkmark-circle"/>}

  const renderTime = ({ item }: any) => {
    const toggleDone = async () => {};

    const deleteItem = async () => {};

    return (
      <View>
        <TouchableOpacity onPress={toggleDone}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // declared below const styes ...

  return (
    <View style={styes.container}>
      <View style={styes.form}>
        <TextInput
          style={styes.input}
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

const styes = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
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
});
