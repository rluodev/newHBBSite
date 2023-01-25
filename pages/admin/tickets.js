import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Icon from '@hackclub/icons'
import BigModal from '../../components/BigModal'
import { useEffect, useState } from 'react';

export default function Tickets() {
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		fetch('https://ip.yodacode.xyz').then(res => res.json()).then(({ geo }) => {
			fetch('/api/CheckAuth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: localStorage.getItem('token')
				})
			}).then(async (response) => {
				console.log(response);
				if (response.ok) {
					setShowModal(true);
				} else {
					setShowModal(false);
					localStorage.removeItem('token');
					window.location.href = '/adminLogin';
				}
			});
		})
	}, [])
	const manualCheckAuth = function() {
		fetch('https://ip.yodacode.xyz').then(res => res.json()).then(({ geo }) => {
			fetch('/api/CheckAuth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: localStorage.getItem('token')
				})
			}).then(async (response) => {
				console.log(response);
				if (response.ok) {
					setShowModal(true);
				} else {
					setShowModal(false);
					localStorage.removeItem('token');
					window.location.href = '/adminLogin';
				}
			});
		});
	}
	const checkAuth = setInterval(function () {
		fetch('https://ip.yodacode.xyz').then(res => res.json()).then(({ geo }) => {
			fetch('/api/CheckAuth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: localStorage.getItem('token')
				})
			}).then(async (response) => {
				console.log(response);
				if (response.ok) {
					setShowModal(true);
				} else {
					setShowModal(false);
					localStorage.removeItem('token');
					window.location.href = '/adminLogin';
				}
			});
		})
	}, 5000);

	const sendAllTickets = function () {
		manualCheckAuth();
		fetch('/api/SendTix', {
			method: 'POST'
		}).then(async (response) => {
			console.log(response);
			if (response.ok) {
				alert('Sent all tickets!');
			} else {
				alert('Failed to send tickets!');
			}
		});
	};

		return (
			<>
				<div style={{
					width: '100vw',
					height: '100vh',
					background: 'var(--purple)'
				}}>
					<Head>
						<title>Tickets - Admin Panel</title>
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
					<BigModal visible={showModal} setVisible={setShowModal} hideCloseButton={true}>
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
							<h1 style={{ marginBottom: '0px' }}>Admin Panel</h1>
							<p>What would you like to do?</p>
							<p><a href="/admin" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>Back To Main Menu</a>  <a href="#" onclick={() => { sendAllTickets(); }} style={{ color: 'var(--purple)', textDecoration: 'underline' }}>Send Tickets</a></p>
						</div>
					</BigModal>
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
					}}></div>
				</div>

			</>
		);
		//update
	}