import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth, type UserRole } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>("worker");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, phone, role });
      Alert.alert("Success", "Account created! Please login.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error) {
      Alert.alert("Registration Failed", "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Create Account</Text>
            <Text className="text-sm text-muted">Join Manpower Agency Platform</Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            {/* Name */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Full Name</Text>
              <TextInput
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                className="bg-surface border border-border rounded-lg p-4 text-foreground"
                placeholderTextColor="#9BA1A6"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Email Address</Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-surface border border-border rounded-lg p-4 text-foreground"
                placeholderTextColor="#9BA1A6"
              />
            </View>

            {/* Phone */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Phone Number</Text>
              <TextInput
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                className="bg-surface border border-border rounded-lg p-4 text-foreground"
                placeholderTextColor="#9BA1A6"
              />
            </View>

            {/* Role Selection */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Account Type</Text>
              <View className="gap-2">
                {(["worker", "supervisor", "client"] as UserRole[]).map((r) => (
                  <TouchableOpacity
                    key={r}
                    onPress={() => setRole(r)}
                    className={cn(
                      "p-3 rounded-lg border-2",
                      role === r ? "border-primary bg-primary bg-opacity-10" : "border-border bg-surface"
                    )}
                  >
                    <Text className="text-sm font-semibold text-foreground capitalize">{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              className={cn("p-4 rounded-lg items-center mt-4", loading ? "opacity-50" : "bg-primary")}
            >
              <Text className="text-white font-semibold">
                {loading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="items-center gap-2">
            <Text className="text-xs text-muted">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
