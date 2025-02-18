import { Box, Stack, useToast } from "@chakra-ui/react";
import { CredentialsCard } from "../components/CredentialsCard";
import { useEffect, useState } from "react";
import { TCredentialsCard, TCredentialSchema, TFetchPasswordResponse } from "../utils/types";
import { PasswordService } from "../services/passwordService";
import { Cookie } from "../cookies/cookie";
import { eventBus } from "../utils/eventBus";
import { ErrorMessage, ResponseMessage } from "../utils/enums";

export const HomeScreen = () => {
    const passwordService = new PasswordService();
    const cookie = new Cookie();

    const toast = useToast();
    const [credentials, setCredentials] = useState<TCredentialSchema[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uid = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!)?.uid;
                const response: TFetchPasswordResponse = await passwordService.retrieveVaultCredentials(uid);
                if (response.code === 200) {
                    const rawData: any = response.data;
                    const credentialsArray = Object.keys(rawData)
                        .map((key) => ({
                            id: key,
                            ...rawData[key],
                        }))
                        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                    if (credentialsArray.length === 0) {
                        toast({
                            description: ResponseMessage.VAULT_IS_EMPTY,
                            status: "info",
                            duration: 3000,
                            isClosable: true,
                            position: "top",
                        });
                    }
                    setCredentials(credentialsArray);
                } else {
                    toast({
                        description: response.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                    });
                }
            } catch (error: any) {
                toast({
                    description: error.message || ErrorMessage.FAILED_TO_FETCH_VAULT_ENTRIES,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
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
                {credentials.map((item: TCredentialsCard, index) => (
                    <CredentialsCard
                        key={index}
                        id={item.id}
                        platformName={item.platformName}
                        accountUsername={item.accountUsername}
                        accountPassword={item.accountPassword}
                    />
                ))}
            </Stack>
        </Box>
    );
};
