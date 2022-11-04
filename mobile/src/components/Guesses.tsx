import { useEffect, useState } from "react";
import { FlatList, useToast } from "native-base";

import { api } from "../services/api";

import { Game, GameProps } from "./Game";
import { EmptyMyPollList } from "./EmptyMyPollList";
import { Loading } from "./Loading";

interface Props {
	pollId: string;
	code: string;
}

export function Guesses({ pollId, code }: Props) {
	/** REACT NATIVE HOOKS **/
	// useState
	const [isLoading, setIsLoading] = useState(true);
	const [games, setGames] = useState<GameProps[]>([]);
	const [firstTeamPoints, setFirstTeamPoints] = useState("");
	const [secondTeamPoints, setSecondTeamPoints] = useState("");

	// useToast
	const toast = useToast();

	// useEffect
	useEffect(() => {
		fetchGames();
	}, []);

	/** FUNCTIONS **/
	async function fetchGames() {
		try {
			setIsLoading(true);
			const response = await api.get(`/polls/${pollId}/games`);
			setGames(response.data.games);
		} catch (error) {
			console.log(error);
			toast.show({
				title: "Games not found!",
				placement: "top",
				bgColor: "red.500"
			});
		} finally {
			setIsLoading(false);
		}
	}

	async function handleGuessConfirm(gameId: string) {
		try {
			if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
				return toast.show({
					title: "Enter a score to throb!",
					placement: "top",
					bgColor: "red.500"
				});
			}

			await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
				firstTeamPoints: Number(firstTeamPoints),
				secondTeamPoints: Number(secondTeamPoints),
			});

			toast.show({
				title: "Successfully sent guess!",
				placement: "top",
				bgColor: "green.500"
			});

			fetchGames();
		} catch (error) {
			console.log(error);

			toast.show({
				title: "Failed to send guess!",
				placement: "top",
				bgColor: "red.500"
			});
		}
	}

	isLoading && <Loading />

	return (
		<FlatList
			data={games}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
				<Game
					data={item}
					setFirstTeamPoints={setFirstTeamPoints}
					setSecondTeamPoints={setSecondTeamPoints}
					onGuessConfirm={() => handleGuessConfirm(item.id)}
				/>
			)}
			_contentContainerStyle={{ pb: 10 }}
			ListEmptyComponent={() => <EmptyMyPollList code={code} />}
		/>
	);
}
