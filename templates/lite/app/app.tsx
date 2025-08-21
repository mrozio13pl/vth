import { useEffect, useState } from 'react';
import { client } from '../lib/client';

export function App() {
    const [message, setMessage] = useState<string>();

    async function fetchMessage() {
        const res = await client.hello.$get();
        const json = await res.json();
        setMessage(json.message);
    }

    useEffect(() => {
        fetchMessage();
    }, []);

    return (
        <div>
            <h1>Hello World</h1>
            <p>{message}</p>
        </div>
    );
}
