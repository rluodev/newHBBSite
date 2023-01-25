import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Icon from '@hackclub/icons'
import BigModal from '../../components/BigModal'
import { useEffect, useState } from 'react';

export default function Manage() {
	const [showModal, setShowModal] = useState(false);
    const registrations = function () {
        fetch('/api/GetRegistrations', {
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
                const data = await response.json();
                console.log(data);
                return data;
            } else {
                console.log("Error occurred while attempting to get registrations.");
                return [];
            }
        });
    };
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
						<img src="https://cdn.hackbackbetter.live/logo-full-light.png" style={{ maxWidth: '15%', position: 'absolute', bottom: '2rem', right: '2rem' }} />
                        <p style={{ maxWidth: '15%', position: 'absolute', bottom: '2rem', right: '2rem' }}><a href="/admin" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>Return to Home</a></p>
						<h1 style={{ marginBottom: '0px' }}>Admin Panel</h1>
						{registrations.map((section, i) => {
							return (
								<div style={{
									padding: '1rem',
									position: 'relative'
								}}>
									<div style={{
										width: '100%',
										height: '100%',
										position: 'absolute',
										filter: 'opacity(0.6)',
										top: '0px',
										left: '0px',
										zIndex: '10',
										// CHANGE THE BELOW!!!
										background: i % 4 === 1 ? 'url("https://cdn.hackbackbetter.live/backgroundimg.jpg")' : undefined,
										backgroundSize: 'cover',

									}}></div>
									<div style={{
										position: 'relative',
										zIndex: '20',
									}}>


										<center>
											<div style={{
												width: '500px',
												maxWidth: 'calc(100vw - 60px)',
												textAlign: 'left',
												marginLeft: '20px',
												marginTop: i == 0 ? '6rem' : '2rem'
											}}>
												<h2>{section.title}</h2>
												<p>{section.description}</p>
											</div>
										</center>
										<center>
											<div style={{
												width: '500px',
												maxWidth: 'calc(100vw - 60px)',
												textAlign: 'left',
												marginLeft: '20px',
												marginTop: i == 0 ? '6rem' : '2rem'
											}}>
												{
													section.questions.map((question, i) => {
														return (
															<>
																<div style={{
																	marginBottom: '3rem',
																	marginTop: '3rem',
																}}>
																	{(question.special == 'multiSelect' || question.special == 'select') ?
																		<Select {...{
																			setValue,
																			options: question.options,
																			multi: question.special == 'multiSelect',
																			name: question.name,
																			description: question.description,
																			help: question.help,
																			width: 'min(calc(100% - 20px), 400px)',
																			type: question.type,
																			placeholder: question.placeholder,
																			validate: question.verify,
																			required: question.required,
																			dontDisplayAll: question.dontDisplayAll
																		}} />
																		: question.special == 'text' ? <Title {...{
																			name: question.name,
																			description: question.description,
																			help: question.help,
																			width: 'min(calc(100% - 20px), 400px)',
																		}} /> :
																			<Text {...{
																				name: question.name,
																				setValue,
																				description: question.description,
																				help: question.help,
																				width: 'min(calc(100% - 20px), 400px)',
																				type: question.type,
																				placeholder: question.placeholder,
																				validate: question.verify,
																				required: question.required
																			}} />
																	}
																</div>
															</>
														)
													})
												}
											</div>
										</center>
									</div>
								</div>
							);
						})}
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