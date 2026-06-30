import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {Animated, Easing, StyleSheet, Text, View } from "react-native";

export default function Splash() { 
  const opacity = useRef(new Animated.Value(2)).current;
  const scale = useRef(new Animated.Value(0.5)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []); 
    return (
    <View style={styles.container}>
       <Animated.Text
        style={[
          styles.titulo,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        Bienvenido
      </Animated.Text>

      <Animated.Text
        style={[
          styles.subtitulo,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        SACIMEX
      </Animated.Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D6337",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#FFF",
    fontSize: 24,
    marginTop: 10,
  },
});