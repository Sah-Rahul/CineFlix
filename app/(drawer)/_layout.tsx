import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from "expo-router/drawer"

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <Drawer>
         <Drawer.Screen
           name="index"
           options={{
             drawerLabel: "Home",
             title: "Home",
           }}
         />
         <Drawer.Screen
           name="explore"
           options={{
             drawerLabel: "Explore",
             title: "Explore",
           }}
         />
         <Drawer.Screen
           name="contact"
           options={{
             drawerLabel: "Contact",
             title: "Contact",
           }}
         />
       </Drawer>
    </GestureHandlerRootView>
  )
}