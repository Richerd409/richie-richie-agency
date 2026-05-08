import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth, type UserRole } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<"role" | "email" | "otp">("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: "worker", label: "Worker", description: "Field worker or staff" },
    { value: "supervisor", label: "Supervisor", description: "Team lead or manager" },
    { value: "client", label: "Client", description: "Company or client" },
    { value: "admin", label: "Admin", description: "System administrator" },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep("email");
  };

  const handleSendOtp = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    // TODO: Call API to send OTP
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim() || !selectedRole) {
      Alert.alert("Error", "Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      await login(email, otp, selectedRole);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid OTP or credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center gap-8">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-4xl font-bold text-foreground">Manpower</Text>
            <Text className="text-base text-muted">Agency Management Platform</Text>
          </View>

          {/* Role Selection */}
          {step === "role" && (
            <View className="gap-4">
              <Text className="text-lg font-semibold text-foreground">Select Your Role</Text>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.value}
                  onPress={() => handleRoleSelect(role.value)}
                  className={cn(
                    "p-4 rounded-lg border-2 transition",
                    selectedRole === role.value
                      ? "border-primary bg-primary bg-opacity-10"
                      : "border-border bg-surface"
                  )}
                >
                  <Text className="text-base font-semibold text-foreground">{role.label}</Text>
                  <Text className="text-sm text-muted mt-1">{role.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Email Input */}
          {step === "email" && (
            <View className="gap-4">
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

              <TouchableOpacity
                onPress={handleSendOtp}
                className="bg-primary p-4 rounded-lg items-center"
              >
                <Text className="text-white font-semibold">Send OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStep("role")}>
                <Text className="text-center text-primary font-semibold">Back</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* OTP Input */}
          {step === "otp" && (
            <View className="gap-4">
              <View>
                <Text className="text-sm font-semibold text-foreground mb-2">Enter OTP</Text>
                <Text className="text-xs text-muted mb-3">
                  We've sent a 6-digit code to {email}
                </Text>
                <TextInput
                  placeholder="000000"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                  className="bg-surface border border-border rounded-lg p-4 text-foreground text-center text-2xl tracking-widest"
                  placeholderTextColor="#9BA1A6"
                />
              </View>

              <TouchableOpacity
                onPress={handleVerifyOtp}
                disabled={loading}
                className={cn("p-4 rounded-lg items-center", loading ? "opacity-50" : "bg-primary")}
              >
                <Text className="text-white font-semibold">
                  {loading ? "Verifying..." : "Verify & Login"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStep("email")}>
                <Text className="text-center text-primary font-semibold">Change Email</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Footer */}
          <View className="items-center gap-2">
            <Text className="text-xs text-muted">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text className="text-primary font-semibold">Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
