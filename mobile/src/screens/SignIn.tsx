import { Fontisto } from "@expo/vector-icons"
import { Center, Icon, Text } from "native-base";
import { useAuth } from "../hooks/useAuth";

import Logo from "../assets/logo.svg";

import { Button } from "../components/Button";

export function SignIn() {
    /** HOOK **/
    const { signIn, isUserLoading } = useAuth();

    // console.log(`USER DATA => ${user}`);

    return (
        <Center flex={1} bgColor="gray.900" p={7}>
            <Logo width={212} height={40} />

            <Button
                type="SECONDARY"
                title="LOGIN WITH GOOGLE"
                leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
                mt={12}
                onPress={signIn}
                isLoading={isUserLoading}
                _loading={{ 
                    _spinner: { color: "white" }
                }}
            />

            <Text color="white" textAlign="center" mt={4}>
                We do not use any other information than {"\n"}
                your e-mail to create your account.
            </Text>
        </Center>
    );
}