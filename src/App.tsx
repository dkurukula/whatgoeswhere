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
import { ExternalLinkIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const HOMEPAGEDIR='/whatgoeswhere'

type SiteStr = "St. Michael's Hospital" | "St. Joseph's Health Centre" | "Providence Healthcare" | "Li Ka Shing Knowledge Institute"
const Links:SiteStr[] = ["St. Michael's Hospital" , "St. Joseph's Health Centre" , "Providence Healthcare" , "Li Ka Shing Knowledge Institute"]

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
    const searchData = items[site]
    const searchData= items
      .filter(
        it =>
          it.item.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
      ).sort((a, b) => (a.item > b.item) ? 1 : -1)
    dispatch({ type: 'SEARCH_DATA', payload: searchData })
  }

  return (
    <ChakraProvider theme={theme}>
      {/* <Grid templateColumns="repeat(5, 1fr)" bg="gray.100"> */}
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={6}>
          <Flex h={24} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'lg'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
              <Box m={6} fontWeight="semibold" fontSize="2xl">What Goes Where</Box>
            <HStack spacing={8} alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={8}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}


        </Box>
      {/* </Grid> */}

      <Box textAlign="left" fontSize="xl">

        <Grid minH="10vh" p={3}>
          <VStack
            spacing={8}
            align="stretch"
          >
            <Box textAlign="left" marginRight={8} marginLeft={8} marginTop={5} fontSize="xl" color="purple">
              <HStack justify="space-between">
                <Heading color="darkgreen">{state.site}</Heading>
                <Link href={`${HOMEPAGEDIR}/posters/${state.site}.pdf`} isExternal>View Poster <ExternalLinkIcon mx="2px"/></Link>
              </HStack>
            </Box>
            <VStack>
              <Box textAlign="left" marginLeft={8} fontSize="m">
                <Text >
                  Not sure how to dispose a waste item? Type it into the searchbar below to find out.
                </Text>
              </Box>

              <Box w="300px">
                <SearchBar onInput={(e: { target: { value: string } }) => handleSearch(e.target.value, state.site)} value={state.search} />
              </Box>
            </VStack>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Heading>Waste Wizard</Heading>
            <Text>
              Search where to put your waste.
            </Text>
            <SearchBar onInput={e => handleSearch(e)} />
            <ListView items={state.searchedItems} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
