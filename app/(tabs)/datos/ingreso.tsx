import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router";
import { useFormulario } from "@/context/FormContext";
import { useAuth } from '@/context/AuthContext';


export default function ingreso() { 
  const { formulario, updateField } = useFormulario();    
  const { usuario } = useAuth(); 

  const Siguiente = () => {
    if (!formulario.salario || formulario.salario <= 0) {
      Alert.alert("Error", "Ingresa su salario");
      return;
    } 
    if (!formulario.ventas || formulario.ventas <= 0) {
    Alert.alert('Error', 'Ingresa el monto de ventas');
    return;
   }

    console.log("Usuario desde ingresos:", usuario); 
    Alert.alert("Éxito", "Datos de egresos");
    router.replace('/datos/vivienda'); // redireccion a vivienda
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitulo}> 
      Bienvenido {usuario?.nombre_completo.split(' ')[0]}
      </Text>
      <Text style={styles.titulo}>DATOS DE INGRESOS </Text>
      <Text style={styles.subtitulo}>Ingresa los datos solicitados</Text>

      <Text style={styles.label}>Salario</Text> 
       <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={formulario.salario ? formulario.salario.toString() : ''}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('salario', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />

      <Text style={styles.label}>Ventas</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={formulario.ventas ? formulario.ventas.toString() : ''}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('ventas', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />

        <Text style={styles.label}>Otros ingresos</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={formulario.otrosIngresos ? formulario.otrosIngresos.toString() : ''}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('otrosIngresos', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />

        <Text style={styles.label}>Ingresos de cónyuge (cuanto aporta)</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={formulario.ingresoConyuge ? formulario.ingresoConyuge.toString() : ''}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('ingresoConyuge', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />
               
      <TouchableOpacity
        style={styles.boton}
        onPress={Siguiente}
      >
        <Text style={styles.textoBoton}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
   label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
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
  pickerContainer: {
  borderWidth: 2,
  borderColor: '#CFD7E3',
  borderRadius: 8,
  marginBottom: 15,
},
});