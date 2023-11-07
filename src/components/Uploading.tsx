import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const Uploading = ({ image, progress }: any) => {
  return (
    <View className=" absolute w-screen h-screen justify-center items-center z-20 bg-black/50">
      <View className="py-6 bg-white rounded-lg space-y-4 w-3/4 justify-center items-center ">
        {image && (
          <Image
            className=" w-24 h-24 rounded-md"
            resizeMode="contain"
            source={{
              uri: image,
            }}
          />
        )}
        <Text className="">Uploading...</Text>
        <ProgressBar progress={progress} />
        <View className=" bg-black/10 w-full h-[1px]"></View>

        <TouchableOpacity
          onPress={() => {}}
          className=" flex justify-center items-center"
        >
          <Text className=" text-xl text-blue-500">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Uploading;
