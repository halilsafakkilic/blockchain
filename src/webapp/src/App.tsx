import './App.css';
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, Tooltip} from "@chakra-ui/react";
import HashTab from "./tabs/hash_tab";
import AccountGeneratorTab from "./tabs/account_generator_tab";
import AccountShowTab from "./tabs/account_show_tab";
import MinerTab from "./tabs/miner_tab";
import DataTransactionTab from "./tabs/data_transaction_tab";
import ExplorerTab from "./tabs/explorer_tab";
import CoinTransactionTab from "./tabs/coin_transaction_tab";
import {MdOutlineViewList} from 'react-icons/md';

export const App = () => {
    return (
        <Box
            direction='column'
            width='1200px'
            m='0 auto'
        >
            <Tabs isFitted variant='line' colorScheme='teal'>
                <TabList mb='1em'>
                    <Tab>Keccak256 Hash</Tab>
                    <Tab>Account Generator</Tab>
                    <Tab>Show Account</Tab>
                    <Tab>Coin Transaction</Tab>
                    <Tab>Data Transaction</Tab>
                    <Tab>Miner</Tab>
                    <Tooltip label="Let's Discover Blockchain">
                        <Tab><MdOutlineViewList/> Explorer</Tab>
                    </Tooltip>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <HashTab/>
                    </TabPanel>
                    <TabPanel>
                        <AccountGeneratorTab/>
                    </TabPanel>
                    <TabPanel>
                        <AccountShowTab/>
                    </TabPanel>
                    <TabPanel>
                        <CoinTransactionTab/>
                    </TabPanel>
                    <TabPanel>
                        <DataTransactionTab/>
                    </TabPanel>
                    <TabPanel>
                        <MinerTab/>
                    </TabPanel>
                    <TabPanel>
                        <ExplorerTab/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default App;
