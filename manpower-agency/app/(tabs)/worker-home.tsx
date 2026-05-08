import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/auth-context";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: "pending" | "confirmed" | "completed";
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function WorkerHomeScreen() {
  const { user } = useAuth();
  const colors = useColors();

  // Mock data - TODO: Replace with API calls
  const upcomingShifts: Shift[] = [
    {
      id: "1",
      date: "Today",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      location: "Downtown Office",
      status: "confirmed",
    },
    {
      id: "2",
      date: "Tomorrow",
      startTime: "10:00 AM",
      endTime: "06:00 PM",
      location: "Tech Park",
      status: "pending",
    },
  ];

  const unreadNotifications = 3;
  const currentStatus = "On Duty";
  const todayEarnings = "₹450";

  const handleCheckIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Implement GPS check-in
    console.log("Check-in pressed");
  };

  const handleCheckOut = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Implement GPS check-out
    console.log("Check-out pressed");
  };

  const renderShiftCard = ({ item }: { item: Shift }) => (
    <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-sm font-semibold text-foreground">{item.date}</Text>
          <Text className="text-xs text-muted mt-1">
            {item.startTime} - {item.endTime}
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "confirmed"
              ? "bg-success bg-opacity-20"
              : "bg-warning bg-opacity-20"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "confirmed" ? "text-success" : "text-warning"
            }`}
          >
            {item.status === "confirmed" ? "Confirmed" : "Pending"}
          </Text>
        </View>
      </View>
      <Text className="text-sm text-foreground">{item.location}</Text>
    </View>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="gap-6">
          {/* Header with Greeting */}
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">
              Welcome, {user?.name || "Worker"}
            </Text>
            <Text className="text-sm text-muted">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>

          {/* Status Card */}
          <View className="bg-primary rounded-lg p-6 gap-4">
            <View className="gap-2">
              <Text className="text-sm text-white text-opacity-80">Current Status</Text>
              <Text className="text-3xl font-bold text-white">{currentStatus}</Text>
            </View>
            <View className="h-1 bg-white bg-opacity-20 rounded-full" />
            <View className="flex-row justify-between">
              <View>
                <Text className="text-xs text-white text-opacity-70">Today's Earnings</Text>
                <Text className="text-lg font-semibold text-white mt-1">{todayEarnings}</Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-white text-opacity-70">Check-in Time</Text>
                <Text className="text-lg font-semibold text-white mt-1">09:15 AM</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Quick Actions</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleCheckIn}
                className="flex-1 bg-success rounded-lg p-4 items-center active:opacity-80"
              >
                <Text className="text-white font-semibold">Check In</Text>
                <Text className="text-xs text-white text-opacity-70 mt-1">GPS Location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCheckOut}
                className="flex-1 bg-error rounded-lg p-4 items-center active:opacity-80"
              >
                <Text className="text-white font-semibold">Check Out</Text>
                <Text className="text-xs text-white text-opacity-70 mt-1">End Shift</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Upcoming Shifts */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-foreground">Upcoming Shifts</Text>
              <TouchableOpacity>
                <Text className="text-xs text-primary font-semibold">View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={upcomingShifts}
              renderItem={renderShiftCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Notifications */}
          <View className="bg-warning bg-opacity-10 rounded-lg p-4 flex-row items-center gap-3 border border-warning border-opacity-30">
            <View className="w-8 h-8 rounded-full bg-warning items-center justify-center">
              <Text className="text-white font-bold text-xs">{unreadNotifications}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground">
                {unreadNotifications} New Notifications
              </Text>
              <Text className="text-xs text-muted mt-1">Tap to view all updates</Text>
            </View>
          </View>

          {/* Footer Spacing */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
