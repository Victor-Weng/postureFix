import { View, Text, Button } from "react-native"; // generate with rnfe
import React, { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

/*
      <Button onPress={() => navigation.navigate("Details")}
      title="Details">

      </Button>
  */

const Overview = ({ navigation }: any) => {
  useEffect(() => {}, []);

  const addPositions = async () => {
    console.log("ADD");
    try {
      const doc = addDoc(collection(FIRESTORE_DB, "Positions"), {
        title: "I am a test",
        done: false
      });
    } catch (err) {
      console.error("addDoc failed. reason :", err);
    }
  };

  return (
    <View>
      <Button onPress={() => addPositions()} title="Add positions" />
    </View>
  );
};

export default Overview;
