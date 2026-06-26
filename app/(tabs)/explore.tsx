import { db } from "@/database/usuarios";
import bcrypt from "bcryptjs";
import * as Crypto from "expo-crypto";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text,  View, StyleSheet} from "react-native";
import { useAuth } from '@/context/AuthContext';

export default function TabTwoScreen() {
 const [usuarios, setUsuarios] = useState<any[]>([]);
   const [clientes, setClientes] = useState<any[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);  
  const { usuario } = useAuth(); 

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
         ORDER BY nombre_completo`,
      );

      setUsuarios(data);

    const clientes: any[] = await db.getAllAsync(
      `SELECT
        c.*,
        v.*,
        a.*,
        cd.*,
        i.*,
        e.*,
        b.nomBenf,
        b.lugarNacBenf,
        b.fechaNacBenf,
        b.direccionBenf,
        b.parentesco,
   edad,
   ingresos,
   egresos

      FROM cliente c 
      LEFT JOIN vivienda v 
      ON c.id = v.id_cliente
      LEFT JOIN actividad a 
      ON c.id = a.id_cliente
      LEFT JOIN credito cd 
      ON c.id = cd.id_cliente
      LEFT JOIN beneficiario b 
      ON c.id = b.id_cliente
      LEFT JOIN ingresos i
      ON c.id = i.id_cliente
      LEFT JOIN egresos e
      ON c.id = e.id_cliente
      WHERE c.idusuario = ?
       `,[usuario.id]
      );       

      setClientes(clientes);
      console.log("CLIENTES:", clientes);
          
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

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Registro de tus visitas
      </Text>

       <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>Datos del cliente</Text>
            <Text>Cliente: {item.nombreC}</Text>
            <Text>Lugar Nacimiento: {item.lugarNac}</Text>            
            <Text>Edad: {item.edad}</Text>
            <Text>Fecha de Nacimiento: {item.fechaNac}</Text>
            <Text>Teléfono: {item.telefono}</Text>
            <Text>Estado Civil: {item.estadoCivil}</Text>
            <Text>Escolaridad: {item.escolaridad}</Text>

            <Text style={styles.nombre}>Vivienda</Text>
            <Text>Dirección: {item.direccionC}</Text>
            <Text>Entre Calles: {item.entreCalle}</Text>
            <Text>Vivienda: {item.vivienda}</Text>
            <Text>Tiempo de habitar: {item.tiempoHab}</Text>
            <Text>Tipo de vivienda: {item.tipoViv}</Text>            
            <Text>Haberes: {item.haberesH}</Text>
            <Text>Servicios: {item.servicios}</Text>
            <Text>Valor de vivienda: ${item.valorV}</Text>
            <Text>Descripcion de vivienda: {item.descripV}</Text>

            <Text style={styles.nombre}>Actividad economica</Text>
            <Text>Actividad economica: {item.actividadE}</Text>
            <Text>Actividad económica adicional: {item.actividadEAd}</Text>
            <Text>Antigüedad laboral: {item.antiguedadL}</Text>
            <Text>Domicilio del negocio: {item.domicilioNeg}</Text>
            <Text>Teléfono del negocio: {item.telefonoNeg}</Text>
            <Text>Nombre del cónyuge: {item.nombreConyuge}</Text>
            <Text>Lugar de nacimiento del cónyuge: {item.lugarNacConyuge}</Text>
            <Text>Fecha de nacimiento del cónyuge: {item.fechaNacConyuge}</Text>
            <Text>Teléfono del cónyuge: {item.telefonoConyuge}</Text>
            <Text>Ocupación del cónyuge: {item.ocupacionConyuge}</Text>
            <Text>Antigüedad laboral del cónyuge: {item.antiguedadLConyuge}</Text>
            <Text>Dirección laboral del cónyuge: {item.direccionLConyuge}</Text>
            <Text>Nombre de los hijos: {item.nombreHijos}</Text>
            <Text style={styles.subtitulo}>Referencia 1</Text>
            <Text>Nombre: {item.ref1Nombre}</Text>
            <Text>Dirección: {item.ref1Direccion}</Text>
            <Text>Teléfono: {item.ref1Telefono}</Text>
            <Text style={styles.subtitulo}>Referencia 2</Text>
            <Text>Nombre: {item.ref2Nombre}</Text>
            <Text>Dirección: {item.ref2Direccion}</Text>
            <Text>Teléfono: {item.ref2Telefono}</Text>

             <Text style={styles.nombre}>Credito</Text>
             <Text>Producto: {item.producto}</Text>
             <Text>Monto: {item.monto}</Text>
             <Text>Plazo: {item.plazo}</Text>
             <Text>Frecuencia: {item.frecuencia}</Text>
             <Text>Motivo: {item.motivo}</Text>

             <Text style={styles.nombre}>Ingresos</Text>
             <Text>Salario: {item.salario}</Text>
             <Text>Ventas: {item.ventas}</Text>
             <Text>Otros ingresos: {item.otrosIngresos}</Text>
             <Text>Ingreson del conyuge: {item.ingresoConyuge}</Text>

             <Text style={styles.nombre}>Egresos</Text>
            <Text>Renta: ${item.renta}</Text>
            <Text>Servicios: ${item.gServicio}</Text>
            <Text>Familiares: ${item.gFamiliar}</Text>
            <Text>Venta: ${item.gVenta}</Text>
            <Text>Circulo credito: ${item.gCirculoc}</Text>
            <Text>Aministrativos: ${item.gAdmin}</Text>
            <Text>Escolar: ${item.gEscolar}</Text>
            <Text>Alimentacion: ${item.gAlim}</Text>
            <Text>Calzado y Vestido: ${item.gCalzVes}</Text>
            <Text>Vehiculo: ${item.gVeh}</Text>
            <Text>Transporte: ${item.gTransp}</Text>
            <Text>Credito Activo: ${item.creditoAct}</Text>


            <Text style={styles.nombre}>Beneficiario</Text>
            <Text>Beneficiario: {item.nomBenf}</Text>
            <Text>Lugar de Nacimiento: {item.lugarNacBenf}</Text>
            <Text>Fecha de Nacimiento: {item.fechaNacBenf}</Text>
            <Text>Domicilio: {item.direccionBenf}</Text>
            <Text>Parentesco: {item.parentesco}</Text>
            <Text>Ingresos totales: ${item.ingresos}</Text>
            <Text>Egresos totales: ${item.egresos}</Text>
          </View>
        )}
      />
      
    </View>
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
    alignItems: "center",
    
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
  subtitulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#068436",
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