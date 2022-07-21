import {useEffect, useState} from "react";
import {Grid, GridItem, Input, InputGroup, InputLeftAddon} from "@chakra-ui/react";
import {config} from "@config";

export const AccountShowTab = () => {
    const [address, setAddress] = useState('')
    const [account, setAccount] = useState({'balance': '', 'nonce': ''})

    useEffect(() => {
        getAccount(address)
    }, [address]);

    const getAccount = (account: string) => {
        if (account === null || account === '') {
            setAccount({'balance': '', 'nonce': ''})

            return
        }

        fetch(config.base_url + '/account/' + account)
            .then(response => response.json())
            .then(data => {
                setAccount(data)
            });
    }

    return (<Grid templateColumns='repeat(2, 1fr)'>
        <GridItem w='90%' h='10'>
            <InputGroup mb='4'>
                <InputLeftAddon children='Address'/>
                <Input value={address} onChange={(e) => {
                    setAddress(e.target.value)
                }}/>
            </InputGroup>

            <InputGroup mb='2'>
                <InputLeftAddon children='Balance'/>
                <Input value={account.balance} isReadOnly/>
            </InputGroup>

            <InputGroup>
                <InputLeftAddon children='Nonce'/>
                <Input value={account.nonce} isReadOnly/>
            </InputGroup>
        </GridItem>
    </Grid>);
}

export default AccountShowTab;
