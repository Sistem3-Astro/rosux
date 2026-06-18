import { db } from "@/database/usuarios";
import { Picker } from "@react-native-picker/picker";
import bcrypt from "bcryptjs";
import * as Crypto from "expo-crypto";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");
  const [password, setPassword] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [rol, setRol] = useState("usuario");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data: any[] = await db.getAllAsync(
        `SELECT *
         FROM usuarios
         ORDER BY nombre_completo`
      );

      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarFormulario = () => {
    setEditandoId(null);
    setNombre("");
    setClave("");
    setPassword("");
    setSucursal("");
    setRol("usuario");
  };

  const guardarUsuario = async () => {
    try {
      if (!nombre || !clave || !sucursal) {
        Alert.alert(
          "Error",
          "Completa los campos obligatorios"
        );
        return;
      }

      if (editandoId) {
        await db.runAsync(
          `UPDATE usuarios
           SET nombre_completo = ?,
               clave = ?,
               sucursal = ?,
               rol = ?
           WHERE id = ?`,
          [
            nombre,
            clave,
            sucursal,
            rol,
            editandoId,
          ]
        );

        if (password.trim()) {
          const hash = await bcrypt.hash(
            password,
            10
          );

          await db.runAsync(
            `UPDATE usuarios
             SET password_hash = ?
             WHERE id = ?`,
            [hash, editandoId]
          );
        }

        Alert.alert(
          "Éxito",
          "Usuario actualizado"
        );
      } else {
        if (!password) {
          Alert.alert(
            "Error",
            "Ingresa una contraseña"
          );
          return;
        }

        const hash = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          password
        );

        await db.runAsync(
          `INSERT INTO usuarios
          (
            nombre_completo,
            clave,
            password_hash,
            sucursal,
            rol,
            activo
          )
          VALUES (?, ?, ?, ?, ?, 1)`,
          [
            nombre,
            clave,
            hash,
            sucursal,
            rol,
          ]
        );

        Alert.alert(
          "Éxito",
          "Usuario creado"
        );
      }

      limpiarFormulario();
      cargarUsuarios();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  };

  const editarUsuario = (usuario: any) => {
    setEditandoId(usuario.id);
    setNombre(usuario.nombre_completo);
    setClave(usuario.clave);
    setSucursal(usuario.sucursal);
    setRol(usuario.rol);
    setPassword("");
  };

  const cambiarEstado = async (
    id: number,
    activo: number
  ) => {
    try {
      await db.runAsync(
        `UPDATE usuarios
         SET activo = ?
         WHERE id = ?`,
        [activo ? 0 : 1, id]
      );

      cargarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const renderUsuario = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>
        {item.nombre_completo}
      </Text>

      <Text>Usuario: {item.clave}</Text>
      <Text>Sucursal: {item.sucursal}</Text>
      <Text>Rol: {item.rol}</Text>

      <Text>
        Estado:{" "}
        {item.activo ? "Activo" : "Inactivo"}
      </Text>

      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.editar}
          onPress={() => editarUsuario(item)}
        >
          <Text style={styles.textoBoton}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inactivar}
          onPress={() =>
            cambiarEstado(
              item.id,
              item.activo
            )
          }
        >
          <Text style={styles.textoBoton}>
            {item.activo
              ? "Inactivar"
              : "Activar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        Administración de Usuarios
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={clave}
        onChangeText={setClave}
      />
      
      <TextInput
        style={styles.input}
        placeholder={
          editandoId
            ? "Nueva contraseña (opcional)"
            : "Contraseña"
        }
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sucursal}
            onValueChange={(value) => setSucursal(value)}
          >
            <Picker.Item
              label="Seleccione una sucursal"
              value=""
            />
            <Picker.Item
              label="Corporativo"
              value="Corporativo"
            />
            <Picker.Item
              label="Etla"
              value="Etla"
            />
            <Picker.Item
              label="Huajuapan"
              value="Huajuapan  "
            />
            <Picker.Item
              label="Huatulco"
              value="Huatulco"
            />
          </Picker>
        </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={rol}
          onValueChange={(value) =>
            setRol(value)
          }
        >
          <Picker.Item
            label="Usuario"
            value="usuario"
          />
          <Picker.Item
            label="Administrador"
            value="administrador"
          />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.guardar}
        onPress={guardarUsuario}
      >
        <Text style={styles.textoBoton}>
          {editandoId
            ? "Actualizar Usuario"
            : "Crear Usuario"}
        </Text>
      </TouchableOpacity>

      {editandoId && (
        <TouchableOpacity
          style={styles.cancelar}
          onPress={limpiarFormulario}
        >
          <Text style={styles.textoBoton}>
            Cancelar Edición
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        scrollEnabled={false}
        data={usuarios}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderUsuario}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  generar: {
  backgroundColor: "#16A34A",
  padding: 12,
  borderRadius: 10,
  alignItems: "center",
  marginBottom: 10,
},

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F8FAFC",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  guardar: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelar: {
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  botones: {
    flexDirection: "row",
    marginTop: 10,
  },
  editar: {
    backgroundColor: "#F59E0B",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  inactivar: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
  },
  textoBoton: {
    color: "#FFF",
    fontWeight: "bold",
  },
});