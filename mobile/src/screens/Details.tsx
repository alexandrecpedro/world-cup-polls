import { useEffect, useState } from "react";
import { Share } from "react-native";
import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { EmptyMyPollList } from "../components/EmptyMyPollList";
import { Guesses } from "../components/Guesses";
import { Loading } from "../components/Loading";
import { PollCardProps } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { Option } from "../components/Option";

interface RouteParams {
    id: string;
}

export function Details() {
    /** REACT NATIVE HOOKS **/
    // useState
    const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">("guesses");
    const [isLoading, setIsLoading] = useState(true);
    const [pollDetails, setPollDetails] = useState<PollCardProps>({} as PollCardProps);

    // useToast
    const toast = useToast();

    // useRoute
    const route = useRoute();
    const { id } = route.params as RouteParams;

    // useEffect
    useEffect(() => {
        fetchPoolDetails();
    }, [id]);

    /** FUNCTIONS **/
    async function fetchPoolDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/polls/${id}`);
            setPollDetails(response.data.poll);
        } catch (error) {
            console.log(error);
            toast.show({
                title: "Poll details not found!",
                placement: "top",
                bgColor: "red.500"
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: pollDetails.code
        });
    }

    isLoading && <Loading />

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
                title={pollDetails.title}
                showBackButton
                showShareButton
                onShare={handleCodeShare}
            />

            {
                pollDetails._count?.participants > 0 ?
                    <VStack px={5} flex={1}>
                        <PollHeader data={pollDetails} />

                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option
                                title="Your guesses"
                                isSelected={optionSelected === "guesses"}
                                onPress={() => setOptionSelected("guesses")}
                            />
                            <Option
                                title="Group ranking"
                                isSelected={optionSelected === "ranking"}
                                onPress={() => setOptionSelected("ranking")}
                            />
                        </HStack>

                        <Guesses pollId={pollDetails.id} code={pollDetails.code} />
                    </VStack>
                    : <EmptyMyPollList code={pollDetails.code} />
            }
        </VStack>
    );
}