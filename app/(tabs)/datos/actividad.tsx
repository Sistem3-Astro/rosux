import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import { useFormulario } from "@/context/FormContext"; 
import { useLocalSearchParams } from "expo-router"; 


export default function actividad() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const { formulario, updateField } = useFormulario();     

  const Siguiente = () => {
    if (!formulario.actividadE || !formulario.actividadEAd || !formulario.domicilioNeg ) {
      Alert.alert("Error", "Ingresa los datos requeridos");
      return;
    } 
    if (!formulario.antiguedadL) {
    Alert.alert('Error', 'Ingresa la antiguedad laboral');
    return;
  } 
    if (formulario.telefonoNeg.length !== 10 ) {
      Alert.alert("Error", "El telefono debe tener 10 dígitos");
      return;
    }   
     if (!formulario.nombreConyuge || !formulario.lugarNacConyuge ) {
      Alert.alert("Error", "Ingresa el nombre o lugar de nacimiento del conyuge");
      return;
    }   
    if (!formulario.fechaNacConyuge) {
    Alert.alert('Error', 'Seleccione la fecha de nacimiento del conyuge');
    return;
  } 
   if (formulario.telefonoConyuge.length !== 10 ) {
      Alert.alert("Error", "El telefono debe tener 10 dígitos del conyuge");
      return;
    }   
    if (!formulario.ocupacionConyuge || !formulario.antiguedadLConyuge || !formulario.direccionLConyuge ) {
      Alert.alert("Error", "Ingresa la ocupacion, antiguedad laboral o direcion laboral del conyuge");
      return;
    }  
    if (!formulario.nombreHijos ) {
      Alert.alert("Error", "Ingresa el nombre de los hijos");
      return;
    }  
     if (!formulario.ref1Nombre || !formulario.ref1Direccion || !formulario.ref1Telefono ) {
      Alert.alert("Error", "Ingresa los datos de la referencia 1");
      return;
    }  
     if (!formulario.ref2Nombre || !formulario.ref2Direccion || !formulario.ref2Telefono ) {
      Alert.alert("Error", "Ingresa los datos de la referencia 2");
      return;
    }   

    Alert.alert("Éxito", "Formulario Datos de Credito");
    router.replace('/datos/credito'); // redireccion a vivienda
  };

   const onChange = (event: DateTimePickerEvent,
  selectedDate?: Date) => {
    setMostrarCalendario(false);

    if (selectedDate) {
      updateField('fechaNacConyuge', selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>DATOS DE ACTIVIDAD ECONOMICA </Text>
      <Text style={styles.subtitulo}>Ingresa los datos solicitados</Text>

      <Text style={styles.label}>¿A qué se dedica?</Text>
      <TextInput
        style={styles.input}
        placeholder="Actividad económica"
        value={formulario.actividadE}
        onChangeText={(texto) => {
        const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        updateField('actividadE', soloLetras);
      }} 
      />

      <Text style={styles.label}>¿Alguna actividad económica adicional? </Text>
      <TextInput
        style={styles.input}
        placeholder="Actividad económica adicional"
        value={formulario.actividadEAd}
        onChangeText={(texto) => {
        const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        updateField('actividadEAd', soloLetras);
      }} 
      />

       <Text style={styles.label}>Antiguedad laboral </Text>
       <TextInput
              style={styles.input}
              placeholder="Meses o años"
              value={formulario.antiguedadL}
              onChangeText={(texto) => {
              const soLetras = texto.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
              updateField('antiguedadL', soLetras);
            }}
      />
 
          <Text style={styles.label}>Domicilio del negocio</Text>
          <TextInput style={styles.input}
            placeholder="(Calle, Número, Colonia, Estado)"
            value={formulario.domicilioNeg} 
            onChangeText={(texto1) => {
            const soloLetras = texto1.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
            updateField('domicilioNeg', soloLetras);
          }}
          />

          <Text style={styles.label}>Teléfono de negocio</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número telefónico" 
                  value={formulario.telefonoNeg}
                  keyboardType="phone-pad"
                  maxLength={10}
                  onChangeText={(texto) => {
                    const soloNumeros = texto.replace(/[^0-9]/g, '');
                    updateField('telefonoNeg', soloNumeros);
                  }}
                />

            <Text style={styles.label}>Nombre de cónyuge </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de cónyuge"
              value={formulario.nombreConyuge}
              onChangeText={(texto) => {
              const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
              updateField('nombreConyuge', soloLetras);
            }} 
            />

            <Text style={styles.label}>Lugar de nacimiento del cónyuge </Text>
            <TextInput
              style={styles.input}
              placeholder="Lugar de nacimiento del cónyuge"
              value={formulario.lugarNacConyuge}
              onChangeText={(texto) => {
              const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
              updateField('lugarNacConyuge', soloLetras);
            }} 
            />

            <Text style={styles.label}>Fecha de nacimiento cónyuge</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {setMostrarCalendario(true)
              }}
            >
          <Text style={{ color: formulario.fechaNacConyuge ? '#000' : '#376ac2' }}>
          {formulario.fechaNacConyuge ? new Date(formulario.fechaNacConyuge
            ).toLocaleDateString("es-MX")  : "Selecciona una fecha"}
          </Text>
          </TouchableOpacity>
          {mostrarCalendario && (
            <DateTimePicker
              value={formulario.fechaNacConyuge ? new Date(formulario.fechaNacConyuge) : new Date()} 
              mode="date"
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

      <Text style={styles.label}>Teléfono de cónyuge</Text>
      <TextInput
        style={styles.input}
        placeholder="Número telefónico"
        value={formulario.telefonoConyuge}
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={(texto) => {
          const soloNumeros = texto.replace(/[^0-9]/g, '');
          updateField('telefonoConyuge', soloNumeros);
        }}
      />
       <Text style={styles.label}>Ocupación de cónyuge </Text>
            <TextInput  
              style={styles.input}
              placeholder="Ocupación del cónyuge"
              value={formulario.ocupacionConyuge}
              onChangeText={(texto) => {
              const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
              updateField('ocupacionConyuge', soloLetras);
            }} 
      />

      <Text style={styles.label}>Antiguedad laboral del cónyuge (meses o años)</Text> 
            <TextInput
              style={styles.input}
              placeholder="Meses o años"
              value={formulario.antiguedadLConyuge}
              onChangeText={(texto) => {
              const soLetras = texto.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
              updateField('antiguedadLConyuge', soLetras);
            }}
      />

      <Text style={styles.label}>Dirección del trabajo del cónyuge</Text>
          <TextInput style={styles.input}
            placeholder="(Calle, Número, Colonia, Estado)"
            value={formulario.direccionLConyuge} 
            onChangeText={(texto1) => {
            const soloLetras = texto1.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
            updateField('direccionLConyuge', soloLetras);
          }}
          />

           <Text style={styles.label}>Nombre de hijos que dependan del cliente </Text>
            <TextInput  
              style={styles.input}
              placeholder="Nombre de los hijos"
              value={formulario.nombreHijos}
              onChangeText={(texto) => {
              const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]/g, '');
              updateField('nombreHijos', soloLetras);  
            }} 
          />

          <Text style={styles.label}>Referencia 1:Nombre  </Text>
            <TextInput  
              style={styles.input}
              placeholder="Nombre del conocido"
              value={formulario.ref1Nombre}
              onChangeText={(texto) => {
              const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]/g, '');
              updateField('ref1Nombre', soloLetras);  
            }} 
          />

          <Text style={styles.label}>Referencia 1: Dirección </Text>
          <TextInput style={styles.input}
            placeholder="(Calle, Número, Colonia, Estado)"
            value={formulario.ref1Direccion}  
            onChangeText={(texto1) => {
            const soloLetras = texto1.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
            updateField('ref1Direccion', soloLetras);
          }}
          /> 
          
          <Text style={styles.label}>Referencia 1: Teléfono</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Número telefónico" 
                  value={formulario.ref1Telefono}
                  keyboardType="phone-pad"
                  maxLength={10}
                  onChangeText={(texto) => {
                    const soloNumeros = texto.replace(/[^0-9]/g, '');
                    updateField('ref1Telefono', soloNumeros);
                  }}
         />
         <Text style={styles.label}>Referencia 2:Nombre  </Text>
            <TextInput  
              style={styles.input}
              placeholder="Nombre del conocido"
              value={formulario.ref2Nombre}
              onChangeText={(texto) => {
              const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]/g, '');
              updateField('ref2Nombre', soloLetras);  
            }} 
          />

          <Text style={styles.label}>Referencia 2: Dirección </Text>
          <TextInput style={styles.input}
            placeholder="(Calle, Número, Colonia, Estado)"
            value={formulario.ref2Direccion}  
            onChangeText={(texto1) => {
            const soloLetras = texto1.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
            updateField('ref2Direccion', soloLetras);
          }}
          /> 
          
          <Text style={styles.label}>Referencia 2: Teléfono</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Número telefónico" 
                  value={formulario.ref2Telefono}
                  keyboardType="phone-pad"
                  maxLength={10}
                  onChangeText={(texto) => {
                    const soloNumeros = texto.replace(/[^0-9]/g, '');
                    updateField('ref2Telefono', soloNumeros);
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