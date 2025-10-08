import React from "react";
import { View, Text, Button } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 18 }}>Home</Text>

      <Link href="/about">Go to About (Link) — About par jao</Link>

      <Button
        title="Go to About (push) — Button"
        onPress={() => router.push("/about")}
      />
    </View>
  );
}
