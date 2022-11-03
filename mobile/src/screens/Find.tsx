import { Heading, VStack } from "native-base";

import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Search by code" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Find your poll through {'\n'}
                    a single code!
                </Heading>

                <Input
                    mb={2}
                    placeholder="What is your poll code?"
                />

                <Button
                    title="SEARCH FOR A POLL"
                />
            </VStack>
        </VStack>
    )
}