import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Icon from '@hackclub/icons'
import aModal from '../components/aModal'
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
				<aModal visible={true} setVisible={() => ''} hideCloseButton={true}>
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
						<form>
							<label>
								Auth Token:
								<input
									type="password"
									style={{width: '100%',
										padding: '10px',
										fontSize: '24px',
										borderRadius: '8px',
										backgroundColor: 'var(--purple)',
										border: 'none',
										color: 'white',
										cursor: 'pointer',
										fontFamily: 'var(--font-stack)',
										marginBottom: '16px',
										transition: '0.3s all',
										outline: 'none',
										border: '2px solid var(--purple)'
									}}
									placeholder="Your auth token here..."
									onChange={e => setToken(e.target.value)}
								/>
							</label>
							<br />
							<button type="submit" style={{
									marginBottom: '4rem',
									borderRadius: '0.25rem',
									borderColor: '#d3d3d4',
									borderWidth: '2px',
									borderStyle: 'solid',
									fontSize: '1em',
									fontFamily: '\'Anonymous Pro\', monospace',
									padding: '0.5rem',
									cursor: 'pointer'
								}}
								onClick={e => { e.preventDefault(); handleSubmita() }}>Log in</button>
						</form>
					</div>
				</aModal>
			</div>
		</>
	);
	//update
}