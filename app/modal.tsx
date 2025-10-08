import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ModalPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}> Modal Page</Text>
      <Button title="Close Modal" onPress={() => router.back()} />
    </View>
  );
}
