import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Icon from '@hackclub/icons'
import Modal from '../components/Modal'
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
				if (response.ok) {
					const cookie = await response.json();
					// If the response is ok, set the token in the local storage
					// and redirect to the dashboard
					try {
						localStorage.setItem('token', cookie.message);
						window.location.href = '/admin';
					} catch (error) {
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
			<Head>
				<title>Login</title>
				<meta name="description" content="Login" />
				<link rel="icon" href="/favicon.ico" />
				<meta key="og_locale" property="og:locale" content="en_US" />
				<meta key="og_type" property="og:type" content="website" />
				<meta key="og_site" property="og:site_name" content="HackBackBetter 2023" />
				<meta key="og_title" property="og:title" content="HackBackBetter 2023" />
				<meta key="desc" name="description" content="Login" />
				<meta key="og_desc" property="og:description" content="Login" />
				<meta key="tw_desc" name="twitter:description" content="Login" />
				<meta key="theme_color" name="theme-color" content="purple" />
				<meta key="tw_card" name="twitter:card" content="summary_large_image" />
				<meta key="robots" name="robots" content="noindex, nofollow" />
			</Head>
			<form>
				<label>
					Auth Token:
					<input
						type="text"
						placeholder="Your auth token here..."
						onChange={(e) => setToken(e.target.value)}
					/>
				</label>
				<br />
				<button type="submit" onSubmit={handleSubmita}>Log in</button>
			</form>
			{error && <p>Error: {error}</p>}
		</>
	);
	//update
}