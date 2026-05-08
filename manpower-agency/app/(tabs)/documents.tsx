import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

interface Document {
  id: string;
  type: string;
  status: "verified" | "pending" | "rejected" | "expired";
  uploadDate: string;
  expiryDate?: string;
}

export default function DocumentsScreen() {
  const documents: Document[] = [
    {
      id: "1",
      type: "Aadhaar",
      status: "verified",
      uploadDate: "Jan 15, 2026",
    },
    {
      id: "2",
      type: "Passport",
      status: "verified",
      uploadDate: "Jan 20, 2026",
      expiryDate: "Dec 10, 2028",
    },
    {
      id: "3",
      type: "Visa",
      status: "expired",
      uploadDate: "Mar 1, 2024",
      expiryDate: "Mar 1, 2026",
    },
    {
      id: "4",
      type: "Bank Account",
      status: "pending",
      uploadDate: "May 5, 2026",
    },
  ];

  const handleUploadDocument = async (docType: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log(`Upload ${docType}`);
  };

  const handleViewDocument = async (docId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log(`View document ${docId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return { bg: "bg-success", text: "text-success" };
      case "pending":
        return { bg: "bg-warning", text: "text-warning" };
      case "rejected":
        return { bg: "bg-error", text: "text-error" };
      case "expired":
        return { bg: "bg-error", text: "text-error" };
      default:
        return { bg: "bg-muted", text: "text-muted" };
    }
  };

  const renderDocumentCard = ({ item }: { item: Document }) => {
    const colors = getStatusColor(item.status);

    return (
      <TouchableOpacity
        onPress={() => handleViewDocument(item.id)}
        className="bg-surface rounded-lg p-4 mb-3 border border-border active:opacity-70"
      >
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground">{item.type}</Text>
            <Text className="text-xs text-muted mt-1">Uploaded {item.uploadDate}</Text>
          </View>
          <View className={`${colors.bg} bg-opacity-20 px-3 py-1 rounded-full`}>
            <Text className={`text-xs font-semibold ${colors.text} capitalize`}>
              {item.status}
            </Text>
          </View>
        </View>

        {item.expiryDate && (
          <View className="mt-2 pt-2 border-t border-border">
            <Text className="text-xs text-muted">Expires: {item.expiryDate}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="gap-6">
          <View className="gap-1">
            <Text className="text-2xl font-bold text-foreground">Documents</Text>
            <Text className="text-sm text-muted">Manage your identity and verification documents</Text>
          </View>

          <View className="bg-error bg-opacity-10 rounded-lg p-4 border border-error border-opacity-30">
            <Text className="text-sm font-semibold text-error">Document Expiring</Text>
            <Text className="text-xs text-error text-opacity-80 mt-1">
              Your Visa expires on Mar 1, 2026. Please renew it soon.
            </Text>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Upload Documents</Text>
            <TouchableOpacity
              onPress={() => handleUploadDocument("Aadhaar")}
              className="border-2 border-dashed border-primary rounded-lg p-4 items-center active:opacity-70"
            >
              <Text className="text-primary font-semibold">+ Add New Document</Text>
              <Text className="text-xs text-muted mt-1">Aadhaar, Passport, Visa, etc.</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Your Documents</Text>
            <FlatList
              data={documents}
              renderItem={renderDocumentCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
