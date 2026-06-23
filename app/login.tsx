import { useState } from "react";
import { router } from "expo-router";
import * as Crypto from "expo-crypto";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert,} from "react-native";
import { db } from '@/database/usuarios';

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
      <Text style={styles.titulo}>ROSUX</Text>
      <Text style={styles.subtitulo}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario SAFI"
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
  disabled: {
    opacity: 0.6,
  },

});