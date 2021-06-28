import {useReducer, useState} from "react"
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  theme,
  Button
} from "@chakra-ui/react"
import ListView from './components/ListView'
import items from './data.json'
import React from "react"
import { SearchBar } from "./components/SearchBar"
import { StackDivider } from "@chakra-ui/react"

type SiteStr = "St. Michael's Hospital" | "St. Joseph's Health Centre" | "Providence Healthcare" | "Li Ka Shing Knowledge Institute"

interface ISite {
  SMH: SiteStr,
  SJHC: SiteStr,
  PHC: SiteStr,
  LKS: SiteStr 
}
const site:ISite  = {
  SMH:"St. Michael's Hospital",
  SJHC:"St. Joseph's Health Centre",
  PHC:"Providence Healthcare",
  LKS:"Li Ka Shing Knowledge Institute"
}

type SiteData = {"item": string, "bin": string }[]

interface IState {
  search: string,
  searchedItems: SiteData,
  site: ISite[keyof ISite]
}

const initialState:IState = {
  search:'',
  searchedItems: items[site.SMH].sort((a, b) => (a.item > b.item) ? 1 : -1),
  site: site.SMH
}

const reducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type){
    case 'SEARCH_INPUT':
      return { ...state, search: action.payload}
    case 'SEARCH_DATA':
      return { ...state, searchedItems: action.payload}
    case 'SWITCH_SITE':
      return { ...state, site: action.payload}
    default:
      throw new Error()
  }
}

export const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSearch = (e: { target: { value: string } }, state:IState) => {
    let searchStr = e.target.value
    dispatch({ type: 'SEARCH_INPUT', payload: searchStr })
    const searchData= items[state.site]
      .filter(
        it =>
          it.item.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
      )
    dispatch({ type: 'SEARCH_DATA', payload: searchData})
  }

  const switchSites = (site: string) =>  dispatch({type: 'SWITCH_SITE', payload: site})

  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(5, 1fr)" bg="gray.100">
        <Box m={4} fontSize="lg">What Goes Where</Box>
        <Box m={5} fontSize="sm" textAlign="left">
          <Button 
            onClick={()=>switchSites(site.SJHC)}
          >
            {site.SJHC}
            </Button>
          </Box>
        <Box m={5} fontSize="sm" textAlign="left">
          <Button
            onClick={()=>switchSites(site.SMH)}
          >
            {site.SMH}
          </Button>
        </Box>
        <Box m={5} fontSize="sm" textAlign="left">
          <Button
            onClick={()=>switchSites(site.PHC)}
          >
            {site.PHC}
          </Button>
        </Box>
        <Box m={5} fontSize="sm" textAlign="left">
          <Button
            onClick={()=>switchSites(site.LKS)}
          >
            {site.LKS}
          </Button>
        </Box>
      </Grid>
      
      <Box textAlign="left" fontSize="xl">
        <Box textAlign="left" marginLeft={8} marginTop={5} fontSize="xl" color="purple">
          <Heading>{state.site}</Heading>
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
                <SearchBar onInput={e => handleSearch(e, state)} />
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
