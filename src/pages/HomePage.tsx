import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { LoginPage } from "./LoginPage"
import { RegistrationPage } from "./RegistrationPage"
import { Color, TabName, Variant } from "../utils/enums"
import { useState } from "react"

export const HomePage = () => {
    const [tabIndex, setTabIndex] = useState(0);
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
                bg={Color.GRAY_800}
                boxShadow="md"
                borderRadius="md"
                maxW="sm"
                width="full"
            >
                <Tabs isFitted colorScheme={Color.GREEN} variant={Variant.UNSTYLED} index={tabIndex} onChange={(index) => setTabIndex(index)}>
                    <TabList mb='15px'>
                        <Tab _selected={{ color: Color.WHITE, bg: Color.TEAL_800 }}>{TabName.SIGN_IN}</Tab>
                        <Tab _selected={{ color: Color.WHITE, bg: Color.PURPLE_700 }}>{TabName.SIGN_UP}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LoginPage />
                        </TabPanel>
                        <TabPanel>
                            <RegistrationPage onRegistrationSuccess={() => setTabIndex(0)} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box >
    )
}