import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function formu() {
  const [nombreC, setNombreC] = useState("");
  const [fechaNac, setFechaNac] = useState<Date | null>(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [lugarNac, setLugarNac] = useState("");
  const [genero, setGenero] = useState("");
  const [estadocivil, setEstadocivil] = useState("");
  const [telefono, setTelefono] = useState("");
   const [escolaridad, setEscolaridad] = useState("");

  const Siguiente = () => {
    if (!nombreC && !lugarNac && !escolaridad ) {
      Alert.alert("Error", "Ingresa los datos requeridos");
      return;
    } 
    if (!fechaNac) {
    Alert.alert('Error', 'Seleccione la fecha de nacimiento');
    return;
  }
   if (!genero) {
    Alert.alert('Error', 'Seleccione un género');
    return;
    }
    if (telefono.length !== 10 ) {
      Alert.alert("Error", "El numero telefonico debe tener 10 dígitos");
      return;
    }

    Alert.alert("Éxito", "Siguiente formulario Datos de vivienda");
  };

   const onChange = (event: DateTimePickerEvent,
  selectedDate?: Date) => {
    setMostrarCalendario(false);

    if (selectedDate) {
      setFechaNac(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>DATOS GENERALES </Text>
      <Text style={styles.subtitulo}>Ingresa los datos solicitados</Text>

      <Text style={styles.label}>Nombre del cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del cliente"
        value={nombreC}
        onChangeText={(texto) => {
        const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        setNombreC(soloLetras);
      }}
      />

      <Text style={styles.label}>Fecha de nacimiento </Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => {setMostrarCalendario(true)
        }}
      >
      <Text>
       {fechaNac ? fechaNac.toLocaleDateString('es-MX') : 'Selecciona una fecha'}
        </Text>
      </TouchableOpacity>
       {mostrarCalendario && (
        <DateTimePicker
          value={fechaNac || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )} 
 
      <Text style={styles.label}>Lugar de nacimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="Lugar de nacimiento"
        value={lugarNac}
        onChangeText={(texto1) => {
        const soloLetras = texto1.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]/g, '');
        setLugarNac(soloLetras);
      }}
      />
     <Text style={styles.label}>Género</Text>
     <View style={styles.pickerContainer}>
      <Picker
        selectedValue={genero}
        onValueChange={(itemValue: string) => setGenero(itemValue)}
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
        selectedValue={estadocivil}
        onValueChange={(itemValue: string) => setEstadocivil(itemValue)}
      >
        <Picker.Item label="Estado civil" value="" />
        <Picker.Item label="Soltero" value="Soltero" />
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
        value={telefono}
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={(texto) => {
          const soloNumeros = texto.replace(/[^0-9]/g, '');
          setTelefono(soloNumeros);
        }}
      />

       <Text style={styles.label}>Escolaridad</Text>
     <View style={styles.pickerContainer}>
      <Picker
        selectedValue={escolaridad}
        onValueChange={(itemValue: string) => setEscolaridad(itemValue)} 
      > 
        <Picker.Item label="Escolaridad" value="" />
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