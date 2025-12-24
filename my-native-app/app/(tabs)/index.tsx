import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

type Post = {
  id: string;
  title: string;
};

const MOCK_POSTS: Post[] = [
  { id: "1", title: "Welcome to the community!" },
  { id: "2", title: "Check out our new features" },
  { id: "3", title: "This post might be spam" },
];

const FLAG_REASONS = ["Spam", "Inappropriate"];

export default function App() {
  const [posts] = useState<Post[]>(MOCK_POSTS);

  const sendFlagToBackend = async (postId: string, reason: string) => {
    console.log("Flag sent:", { postId, reason, userId: "user-123" });
    // fetch
  };

  const onFlagPress = (postId: string) => {
    Alert.alert(
      "Flag post",
      "Select a reason",
      FLAG_REASONS.map((reason) => ({
        text: reason,
        onPress: async () => {
          await sendFlagToBackend(postId, reason);
          Alert.alert("Thank you", "Post has been flagged");
        },
      }))
    );
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.post}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        style={styles.flagButton}
        onPress={() => onFlagPress(item.id)}
      >
        <Text style={styles.flagText}>Flag</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  post: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  flagButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffdddd",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  flagText: {
    color: "#cc0000",
    fontWeight: "500",
  },
});
