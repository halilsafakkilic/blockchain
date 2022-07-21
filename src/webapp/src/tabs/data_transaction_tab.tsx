import {useState} from "react";
import {
    Button,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    Textarea,
    ToastId,
    useToast
} from "@chakra-ui/react";
import {config} from "@config";
import {MdSend} from "react-icons/md";

export const DataTransactionTab = () => {
    const [address, setAddress] = useState('')
    const [privateKey, setPrivateKey] = useState('')
    const [value, setValue] = useState('')

    const toast = useToast()

    const sendTransaction = () => {
        const loaderToast = toast({
            title: 'Transaction sending...',
            description: "Please wait...",
            status: 'info',
            duration: null
        })

        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({address: address, private_key: privateKey, body: value})
        };

        fetch(config.base_url + '/data-transaction', requestOptions)
            .then(response => response.json())
            .then(data => {
                toast.close(loaderToast as ToastId)

                if (typeof (data.error) !== 'undefined') {
                    toast({
                        title: 'Transaction failed!',
                        description: data.error,
                        status: 'error'
                    })
                } else {
                    toast({
                        title: 'Transaction successfully sended.',
                        description: "Your transaction will be processed.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })

                    setValue('')
                }
            })
    }

    return (<Grid templateColumns='repeat(2, 1fr)'>
        <GridItem w='90%' h='10'>
            <InputGroup mb='2'>
                <InputLeftAddon children='Sender Address'/>
                <Input value={address} onChange={(e) => {
                    setAddress(e.target.value)
                }}/>
            </InputGroup>

            <InputGroup mb='4'>
                <InputLeftAddon children='Sender Private Key'/>
                <Input value={privateKey} onChange={(e) => {
                    setPrivateKey(e.target.value)
                }}/>
            </InputGroup>

            <Text mb='1'>Value</Text>
            <Textarea value={value} onChange={(e) => {
                setValue(e.target.value)
            }} mb='2'/>

            <Button colorScheme='teal' onClick={() => {
                sendTransaction()
            }} leftIcon={<MdSend/>}>Send Transaction</Button>
        </GridItem>
    </Grid>);
}

export default DataTransactionTab;
