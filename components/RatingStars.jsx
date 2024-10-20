import React from "react";
import { View, Image, StyleSheet } from "react-native";
import icons from "../constants/icons";

export default function RatingStars({ rating, size }) {
  const totalStars = 5;

  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: totalStars }, (v, i) => (
        <Image
          key={i}
          source={icons.star}
          style={{
            width: size || 30,
            height: size || 30,
            marginHorizontal: 2,
          }}
          tintColor={i < rating ? "#FFD700" : "#ccc"}
        />
      ))}
    </View>
  );
}
