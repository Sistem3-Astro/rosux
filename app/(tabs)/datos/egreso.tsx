import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import { useFormulario } from "@/context/FormContext";
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams } from "expo-router"; 



export default function egreso() { 
  const { formulario, updateField } = useFormulario();    
  const { usuario } = useAuth();   
  const { id } = useLocalSearchParams(); 

  const Siguiente = () => {
    if (!formulario.gServicio ) {
      Alert.alert("Error", "Ingresa el monto de servicios");
      return;
    }  
    if (!formulario.gFamiliar) {
    Alert.alert('Error', 'Ingresa el monto de gastos familiares');
    return;
   }
   if (!formulario.gVenta) {
    Alert.alert('Error', 'Ingresa el monto de gastos de venta');
    return;
   }
    if (!formulario.gAlim) {
    Alert.alert('Error', 'Ingresa el monto de gastos alimenticios');
    return;
   }
    console.log("Usuario desde egreso:", usuario); 
    Alert.alert("Éxito", "Datos de beneficiario");
    router.push('/datos/beneficiario'); // redireccion a vivienda
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitulo}> 
      Bienvenido {usuario?.nombre_completo.split(' ')[0]}
      </Text>
      <Text style={styles.titulo}>DATOS DE EGRESOS </Text>
      <Text style={styles.subtitulo}>Ingresa los datos solicitados</Text>

      <Text style={styles.label}>Renta</Text> 
       <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.renta ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('renta', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />

      <Text style={styles.label}>Servicios</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gServicio ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gServicio', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />

        <Text style={styles.label}>Gastos familiares</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gFamiliar ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gFamiliar', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />

        <Text style={styles.label}>Gastos de venta</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gVenta ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gVenta', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />
   

        <Text style={styles.label}>Otros gastos circulo de credito</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gCirculoC ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gCirculoc', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />

        <Text style={styles.label}>Gastos de administracion</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gAdmin ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gAdmin', soloNumeros === '' ? 0 : Number(soloNumeros));
        }}
        />
        <Text style={styles.label}>Gastos escolares</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gEscolar ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gEscolar', soloNumeros === '' ? 0 : Number(soloNumeros));
        }} 
        />

        <Text style={styles.label}>Gastos de alimentacion</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gAlim ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gAlim', soloNumeros === '' ? 0 : Number(soloNumeros));
        }} 
        />

        <Text style={styles.label}>Gastos de calzado y vestido</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gCalzVes ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gCalzVes', soloNumeros === '' ? 0 : Number(soloNumeros));
        }} 
        />

        <Text style={styles.label}>Gasto de vehiculo particular</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gVeh ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gVeh', soloNumeros === '' ? 0 : Number(soloNumeros));
        }} 
        />

        <Text style={styles.label}>Gasto de transporte</Text>
        <TextInput
        style={styles.input}
        placeholder="$ MXN"
        value={String(formulario.gTransp ?? '')}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        updateField('gTransp', soloNumeros === '' ? 0 : Number(soloNumeros));
        }} 
        />

         <Text style={styles.label}>¿Tiene créditos activos?Mencionalos</Text>
            <TextInput  style={styles.input}
              placeholder="Creditos activos"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={formulario.creditoAct}
              onChangeText={(texto1) => {
              const soloLetras = texto1.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,$]/g, '');
              updateField('creditoAct', soloLetras);
              }}
        />
               
      <TouchableOpacity
        style={styles.boton}
        onPress={Siguiente}
      >
        <Text style={styles.textoBoton}>Siguiente</Text>
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