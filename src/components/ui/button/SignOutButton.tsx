import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";

const handleSignOut = async () => {
  try {
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

const SignOut = () => {
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Ionicons name="arrow-back-circle-outline" size={56} color="black" />
    </TouchableOpacity>
  );
};

export default SignOut;
