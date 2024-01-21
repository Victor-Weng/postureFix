import { View, Text, Button, StyleSheet, TextInput } from "react-native"; // generate with rnfe
import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

const Overview = ({ navigation }: any) => {
  const [times, setTimes] = useState<any[]>([]);
  const [time, setTime] = useState('');

  useEffect(() => {}, []);

  const addTime = async () => {
    console.log("ADD");
    try {
      const doc = addDoc(collection(FIRESTORE_DB, "Times"), { // ERROR
        title: "I am a test",
        done: false
      });
    } catch (err) {
      console.error("addDoc failed. reason :", err);
    }
  };
  // declared below const styes ...
  return (
    <View style={styes.container}> 
      <View style={styes.form}>
        <Button onPress={() => addTime()} title="Add times" />
        <TextInput style={styes.input} placeholder='Add new time' 
        onChangeText={(text: string) => setTime(text)} value={time} />
        <Button onPress={addTime} title="Add Time" disabled={time === ''} />
      </View>
    </View>
  );
};

export default Overview;

const styes = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff', //#1F3B4D

  }
})