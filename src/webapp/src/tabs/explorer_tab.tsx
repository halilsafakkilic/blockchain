import {config} from "@config"
import {useEffect, useState} from "react"
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'
import {Chain} from "../models/chain.model";
import BlockTable from "./explorer/block_table";
import TransactionTable from "./explorer/transaction_table";
import AccountTable from "./explorer/account_table";

export const ExplorerTab = () => {
    const initial_chain: Chain = {
        'accounts': {},
        'waiting_blocks': [],
        'waiting_transactions': [],
        'chain': []
    };

    const [chain, setChain] = useState(initial_chain)

    const refresh_data = () => {
        console.log("refresh data");

        fetch(config.base_url + '/chain')
            .then(response => response.json())
            .then(data => {
                setChain(data)
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            refresh_data()
        }, 3000)

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (<Tabs colorScheme='green' variant="soft-rounded">
        <TabList>
            <Tab>Accounts</Tab>
            <Tab>Waiting Blocks</Tab>
            <Tab>Waiting Transactions</Tab>
            <Tab>Chain</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <AccountTable accounts={chain.accounts}/>
            </TabPanel>
            <TabPanel>
                <BlockTable blocks={chain.waiting_blocks}/>
            </TabPanel>
            <TabPanel>
                <TransactionTable transactions={chain.waiting_transactions}/>
            </TabPanel>
            <TabPanel>
                <BlockTable blocks={chain.chain}/>
            </TabPanel>
        </TabPanels>
    </Tabs>);
}

export default ExplorerTab;
