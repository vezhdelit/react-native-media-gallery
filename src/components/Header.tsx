import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const handleSignOut = async () => {
  try {
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

const Header = () => {
  const user = FIREBASE_AUTH.currentUser;
  return (
    <View className="flex flex-row p-6 justify-between items-center ">
      <Text className="text-xl font-medium">My Media</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Image
          className="w-10 h-10 rounded-full"
          source={{
            uri:
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
