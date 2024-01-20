import { View, Text, Button } from "react-native"; // generate with rnfe
import React from "react";

const List = ({ navigation }: any) => {
  return (
    <View>
      <Text>Overview</Text>
      <Button
        onPress={() => navigation.navigate("Details")}
        title="Details"
      ></Button>
    </View>
  );
};

export default List;
