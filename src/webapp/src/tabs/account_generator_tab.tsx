import {useState} from "react";
import {
    Button,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Text,
    Textarea,
    useToast
} from "@chakra-ui/react";
import {config} from "@config";
import {MdAllInclusive, MdOutlineFingerprint} from "react-icons/md";

export const AccountGeneratorTab = () => {
    const toast = useToast()

    const [passphrase, setPassphrase] = useState('')

    const [privateKey, setPrivateKey] = useState('')
    const [publicKey, setPublicKey] = useState('')
    const [address, setAddress] = useState('')

    const randomClick = () => {
        generateAddress()

        setPassphrase('')
    }

    const copyAddress = () => {
        navigator.clipboard.writeText(address).then(() => {
             toast({
            title: 'Address copied.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        })
            .catch(() => {
                toast({
                    title: 'Address copy failed!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            });
    }

    const copyPrivateKey = () => {
        navigator.clipboard.writeText(privateKey).then(() => {
            toast({
                title: 'Private key copied.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
            .catch(() => {
                toast({
                    title: 'Private key copy failed!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            });
    }

    const generateAddress = (passphrase = '') => {
        let requestOptions = {};
        if (passphrase) {
            requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({passphrase: passphrase})
            };
        }

        fetch(config.base_url + '/address/generate', requestOptions)
            .then(response => response.json())
            .then(data => {
                setPrivateKey(data.private_key)
                setPublicKey(data.public_key)
                setAddress(data.address)
            });
    }

    return (<Grid templateColumns='repeat(2, 1fr)'>
        <GridItem w='90%' h='10'>
            <Button
                colorScheme='green'
                onClick={randomClick}
                zIndex="0"
                mb='5'
                rightIcon={<MdAllInclusive/>}
            >Random Generate</Button>

            <p>If you want generate address with your passphrase; (not suggested)</p>
            <InputGroup size='md'>
                <Input
                    pr='6rem'
                    value={passphrase} onChange={(e) => {
                    setPassphrase(e.target.value)
                }}
                    placeholder='Your passphrase'
                    focusBorderColor='orange.300'
                />
                <InputRightElement width='6rem' mr='2'>
                    <Button
                        colorScheme='orange'
                        rightIcon={<MdOutlineFingerprint/>}
                        onClick={() => {
                            generateAddress(passphrase)
                        }}
                        h='1.75rem' size='sm'
                    >Generate</Button>
                </InputRightElement>
            </InputGroup>

        </GridItem>

        <GridItem w='100%' h='10'>
            <InputGroup>
                <InputLeftAddon children='Address'/>
                <Input value={address} isReadOnly onClick={copyAddress}/>
            </InputGroup>

            <Text mt='5' mb='8px'>Private Key</Text>
            <Input value={privateKey} isReadOnly onClick={copyPrivateKey}/>

            <Text mb='8px'>Public Key</Text>
            <Textarea
                size='md'
                value={publicKey}
                isReadOnly
            />
        </GridItem>
    </Grid>);
}

export default AccountGeneratorTab;
