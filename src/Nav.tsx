import { Link } from "@chakra-ui/react";
import { useSitesDispatch } from "./SiteContext";
import { NavigateFunction } from "react-router-dom";
import { handleSearch } from "./utils";
import { Types } from "./utils";
import { useColorModeValue } from "@chakra-ui/react";
import { MouseEventHandler, useEffect } from "react";

const siteRev: Record<SiteStr, IRoute> = {
  "St. Michael's Hospital": "SMH",
  "St. Joseph's Health Centre": "SJHC",
  "Providence Healthcare": "PHC",
  "Li Ka Shing Knowledge Institute": "LKS",
};

export const switchSites = (
  navRoute: IRoute,
  site: SiteStr,
  dispatch: React.Dispatch<SiteActions>
) => {
  dispatch({ type: Types.Navigate, payload: navRoute });
  dispatch({ type: Types.SwitchSite, payload: site });
  dispatch({ type: Types.SearchInput, payload: "" });
};

export const switchSitesUrl = (
  navRoute: IRoute,
  site: SiteStr,
  dispatch: React.Dispatch<SiteActions>
) => {
  switchSites(navRoute, site, dispatch);
  dispatch({ type: Types.ClickNav, payload: false });
};

const switchSitesClickNav = (
  navRoute: IRoute,
  site: SiteStr,
  dispatch: React.Dispatch<SiteActions>
) => {
  switchSites(navRoute, site, dispatch);
  dispatch({ type: Types.ClickNav, payload: true });
};

export const NavLink = ({ children }: { children: SiteStr }) => {
  const dispatch = useSitesDispatch();
  const navRoute = siteRev[children.toString() as SiteStr];
  const site: SiteStr = children.toString() as SiteStr;
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      boxShadow="xl"
      bg="white"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      onClick={() => {
        console.debug("=== NAV CLICKED ===   set route to: ", navRoute);
        switchSitesClickNav(navRoute, site, dispatch);
      }}
    >
      {children}
    </Link>
  );
};
