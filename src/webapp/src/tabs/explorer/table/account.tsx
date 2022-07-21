import {Td, Tr,} from '@chakra-ui/react'
import {Account} from "../../../models/account.model";

export const BlockchainAccount = (props: {
    address: string;
    account: Account;
}) => {
    return (<Tr>
            <Td>{props.address}</Td>
            <Td isNumeric>{props.account.balance}</Td>
            <Td isNumeric>{props.account.nonce}</Td>
        </Tr>
    );
}

export default BlockchainAccount;