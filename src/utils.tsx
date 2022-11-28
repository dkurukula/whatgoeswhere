import { useSitesDispatch } from "./SiteContext";
import items from "./data.json";

export enum Types {
  SearchInput = "SEARCH_INPUT",
  SearchData = "SEARCH_DATA",
  SwitchSite = "SWITCH_SITE",
  Navigate = "NAVIGATE",
  ContentVisible = "CONTENT_VISIBLE",
  ClickNav = "CLICK_NAV",
}

export const sites: ISite = {
  SMH: "St. Michael's Hospital",
  SJHC: "St. Joseph's Health Centre",
  PHC: "Providence Healthcare",
  LKS: "Li Ka Shing Knowledge Institute",
};

export const RouteAll: IRouteAll[] = ["SMH", "SJHC", "PHC", "LKS", "/"];
export const validRoute: IRoute[] = ["SMH", "SJHC", "PHC", "LKS"];

export const handleSearch = (
  searchStr: string,
  site: SiteStr | null
): SiteData => {
  if (!site) {
    return [{ item: "", bin: "" }];
  }
  const searchData = items[site]
    .filter((it) =>
      it.item.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
    )
    .sort((a, b) => (a.item > b.item ? 1 : -1));
  return searchData;
};
