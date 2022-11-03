import { Row, Text, Pressable } from "native-base";

export function EmptyPollList() {
  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        You are not participating in {'\n'} any poll yet. How about
      </Text>

      <Pressable>
          <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
            search for a code
          </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        or
      </Text>

      <Pressable>
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