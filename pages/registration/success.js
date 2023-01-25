import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css'
import Modal from '../../components/Modal';

function sendEmail () {
}

export default function Success () {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(new URLSearchParams(window.location.search).get('name'));
    }, []);
    return (
        <>
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'var(--purple)'
        }}>
            <Head>
            <title>HackBackBetter 2023</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Modal visible={true} setVisible={() => ''} hideCloseButton={true}>
            <div style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '8px',
                border: '2px solid var(--purple)',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
                position: 'relative'
            }}>
                <img src="https://cdn.hackbackbetter.live/logo-full-light.png" style={{ maxWidth: '30%', position: 'absolute', bottom: '2rem', right: '2rem' }} />
                <h1 style={{ marginBottom: '0px' }}>You're registered{name ? `, ${name}` : ''}!</h1>
                <p>Next, you'll sign the event forms. We'll reach out to you when we're ready.</p>
                <p>In the meantime, join our <a href="/discord" target="_blank" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>Discord server</a> to meet other hackers. Announcements and judging will happen through Discord, so it's important you join ahead of time.</p>
            </div>
            </Modal>
        </div>
        </>
    );

}