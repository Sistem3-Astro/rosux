import { useEffect } from "react";
import { router } from "expo-router";
import Splash from "./Splash";

export default function Index() {

  useEffect(() => {
    const timer = setTimeout(() => {
<<<<<<< HEAD
      router.replace("/loginadmin");
    }, 5000);
=======
      router.replace("/login");
    }, 3000); // 5 segundos
>>>>>>> 7374f32958edb4b5d0d699057bba3f2bf1e518f8

    return () => clearTimeout(timer);
  }, []);

  return <Splash />;
} 