import { createContext, ReactNode, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { api } from "../services/api";

/** REDIRECT FROM BROWSER **/
WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

/** CONTEXT **/
// Creation
export const AuthContext = createContext({} as AuthContextDataProps);

// Function to provide this context (share with hole application)
export function AuthContextProvider({ children }: AuthProviderProps) {
    /** REACT HOOKS = USE_STATE **/
    // User data state
    const [user, setUser] = useState<UserProps>({} as UserProps);
    // Authentication flow state (how it is going on)
    const [isUserLoading, setIsUserLoading] = useState(false);

    // AuthRequest User (Google)
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: process.env.CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ["profile", "email"],
    });

    /** FUNCTIONS **/
    async function signIn() {
        try {
            setIsUserLoading(true);
            // Starting signIn process
            await promptAsync();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        // console.log(`AUTHENTICATION TOKEN ===> ${access_token}`);
        try {
            setIsUserLoading(true);
            // Get token from backend
            const tokenResponse = await api.post('/users', { access_token });
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;
            // Request user data
            const userInfoResponse = await api.get('/me');
            setUser(userInfoResponse.data.user);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    }

    /** REACT HOOKS = USE_EFFECT **/
    useEffect(() => {
        if (response?.type === "success" && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response]);

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}