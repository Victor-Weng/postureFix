import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"; // generate with rnfe
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit"; // for charts
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons";

export interface Time {
  count: number;
  bad: boolean;
  id: string;
}

const Overview = ({ navigation }: any) => {
  const [times, setTimes] = useState<Time[]>([]);
  const [time, setTime] = useState("");

  let badTimes = times.filter(time => time.bad).length;
  let dataValue;
  if (badTimes > 1) {
    dataValue = times.filter(time => time.bad).map(time => time.count); // replace 'count' with the actual numeric property of your Time type
  } else {
    dataValue = [5, 0]; // placeholder data
  }

  const line = {
    labels: [
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
    ],
    datasets: [
      {
        data: dataValue,
        strokeWidth: 5,
      },
    ],
  };

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
        count: time,
        bad: true,
      });
    } catch (err) {
      console.error("addDoc failed. reason :", err);
      setTime("");
    }
  };

  const renderTime = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `times/${item.id}`);

    const toggleDone = async () => {
      console.log("change");

      try {
        updateDoc(ref, { bad: !item.bad });
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
          {item.bad && (
            <AntDesign name="closecircleo" size={24} color="red" />
          )}
          {!item.bad && (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
          <Text style={styles.timeText}>{item.count}</Text>
        </TouchableOpacity>
        <AntDesign name="delete" size={24} color="black" onPress={deleteItem} />
      </View>
    );
  };

  // declared below const styles ...

  return (
    <View style={styles.container}>
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
          <View>
            <Text>Progress Chart</Text>
            <LineChart
              data={line}
              width={(Dimensions.get("window").width)*0.90} // from react-native
              height={220}
              yAxisLabel={"#: "}
              chartConfig={{
                backgroundColor: "#5dbb9f",
                backgroundGradientFrom: "#5dbb9f",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                marginHorizontal: 0,
                borderRadius: 12,
              }}
            />
          </View>
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
    flexDirection: "row",
    alignItems: "center",
  },
  chart: {
    flex: 11,
    padding: 10,
  }
});
