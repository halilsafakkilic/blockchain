import {Table, TableContainer, Tbody, Th, Thead, Tr,} from '@chakra-ui/react'
import BlockItem from "./table/block";
import {Block} from "../../models/block.model";

export const BlockTable = (props: { blocks: Block[]; }) => {
    return <TableContainer>
        <Table variant='striped' colorScheme='gray'>
            <Thead>
                <Tr>
                    <Th isNumeric>Block Number</Th>
                    <Th>&nbsp;</Th>
                    <Th isNumeric>Timestamp</Th>
                    <Th>Mined By</Th>
                    <Th isNumeric>Difficulty</Th>
                    <Th isNumeric>Reward</Th>
                    <Th isNumeric>Fee</Th>
                    <Th isNumeric>Nonce</Th>
                    <Th>Block Hash</Th>
                    <Th>Parent Hash</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.blocks.map((block: Block, index: number) => {
                    return <BlockItem key={index} block={block}/>
                })}
            </Tbody>
        </Table>
    </TableContainer>;
}

export default BlockTable;