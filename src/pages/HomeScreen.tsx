import { Box, Stack, useToast } from "@chakra-ui/react";
import { CredentialsCard } from "../components/CredentialsCard";
import { useEffect, useState } from "react";
import { TCredentialSchema, TFetchPasswordResponse } from "../utils/types";
import { PasswordService } from "../services/passwordService";
import { Cookie } from "../cookies/cookie";
import { eventBus } from "../utils/eventBus";

export const HomeScreen = () => {
    const passwordService = new PasswordService();
    const cookie = new Cookie();

    const toast = useToast();
    const [credentials, setCredentials] = useState<TCredentialSchema[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uid = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!)?.uid;
                const response: TFetchPasswordResponse = await passwordService.fetchPasswordCredentials(uid);
                if (response.code === 200) {
                    const rawData: any = response.data;
                    const credentialsArray = Object.keys(rawData)
                        .map((key) => ({
                            id: key,
                            ...rawData[key],
                        }))
                        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

                    setCredentials(credentialsArray);
                } else {
                    toast({
                        description: response.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                }
            } catch (error: any) {
                toast({
                    description: error.message || "Failed to fetch credentials.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        };

        fetchData();

        eventBus.on("refresh", fetchData);

        return () => {
            eventBus.off("refresh", fetchData);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Box overflowY="scroll" shadow="md">
            <Stack spacing="1">
                {credentials.map((item, index) => (
                    <CredentialsCard
                        key={index}
                        platformName={item.platformName}
                        accountUsername={item.accountUsername}
                        accountPassword={item.accountPassword}
                    />
                ))}
            </Stack>
        </Box>
    );
};
