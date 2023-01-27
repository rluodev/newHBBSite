import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Icon from '@hackclub/icons'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react';
import splitbee from '@splitbee/web';

const meta_desc = "An in-person hackathon aimed towards new and intermediate-level hackers! Join us April 22-23 for 2 days of fun and hacking!";
const theme_color = '#1E1682';
const social_image = '/social.png';

const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const timelapseId = "402YMZJfp6kW02302E3r1RMe013Ub9AqlPwzr4VjD00HO7ME"

export default function Home() {
	const [modal, setModal] = useState(false);
	const handleFormEnter = () => {
		if (regex.test(email) && !loading) {

			fetch('https://ip.yodacode.xyz').then(res => res.json()).then(({ geo }) => {
				setLoading(true);
				splitbee.track("Email Subscribe", {
					email,
					city: geo.city
				});
				fetch('/api/v2', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email,
						city: geo.city
					})
				}).then(async (response) => {
					if (response.ok) {
						// If the response is ok than show the success alert
						setSubmitted(true);
					} else {
						// Else throw an error with the message returned
						// from the API
						try {
							const error = await response.json();
							throw new Error(error.message)
						} catch (error) {
							alert(error?.message || "Something went wrong");
						} finally {
							setLoading(false);
						}
					}
				});
			})
		}
	};
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [donor, setDonor] = useState('');
	useEffect(() => {
		fetch('/api/donor').then(res => res.text()).then(setDonor);
		if (!localStorage.getItem('hackbackbetter-analytics')) {
			fetch('https://ip.yodacode.xyz').then(res => res.json()).then(({ geo }) => {
				splitbee.user.set({
					city: geo.city
				});
				localStorage.setItem('hackbackbetter-analytics', true);
			});
		}
	}, []);
	return (
		<>
			<Modal visible={modal} setVisible={setModal}>
				<iframe src="https://bank.hackclub.com/donations/start/hackbackbetter" style={{
					width: '100%',
					height: '100%',
					border: 'none',
					borderRadius: '8px',
					border: '2px solid var(--purple)'
				}} onLoad={e => {
					if (!e.target.src.endsWith('donations/start/hackbackbetter')) splitbee.track("Donation", {
						url: e.target.src
					});
				}}>

				</iframe>
			</Modal>
			<div className={styles.container} style={{
				position: 'relative',
				zIndex: '10',
				overflow: 'hidden'
			}}>
				<Head>
					<title>HackBackBetter 2023</title>
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
					<meta key="robots" name="robots" content="nofollow" />
				</Head>

				<main className={styles.main}>
					<div className="background-charcoal color-white" style={{
						width: '100%',
						padding: '5rem 2rem',
						position: 'relative',
						overflow: 'hidden'
					}}>
						<h1 className={styles.title} style={{
							paddingBottom: '1rem'
						}}>
							HackBackBetter<br />2023<br />
						</h1>
						<video
							autoPlay
							muted
							loop
							playsInline
							poster={`https://image.mux.com/${timelapseId}/thumbnail.png?width=214&height=121&fit_mode=pad`}
							duration={2000}
							style={{
								position: 'absolute',
								bottom: 0,
								left: 0,
								right: 0,
								height: 'auto!important',
								width: '100% !important',
								minHeight: '1580px',
								objectFit: 'cover',
								zIndex: -1
							}}
						>
							<source src={`https://stream.mux.com/${timelapseId}.m3u8`} />
							<source src={`https://stream.mux.com/${timelapseId}/medium.mp4`} />
						</video>
						<p className={styles.description}>
							Come and join us for a weekend of coding, collaboration and over $16,000 dollars in prizes/swag! This event will be located at the South Bay Yacht Club in Alviso, CA (Location subject to change) on April 22-23, 2023 and will run from 9:00 AM to 6:00 PM each day. All participants will receive a swag pack (Including a t-shirt, laptop stickers, 2x $15 DoorDash coupons (sponsored by DoorDash), and etc.).
						</p>
						<center style={{
							position: 'relative',
							height: '55px',
							marginTop: '1rem',
							marginBottom: '1rem'
						}}>
							<p className={styles.description} style={{ color: 'white' }}>Register to attend!</p>
							<center className={styles.inputCenter} style={{
								display: 'block',
								height: '80px',
								width: '200px',
								display: 'flex',
								position: 'absolute',
								top: '0px',
								left: '50%',
								transform: 'translateX(-50%)'
							}}>
								<a href="/register" target="_blank">
									<button className={styles.altButton} style={{
										position: 'absolute',
										width: 'calc(100%)',
										background: 'rgba(var(--purple-3-values), 0.3)',
										height: '100%',
										top: '0px',
										left: '0px',
										outline: 'none',
										fontSize: '18px',
										padding: '13px',
										color: 'white',
										fontFamily: 'var(--font-stack)'
									}}>Register here!</button>
								</a>

							</center>
						</center>
					</div>

					<div className={styles.content} style={{
						position: 'relative'
					}}>
						<div style={{
							position: 'relative',
							zIndex: '20'
						}} className={styles.innerContent}>
							<h2>What is HackBackBetter 2023?</h2>
							<p>HackBackBetter 2023 is a high school hackathon aimed towards middle- and high-school students who want to get their feet wet in software development!</p>
							<h2>What are hackathons?</h2>
							<p>Traditional hackathons are events where participants are just slogging through code the whole day. That might seem fun to some people, but not to most others. Instead of doing that, we'll have many events, games, and side-activities to make sure that you'll leave feeling not just like you built some special code, but also that you made some awesome friends and memories. We'll also have food/snacks!</p>
							<h2>Is there an age limit for participants?</h2>
							<p>Yes, all participants must be enrolled and hold active student status in an accredited middle-school or high-school (and be between the ages of 13 and 18).</p>
							<h2>What do I get for joining/winning?</h2>
							<p>We're glad you asked! Our prizes are listed on <a href="https://hackbackbetter.devpost.com/" style={{ textDecoration: 'underline', color: 'var(--l-purple)' }}>our DevPost page</a>, and we'll be updating them to the full list of prizes once we are ready! Why don't you <a href="#" style={{ textDecoration: 'underline', color: 'var(--l-purple)' }} data-splitbee-event="Interaction" data-splitbee-event-type="scroll-to-top">register</a> so you'll be up-to-date on everything about the hackathon? We promise we won't spam you!</p>
							<h2>What are the themes of HackBackBetter?</h2>
							<p>There are two main themes for HackBackBetter 2023. The first is <span>returning from COVID-19</span>, and the second is <span>environmental preservation</span>.</p>
							<h2>When and where is HackBackBetter 2023 taking place?</h2>
							<p>HackBackBetter 2023 will take place on April 22nd-23rd at the South Bay Yacht Club in Alviso, CA (Location subject to change).</p>
						</div>
						<img src="https://cdn.hackbackbetter.live/logo-full-light.png" style={{
							position: 'absolute',
							bottom: '20px',
							right: '40px',
							width: '300px',
							zIndex: '15',
							filter: 'opacity(0.7)'
						}} />

					</div>

				</main>
				<div className={styles.sponsors}>
					<center>
						<h1>Sponsors</h1>
						<p>We would like to thank our sponsors (listed below) for helping us make this hackathon a reality! Want to be a part of something awesome? Email us at <a href="mailto:sponsor@hackbackbetter.live" style={{ color: 'var(--l-purple)', textDecoration: 'underline' }}>sponsor@hackbackbetter.live</a> or check out our <a href="/prospectus" style={{ color: 'var(--l-purple)', textDecoration: 'underline' }} target="_blank" onClick={e => {
							e.preventDefault();
							window.open('https://hackbackbetter.live/prospectus');
						}}>prospectus</a> to get involved!</p>
						<br />
						<h2>HackBackBetter 2023 is made possible thanks to: </h2>
						<a href="https://doordash.com/">
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/DoorDashLogo.png" />
						</a>
						<a href="https://wolfram.com">
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/WolframLogo.png" />
						</a>
						<a href="https://echo3d.com">
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/echo3DLogo.png" />
						</a>
					</center>
					<center>
						<h2>And:</h2>
						<div style={{
							height: '100px',
							border: '2px solid transparent',
							marginTop: '10px',
							background: '#8899aa33',
							borderRadius: '8px'
						}} className={styles.sponsor}>
							<a href="https://bank.hackclub.com/hackbackbetter/donations" target="_blank">
								<center>
									<h2 style={{
										marginBottom: '0px',
										whiteSpace: 'nowrap',
										textOverflow: 'ellipsis',
										width: 'calc(100% - 60px)',
										overflow: 'hidden'
									}}>{donor}</h2>
									<p style={{
										textTransform: 'uppercase',
										marginTop: '8px',
										fontSize: '12px',
										color: '#8899aa',
										lineHeight: '0px'
									}}>and other very cool donors
										<Icon glyph="external" size={16} style={{
											transform: 'translate(1px, 3px)'
										}} />
									</p>
								</center>
							</a>
						</div>
					</center>

					<a href="/register" target="_blank">
						<button className={styles.altButton} style={{
							background: 'rgba(var(--purple-3-values), 0.3)'
						}}>Register here!</button>
					</a>
					<button className={styles.altButton} onClick={() => {
						setModal(true);
					}}>Donate</button>
					<a href="/discord" target="_blank">
						<button className={styles.altButton}>Discord</button>
					</a>
					<a href="/finances" target="_blank">
						<button className={styles.altButton}>Finances</button>
					</a>
					<a href="/github" target="_blank">
						<button className={styles.altButton}>GitHub</button>
					</a>
				</div>
				<div style={{
					background: '#ddd',
					fontWeight: '300',
					fontFamily: '\'Anonymous Pro\', monospace',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '20px',
					flexDirection: 'column'
				}} className={styles.bottomFooter}>
					<div>
						HackBackBetter is fiscally sponsored by The Hack Foundation.
						Nonprofit EIN: 81-2908499.
					</div>
					<div style={{ marginTop: '10px', marginBottom: '-8px' }}>
						<a href="https://instagram.com/hackbackbetter2023" data-splitbee-event="Instagram Click" data-splitbee-event-location="footer">
							<Icon glyph='instagram' size={32} />
						</a>
						<a href="https://github.com" data-splitbee-event="GitHub Click" data-splitbee-event-location="footer" disabled="disabled">
							<Icon glyph='github' size={32} />
						</a>
						<a href="https://bank.hackclub.com/hackbackbetter" data-splitbee-event="Finances Click" data-splitbee-event-location="footer">
							<Icon glyph='bank-account' size={32} />
						</a>
						<a href="mailto:info@hackbackbetter.live" data-splitbee-event="Email Click" data-splitbee-event-location="footer">
							<Icon glyph='email' size={32} />
						</a>
						<a href="https://twitter.com" data-splitbee-event="Twitter Click" data-splitbee-event-location="footer" disabled="disabled">
							<Icon glyph='twitter' size={32} />
						</a>
					</div>
				</div>
			</div>
		</>
	)
}
