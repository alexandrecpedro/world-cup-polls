import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";

export function Find() {
    /** REACT NATIVE HOOKS **/
    // useState
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");

    // useToast
    const toast = useToast();

    // useNavigation
    const { navigate } = useNavigation();

    /** FUNCTION **/
    async function handleJoinPoll() {
        try {
            setIsLoading(true);

            if (!code.trim()) {
                return toast.show({
                    title: "Enter the code",
                    placement: "top",
                    bgColor: "red.500"
                });
            }

            await api.post("/polls/join", { code });

            toast.show({
                title: "Successfully entered the poll!",
                placement: "top",
                bgColor: "gree.500"
            });

            navigate("polls");
        } catch (error) {
            console.log(error);
            setIsLoading(false);

            if (error.response?.data?.message === "You already joined this poll!") {
                return toast.show({
                    title: error.response.data.message,
                    placement: "top",
                    bgColor: "red.500"
                });
            }

            return toast.show({
                title: "Poll not found!",
                placement: "top",
                bgColor: "red.500"
            });
        }
    }
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
                    autoCapitalize="characters"
                    onChangeText={setCode}
                />

                <Button
                    title="SEARCH FOR A POLL"
                    onPress={handleJoinPoll}
                />
            </VStack>
        </VStack>
    )
}