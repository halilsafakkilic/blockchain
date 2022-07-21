import {Table, TableContainer, Tbody, Th, Thead, Tr,} from '@chakra-ui/react'
import {Transaction} from "../../models/transaction.model";
import TransactionItem from "./table/transaction";

export const TransactionTable = (props: { transactions: Transaction[]; }) => {
    return <TableContainer>
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th isNumeric>Nonce</Th>
                    <Th>From</Th>
                    <Th>Value</Th>
                    <Th>Recipient</Th>
                    <Th isNumeric>Timestamp</Th>
                    <Th isNumeric>Fee</Th>
                    <Th>Hash</Th>
                    <Th isNumeric>Version</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.transactions.map((transaction: Transaction, index: number) => {
                    return <TransactionItem key={index} transaction={transaction}/>
                })}
            </Tbody>
        </Table>
    </TableContainer>;
}

export default TransactionTable;