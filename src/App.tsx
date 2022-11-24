import { useEffect } from "react";
import { SiteContent } from "./SiteContent";
import { Types, sites, RouteAll, validRoute } from "./utils";
import { NavLink, switchSites } from "./Nav";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import items from "./data.json";
import ListView from "./components/ListView";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  useColorModeValue,
  Box,
  ChakraProvider,
  Stack,
  useDisclosure,
  HStack,
  Flex,
  IconButton,
  theme,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useSites, useSitesDispatch } from "./SiteContext";

const Links: SiteStr[] = [
  "St. Michael's Hospital",
  "St. Joseph's Health Centre",
  "Providence Healthcare",
  "Li Ka Shing Knowledge Institute",
];

const RoutesArr: IRouteAll[] = ["SMH", "SJHC", "PHC", "LKS", "/"];

const App = () => {
  const state = useSites();
  const dispatch = useSitesDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //a change in url path should be stored in state
  // when url is changed manually, it could be different from the current state.site
  // rerender logic should always check first for change in url, then change in site
  // A change in url should always trigger a change in site
  // A change in site should navigate
  let location = useLocation();
  const site = state.site;

  if (!state) {
    return <></>;
  }
  console.debug("*** App.tsx top of function render ***");
  console.debug("location.pathname: ", location.pathname);
  console.debug("state.route: ", state.route);
  console.debug("state.site: ", state.site);
  useEffect(() => {
    console.debug("__A useEffect App.tsx -> hide content if route /");
    if (location.pathname === "/") {
      dispatch({ type: Types.ContentVisible, payload: false });
      console.debug("__A hide");
    } else {
      dispatch({ type: Types.ContentVisible, payload: true });
      console.debug("__A show");
    }
  }, [state.route]);

  location = useLocation();

  let ignoreUrl = false;
  useEffect(() => {
    const navRoute = state.route;
    console.debug(
      "__B useEffect App.tsx -> navigate - state.route: ",
      navRoute
    );

    navigate("/" + navRoute, { replace: true });
    console.debug("__B nav called: ", navRoute);
    if (location.pathname !== "/" + navRoute) {
      ignoreUrl = true;
      console.debug("__B set ignoreUrl: ", ignoreUrl);
    }
    //dispatch({ type: Types.Navigate, payload: navRoute });
    //switchSites(navRoute, sites[navRoute], dispatch);
    //navigate(navRoute);
  }, [state.route, location.pathname]);
  location = useLocation();

  useEffect(() => {
    const navRoute = state.route;
    console.debug("__B location.pathname: ", location.pathname);
    if (navRoute !== "/") {
      console.debug("__B switchSites: ", navRoute);
      switchSites(navRoute, sites[navRoute], dispatch);
    }
    console.debug("__B location.pathname: ", location.pathname);
  }, [state.route, location.pathname]);

  location = useLocation();
  useEffect(() => {
    console.debug(
      "__C useEffect App.tsx -> switchSites if url isValidRoute - location.pathname: ",
      location.pathname
    );
    const procPath = (path: string): string => {
      return path.replace("/", "");
    };
    const _navRoute = procPath(location.pathname);
    const navRoute = _navRoute as IRoute;
    const isValidRoute = validRoute.includes(navRoute);
    console.debug("__C ignoreUrl: ", ignoreUrl);
    if (isValidRoute && !ignoreUrl) {
      console.debug("__C url is valid: ", navRoute);
      /** Updates state: route, site, search, searchItems */
      switchSites(navRoute, sites[navRoute], dispatch);
    }
  }, [location.pathname, state.route]);

  return (
    <>
      <ChakraProvider theme={theme}>
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
                {Links.map((link: SiteStr) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
        <Routes>
          {RoutesArr.map((route: IRouteAll) => {
            return (
              <Route key={route} path={"/" + route} element={<SiteContent />} />
            );
          })}
        </Routes>
      </ChakraProvider>
    </>
  );
};

export default App;
