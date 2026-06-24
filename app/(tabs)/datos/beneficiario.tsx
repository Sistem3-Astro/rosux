import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router";
import { useFormulario } from "@/context/FormContext";
import { useAuth } from '@/context/AuthContext';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


export default function beneficiario() { 
  const { formulario, updateField } = useFormulario();    
  const { usuario } = useAuth(); 
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const Siguiente = () => {
    if (!formulario.gServicio || formulario.gServicio <= 0) {
      Alert.alert("Error", "Ingresa el monto de servicios");
      return;
    }  
    if (!formulario.gFamiliar || formulario.gFamiliar <= 0) {
    Alert.alert('Error', 'Ingresa el monto de gastos familiares');
    return;
   }
   if (!formulario.gVenta) {
    Alert.alert('Error', 'Ingresa el monto de gastos de venta');
    return;
   }
    if (!formulario.gAlim || formulario.gAlim <= 0) {
    Alert.alert('Error', 'Ingresa el monto de gastos alimenticios');
    return;
   }
    if (!formulario.gVeh || formulario.gTransp) {
    Alert.alert('Error', 'Ingresa algun monto de gatos en vehiculo o transporte ');
    return;
   } 

    console.log("Usuario de benefi:", usuario); 
    Alert.alert("Éxito", "Registro exitoso");
    router.replace('/datos/beneficiario'); // redireccion a vivienda
  };
    const onChange = (event: DateTimePickerEvent,
     selectedDate?: Date) => {
       setMostrarCalendario(false);
   
       if (selectedDate) {
         updateField('fechaNacBenf', selectedDate);
        console.log("Usuario desde bene:", usuario); 
       }
     };

        const calcularEdad = (fechaNacimiento: string) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);

        let edad = hoy.getFullYear() - nacimiento.getFullYear();

        const mes = hoy.getMonth() - nacimiento.getMonth();

        if ( mes < 0 ||
            (mes === 0 && hoy.getDate() < nacimiento.getDate())
        ) {
            edad--;
        }
        return edad;
        };

        const edad = formulario.fechaNac
        ? calcularEdad(formulario.fechaNac)
        : '';

        const totalIngresos =
        formulario.salario +
        formulario.ventas +
        formulario.otrosIngresos +
        formulario.ingresoConyuge;

         const totalEgresos =
        formulario.renta +
        formulario.gServicio +
        formulario.gFamiliar +
        formulario.gVenta +
        formulario.gCirculoc +
        formulario.gAdmin +
        formulario.gEscolar +
        formulario.gAlim +
        formulario.gCalzVes +
        formulario.gVeh +
        formulario.gTransp;

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitulo}> 
      Bienvenido {usuario?.nombre_completo.split(' ')[0]}
      </Text>
      <Text style={styles.titulo}>DATOS DE BENEFICIARIO </Text>
      <Text style={styles.subtitulo}>Ingresa los datos solicitados</Text>

      <Text style={styles.label}>Nombre del beneficiario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del beneficiario"
              value={formulario.nomBenf}
              onChangeText={(texto) => {
              const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
              updateField('nomBenf', soloLetras);
        }}
      />
       <Text style={styles.label}>Lugar de nacimiento</Text>
            <TextInput style={styles.input}
              placeholder="Lugar de nacimiento"
              value={formulario.lugarNacBenf} 
              onChangeText={(texto1) => {
              const soloLetras = texto1.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]/g, '');
              updateField('lugarNacBenf', soloLetras);
            }}
        />

       <Text style={styles.label}>Fecha de nacimiento </Text>
       <TouchableOpacity
        style={styles.input}
        onPress={() => {setMostrarCalendario(true)
        }}
       >
       <Text>
       {formulario.fechaNacBenf ? new Date(formulario.fechaNacBenf
        ).toLocaleDateString("es-MX")
        : "Selecciona una fecha"}
        </Text>
       </TouchableOpacity>
       {mostrarCalendario && (
        <DateTimePicker
          value={formulario.fechaNacBenf ? new Date(formulario.fechaNacBenf) : new Date()} 
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}

       <Text style={styles.label}>Domicilio</Text>
         <TextInput style={styles.input}
         placeholder="(Calle, Número, Colonia, Estado)"
         value={formulario.direccionBenf} 
         onChangeText={(texto1) => {
         const soloLetras = texto1.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]/g, '');
         updateField('direccionBenf', soloLetras);
         }}
      />

       <Text style={styles.label}>Parentesco</Text>
           <View style={styles.pickerContainer}>
            <Picker   
              selectedValue={formulario.parentesco}
              onValueChange={(itemValue: string) => updateField('parentesco', itemValue)}
            > 
              <Picker.Item label="Selecciona parentesco" value="" />
              <Picker.Item label="Esposo/a" value="Esposo/a" />
              <Picker.Item label="Hijo/a" value="Lamina" />
              <Picker.Item label="Hermano/a" value="Block o ladrillo" />
              <Picker.Item label="Primo/a" value="Adobe" />
              <Picker.Item label="Padre" value="Madera" />
              <Picker.Item label="Madre" value="Palma" />
              <Picker.Item label="Cuñado/a" value="Cunado/a" />
              <Picker.Item label="Suegro/a" value="Suegro/a" />
              <Picker.Item label="Tio/a" value="Tio/a" />
              <Picker.Item label="Amigo/a" value="Amigo/a" />
            </Picker>
            </View>  

      <Text style={styles.label}>Edad del cliente</Text> 
       <TextInput
        style={styles.input}
        value={edad.toString()}
        editable={false}
      />

      <Text style={styles.label}>Ingresos del cliente</Text> 
       <TextInput
        style={styles.input}
        value={totalIngresos}
        editable={false}
      />

      <Text style={styles.label}>Egresos del cliente</Text> 
       <TextInput
        style={styles.input}
        value={totalEgresos}
        editable={false}
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