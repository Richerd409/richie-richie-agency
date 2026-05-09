import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to worker-home screen
    router.replace("/(tabs)/worker-home");
  }, [router]);

  return null;
}
