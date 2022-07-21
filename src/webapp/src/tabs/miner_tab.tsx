import {useState} from "react";
import {Button, Grid, GridItem, Input, InputGroup, InputRightElement, ToastId, useToast} from "@chakra-ui/react";
import {config} from "@config";
import {MdAllInclusive, MdBolt} from "react-icons/md";

export const MinerTab = () => {
    const [address, setAddress] = useState('')
    const toast = useToast()

    const blockMine = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({address: address})
        };

        const loaderToast = toast({
            title: 'Mining starting...',
            description: "Please wait...",
            status: 'info',
            duration: null
        })

        fetch(config.base_url + '/mine', requestOptions)
            .then(response => response.json())
            .then(() => {
                toast.close(loaderToast as ToastId)

                toast({
                    title: 'Mining completed.',
                    description: "New block mining process completed.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            });
    }

    const blockSeeder = () => {
        const requestOptions = {
            method: 'POST',
        };

        const loaderToast = toast({
            title: 'Block seeder starting...',
            description: "Please wait...",
            status: 'info',
            duration: null
        })

        fetch(config.base_url + '/seeder', requestOptions)
            .then(response => response.json())
            .then(() => {

                toast.close(loaderToast as ToastId)

                toast({
                    title: 'Block seed completed.',
                    description: "Added random transactions to the chain.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            });
    }

    return (<Grid templateColumns='repeat(2, 1fr)'>
        <GridItem w='90%' h='10'>
            <InputGroup size='md'>
                <Input value={address} onChange={(e) => {
                    setAddress(e.target.value)
                }} placeholder='Address' pr='4.5rem' focusBorderColor='teal.300'/>
                <InputRightElement width='4.5rem' mr='2'>
                    <Button colorScheme='teal' onClick={() => {
                        blockMine()
                    }} h='1.75rem' size='sm' leftIcon={<MdBolt/>}>Mine</Button>
                </InputRightElement>
            </InputGroup>

            <Button
                colorScheme='green'
                onClick={blockSeeder}
                zIndex="0"
                mt='5'
                rightIcon={<MdAllInclusive/>}
            >Block Seeder</Button>
        </GridItem>
    </Grid>);
}

export default MinerTab;
