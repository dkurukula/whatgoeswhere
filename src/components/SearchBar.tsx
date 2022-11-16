import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import * as React from "react";
import { FaSearch } from "react-icons/fa";

export interface ISearchBarProps {
  onInput: any;
  value: string;
  isVisible: boolean;
}

export function SearchBar(props: ISearchBarProps) {
  if (!props.isVisible) {
    return <></>;
  } else {
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
}
