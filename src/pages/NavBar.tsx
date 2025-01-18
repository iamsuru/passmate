import { Box, Heading } from "@chakra-ui/react"
import "../styles/navbar.css"
export const NavBar = () => {
    return (
        <>
            <Box
                display='flex'
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                padding="5px 10px 5px 10px"
            >
                <Heading color='teal.600' className="nav-name">PassMate</Heading>
            </Box>
        </>
    )
}