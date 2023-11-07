import { View, Text, Image } from "react-native";
import React from "react";

const EmptyState = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-4 pb-32">
      <Image
        className="w-full h-3/6"
        resizeMode="contain"
        source={{
          uri: "https://cdn0.iconfinder.com/data/icons/azure-illustrations/1000/support___question_faq_list_frequently_asked_questions_question_mark_information_info-512.png",
        }}
      />
      <Text className="text-lg font-medium text-gray-600">
        There is no media yet
      </Text>
    </View>
  );
};

export default EmptyState;
