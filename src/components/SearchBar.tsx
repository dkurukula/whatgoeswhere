import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import * as React from "react";
import { FaSearch } from "react-icons/fa";

export interface ISearchBarProps {
  onInput: any;
  value: string;
}

export const SearchBar = (props: ISearchBarProps) => {
    return (
      <InputGroup>
        <InputLeftElement children={<FaSearch />} />
        <Input
          placeholder="Search"
          onInput={props.onInput}
          value={props.value}
        />
      </InputGroup>
    );
  }
