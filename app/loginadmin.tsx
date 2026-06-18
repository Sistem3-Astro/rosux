import { db } from "@/database/usuarios";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [clave, setClave] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const iniciarSesion = async () => {
    try {
      if (!clave.trim() || !password.trim()) {
        Alert.alert("Campos requeridos", "Ingresa usuario y contraseña");
        return;
      }

      setLoading(true);

      const user: any = await db.getFirstAsync(
        `SELECT * FROM usuarios WHERE clave = ? AND activo = 1`,
        [clave.trim()]
      );

      if (!user) {
        Alert.alert("Error", "Usuario no encontrado o inactivo");
        return;
      }

      const hashIngresado = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      if (hashIngresado !== user.password_hash) {
        Alert.alert("Error", "Contraseña incorrecta");
        return;
      }

      // 🔥 REDIRECCIÓN POR ROL
      if (user.rol === "administrador") {
        router.replace("/(tabs)/usuario"); // admin
      } else {
        router.replace("/(tabs)/formu"); // usuario normal
      }

      Alert.alert("Bienvenido", user.nombre_completo);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No fue posible iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ROSUX</Text>

      <Text style={styles.titulo}>Inicio de Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={clave}
        onChangeText={setClave}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.boton, loading && styles.disabled]}
        onPress={iniciarSesion}
        disabled={loading}
      >
        <Text style={styles.textoBoton}>
          {loading ? "Validando..." : "Ingresar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F1F5F9",
  },

  logo: {
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
    color: "#1E3A8A",
  },

  titulo: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 25,
    color: "#64748B",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    marginBottom: 12,
  },

  boton: {
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  disabled: {
    opacity: 0.6,
  },

  textoBoton: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});