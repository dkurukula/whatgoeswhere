import {useReducer, useState} from "react"
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  theme
} from "@chakra-ui/react"
import ListView from './components/ListView'
import items from './data.json'
import React from "react"
import { SearchBar } from "./components/SearchBar"
import { StackDivider } from "@chakra-ui/react"

const initialState = {
  search:'',
  searchedItems: items.sort((a, b) => (a.item > b.item) ? 1 : -1)
}

const reducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type){
    case 'SEARCH_INPUT':
      return { ...state, search: action.payload}
    case 'SEARCH_DATA':
      return { ...state, searchedItems: action.payload}
    default:
      throw new Error()
  }
}


export const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSearch = (e: { target: { value: string } }) => {
    let searchStr = e.target.value
    dispatch({ type: 'SEARCH_INPUT', payload: searchStr })
    const searchData= items
      .filter(
        it =>
          it.item.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
      )
    dispatch({ type: 'SEARCH_DATA', payload: searchData})
  }

  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(5, 1fr)" bg="gray.100">
        <Box m={4} fontSize="lg">What Goes Where</Box>
        <Box m={5} fontSize="sm" textAlign="left">St. Joseph's Health Centre</Box>
        <Box m={5} fontSize="sm" textAlign="left">St. Michael's Hospital</Box>
        <Box m={5} fontSize="sm" textAlign="left">Providence Healthcare</Box>
        <Box m={5} fontSize="sm" textAlign="left">Li Ka Shing Knowledge Institute</Box>
      </Grid>
      
      <Box textAlign="left" fontSize="xl">
        <Box textAlign="left" marginLeft={8} marginTop={5} fontSize="xl" color="purple">
          <Heading>St. Michael's Hospital</Heading>
        </Box>  

        <Grid minH="10vh" p={3}>
          <VStack 
            divider={<StackDivider borderColor="gray.200" />}
            spacing={8}
            align="stretch"
          >
            <VStack>
              <Box>
                <Text textAlign="left" fontSize="sm">
                  Not sure how to dispose a waste item? Type it into the searchbar below to find out.
                </Text>
              </Box>
              
              <Box w="300px">  
                <SearchBar onInput={e => handleSearch(e)} />
              </Box>
            </VStack>
            <ListView items={state.searchedItems} />          
          </VStack>
        </Grid>
      </Box>

      <Box>
        <Text textAlign="center" margin={8} color="purple">
          Have a question or concern? Email us at GreenTeam@unityhealth.to
        </Text>
      </Box>

    </ChakraProvider>
  )
}