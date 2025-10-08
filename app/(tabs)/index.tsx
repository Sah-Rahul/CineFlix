import { View, Text, Button } from "react-native";
import { Link, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Home Screen</Text>

      {/* Navigate using Link */}
      <Link href="/about">Go to About Page</Link>

      {/* OR programmatically */}
      <Button title="Open Modal" onPress={() => router.push("/modal")} />
    </View>
  );
}
