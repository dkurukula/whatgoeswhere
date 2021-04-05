import * as React from 'react';
import { List, ListItem, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface IListViewProps {
    items: [{item: string, bin: string}]
}

const ListView: React.FunctionComponent<IListViewProps> = ({items}) => {
    console.log(items)
    return (
        <Table variant="striped" colorScheme="teal">
            {/* <TableCaption>where to put your waste</TableCaption> */}
            <Thead>
                <Tr>
                    <Th>Item</Th>
                    <Th>Where to put</Th>
                </Tr>
            </Thead>
            <Tbody>
                {items.map(e => 
                    <Tr key={e.item}>
                        <Td>{e.item}</Td>
                        <Td>{e.bin}</Td>
                    </Tr>
                )}
            </Tbody>
        </Table >
    )};


export default ListView;
