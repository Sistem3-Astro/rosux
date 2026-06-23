import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { useFormulario } from "@/context/FormContext"; 

export default function vivienda() {
  const { formulario, updateField } = useFormulario(); 
  
const listaServicios = [
  'Agua potable',
  'Luz',
  'Drenaje',
  'Teléfono fijo',
  'Internet',
  'T.V de paga',
];

const listaHaberes = [
  'Aire acondicionado',
  'Automóvil',
  'Bicicleta',
  'Computadora',
  'Estufa',
  'Lavadora',
  'Motocicleta',
  'Horno de microondas',
];

const toggleServicio = (servicio: string) => {
  const nuevosServicios =
    formulario.servicios.includes(servicio)
      ? formulario.servicios.filter(
          (s: string) => s !== servicio
        )
      : [...formulario.servicios, servicio];

  updateField('servicios', nuevosServicios);
}; 

const toggleHaber = (haber: string) => {
  const nuevosHaberes =
    formulario.haberesH.includes(haber)
      ? formulario.haberesH.filter(
          (h: string) => h !== haber
        )
      : [...formulario.haberesH, haber];

  updateField('haberesH', nuevosHaberes);
};


  const Siguiente = () => {
    if (!formulario.direccionC && !formulario.entreCalle) {
      Alert.alert("Error", "Ingresa los datos requeridos");
      return;
    }  
    if (!formulario.vivienda) {
    Alert.alert('Error', 'Seleccione una vivienda');
    return;
    } 
    if (!formulario.tiempoHab) {
      Alert.alert("Error", "Ingresa los meses o años de habitar");
      return;
    } 
    if (!formulario.tipoViv) {
    Alert.alert('Error', 'Seleccione un tipo de vivienda');
    return; 
    }

    
    if (formulario.haberesH.length === 0) {
     Alert.alert(
        'Error',
        'Debe seleccionar al menos un haber'
      );
      return;
    } 
    if (formulario.servicios.length === 0) {
      Alert.alert(
        'Error',
        'Debe seleccionar al menos un servicio'
      );
      return;
    }
    if (!formulario.valorV || !formulario.descripV) {  
    Alert.alert('Error', 'Ingrese el valor o describa la vivienda');
    return; 
    }

    Alert.alert("Éxito", "Siguiente formulario Datos de vivienda");
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>DATOS DE VIVIENDA </Text>
      <Text style={styles.subtitulo}>Ingresa los datos solicitados</Text>

      <Text style={styles.label}>Dirección del cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="(Calle, Número, Colonia, Estado, Pais)" 
        value={formulario.direccionC}
        onChangeText={(texto) => {
        const soloLetras = texto.replace( /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
        updateField('direccionC', soloLetras);
      }}
      />

      
      <Text style={styles.label}>Entre calles</Text> 
      <TextInput
        style={styles.input}
        placeholder="(Calle, Número)"
        value={formulario.entreCalle}
        onChangeText={(texto) => {
        const soloLetras = texto.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
        updateField('entreCalle', soloLetras);
      }}
      />
 
     <Text style={styles.label}>Vivienda</Text>
     <View style={styles.pickerContainer}>
      <Picker
        selectedValue={formulario.vivienda}
        onValueChange={(itemValue: string) => updateField('vivienda', itemValue)} >
        <Picker.Item label="Seleccione una vivienda" value="" />
        <Picker.Item label="Rentada" value="rentada" />
        <Picker.Item label="Propia" value="propia" />
        <Picker.Item label="Prestada" value="prestada" />
        <Picker.Item label="Familiar" value="familiar" />
      </Picker>
      </View>

       <Text style={styles.label}>Tiempo de habitar el domicilio (meses o años)</Text> 
      <TextInput
        style={styles.input}
        placeholder="Meses o años"
        value={formulario.tiempoHab}
        onChangeText={(texto) => {
        const soLetras = texto.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
        updateField('tiempoHab', soLetras);
      }}
      />
     <Text style={styles.label}>Tipo de vivienda</Text>
     <View style={styles.pickerContainer}>
      <Picker   
        selectedValue={formulario.tipoViv}
        onValueChange={(itemValue: string) => updateField('tipoViv', itemValue)}
      > 
        <Picker.Item label="Seleciona un tipo de vivienda" value="" />
        <Picker.Item label="Concreto" value="Concreto" />
        <Picker.Item label="Lamina" value="Lamina" />
        <Picker.Item label="Block o ladrillo" value="Block o ladrillo" />
        <Picker.Item label="Adobe" value="Adobe" />
        <Picker.Item label="Madera" value="Madera" />
        <Picker.Item label="Palma" value="Palma" />
        <Picker.Item label="Piedra" value="Piedra" />
      </Picker>
      </View>  

       <Text style={styles.label}>Haberes del Hogar</Text>
       <View style={styles.pickerContainer}>
        {listaHaberes.map(haber => (
        <View
          key={haber}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}
        >
          <Checkbox
            value={formulario.haberesH.includes(haber)}
            onValueChange={() => toggleHaber(haber)}
          />
          <Text style={{ marginLeft: 8 }}>
            {haber}
          </Text> 
        </View>
      ))}

      <Text>
        Haberes: {formulario.haberesH.join(', ')}
      </Text>
    </View>

       <Text style={styles.label}>Servicios</Text>
       <View style={styles.pickerContainer}>
        {listaServicios.map(servicio => (
        <View
          key={servicio}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}
        >
          <Checkbox
            value={formulario.servicios.includes(servicio)}
            onValueChange={() => toggleServicio(servicio)}
          />
          <Text style={{ marginLeft: 8 }}>
            {servicio}
          </Text>
        </View>
      ))}

      <Text>
        Servicios: {formulario.servicios.join(', ')}
      </Text>
    </View>

    <Text style={styles.label}>Valor de vivienda</Text>
          <TextInput
            style={styles.input}
            placeholder="$ MXN"
            value={formulario.valorV}
            maxLength={10}
            onChangeText={(texto) => {
              const soloNumeros = texto.replace(/[^0-9]/g, ''); 
              updateField('valorV', soloNumeros);
            }}
          />

       <Text style={styles.label}>Descripción de la vivienda</Text>
          <TextInput  style={styles.input}
           placeholder="Describe la vivienda"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
           value={formulario.descripV}
           onChangeText={(texto1) => {
           const soloLetras = texto1.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]/g, '');
           updateField('descripV', soloLetras);
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