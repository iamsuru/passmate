import { Box, Heading } from "@chakra-ui/react"
import "../styles/navbar.css"
import { Color } from "../utils/enums"
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
                <Heading color={Color.TEAL_600} className="nav-name">PassMate</Heading>
            </Box>
        </>
    )
}