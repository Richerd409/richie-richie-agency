import { ScrollView, View, Text, TouchableOpacity, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await logout();
    router.replace("/login");
  };

  const handleEditProfile = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log("Edit profile");
  };

  const handleChangePassword = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log("Change password");
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="gap-6">
          {/* Profile Header */}
          <View className="items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
              <Text className="text-4xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "W"}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground">{user?.name}</Text>
              <Text className="text-sm text-muted mt-1 capitalize">{user?.role} Account</Text>
            </View>
          </View>

          {/* Profile Information */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-4">
            <View className="gap-2">
              <Text className="text-xs font-semibold text-muted uppercase">Email</Text>
              <Text className="text-sm text-foreground">{user?.email}</Text>
            </View>
            <View className="h-px bg-border" />
            <View className="gap-2">
              <Text className="text-xs font-semibold text-muted uppercase">Phone</Text>
              <Text className="text-sm text-foreground">{user?.phone || "Not provided"}</Text>
            </View>
            <View className="h-px bg-border" />
            <View className="gap-2">
              <Text className="text-xs font-semibold text-muted uppercase">Worker ID</Text>
              <Text className="text-sm text-foreground">{user?.id}</Text>
            </View>
          </View>

          {/* Edit Profile */}
          <TouchableOpacity
            onPress={handleEditProfile}
            className="bg-primary rounded-lg p-4 items-center active:opacity-80"
          >
            <Text className="text-white font-semibold">Edit Profile</Text>
          </TouchableOpacity>

          {/* Settings */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Settings</Text>
            <View className="bg-surface rounded-lg border border-border overflow-hidden">
              {/* Notifications */}
              <View className="p-4 flex-row justify-between items-center border-b border-border">
                <View>
                  <Text className="text-sm font-semibold text-foreground">Notifications</Text>
                  <Text className="text-xs text-muted mt-1">Push notifications enabled</Text>
                </View>
                <Switch value={true} />
              </View>

              {/* Dark Mode */}
              <View className="p-4 flex-row justify-between items-center border-b border-border">
                <View>
                  <Text className="text-sm font-semibold text-foreground">Dark Mode</Text>
                  <Text className="text-xs text-muted mt-1">
                    {colorScheme === "dark" ? "Enabled" : "Disabled"}
                  </Text>
                </View>
                <Switch value={colorScheme === "dark"} />
              </View>

              {/* Language */}
              <TouchableOpacity className="p-4 flex-row justify-between items-center active:opacity-70">
                <View>
                  <Text className="text-sm font-semibold text-foreground">Language</Text>
                  <Text className="text-xs text-muted mt-1">English</Text>
                </View>
                <Text className="text-muted">English</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Security */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Security</Text>
            <TouchableOpacity
              onPress={handleChangePassword}
              className="bg-surface rounded-lg p-4 border border-border active:opacity-70"
            >
              <Text className="text-sm font-semibold text-foreground">Change Password</Text>
              <Text className="text-xs text-muted mt-1">Update your password</Text>
            </TouchableOpacity>
          </View>

          {/* About */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">About</Text>
            <View className="bg-surface rounded-lg p-4 border border-border gap-3">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">App Version</Text>
                <Text className="text-sm font-semibold text-foreground">1.0.0</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Build</Text>
                <Text className="text-sm font-semibold text-foreground">2026.05.08</Text>
              </View>
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-error rounded-lg p-4 items-center active:opacity-80 mb-4"
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
