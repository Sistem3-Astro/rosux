import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import { useFormulario } from "@/context/FormContext";
import { useAuth } from '@/context/AuthContext';


export default function credito() {
  const { formulario, updateField } = useFormulario();    
  const { usuario } = useAuth(); 

  const Siguiente = () => {
    if (!formulario.producto ) {
      Alert.alert("Error", "Selecciona un producto");
      return;
    } 
    if (!formulario.monto || formulario.monto <= 0) {
    Alert.alert('Error', 'Ingresa el monto solicitado');
    return;
  } 
   if (!formulario.plazo) {
    Alert.alert('Error', 'Ingresa el plazo solicitado');
    return;
    }
    if (!formulario.frecuencia) {
    Alert.alert('Error', 'Selecciona la frecuencia');
    return;
    }
    if (!formulario.motivo) {
    Alert.alert('Error', 'Ingresa el motivo del crédito');
    return;
    }

    console.log("Usuario desde credito:", usuario); 
    Alert.alert("Éxito", "Datos de Ingresos"); 
    router.push('/datos/ingreso');

  }; 

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.nombre}> 
      Bienvenido {usuario?.nombre_completo.split(' ')[0]}
      </Text>
      <Text style={styles.titulo}>DATOS DE CRÉDITO </Text>
      <Text style={styles.subtitulo}>Ingresa los datos solicitados</Text>

      <Text style={styles.label}>Producto</Text> 
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={formulario.producto}
        onValueChange={(itemValue: string) => updateField('producto', itemValue)}
      >
        <Picker.Item label="Selecciona" value="" />
        <Picker.Item label="Saci-Crece"   value="Saci-Crece" />
        <Picker.Item label="Saci-Motor" value="Saci-Motor" />
        <Picker.Item label="Saci-Alianza" value="Saci-Alianza" />
      </Picker>
      </View> 

      <Text style={styles.label}>Monto solicitado</Text>
                <TextInput
                style={styles.input}
                placeholder="$ MXN"
                value={formulario.monto ? formulario.monto.toString() : ''}
                maxLength={10}
                keyboardType="numeric"
                onChangeText={(texto) => {
                const soloNumeros = texto.replace(/[^0-9]/g, '');
                updateField('monto', soloNumeros === '' ? 0 : Number(soloNumeros));
                 }}
                 />
      
            <Text style={styles.label}>Plazo</Text>
            <TextInput style={styles.input}
                placeholder="Plazo (meses)"
                value={formulario.plazo} 
                onChangeText={(texto1) => {
                const soloLetras = texto1.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
                updateField('plazo', soloLetras);
            }}
            />

            <Text style={styles.label}>Frecuencia</Text>
            <View style={styles.pickerContainer}> 
            <Picker
                selectedValue={formulario.frecuencia}
                onValueChange={(itemValue: string) => updateField('frecuencia', itemValue)}
            > 
                <Picker.Item label="Selecciona la frecuencia" value="" />
                <Picker.Item label="Semanal" value="Semanal" />
                <Picker.Item label="Quincenal" value="Quincenal" />
                <Picker.Item label="Mensual" value="Mensual" />
            </Picker>
            </View>

            <Text style={styles.label}>¿Para que ocupará el crédito? </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Uso del crédito"
                    value={formulario.motivo}
                    onChangeText={(texto) => {
                    const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    updateField('motivo', soloLetras);
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
  nombre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "right",
    color: "#4d77eb",
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