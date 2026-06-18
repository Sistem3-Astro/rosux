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

export default function LoginAdmin() {
  const [clave, setClave] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const iniciarSesion = async () => {
    try {
      if (!clave.trim() || !password.trim()) {
        Alert.alert(
          "Campos requeridos",
          "Ingresa usuario y contraseña"
        );
        return;
      }

      setLoading(true);

      const admin: any = await db.getFirstAsync(
        `SELECT *
         FROM usuarios
         WHERE clave = ?
         AND rol = 'administrador'
         AND activo = 1`,
        [clave.trim()]
      );

      if (!admin) {
        Alert.alert(
          "Acceso denegado",
          "Administrador no encontrado o inactivo"
        );
        return;
      }

      const hashIngresado = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      if (hashIngresado !== admin.password_hash) {
        Alert.alert(
          "Acceso denegado",
          "Contraseña incorrecta"
        );
        return;
      }

      Alert.alert(
        "Bienvenido",
        admin.nombre_completo,
        [
          {
            text: "Continuar",
            onPress: () =>
              router.replace("/(tabs)/formu"),
          },
        ]
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Error",
        "No fue posible iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ROSUX</Text>

      <Text style={styles.titulo}>
        Panel de Administración
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        autoCapitalize="none"
        autoCorrect={false}
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
        style={[
          styles.boton,
          loading && styles.botonDeshabilitado,
        ]}
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
    padding: 25,
    backgroundColor: "#F5F7FA",
  },
  logo: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E3A8A",
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    textAlign: "center",
    color: "#64748B",
    marginBottom: 30,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  boton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },
  botonDeshabilitado: {
    opacity: 0.7,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});