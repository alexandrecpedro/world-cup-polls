import { useNavigation } from "@react-navigation/native";
import { Row, Text, Pressable } from "native-base";

export function EmptyPollList() {
  /** REACT NATIVE HOOKS **/
  // useNavigation
  const { navigate } = useNavigation();

  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        You are not participating in {'\n'} any poll yet. How about
      </Text>

      <Pressable onPress={() => navigate("find")}>
          <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
            search for a code
          </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        or
      </Text>

      <Pressable onPress={() => navigate("new")}>
        <Text textDecorationLine="underline"  color="yellow.500">
          create a new one
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  );
}