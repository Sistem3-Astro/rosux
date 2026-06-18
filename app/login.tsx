import { useState } from "react";
import { router } from "expo-router";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert,} from "react-native";

export default function Login() {
  const [usuario, setUsuario] = useState("saul");
  const [password, setPassword] = useState("123");

  const iniciarSesion = () => { 
    if (!usuario  || !password) {
      Alert.alert("Error", "Ingresa la clave y contraseña");
      return;
    }
    if (usuario !== "saul" || password !== "123") {
      Alert.alert("Error", "Datos incorrectos");
      return;
    }

    Alert.alert("Éxito", "Login correcto"); 
    router.replace("/(tabs)/formu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ROSUX</Text>
      <Text style={styles.subtitulo}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario SAFI"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={iniciarSesion}
      >
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F5F7FA",
  },
  titulo1: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0D6337",
  },
   titulo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E3A8A",
  },
  subtitulo: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#64748B",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  boton: {
    backgroundColor: "#2563EB",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBoton: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});