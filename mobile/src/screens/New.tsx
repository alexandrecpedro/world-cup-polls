import { Heading, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";

import { api } from "../services/api";

import Logo from "../assets/logo.svg";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function New() {
    /** REACT NATIVE HOOKS **/
    // useState
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // useToast
    const toast = useToast();
    
    /** FUNCTION **/
    async function handlePollCreate() {
        if (!title.trim()) {
            return toast.show({
                title: "Inform a name to your poll!",
                placement: "top",
                bgColor: "red.500"
            });
        }

        try {
            setIsLoading(true);
            await api.post("/polls", { title });

            toast.show({
                title: "Successfully created poll!",
                placement: "top",
                bgColor: "green.500"
            });
            
            setTitle("");
        } catch (error) {
            console.log(error);
            toast.show({
                title: "It was not possible to create the poll!",
                placement: "top",
                bgColor: "red.500"
            });
        } finally {
            setIsLoading(false);
        }
    }

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
                    onChangeText={setTitle}
                    value={title}
                />

                <Button
                    title="CREATE MY POLL"
                    onPress={handlePollCreate}
                    isLoading={isLoading}
                />

                <Text color="gray-200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    After create your poll, you will receive an unique code
                    that you could share to invite other people.
                </Text>
            </VStack>
        </VStack>
    )
}