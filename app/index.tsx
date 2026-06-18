import { useEffect } from "react";
import { router } from "expo-router";
import Splash from "./Splash";

export default function Index() {

  useEffect(() => {
    const timer = setTimeout(() => {
    
      router.replace("/loginadmin");
    }, 3000); // 5 segundos

    return () => clearTimeout(timer);
  }, []);

  return <Splash />;
} 