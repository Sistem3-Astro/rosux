import { db } from "@/database/usuarios";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text,  View, StyleSheet} from "react-native";
import { useAuth } from '@/context/AuthContext';
import {TouchableOpacity} from "react-native";
import { router } from "expo-router";

export default function TabTwoScreen() {
   const [clientes, setClientes] = useState<any[]>([]);
  const { usuario } = useAuth(); 


  useEffect(() => {
    cargarUsuarios();
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

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Registro de tus visitas
      </Text>
      <Text style={styles.nombre}>
        Total de {Number(clientes.length)} clientes
      </Text>

       <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity
        style={styles.card}
         onPress={() =>  router.push({
          pathname: '/mostrar',
          params: { id: item.id.toString(), },
        })}
              >
            <Text style={styles.nombre}>Cliente {item.nombreC}</Text>
            <Text>Registro: {item.fecha_creacion.split(" ")[0]}</Text>   
            <Text>Lugar Nacimiento: {item.lugarNac}</Text>            
            <Text>Edad: {item.edad}</Text>
            <Text>Fecha de Nacimiento: {item.fechaNac}</Text>
            <Text>Teléfono: {item.telefono}</Text>
            <Text>Producto: {item.producto}</Text>
 
     </TouchableOpacity>
     
    
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