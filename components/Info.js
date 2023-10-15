import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const Info = ({ title, value, icon }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 51,
          height: 51,
          resizeMode: "contain",
        }}
        source={{
          uri: icon,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.textInfo}>{title}</Text>
        <Text style={styles.textInfo}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    marginTop: 20,
    flex: 0,
    alignItems: "center",
  },
  textInfo: {
    fontSize: 16,
    color: "#444",
    fontWeight: "700",
  },
});

export default Info;
