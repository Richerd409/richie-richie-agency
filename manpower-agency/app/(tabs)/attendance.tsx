import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

interface AttendanceRecord {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
  location: string;
  status: "present" | "absent" | "pending";
  gpsAccuracy: string;
}

export default function AttendanceScreen() {
  // Mock data - TODO: Replace with API calls
  const attendanceHistory: AttendanceRecord[] = [
    {
      id: "1",
      date: "May 8, 2026",
      checkInTime: "09:15 AM",
      checkOutTime: "05:30 PM",
      location: "Downtown Office",
      status: "present",
      gpsAccuracy: "8m",
    },
    {
      id: "2",
      date: "May 7, 2026",
      checkInTime: "09:00 AM",
      checkOutTime: "05:00 PM",
      location: "Tech Park",
      status: "present",
      gpsAccuracy: "5m",
    },
    {
      id: "3",
      date: "May 6, 2026",
      checkInTime: "—",
      checkOutTime: "—",
      location: "—",
      status: "absent",
      gpsAccuracy: "—",
    },
  ];

  const handleCheckIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Implement GPS check-in with location services
    console.log("Check-in with GPS");
  };

  const handleCheckOut = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Implement GPS check-out
    console.log("Check-out with GPS");
  };

  const handleRequestManualAttendance = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // TODO: Open manual attendance request form
    console.log("Request manual attendance");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-success";
      case "absent":
        return "bg-error";
      case "pending":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  const renderAttendanceRecord = ({ item }: { item: AttendanceRecord }) => (
    <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-foreground">{item.date}</Text>
          <Text className="text-xs text-muted mt-1">{item.location}</Text>
        </View>
        <View className={`${getStatusColor(item.status)} px-3 py-1 rounded-full`}>
          <Text className="text-xs font-semibold text-white capitalize">{item.status}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-xs text-muted">Check-in</Text>
          <Text className="text-sm font-semibold text-foreground mt-1">{item.checkInTime}</Text>
        </View>
        <View className="h-1 flex-1 bg-border mx-2" />
        <View className="items-end">
          <Text className="text-xs text-muted">Check-out</Text>
          <Text className="text-sm font-semibold text-foreground mt-1">
            {item.checkOutTime || "—"}
          </Text>
        </View>
      </View>

      {item.gpsAccuracy !== "—" && (
        <View className="mt-3 pt-3 border-t border-border">
          <Text className="text-xs text-muted">GPS Accuracy: {item.gpsAccuracy}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="gap-6">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-2xl font-bold text-foreground">Attendance</Text>
            <Text className="text-sm text-muted">Track your daily check-ins and check-outs</Text>
          </View>

          {/* Today's Status Card */}
          <View className="bg-primary rounded-lg p-6 gap-4">
            <Text className="text-sm text-white text-opacity-80">Today's Status</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleCheckIn}
                className="flex-1 bg-white bg-opacity-20 rounded-lg p-4 items-center active:opacity-70"
              >
                <Text className="text-white font-semibold">Check In</Text>
                <Text className="text-xs text-white text-opacity-70 mt-1">GPS Required</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCheckOut}
                className="flex-1 bg-white bg-opacity-20 rounded-lg p-4 items-center active:opacity-70"
              >
                <Text className="text-white font-semibold">Check Out</Text>
                <Text className="text-xs text-white text-opacity-70 mt-1">End Shift</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Manual Request */}
          <TouchableOpacity
            onPress={handleRequestManualAttendance}
            className="border-2 border-primary rounded-lg p-4 items-center active:opacity-70"
          >
            <Text className="text-primary font-semibold">Request Manual Attendance</Text>
            <Text className="text-xs text-muted mt-1">For missed check-ins</Text>
          </TouchableOpacity>

          {/* Attendance History */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-foreground">Recent Attendance</Text>
              <TouchableOpacity>
                <Text className="text-xs text-primary font-semibold">View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={attendanceHistory}
              renderItem={renderAttendanceRecord}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Footer Spacing */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
