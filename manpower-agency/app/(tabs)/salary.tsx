import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

interface PayslipRecord {
  id: string;
  month: string;
  totalEarnings: string;
  paymentDate: string;
  status: "paid" | "pending" | "processing";
}

interface SalaryBreakdown {
  label: string;
  amount: string;
  type: "earning" | "deduction";
}

export default function SalaryScreen() {
  // Mock data - TODO: Replace with API calls
  const currentMonth = "May 2026";
  const totalEarnings = "₹12,450";
  const paymentDate = "May 31, 2026";

  const salaryBreakdown: SalaryBreakdown[] = [
    { label: "Base Salary", amount: "₹10,000", type: "earning" },
    { label: "Overtime (8 hours @ ₹250/hr)", amount: "₹2,000", type: "earning" },
    { label: "Bonus", amount: "₹450", type: "earning" },
    { label: "Tax Deduction", amount: "-₹500", type: "deduction" },
    { label: "Uniform Deduction", amount: "-₹500", type: "deduction" },
  ];

  const payslipHistory: PayslipRecord[] = [
    {
      id: "1",
      month: "April 2026",
      totalEarnings: "₹11,200",
      paymentDate: "May 1, 2026",
      status: "paid",
    },
    {
      id: "2",
      month: "March 2026",
      totalEarnings: "₹10,800",
      paymentDate: "April 1, 2026",
      status: "paid",
    },
    {
      id: "3",
      month: "February 2026",
      totalEarnings: "₹9,950",
      paymentDate: "March 1, 2026",
      status: "paid",
    },
  ];

  const handleDownloadPayslip = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Generate and download PDF payslip
    console.log("Download payslip");
  };

  const handleViewDetails = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Open detailed breakdown
    console.log("View details");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success";
      case "pending":
        return "bg-warning";
      case "processing":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  const renderPayslipRecord = ({ item }: { item: PayslipRecord }) => (
    <TouchableOpacity
      onPress={handleViewDetails}
      className="bg-surface rounded-lg p-4 mb-3 border border-border active:opacity-70"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-foreground">{item.month}</Text>
          <Text className="text-xs text-muted mt-1">Paid on {item.paymentDate}</Text>
        </View>
        <View className="items-end">
          <Text className="text-lg font-bold text-foreground">{item.totalEarnings}</Text>
          <View className={`${getStatusColor(item.status)} px-3 py-1 rounded-full mt-2`}>
            <Text className="text-xs font-semibold text-white capitalize">{item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBreakdownItem = ({ item }: { item: SalaryBreakdown }) => (
    <View className="flex-row justify-between items-center py-3 border-b border-border">
      <Text className="text-sm text-foreground">{item.label}</Text>
      <Text
        className={`text-sm font-semibold ${
          item.type === "earning" ? "text-success" : "text-error"
        }`}
      >
        {item.amount}
      </Text>
    </View>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="gap-6">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-2xl font-bold text-foreground">Salary & Payroll</Text>
            <Text className="text-sm text-muted">Track your earnings and payslips</Text>
          </View>

          {/* Current Month Card */}
          <View className="bg-primary rounded-lg p-6 gap-4">
            <View className="gap-2">
              <Text className="text-sm text-white text-opacity-80">{currentMonth}</Text>
              <Text className="text-4xl font-bold text-white">{totalEarnings}</Text>
            </View>
            <View className="h-1 bg-white bg-opacity-20 rounded-full" />
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-xs text-white text-opacity-70">Payment Date</Text>
                <Text className="text-sm font-semibold text-white mt-1">{paymentDate}</Text>
              </View>
              <TouchableOpacity
                onPress={handleDownloadPayslip}
                className="bg-white bg-opacity-20 px-4 py-2 rounded-lg active:opacity-70"
              >
                <Text className="text-white font-semibold text-sm">Download</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Salary Breakdown */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <Text className="text-sm font-semibold text-foreground">Salary Breakdown</Text>
            <FlatList
              data={salaryBreakdown}
              renderItem={renderBreakdownItem}
              keyExtractor={(item) => item.label}
              scrollEnabled={false}
            />
          </View>

          {/* Payslip History */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-foreground">Payslip History</Text>
              <TouchableOpacity>
                <Text className="text-xs text-primary font-semibold">View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={payslipHistory}
              renderItem={renderPayslipRecord}
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
