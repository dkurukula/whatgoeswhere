import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Types } from "./utils";
import { handleSearch } from "./utils";
import {
  Box,
  Text,
  Link,
  VStack,
  HStack,
  Heading,
  Grid,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { useSites, useSitesDispatch } from "./SiteContext";
import { SearchBar } from "./components/SearchBar";
import ListView from "./components/ListView";

const HOMEPAGEDIR = "/whatgoeswhere";

export const SiteContent: FunctionComponent = () => {
  const state = useSites();
  const dispatch = useSitesDispatch();
  console.debug("content: ", state.content);
  if (!state || !state.content) {
    return <></>;
  } else {
    return (
      <>
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
                    onInput={(e: { target: { value: string } }) => {
                      const searchStr = e.target.value;
                      dispatch({ type: Types.SearchInput, payload: searchStr });
                    }}
                    value={state.search}
                  />
                </Box>
              </VStack>
              <ListView items={state.searchedItems} />
            </VStack>
          </Grid>
        </Box>

        <Box>
          <Text textAlign="center" margin={8} color="purple">
            Have a question or concern? Email us at
            Sustainability@unityhealth.to
          </Text>
        </Box>
      </>
    );
  }
};
