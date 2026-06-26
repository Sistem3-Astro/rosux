import { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router";
import { useFormulario } from "@/context/FormContext";
import { useAuth } from '@/context/AuthContext';
import {guardarSolicitud} from '@/database/registrar'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


export default function beneficiario() { 
  const { formulario, updateField, resetFormulario } = useFormulario();    
  const { usuario } = useAuth(); 
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

   const calcularEdad = (fechaNacimiento: Date) => {
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
    ? calcularEdad(formulario.fechaNac) : 0;

        const totalIngresos =
        (Number(formulario.salario) || 0 )+
        (Number(formulario.ventas ) || 0 )+
        (Number(formulario.otrosIngresos) || 0) +
        (Number(formulario.ingresoConyuge)|| 0);

         const totalEgresos =
        (Number(formulario.renta) || 0) +
        (Number(formulario.gServicio) || 0) +
        (Number(formulario.gFamiliar) || 0) +
        (Number(formulario.gVenta) || 0) +
        (Number(formulario.gCirculoc) || 0) +
        (Number(formulario.gAdmin) || 0) +
        (Number(formulario.gEscolar) || 0) +
        (Number(formulario.gAlim) || 0) +
        (Number(formulario.gCalzVes) || 0) +
        (Number(formulario.gVeh) || 0) +
        (Number(formulario.gTransp) || 0);


  const Siguiente = async () => {
    if (!formulario.nomBenf) {
      Alert.alert("Error", "Ingresa el nombre del beneficiario");
      return;
    }  
    if (!formulario.lugarNacBenf) {
    Alert.alert('Error', 'Selecciona la fecha de nacimiento');
    return;
   }
   if (!formulario.direccionBenf) {
    Alert.alert('Error', 'Ingresa el domicilio');
    return;
   }
    if (!formulario.parentesco) {
    Alert.alert('Error', 'Selecciona un parentesco');
    return;
   }

    console.log("Usuario de benefi:", usuario); 
    try {
      
      const formularioActualizado = {
      ...formulario,
      edad,
      ingresos: totalIngresos,
      egresos: totalEgresos,
    };

    await guardarSolicitud(formularioActualizado, usuario);

    Alert.alert("Éxito", "Registro guardado correctamente",
      [
        {
          text: "Aceptar",
          onPress: () => {
            resetFormulario(); // opcional
            router.replace("/(tabs)/formu");
          },
        },
      ]
    );

  } catch (error) {
    console.error("Error al guardar:", error);
    Alert.alert("Error", "No fue posible guardar el registro"  );
  }

  };
    const onChange = (event: DateTimePickerEvent,
     selectedDate?: Date) => {
       setMostrarCalendario(false);   
       if (selectedDate) {
         updateField('fechaNacBenf', selectedDate);
       }
     };

       
  

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
              <Picker.Item label="Hijo/a" value="Hijo/a" />
              <Picker.Item label="Hermano/a" value="Hermano/a" />
              <Picker.Item label="Primo/a" value="Primo/a" />
              <Picker.Item label="Padre" value="Padre" />
              <Picker.Item label="Madre" value="Madre" />
              <Picker.Item label="Cuñado/a" value="Cuñado/a" />
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
        value={Number(totalIngresos || 0).toFixed(2)}
        editable={false}
      />

      <Text style={styles.label}>Egresos del cliente</Text> 
       <TextInput
        style={styles.input}
        value={Number(totalEgresos || 0).toFixed(2)}
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