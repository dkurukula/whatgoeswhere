import items from "./data.json";
import { createContext, useContext, useReducer, Reducer } from "react";
import { Types, handleSearch, sites } from "./utils";
import { useNavigate } from "react-router-dom";

const initialState: IState = {
  search: "",
  searchedItems: items[sites.SMH].sort((a, b) => (a.item > b.item ? 1 : -1)),
  site: null,
  route: "/",
  content: false,
  clickNav: false,
};

export const sitesReducer: Reducer<IState, SiteActions> = (state, action) => {
  switch (action.type) {
    case Types.SearchInput:
      if (!state) {
        return initialState;
      }
      const searchData = handleSearch(action.payload, state.site);
      return { ...state, search: action.payload, searchedItems: searchData };
    case Types.SearchData:
      return { ...state, searchedItems: action.payload };
    case Types.SwitchSite:
      //indicates the site that should be navigated to
      return { ...state, site: action.payload };
    case Types.Navigate:
      const navRoute = action.payload;
      return { ...state, route: navRoute };
    case Types.ContentVisible:
      return { ...state, content: action.payload };
    case Types.ClickNav:
      return { ...state, clickNav: action.payload };
    default:
      throw new Error();
  }
};

export const SitesContext = createContext<IState>(initialState);
export const SitesDispatchContext = createContext<React.Dispatch<SiteActions>>(
  () => initialState
);

export const SitesProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(sitesReducer, initialState);
  return (
    <SitesContext.Provider value={state}>
      <SitesDispatchContext.Provider value={dispatch}>
        {children}
      </SitesDispatchContext.Provider>
    </SitesContext.Provider>
  );
};

export const useSites = () => useContext(SitesContext);
export const useSitesDispatch = () => useContext(SitesDispatchContext);
