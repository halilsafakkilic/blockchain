import {Button, Grid, GridItem, Input, InputGroup, InputLeftAddon, ToastId, useToast} from "@chakra-ui/react";
import {useState} from "react";
import {config} from "@config";
import {MdSend} from "react-icons/md";

export const CoinTransactionTab = () => {
    const [address, setAddress] = useState('')
    const [to, setTo] = useState('')
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
            body: JSON.stringify({address: address, to: to, private_key: privateKey, value: value})
        };

        fetch(config.base_url + '/coin-transaction', requestOptions)
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

                    setTo('')
                    setValue('0')
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

            <InputGroup mb='4'>
                <InputLeftAddon children='Amount'/>
                <Input value={value} onChange={(e) => {
                    setValue(e.target.value)
                }}/>
            </InputGroup>

            <InputGroup mb='2'>
                <InputLeftAddon children='Receiver Address'/>
                <Input value={to} onChange={(e) => {
                    setTo(e.target.value)
                }}/>
            </InputGroup>

            <Button colorScheme='teal' onClick={() => {
                sendTransaction()
            }} leftIcon={<MdSend/>}>Send Coin</Button>
        </GridItem>
    </Grid>);
}

export default CoinTransactionTab;
