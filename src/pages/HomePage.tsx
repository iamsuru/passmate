import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { LoginPage } from "./LoginPage"
import { RegistrationPage } from "./RegistrationPage"
import { TabName } from "../utils/enums"

export const HomePage = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="80vh"
            width="100%"
            p={4}
        >
            <Box
                p={8}
                bg="gray.800"
                boxShadow="md"
                borderRadius="md"
                maxW="sm"
                width="full"
            >
                <Tabs isFitted colorScheme='green' variant='unstyled'>
                    <TabList mb='15px'>
                        <Tab _selected={{ color: 'white', bg: 'teal.800' }}>{TabName.SIGN_IN}</Tab>
                        <Tab _selected={{ color: 'white', bg: 'purple.700' }}>{TabName.SIGN_UP}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LoginPage />
                        </TabPanel>
                        <TabPanel>
                            <RegistrationPage />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box >
    )
}