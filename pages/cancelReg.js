import Head from 'next/head'
import styles from '../styles/Register.module.css'
import Icon from '@hackclub/icons'
import Modal from '../components/Modal'
import Text from '../components/Inputs/Text.js';
import Title from '../components/Inputs/Title.js';
import Select from '../components/Inputs/Select.js';
import { questions, sections } from '../lib/cancelRegQuestions.js';
import { createRef, useEffect, useState } from 'react';

const meta_desc = "An in-person hackathon in San Jose, CA. Join us for 2 days of fun, hacking, and more fun!";
const theme_color = '#1E1682';
const social_image = '/social.png';

import ReCAPTCHA from "react-google-recaptcha";

const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const timelapseId = "9x00RCb1N7WTpAl6cIN0000Kult00vyzslROW6A1RblWwxM"

// const timelapseId = "402YMZJfp6kW02302E3r1RMe013Ub9AqlPwzr4VjD00HO7ME"

export default function Unsubscribe() {

	const [modal, setModal] = useState(false);
	const recaptchaRef = createRef();

	const [formData, setFormData] = useState({});

	function setValue(name, value) {
		let newFormData = JSON.parse(JSON.stringify(formData))
		newFormData[name] = value;
		setFormData(newFormData);
	}

	function validate() {
		const v = Object.values(questions);
		let valid = true;
		let missing = [];
		for (let i = 0; i < v.length; i++) {
			const { required, verify, name } = v[i];
			const value = formData[name];
			const isValid = (
				(required ? (value instanceof Array ? value.length : value) : true)
				&&
				(verify?.(value))
			);
			console.log(value, name, isValid)
			if (!isValid && v[i].special !== 'text') {
				valid = false;
				missing.push(name)
			}
		}
		return { valid, missing };
	}

	const [valid, setValid] = useState(validate());

	useEffect(() => {
		setValid(validate());
	}, [formData]);

	const [key, setKey] = useState('');
	const [showForm, setShowForm] = useState(true);
	const [captchaCode, setCaptchaCode] = useState(null);


	// const handleSubmit = (event) => {
	//   event.preventDefault();
	//   // Execute the reCAPTCHA when the form is submitted
	//   recaptchaRef.current.execute();
	// };
	const handleSubmit = async () => {
		// If the reCAPTCHA code is null or undefined indicating that
		// the reCAPTCHA was expired then return early
		if (!captchaCode) {
			return;
		}
		try {
			const response = await fetch("/api/cancelReg", {
				method: "POST",
				body: JSON.stringify({ data: {uuid: new URLSearchParams(window.location.search).get('regID')}, captcha: captchaCode }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				// If the response is ok than show the success alert
				window.location.href = '/cancelReg/success?name=' + encodeURIComponent(await response.json().name);
			} else {
				// Else throw an error with the message returned
				// from the API
				const error = await response.json();
				throw new Error(error.message)
			}
		} catch (error) {
			alert(error?.message || "Something went wrong");
		} finally {

		}
	};


	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	useEffect(() => {
		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		});
		if (params?.email) setEmail(params?.email);
		if (params?.key) setKey(params?.key);
		setShowForm(process.env.NODE_ENV !== "production" || key == process.env.NEXT_PUBLIC_KEY);
	}, []);
	if (false) return (
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
						border: '2px solid var(--orange)',
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						justifyContent: 'center',
						padding: '40px',
						textAlign: 'center'
					}}>
						<h1 style={{ marginBottom: '0px' }}>Registrations will open soon!</h1>
						<p>In the meantime, check out our <a href="/" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>homepage</a>.</p>
					</div>
				</Modal>
			</div>
		</>
	);
	return (
		<>
			<Head>
				<title>Cancel Registration</title>
				<meta name="description" content={meta_desc} />
				<link rel="icon" href="/favicon.ico" />
				<meta key="og_locale" property="og:locale" content="en_US" />
				<meta key="og_type" property="og:type" content="website" />
				<meta key="og_site" property="og:site_name" content="HackBackBetter 2023" />
				<meta key="og_title" property="og:title" content="HackBackBetter 2023" />
				<meta key="desc" name="description" content={meta_desc} />
				<meta key="og_desc" property="og:description" content={meta_desc} />
				<meta key="tw_desc" name="twitter:description" content={meta_desc} />
				<meta key="theme_color" name="theme-color" content={theme_color} />
				<meta key="og_img" property="og:image" content={social_image} />
				<meta key="tw_card" name="twitter:card" content="summary_large_image" />
				<meta key="tw_img" name="twitter:image" content={social_image} />
				<link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet" />
			</Head>


			<div className={styles.container} style={{
				position: 'relative',
				zIndex: '10',
				overflow: 'hidden'
			}}>

				<main className={styles.main}>
					<h1 className={styles.title} style={{ color: 'black' }}>
						Cancel Registration
					</h1>
					<form onSubmit={e => e.preventDefault()}>
						{sections.map((section, i) => {
							return (
								<div style={{
									padding: '1rem',
									position: 'relative'
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
							);
						})}
						<center>
							<div style={{
								width: '500px',
								maxWidth: 'calc(100vw - 60px)',
								textAlign: 'left',
								marginLeft: '20px',
								marginTop: '-1rem'
							}}>
								<Title {...{
									name: 'Confirm You\'re Human',
									description: `Please complete the captcha so we can make sure you're a human.`,
									width: 'min(calc(100% - 20px), 400px)'
								}} />
								<div style={{
									marginTop: '2rem',
									marginBottom: '2rem'
								}}>
									<ReCAPTCHA
										ref={recaptchaRef}
										// test
										//rebuild needed
										sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
										onChange={setCaptchaCode}
									/>
								</div>
								<button type="submit" style={{
									marginBottom: '4rem',
									borderRadius: '0.25rem',
									borderColor: '#d3d3d4',
									borderWidth: '2px',
									borderStyle: 'solid',
									fontSize: '1em',
									fontFamily: '\'Anonymous Pro\', monospace',
									padding: '0.5rem',
									cursor: valid.valid ? 'pointer' : 'default'
								}} onClick={valid.valid ? handleSubmit : () => {
								}} aria-label="a" className="tooltipped" disabled={!valid.valid}>{valid.valid ? 'Unsubscribe' : `${valid.missing.length} incomplete field${valid.missing.length == 1 ? '' : 's'}`}</button>
							</div>
						</center>
					</form>
				</main>
			</div>
		</>
	)
}