import { Box, Stack } from "@chakra-ui/react";
import { CredentialsCard } from "../components/CredentialsCard";

export const HomeScreen = () => {
    const data = [
        { title: "Instagram", username: "i_amsuru07", password: "P@ssw0rd123" },
        { title: "Facebook", username: "username 2", password: "Fb_2023#Secure" },
        { title: "State Bank Of India", username: "username 3", password: "SBI$Bank123" },
        { title: "Microsoft", username: "username 4", password: "Micro$oft2023" },
        { title: "Mobile", username: "username 5", password: "M0b1le@Key" },
        { title: "Instagram", username: "username 1", password: "Insta#P@ss" },
        { title: "Facebook", username: "username 2", password: "Fb_User2023!" },
        { title: "State Bank Of India", username: "username 3", password: "Secure$Bank2023" },
        { title: "Microsoft", username: "username 4", password: "Wind0w#2023" },
        { title: "Mobile", username: "username 5", password: "CallMe@123" },
        { title: "Instagram", username: "username 1", password: "InstaGram!@#" },
        { title: "Facebook", username: "username 2", password: "Face$Book@2023" },
        { title: "State Bank Of India", username: "username 3", password: "Banking#Safe" },
        { title: "Microsoft", username: "username 4", password: "M$0ft2023!" },
        { title: "Mobile", username: "username 5", password: "Mobile@P@ss" },
    ];

    return (
        <Box
            overflowY="scroll"
            shadow="md"
        >
            <Stack spacing="1">
                {data.map((item, index) => (
                    <CredentialsCard
                        key={index}
                        title={item.title}
                        username={item.username}
                        password={item.password}
                    />
                ))}
            </Stack>
        </Box>
    );
};
