import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Splash() { 
    return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.subtitulo}>SACIMEX</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D6337",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#FFF",
    fontSize: 24,
    marginTop: 10,
  },
});