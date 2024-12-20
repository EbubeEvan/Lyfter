import { router } from "expo-router";
import { Alert, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
    isValidRoute,
  } = useLocationStore();

  if (isValidRoute === false) {
    Alert.alert(
      "No Route Found",
      "The selected destination is not reachable from your location and you are unable to move forward. Please choose another destination.",
    );
  }

  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>

        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>

        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      {isValidRoute && (
        <CustomButton
          title="Find Now"
          onPress={() => router.push(`/(root)/confirm-ride`)}
          className="mt-5"
        />
      )}
    </RideLayout>
  );
};

export default FindRide;
