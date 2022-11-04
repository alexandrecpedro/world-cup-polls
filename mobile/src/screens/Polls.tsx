import { useCallback, useState } from "react";
import { FlatList, Icon, useToast, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { EmptyPollList } from "../components/EmptyPollList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PollCard, PollCardProps } from "../components/PollCard";

export function Polls() {
    /** REACT NATIVE HOOKS **/
    // useState
    const [isLoading, setIsLoading] = useState(true);
    const [polls, setPolls] = useState<PollCardProps[]>([]);

    // useNavigation
    const { navigate } = useNavigation();

    // useToast
    const toast = useToast();

    // useFocusEffect
    useFocusEffect(useCallback(() => {
        fetchPolls();
    }, []))

    /** FUNCTION **/
    async function fetchPolls() {
        try {
            setIsLoading(true);
            const response = await api.get("/polls");
            setPolls(response.data.polls);
        } catch (error) {
            console.log(error);
            toast.show({
                title: "It was not possible to load the polls",
                placement: "top",
                bgColor: "red.500"
            });
        } finally {
            setIsLoading(false);
        }
    }

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

            {
                isLoading ? <Loading /> :
                    <FlatList
                        data={polls}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <PollCard
                                data={item}
                                onPress={() => navigate("details", { id: item.id })}
                            />
                        )}
                        ListEmptyComponent={() => <EmptyPollList />}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ pb: 10 }}
                        px={5}
                    />
            }
        </VStack>
    );
}