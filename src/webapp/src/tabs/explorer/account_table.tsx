import {Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr,} from '@chakra-ui/react'
import {Account} from 'models/account.model';
import BlockchainAccount from "./table/account";

export const AccountTable = (props: { accounts: { [address: string]: Account; }; }) => {
    let balance_sum = 0

    return <TableContainer>
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th>Address</Th>
                    <Th isNumeric>Balance</Th>
                    <Th isNumeric>Nonce</Th>
                </Tr>
            </Thead>
            <Tbody>
                {Object.keys(props.accounts).map((address, index) => {
                    balance_sum += props.accounts[address].balance

                    return <BlockchainAccount key={index} address={address} account={props.accounts[address]}/>
                })}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>&nbsp;</Th>
                    <Th isNumeric>{balance_sum}</Th>
                    <Th>&nbsp;</Th>
                </Tr>
            </Tfoot>
        </Table>
    </TableContainer>;
}

export default AccountTable;