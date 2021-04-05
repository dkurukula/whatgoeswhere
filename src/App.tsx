import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  Input,
  theme,
  InputGroup,
  InputLeftElement,
  ListItem,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { FaSearch } from "react-icons/fa"
import ListView from './components/ListView'
import items from './data.json'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
        <Heading>Waste Wizard</Heading>
          <Text>
            Search where to put your waste.
          </Text>
        <InputGroup>
        <InputLeftElement
          children={<FaSearch/>}
        /> 
        <Input 
          placeholder="Search" 
        /> 
        </InputGroup>
        <ListView items={items}/>

        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
