import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Icon from '@hackclub/icons'
import BigModal from '../../components/BigModal'
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
	{
		field: 'name',
		headerName: 'Full Name',
		width: 150,
		align: 'center'
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 300,
		align: 'center'

	},
	{
		field: 'birthday',
		headerName: 'Birth Date',
		width: 150,
		align: 'center'

	},
	{
		field: 'pronouns',
		headerName: 'Pronouns',
		width: 80,
		align: 'center'
	},
	{
		field: 'parentName',
		headerName: 'Parent Name',
		width: 150,
		align: 'center'
	},
	{
		field: 'parentEmail',
		headerName: 'Parent Email',
		width: 150,
		align: 'center'
	},
	{
		field: 'tshirtSize',
		headerName: 'T-Shirt Size',
		width: 80,
		align: 'center'
	},
	{
		field: 'skillLevel',
		headerName: 'Skill Level',
		width: 200,
		align: 'center'
	},
	{
		field: 'dietaryRestrictions',
		headerName: 'Dietary Restrictions',
		width: 300,
		align: 'center'
	},
	{
		field: 'school',
		headerName: 'School',
		width: 150,
		align: 'center'
	},
	{
		field: 'discord',
		headerName: 'Discord Username',
		width: 150,
		align: 'center'
	},
	{
		field: 'approved',
		headerName: 'Approved',
		width: 50,
		align: 'center'
	},
	{
		field: 'ticketed',
		headerName: 'Ticketed',
		width: 50,
		align: 'center'
	},
	{
		field: 'forms',
		headerName: 'Forms Received',
		width: 50,
		align: 'center'
	},
	{
		field: 'checkedIn',
		headerName: 'Checked In',
		width: 50,
		align: 'center'
	},
	{
		field: 'extra',
		headerName: 'Extra Info',
		width: 200,
		align: 'center'
	},
	{
		field: 'uuid',
		headerName: 'UUID',
		width: 200,
		align: 'center'
	},

];

// https://learnjsx.com/category/4/posts/nextjs-materialui-data-grid

export default function Manage() {
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
		});
	}, [])
    const rows = fetch('/api/GetRegistrations', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: localStorage.getItem('token')
		})
	}).then(async response => await response.json());
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
						<img src="https://cdn.hackbackbetter.live/logo-full-light.png" style={{ maxWidth: '8%', position: 'absolute', bottom: '2rem', right: '2rem' }} />
						<p style={{ maxWidth: '15%', position: 'absolute', bottom: '2rem', right: '2rem' }}><a href="/admin" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>Return to Home</a></p>
						<h1 style={{ marginBottom: '0px' }}>Admin Panel</h1>
						<div style={{ width: '60%', margin: 'auto', marginTop: '2rem' }}>
							<DataGrid
								rows={rows}
								columns={columns}
								pageSize={20}
								autoHeight
								checkboxSelection
								disableSelectionOnClick
							/>
						</div>
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