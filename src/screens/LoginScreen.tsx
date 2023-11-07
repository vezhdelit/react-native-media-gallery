import { View, ActivityIndicator, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import GoogleSignIn from "../components/ui/button/GoogleSignInButton";

const LoginScreen = ({ navigation }: any) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<Boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoadingAuth(true);
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setIsLoadingAuth(false);
    });
  }, []);

  if (isLoadingAuth) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className="flex-1 items-center justify-center space-y-4 p-8 pb-20">
      <Image
        className="h-52 w-full"
        resizeMode="contain"
        source={{
          uri: "https://cdn0.iconfinder.com/data/icons/azure-illustrations/1000/messages___paper_airplane_aeroplane_memo_send_message_woman-512.png",
        }}
      />
      <Text className="text-3xl text-center font-bold">
        Welcome to your Cloud Media Gallery!
      </Text>

      <View className="w-full pt-10">
        <GoogleSignIn FIREBASE_AUTH={FIREBASE_AUTH} />
      </View>
    </View>
  );
};

export default LoginScreen;
