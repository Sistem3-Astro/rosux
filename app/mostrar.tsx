import { db } from "@/database/usuarios";
import bcrypt from "bcryptjs";
import * as Crypto from "expo-crypto";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text,  View, StyleSheet} from "react-native";
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";


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
  const [cliente, setCliente] = useState<any[]>([]);
  const { id } = useLocalSearchParams(); 

  useEffect(() => {
  cargarCliente(Number(id));
}, []);

  const cargarUsuarios = async () => {
    try {

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



const cargarCliente = async (id: number) => {
  const cliente : any[]  = await db.getAllAsync(
    `SELECT
     c.id AS clienteId,
     c.*,
     v.*,
     a.*,
     cd.*,
     i.*,
     e.*,
     b.*
     FROM cliente c   
     LEFT JOIN vivienda v 
     ON c.id = v.id_cliente  
     LEFT JOIN actividad a 
     ON c.id = a.id_cliente 
     LEFT JOIN credito cd 
     ON c.id = cd.id_cliente 
     LEFT JOIN ingresos i 
     ON c.id = i.id_cliente 
     LEFT JOIN egresos e 
     ON c.id = e.id_cliente 
     LEFT JOIN beneficiario b 
     ON c.id = b.id_cliente 
     WHERE c.id = ?`,
    [id]
  );

  setCliente(cliente);
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
       Cliente
      </Text>

       <FlatList
        data={cliente}
        keyExtractor={(item) => item.clienteId.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.nombreC} </Text>
            <Text><Text style={styles.colorT}>Lugar Nacimiento:</Text> {item.lugarNac} </Text>
            <Text><Text style={styles.colorT}>Edad:</Text> {item.edad}</Text>
            <Text><Text style={styles.colorT}>Fecha de Nacimiento:</Text> {item.fechaNac?.split("T")[0]}</Text>
            <Text><Text style={styles.colorT}>Teléfono:</Text> {item.telefono}</Text>
            <Text><Text style={styles.colorT}>Genero: </Text>{item.genero}</Text>
            <Text><Text style={styles.colorT}>Estado Civil: </Text> {item.estadoCivil}</Text>
            <Text><Text style={styles.colorT}>Escolaridad: </Text> {item.escolaridad}</Text>

            <Text style={styles.nombre}>Vivienda</Text>
            <Text><Text style={styles.colorT}>Dirección: </Text>{item.direccionC}</Text>
            <Text><Text style={styles.colorT}>Entre Calles: </Text>{item.entreCalle}</Text>
            <Text><Text style={styles.colorT}>Vivienda: </Text>{item.vivienda}</Text>
            <Text><Text style={styles.colorT}>Tiempo de habitar:</Text> {item.tiempoHab}</Text>
            <Text><Text style={styles.colorT}>Tipo de vivienda:</Text> {item.tipoViv}</Text>            
            <Text><Text style={styles.colorT}>Haberes:</Text> {item.haberesH}</Text>
            <Text><Text style={styles.colorT}>Servicios:</Text> {item.servicios}</Text>
            <Text><Text style={styles.colorT}>Valor de vivienda:</Text> ${item.valorV}</Text>
            <Text><Text style={styles.colorT}>Descripcion de vivienda:</Text> {item.descripV}</Text>

            <Text style={styles.nombre}>Actividad economica</Text>
            <Text><Text style={styles.colorT}>Actividad economica: </Text>{item.actividadE}</Text>
            <Text><Text style={styles.colorT}>Actividad económica adicional:</Text> {item.actividadEAd}</Text>
            <Text><Text style={styles.colorT}>Antigüedad laboral: </Text> {item.antiguedadL}</Text>
            <Text><Text style={styles.colorT}>Domicilio del negocio:</Text> {item.domicilioNeg}</Text>
            <Text><Text style={styles.colorT}>Teléfono del negocio: </Text>{item.telefonoNeg}</Text>
            <Text><Text style={styles.colorT}>Nombre del cónyuge:</Text> {item.nombreConyuge}</Text>
            <Text><Text style={styles.colorT}>Lugar de nacimiento del cónyuge:</Text> {item.lugarNacConyuge}</Text>
            <Text><Text style={styles.colorT}>Fecha de nacimiento del cónyuge:</Text> {item.fechaNacConyuge?.split("T")[0]}</Text>
            <Text><Text style={styles.colorT}>Teléfono del cónyuge:</Text> {item.telefonoConyuge}</Text>
            <Text><Text style={styles.colorT}>Ocupación del cónyuge:</Text> {item.ocupacionConyuge}</Text>
            <Text><Text style={styles.colorT}>Antigüedad laboral del cónyuge: </Text>{item.antiguedadLConyuge}</Text>
            <Text><Text style={styles.colorT}>Dirección laboral del cónyuge: </Text>{item.direccionLConyuge}</Text>
            <Text><Text style={styles.colorT}>Nombre de los hijos:</Text> {item.nombreHijos}</Text>
            <Text style={styles.subtitulo}>Referencia 1</Text>
            <Text><Text style={styles.colorT}>Nombre: </Text>{item.ref1Nombre}</Text>
            <Text><Text style={styles.colorT}>Dirección:</Text> {item.ref1Direccion}</Text>
            <Text><Text style={styles.colorT}>Teléfono: </Text>{item.ref1Telefono}</Text>
            <Text style={styles.subtitulo}>Referencia 2</Text>
            <Text><Text style={styles.colorT}>Nombre:</Text> {item.ref2Nombre}</Text>
            <Text><Text style={styles.colorT}>Dirección:</Text> {item.ref2Direccion}</Text>
            <Text><Text style={styles.colorT}>Teléfono: </Text>{item.ref2Telefono}</Text>

             <Text style={styles.nombre}>Credito</Text>
             <Text><Text style={styles.colorT}>Producto: </Text>{item.producto}</Text>
             <Text><Text style={styles.colorT}>Monto: </Text>{item.monto}</Text>
             <Text><Text style={styles.colorT}>Plazo: </Text>{item.plazo}</Text>
             <Text><Text style={styles.colorT}>Frecuencia:</Text> {item.frecuencia}</Text>
             <Text><Text style={styles.colorT}>Motivo:</Text> {item.motivo}</Text>

             <Text style={styles.nombre}>Ingresos</Text>
             <Text><Text style={styles.colorT}>Salario: $</Text> {item.salario}</Text>
             <Text><Text style={styles.colorT}>Ventas: $</Text>  {item.ventas}</Text>
             <Text><Text style={styles.colorT}>Otros ingresos: $</Text>  {item.otrosIngresos}</Text>
             <Text><Text style={styles.colorT}>Ingreson del conyuge: $</Text> {item.ingresoConyuge}</Text>

             <Text style={styles.nombre}>Egresos</Text>
            <Text><Text style={styles.colorT}>Renta: $ </Text>{item.renta}</Text>
            <Text><Text style={styles.colorT}>Servicios: $ </Text>{item.gServicio}</Text>
            <Text><Text style={styles.colorT}>Familiares: $ </Text>{item.gFamiliar}</Text>
            <Text><Text style={styles.colorT}>Venta: $ </Text>{item.gVenta}</Text>
            <Text><Text style={styles.colorT}>Circulo credito: $ </Text>{item.gCirculoc}</Text>
            <Text><Text style={styles.colorT}>Aministrativos: $ </Text>{item.gAdmin}</Text>
            <Text><Text style={styles.colorT}>Escolar: $ </Text>{item.gEscolar}</Text>
            <Text><Text style={styles.colorT}>Alimentacion: $ </Text>{item.gAlim}</Text>
            <Text><Text style={styles.colorT}>Calzado y Vestido: $ </Text>{item.gCalzVes}</Text>
            <Text><Text style={styles.colorT}>Vehiculo: $ </Text>{item.gVeh}</Text>
            <Text><Text style={styles.colorT}>Transporte: $ </Text>{item.gTransp}</Text>
            <Text><Text style={styles.colorT}>Credito Activo: </Text>{item.creditoAct}</Text>


            <Text style={styles.nombre}>Beneficiario</Text>
            <Text><Text style={styles.colorT}>Beneficiario: </Text>{item.nomBenf}</Text>
            <Text><Text style={styles.colorT}>Lugar de Nacimiento: </Text> {item.lugarNacBenf}</Text>
            <Text><Text style={styles.colorT}>Fecha de Nacimiento: </Text> {item.fechaNacBenf?.split("T")[0]}</Text>
            <Text><Text style={styles.colorT}>Domicilio: </Text>{item.direccionBenf}</Text>
            <Text><Text style={styles.colorT}>Parentesco: </Text> {item.parentesco}</Text>
            <Text><Text style={styles.colorT}>Ingresos totales: $ </Text>{item.ingresos}</Text>
            <Text><Text style={styles.colorT}>Egresos totales: $ </Text>{item.egresos}</Text>

            <Text
                style={styles.boton}
                onPress={() =>
                  router.push({
                    pathname: '/formu',                    
                    params: { id:item.clienteId.toString()},
                  })
                }
              >
                <Text style={styles.textoBoton}>Editar</Text>
              </Text>
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
    backgroundColor: "#ecefeb",
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  nombre: {
    backgroundColor: "#2e6b48",
    borderRadius: 10,
    padding: 8,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    width: 690,
    alignSelf: "center",    
    justifyContent: "center",    
    textAlign:"center"
  },
  subtitulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#068436",
  },
  colorT: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#1e2d24",
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
    color: "#1b1414",
    fontSize: 18,
    fontWeight: "bold",
    textAlign:"center"
  },
  boton: {
    backgroundColor: "#1F6F5F",
    width: 150,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});