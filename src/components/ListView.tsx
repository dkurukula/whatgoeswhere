import { FunctionComponent } from "react";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import React from "react";

interface IListViewProps {
  items: [{ item: string; bin: string }];
  isVisible: boolean;
}

const ListView: FunctionComponent<IListViewProps> = ({ items, isVisible }) => {
  console.log(items);
  if (!isVisible) {
    return <></>;
  } else {
    return (
      <Table variant="striped" colorScheme="green">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>Bin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(e => (
            <Tr key={e.item}>
              <Td>{e.item}</Td>
              <Td>{e.bin}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
};

export default ListView;
