import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Td,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import {MutableRefObject, useRef} from 'react';
import {Block} from "../../../models/block.model";
import TransactionTable from "../transaction_table";
import {FocusableElement} from "@chakra-ui/utils";

export const BlockItem = (props: {
    block: Block;
}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const finalRef = useRef<FocusableElement>()

    return (<Tr>
            <Td isNumeric>{props.block.blockNumber}</Td>
            <Td>
                {props.block.transactions.length !== 0 &&
                    <>
                        <Button colorScheme='green'
                                onClick={onOpen}>{props.block.transactions.length} Transaction</Button>

                        <Modal finalFocusRef={finalRef as MutableRefObject<FocusableElement>} isOpen={isOpen}
                               onClose={onClose}
                               size='6xl' isCentered>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>Block Number: #{props.block.blockNumber}</ModalHeader>
                                <ModalCloseButton/>
                                <ModalBody>
                                    <TransactionTable transactions={props.block.transactions}/>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </>
                }
            </Td>
            <Td isNumeric>{props.block.timestamp}</Td>
            <Td>{props.block.payload.minedBy}</Td>
            <Td isNumeric>{props.block.difficulty}</Td>
            <Td isNumeric>{props.block.reward}</Td>
            <Td isNumeric>{props.block.fee}</Td>
            <Td isNumeric>{props.block.nonce}</Td>
            <Td>{props.block.hash}</Td>
            <Td>{props.block.parentHash}</Td>
        </Tr>
    );
}

export default BlockItem;