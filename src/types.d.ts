enum Types {
  SearchInput = "SEARCH_INPUT",
  SearchData = "SEARCH_DATA",
  SwitchSite = "SWITCH_SITE",
  Navigate = "NAVIGATE",
  ContentVisible = "CONTENT_VISIBLE",
  ClickNav = "CLICK_NAV",
}

type SiteStr =
  | "St. Michael's Hospital"
  | "St. Joseph's Health Centre"
  | "Providence Healthcare"
  | "Li Ka Shing Knowledge Institute";

type IRouteAll = "SMH" | "SJHC" | "PHC" | "LKS" | "/";
type IRoute = Exclude<IRouteAll, "/">;

type SiteData = { item: string; bin: string }[];

type ISite = {
  SMH: SiteStr;
  SJHC: SiteStr;
  PHC: SiteStr;
  LKS: SiteStr;
};

type IState = {
  search: string;
  searchedItems: SiteData;
  site: ISite[keyof ISite] | null;
  route: IRouteAll;
  content: boolean;
  clickNav: boolean;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

type SitePayload = {
  [Types.SearchInput]: string;
  [Types.SearchData]: {
    item: string;
    bin: string;
  }[];
  [Types.SwitchSite]: SiteStr;
  [Types.Navigate]: IRoute;
  [Types.ContentVisible]: boolean;
  [Types.ClickNav]: boolean;
};

type SiteActions = ActionMap<SitePayload>[keyof ActionMap<SitePayload>];
