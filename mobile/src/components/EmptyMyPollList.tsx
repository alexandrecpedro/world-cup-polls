import { Row, Text, Pressable } from "native-base";
import { Share } from "react-native";

interface Props {
    code: string;
}

export function EmptyMyPollList({ code }: Props) {
    /** FUNCTION **/
    async function handleCodeShare() {
        await Share.share({
          message: code
        })
      }
    return (
        <Row flexWrap="wrap" justifyContent="center" p={4}>
            <Text color="gray.200" fontSize="sm">
                This poll does not have participants yet. How about
            </Text>

            <Pressable onPress={handleCodeShare}>
                <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
                    share the poll
                </Text>
            </Pressable>

            <Text color="gray.200" fontSize="sm" mx={1}>
                code with somebody?
            </Text>

            <Text color="gray.200" mr={1}>
                Use the code
            </Text>

            <Text color="gray.200" fontSize="sm" textAlign="center" fontFamily="heading">
                {code}
            </Text>
        </Row>
    );
}