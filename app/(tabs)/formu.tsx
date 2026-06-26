import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import { useFormulario } from "@/context/FormContext";
import { useAuth } from '@/context/AuthContext';


export default function formu() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const { formulario, updateField } = useFormulario();    
  const { usuario } = useAuth(); 

  const Siguiente = () => {
    if (!formulario.nombreC || !formulario.lugarNac) {
      Alert.alert("Error", "Ingresa los datos requeridos");
      return;
    } 
    if (!formulario.fechaNac) {
    Alert.alert('Error', 'Seleccione la fecha de nacimiento');
    return;
  } 
   if (!formulario.genero) {
    Alert.alert('Error', 'Seleccione un género');
    return;
    }
    if (!formulario.estadoCivil) {
    Alert.alert('Error', 'Seleccione un estado civil');
    return;
    }
    if (formulario.telefono.length !== 10 ) {
      Alert.alert("Error", "El numero telefonico debe tener 10 dígitos");
      return;
    }  
    if (!formulario.escolaridad) {
    Alert.alert('Error', 'Seleccione una escolaridad');
    return;
    }   

    Alert.alert("Éxito", "Formulario Datos de vivienda");    
    console.log("Usuario desde formu:", usuario); 
    router.push('/datos/vivienda'); // redireccion a vivienda
  };

   const onChange = (event: DateTimePickerEvent,
  selectedDate?: Date) => {
    setMostrarCalendario(false);
    if (selectedDate) {
      updateField('fechaNac', selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.nombre}> 
      Bienvenido {usuario?.nombre_completo.split(' ')[0]}
      </Text>
      <Text style={styles.titulo}>DATOS GENERALES </Text>
      <Text style={styles.subtitulo}>Ingresa los datos solicitados</Text>

      <Text style={styles.label}>Nombre del cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del cliente"
        value={formulario.nombreC}
        onChangeText={(texto) => {
        const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        updateField('nombreC', soloLetras);
      }}
      />

      <Text style={styles.label}>Fecha de nacimiento </Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => {setMostrarCalendario(true)
        }}
      >
      <Text>
      {formulario.fechaNac ? new Date(formulario.fechaNac
        ).toLocaleDateString("es-MX")
      : "Selecciona una fecha"}
        </Text>
      </TouchableOpacity>
       {mostrarCalendario && (
        <DateTimePicker
          value={formulario.fechaNac ? new Date(formulario.fechaNac) : new Date()} 
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
 
      <Text style={styles.label}>Lugar de nacimiento</Text>
      <TextInput style={styles.input}
        placeholder="Lugar de nacimiento"
        value={formulario.lugarNac} 
        onChangeText={(texto1) => {
        const soloLetras = texto1.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]/g, '');
        updateField('lugarNac', soloLetras);
      }}
      />
     <Text style={styles.label}>Género</Text>
     <View style={styles.pickerContainer}> 
      <Picker
        selectedValue={formulario.genero}
        onValueChange={(itemValue: string) => updateField('genero', itemValue)}
      > 
        <Picker.Item label="Seleccione un género" value="" />
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
        <Picker.Item label="No binario" value="Otro" />
      </Picker>
      </View>

     <Text style={styles.label}>Estado Civil</Text>
     <View style={styles.pickerContainer}>
      <Picker
        selectedValue={formulario.estadocivil}
        onValueChange={(itemValue: string) => updateField('estadoCivil', itemValue)}
      >
        <Picker.Item label="Estado civil" value="" />
        <Picker.Item label="Soltero"   value="Soltero" />
        <Picker.Item label="Casado(a) bienes separados" value="Casado(a) bienes separados" />
        <Picker.Item label="Casado(a) bienes mancomunados" value="Casado(a) bienes mancomunados" />
        <Picker.Item label="Divorciado(a)" value="Divorciado(a)" />
        <Picker.Item label="Viudo(a)" value="Viudo(a)" />
        <Picker.Item label="Separado(a)" value="Separado(a)" />
        <Picker.Item label="Concubinato/Unión libre" value="Concubinato/Unión libre" />
      </Picker>
      </View> 

      <Text style={styles.label}>Número telefónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Número telefónico"
        value={formulario.telefono}
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={(texto) => {
          const soloNumeros = texto.replace(/[^0-9]/g, '');
          updateField('telefono', soloNumeros);
        }}
      />

       <Text style={styles.label}>Escolaridad</Text>
     <View style={styles.pickerContainer}>
      <Picker
        selectedValue={formulario.escolaridad}
        onValueChange={(itemValue: string) => updateField('escolaridad', itemValue)}  
      > 
        <Picker.Item label="Selecciona una escolaridad" value="" />
        <Picker.Item label="Sin escolaridad" value="Sin escolaridad" />
        <Picker.Item label="Primaria"  value="Primaria" />
        <Picker.Item label="Secundaria" value="Secundaria" />
        <Picker.Item label="Media Superior(Bachillerato/Preparatoria)" value="Media Superior(Bachillerato/Preparatoria)" />
        <Picker.Item label="Superior(Licenciatura/Ingenieria/Profesional)" value="Superior(Licenciatura/Ingenieria/Profesional)" />
        <Picker.Item label="Posgrado" value="Posgrado" />
       
      </Picker>
      </View> 

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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E3A8A",
  },
   nombre: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left", 
    color: "#3f5eb6",
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