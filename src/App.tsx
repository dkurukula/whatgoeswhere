import {useReducer, useState} from "react"
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
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { FaSearch } from "react-icons/fa"
import ListView from './components/ListView'
import items from './data.json'
import React from "react"
import { SearchBar } from "./components/SearchBar"

const initialState = {
  search:'',
  searchedItems: []
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
        <Box m={5} fontSize="sm" textAlign="left">St. Joseph's Hospital</Box>
        <Box m={5} fontSize="sm" textAlign="left">St. Michael's Hospital</Box>
        <Box m={5} fontSize="sm" textAlign="left">Providence Healthcare</Box>
        <Box m={5} fontSize="sm" textAlign="left">Li Ka Shing Knowledge Institute</Box>
      </Grid>
      
      <Box textAlign="left" fontSize="xl">
        <Box textAlign="left" marginLeft={8} marginTop={5} fontSize="xl" color="purple">
          <Heading>St. Michael's Hospital</Heading>
        </Box>  

        <Grid minH="10vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text textAlign="left" fontSize="sm">
              Not sure how to dispose a waste item? Type it into the searchbar below to find out.
            </Text>
            <SearchBar onInput={e => handleSearch(e)} />
            <ListView items={state.searchedItems} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}