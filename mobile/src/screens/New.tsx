import { Heading, Text, VStack } from "native-base";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function New() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Create a new poll" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Create your own World Cup poll{'\n'}
                    and share with friends!
                </Heading>

                <Input
                    mb={2}
                    placeholder="What is your poll name?"
                />

                <Button
                    title="CREATE MY POLL"
                />

                <Text color="gray-200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    After create your poll, you will receive an unique code
                    that you could share to invite other people.
                </Text>
            </VStack>
        </VStack>
    )
}