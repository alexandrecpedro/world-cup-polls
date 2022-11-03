import { Text } from "native-base";

export function EmptyRakingList() {
  return (
    <Text color="white" fontSize="sm" textAlign="center">
      This poll ranking has not yet been {'\n'} 
      formed. Wait for the results.
    </Text>
  );
}