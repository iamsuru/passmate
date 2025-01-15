import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { LoginPage } from "./LoginPage"

export const HomePage = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="80vh"
            width="100%"
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
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'green.500' }}>Signin</Tab>
                        <Tab _selected={{ color: 'white', bg: 'blue.400' }}>Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LoginPage />
                        </TabPanel>
                        <TabPanel>
                            SignupPage
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}