import React, {useEffect, useState} from "react";
import {Textarea} from "@chakra-ui/react";
import {config} from "@config";

export const HashTab = () => {
    const [value, setValue] = useState('')
    const [hash, setHash] = useState(null)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value)

        getHash(event.target.value)
    }

    const getHash = (input: string) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input: input})
        };
        fetch(config.base_url + '/hash', requestOptions)
            .then(response => response.json())
            .then(data => setHash(data.hash));
    }

    useEffect(() => {
        getHash('')
    }, []);

    return (<><Textarea
        size='md'
        placeholder='Input'
        value={value}
        onChange={handleChange}
    />
        {hash !== null ? <><br/><br/><strong>Hash</strong>: <span>{hash}</span></> : ''}
    </>);
}

export default HashTab;
