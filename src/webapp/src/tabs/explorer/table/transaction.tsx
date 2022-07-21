import {Td, Tr,} from '@chakra-ui/react'
import {Transaction} from "../../../models/transaction.model";

export const TransactionItem = (props: {
    transaction: Transaction;
}) => {
    return (<Tr>
            <Td isNumeric>{props.transaction.nonce}</Td>
            <Td>{props.transaction.address}</Td>
            <Td>{typeof (props.transaction.value) !== 'undefined' ? props.transaction.value :
                <><strong>[DATA]</strong> {props.transaction.data}</>}</Td>
            <Td>{props.transaction.recipient}</Td>
            <Td isNumeric>{props.transaction.timestamp}</Td>
            <Td isNumeric>{props.transaction.fee}</Td>
            <Td>{props.transaction.hash}</Td>
            <Td isNumeric>{props.transaction.version}</Td>
        </Tr>
    );
}

export default TransactionItem;