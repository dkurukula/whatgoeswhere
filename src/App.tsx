import { ReactNode, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import items from "./data.json";
import ListView from "./components/ListView";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  useColorModeValue,
  Box,
  Text,
  ChakraProvider,
  Link,
  Stack,
  useDisclosure,
  VStack,
  HStack,
  Heading,
  Flex,
  IconButton,
  theme,
  Grid
} from "@chakra-ui/react";
import { CloseIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";

const HOMEPAGEDIR = "/whatgoeswhere";

type SiteStr =
  | "St. Michael's Hospital"
  | "St. Joseph's Health Centre"
  | "Providence Healthcare"
  | "Li Ka Shing Knowledge Institute";

const Links: SiteStr[] = [
  "St. Michael's Hospital",
  "St. Joseph's Health Centre",
  "Providence Healthcare",
  "Li Ka Shing Knowledge Institute"
];

interface ISite {
  SMH: SiteStr;
  SJHC: SiteStr;
  PHC: SiteStr;
  LKS: SiteStr;
}

type IRouteAll = "SMH" | "SJHC" | "PHC" | "LKS" | "/";
type IRoute = Exclude<IRouteAll, "/">;
const RoutesArr: IRouteAll[] = ["SMH", "SJHC", "PHC", "LKS", "/"];

const site: ISite = {
  SMH: "St. Michael's Hospital",
  SJHC: "St. Joseph's Health Centre",
  PHC: "Providence Healthcare",
  LKS: "Li Ka Shing Knowledge Institute"
};

const siteRev: Record<SiteStr, IRoute> = {
  "St. Michael's Hospital": "SMH",
  "St. Joseph's Health Centre": "SJHC",
  "Providence Healthcare": "PHC",
  "Li Ka Shing Knowledge Institute": "LKS"
};

type SiteData = { item: string; bin: string }[];

interface IState {
  search: string;
  searchedItems: SiteData;
  site: ISite[keyof ISite] | null;
  route: IRouteAll;
}

const initialState: IState = {
  search: "",
  searchedItems: items[site.SMH].sort((a, b) => (a.item > b.item ? 1 : -1)),
  site: null,
  route: "/"
};

const reducer = (state: IState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "SEARCH_INPUT":
      return { ...state, search: action.payload };
    case "SEARCH_DATA":
      return { ...state, searchedItems: action.payload };
    case "SWITCH_SITE":
      return { ...state, site: action.payload };
    case "NAVIGATE":
      const [navRoute, navigate] = action.payload;
      navigate(navRoute);
      return state;
    default:
      throw new Error();
  }
};

function App() {
  const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSearch = (searchStr: string, site: SiteStr) => {
    dispatch({ type: "SEARCH_INPUT", payload: searchStr });
    const searchData = items[site]
      .filter(it =>
        it.item.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
      )
      .sort((a, b) => (a.item > b.item ? 1 : -1));
    dispatch({ type: "SEARCH_DATA", payload: searchData });
  };

  const switchSites = (site: SiteStr, navRoute: IRoute) => {
    dispatch({ type: "SWITCH_SITE", payload: site });
    dispatch({ type: "NAVIGATE", payload: [navRoute, navigate] });
    handleSearch("", site);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      boxShadow="xl"
      bg="white"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700")
      }}
      onClick={() =>
        switchSites(
          children?.toString() as SiteStr,
          siteRev[children?.toString() as SiteStr]
        )
      }
    >
      {children}
    </Link>
  );

  return (
    <>
      <ChakraProvider theme={theme}>
        {/* <Grid templateColumns="repeat(5, 1fr)" bg="gray.100"> */}
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={6}>
          <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"lg"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Box m={6} fontWeight="semibold" fontSize="2xl">
              What Goes Where
            </Box>
            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={8}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map(link => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map(link => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
        {/* </Grid> */}

        <Box textAlign="left" fontSize="xl">
          <Grid minH="10vh" p={3}>
            <VStack spacing={8} align="stretch">
              <Box
                textAlign="left"
                marginRight={8}
                marginLeft={8}
                marginTop={5}
                fontSize="xl"
                color="purple"
              >
                <HStack justify="space-between">
                  <Heading color="darkgreen">{state.site}</Heading>
                  <Link
                    href={`${HOMEPAGEDIR}/posters/${state.site}.pdf`}
                    isExternal
                  >
                    View Poster <ExternalLinkIcon mx="2px" />
                  </Link>
                </HStack>
              </Box>
              <VStack>
                <Box textAlign="left" marginLeft={8} fontSize="m">
                  <Text>
                    Not sure how to dispose a waste item? Type it into the
                    searchbar below to find out.
                  </Text>
                </Box>

                <Box w="300px">
                  <SearchBar
                    onInput={(e: { target: { value: string } }) =>
                      handleSearch(e.target.value, state.site)
                    }
                    value={state.search}
                    isVisible={state.site === "/" ? false : true}
                  />
                </Box>
              </VStack>
              <ListView
                items={state.searchedItems}
                isVisible={state.site === "/" ? false : true}
              />
            </VStack>
          </Grid>
        </Box>

        <Box>
          <Text textAlign="center" margin={8} color="purple">
            Have a question or concern? Email us at GreenTeam@unityhealth.to
          </Text>
        </Box>
      </ChakraProvider>
      <Routes>
        {RoutesArr.map((route: IRouteAll) => {
          return (
            <Route
              path={route}
              element={<ListView items={state.searchedItems} />}
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
