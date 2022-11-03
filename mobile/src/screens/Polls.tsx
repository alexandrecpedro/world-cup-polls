import { Icon, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";

export function Polls() {
    /** REACT HOOK **/
    // useNavigation
    const { navigate } = useNavigation();
    
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="My Polls" />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button 
                    title="SEARCH A POLL BY CODE"
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                    onPress={() => navigate("find")}
                />
            </VStack>
        </VStack>
    )
}