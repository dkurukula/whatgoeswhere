import { useEffect } from "react";
import { SiteContent } from "./SiteContent";
import { Types, sites, RouteAll, validRoute } from "./utils";
import { NavLink, switchSites, switchSitesUrl } from "./Nav";
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
  Text,
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

/**
 * Remove leading url  if not just /
 *
 * @param path url from location.pathname
 * @returns url without leading /
 */
const procPath = (path: string): string => {
  if (path !== "/") {
    return path.replace("/", "");
  } else {
    return path;
  }
};

const checkValidUrl = (path: string): IRoute | null => {
  if (validRoute.includes(path as IRoute)) {
    return path as IRoute;
  } else {
    return null;
  }
};

const App = () => {
  const state = useSites();
  const dispatch = useSitesDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const site = state.site;
  const url = location.pathname;
  const _url = procPath(url);
  const clickNav = state.clickNav;
  let ignoreUrl = false;

  if (!state) {
    return <></>;
  }
  console.debug("*** App.tsx top of function render ***");
  console.debug("url: ", url);
  console.debug("state.route: ", state.route);
  console.debug("state.site: ", site);
  console.debug("ignoreUrl: ", ignoreUrl);
  console.debug("clickNav: ", clickNav);

  /* Navigate can be triggered in two ways
   *  - url, external link
   *  - onClick
   *
   * Url change should trigger nav by default
   * onCLick should trigger override url based nav until url has changed to desired page
   *
   */

  /** url chnage should trigger nav unless onClick override (ignoreUrl sest) */
  useEffect(() => {
    if (clickNav === false && checkValidUrl(_url) && _url !== state.route) {
      console.debug(
        "__ZZ set state.route to url if not already same, if valid url and not clickNav"
      );
      console.debug("__ZZ url: ", _url);
      const validUrl = _url as IRoute;
      console.debug("__ZZ url is valid");
      console.debug("__ZZ call switchSites: ", validUrl);
      console.debug("    Updates state: route, site, search, searchItems");
      switchSitesUrl(validUrl, sites[validUrl], dispatch);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (clickNav === true) {
      if (checkValidUrl(state.route)) {
        console.debug(
          "__A useEffect App.tsx -> hide content if route not valid"
        );
        console.debug("__A state.route: ", state.route);
        dispatch({ type: Types.ContentVisible, payload: true });
        console.debug("__A show");
      } else {
        dispatch({ type: Types.ContentVisible, payload: false });
        console.debug("__A hide");
      }
    } else {
      if (checkValidUrl(_url)) {
        console.debug("__A useEffect App.tsx -> hide content if url not valid");
        dispatch({ type: Types.ContentVisible, payload: true });
        console.debug("__A show");
      } else {
        dispatch({ type: Types.ContentVisible, payload: false });
        console.debug("__A hide");
      }
    }
  }, [state.route]);

  useEffect(() => {
    const navRoute = state.route;
    if (clickNav === true && checkValidUrl(navRoute)) {
      console.debug(
        "__B execute nav when state.route is changed to valid route and clickNav"
      );
      console.debug(
        "__B useEffect App.tsx -> navigate - state.route: ",
        navRoute
      );
      console.debug("__B call nav: ", navRoute);
      console.debug("    react router useNavigate called with: ", navRoute);
      navigate(navRoute, { state: state.route });
      console.debug("__B call reset clickNav to false");
      dispatch({ type: Types.ClickNav, payload: false });
    }
  }, [state.route]);

  useEffect(() => {
    onOpen();
  }, []);

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
        {url === "/" && state.route === "/" && state.site === null ? (
          <Stack spacing={3}>
            <br />
            <Text fontSize="3xl">
              Please select a location above to get started
            </Text>
          </Stack>
        ) : null}
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
