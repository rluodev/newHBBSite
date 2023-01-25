import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Icon from '@hackclub/icons'
import BigModal from '../components/BigModal'
import { useEffect, useState } from 'react';

export default function Admin() {
	const [token, setToken] = useState('');
	const handleSubmita = () => {
		fetch('https://ip.yodacode.xyz').then(res => res.json()).then(({ geo }) => {
			fetch('/api/adminLogin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token,
					city: geo.city
				})
			}).then(async (response) => {
				console.log(response);
				if (response.ok) {
					const cookie = await response.json();
					// If the response is ok, set the token in the local storage
					// and redirect to the dashboard
					try {
						localStorage.setItem('token', cookie.message);
						window.location.href = '/admin';
					} catch (err) {
						alert("Failed to set auth token in local storage. Please make sure cookies are enabled.");
						console.log("Failed to set auth token in local storage. Please make sure cookies are enabled.");
					}

				} else {
					// Else throw an error with the message returned
					// from the API
					try {
						const error = await response.json();
						throw new Error(error.message)
					} catch (error) {
						alert(error?.message || "Something went wrong");
					}
				}
			});
		})
	}
	return (
		<>
			<div style={{
				width: '100vw',
				height: '100vh',
				background: 'var(--purple)'
			}}>
				<Head>
					<title>Admin Panel</title>
					<meta name="description" content="Admin Panel" />
					<link rel="icon" href="/favicon.ico" />
					<meta key="og_locale" property="og:locale" content="en_US" />
					<meta key="og_type" property="og:type" content="website" />
					<meta key="og_site" property="og:site_name" content="HackBackBetter 2023" />
					<meta key="og_title" property="og:title" content="HackBackBetter 2023" />
					<meta key="desc" name="description" content="Admin Panel" />
					<meta key="og_desc" property="og:description" content="Admin Panel" />
					<meta key="tw_desc" name="twitter:description" content="Admin Panel" />
					<meta key="theme_color" name="theme-color" content="purple" />
					<meta key="tw_card" name="twitter:card" content="summary_large_image" />
					<meta key="robots" name="robots" content="noindex, nofollow" />
				</Head>
				<BigModal visible={true} setVisible={() => ''} hideCloseButton={true}>
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
						<img src="https://cdn.hackbackbetter.live/logo-full-light.png" style={{ maxWidth: '15%', position: 'absolute', bottom: '2rem', right: '2rem' }} />
						<h1 style={{ marginBottom: '0px' }}>You've successfully cancelled your registration.</h1>
						<p>That's all you need to do. If you don't want to receive any more update emails from us (if you subscribed on our home page), please visit <a href="/unsubscribe" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>this page</a> and fill out the form.</p>
						<p><b>What made you leave?</b> We would like to hear any feedback that you have for us, so please send us an email at <a href="mailto:info@hackbackbetter.live" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>info@hackbackbetter.live</a> if you have any!</p>
					</div>
				</BigModal>
			</div>

		</>
	);
	//update
}