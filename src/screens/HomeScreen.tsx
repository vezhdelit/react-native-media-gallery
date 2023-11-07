import {
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";
import Uploading from "../components/Uploading";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import {
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
  FIRESTORE_DB,
} from "../../firebaseConfig";

const HomeScreen = () => {
  const user = FIREBASE_AUTH.currentUser;
  const [image, setImage] = useState<string>("");
  const [progress, setProgress] = useState<number>();
  const [files, setFiles] = useState<any>([]);

  const fetchMedia = async () => {
    const unsubscribe = onSnapshot(
      collection(FIRESTORE_DB, "users", user?.uid || "", "uploads"),
      {
        next: (snapshot) => {
          const files: any[] = [];
          snapshot.docs.forEach((doc) => {
            files.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setFiles(files);
        },
      }
    );

    return () => unsubscribe();
  };
  useEffect(() => {
    fetchMedia();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  };

  const uploadImage = async (uri: string, fileType: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(FIREBASE_STORAGE, "media/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(+progress.toFixed());
      },
      (error) => {
        console.log(error);
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          // save record
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          setImage("");
        });
      }
    );
  };

  async function saveRecord(fileType: any, url: string, createdAt: string) {
    console.log("SAVE RECORD");
    try {
      const docRef = doc(
        FIRESTORE_DB,
        "users",
        user?.uid || "",
        "uploads",
        createdAt
      );
      await setDoc(docRef, {
        fileType,
        url,
        createdAt,
      });

      console.log("document saved correctly");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView className="flex-1 ">
      <Header />

      {image && <Uploading image={image} progress={progress} />}
      <TouchableOpacity
        onPress={pickImage}
        className=" absolute z-10 bottom-24 right-8 w-12 h-12 bg-black justify-center items-center rounded-full"
      >
        <Ionicons name="image" size={24} color="white" />
      </TouchableOpacity>

      {files.length > 0 ? (
        <FlatList
          className=" p-3 "
          numColumns={3}
          contentContainerStyle={{ gap: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          data={files}
          scrollEnabled
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <Image
                  className=" w-32 h-32 rounded-lg "
                  source={{ uri: item.url }}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
