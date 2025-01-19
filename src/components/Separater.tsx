import { Box, Text } from "@chakra-ui/react"

export const Separater = () => {
    return (
        <Box display="flex" alignItems="center" my='6px'>
            <Box flex="1" borderBottom="1px solid gray" />
            <Text mx={4}>OR</Text>
            <Box flex="1" borderBottom="1px solid gray" />
        </Box>
    )
}