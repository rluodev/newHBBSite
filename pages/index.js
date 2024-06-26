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
							paddingBottom: '1rem',
							overflowWrap: 'break-word'
						}}>
							HackBackBetter<br />2023<br />
						</h1>
						<img style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								minWidth: '100%',
								height: 'auto!important',
								width: '100% !important',
								objectFit: 'cover',
								zIndex: -1
							}}
							src="https://cdn.hackbackbetter.live/backgroundimg.png"
						/>
						<p className={styles.description}>
							Come and join us for a weekend of coding, collaboration and over $13,000 dollars in prizes/swag! This event will be located at Hacker Dojo in Mountain View, CA (855 Maude Ave, Mountain View, CA 94043) on April 22-23, 2023 and will run from 9:00 AM to 7:00 PM each day. All participants will receive a swag pack (Including a t-shirt, laptop stickers, 2x $15 DoorDash coupons (sponsored by DoorDash), and etc.).
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
								marginTop: '1rem',
								marginBottom: '1rem',
								display: 'flex',
							}}>
								<a href="/register" target="_blank">
									<button className={styles.altButton} style={{
										position: 'absolute',
										width: '200px',
										background: 'rgba(var(--purple-3-values), 0.3)',
										height: '100%',
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
							<p>HackBackBetter 2023 will take place on April 22nd-23rd at Hacker Dojo in Mountain View, CA (855 Maude Ave, Mountain View, CA 94043).</p>
							<h2>Do you offer any travel stipends/scholarships?</h2>
							<p>Unfortunately, due to limited funding, we are unable to offer travel stipends or scholarships to any participants at this time. This may change in the future, so please continue checking this page for updates.</p>
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
						<p>We would like to thank our partners and sponsors (listed below) for helping us make this hackathon a reality! Want to be a part of something awesome? Email us at <a href="mailto:sponsor@hackbackbetter.live" style={{ color: 'var(--l-purple)', textDecoration: 'underline' }}>sponsor@hackbackbetter.live</a> or check out our <a href="/prospectus" style={{ color: 'var(--l-purple)', textDecoration: 'underline' }} target="_blank" onClick={e => {
							e.preventDefault();
							window.open('https://hackbackbetter.live/prospectus');
						}}>prospectus</a> to get involved!</p>
						<br />
						<h2>HackBackBetter 2023 is made possible thanks to: </h2>
						<h2>Nonprofit Partners:</h2>
						<a href="https://www.cpmentorship.org/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/partner-assets/CPMLogo.png" />
						</a>
						<a href="https://www.greenkeepersusa.org/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/partner-assets/GKLogo.png" />
						</a>
						<h2>Financial Sponsors:</h2>
						<a href="https://newtechsolutions.com/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/NTSLogo.jpg" />
						</a>
						<a href="https://www.hudsonrivertrading.com/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/HRTLogo.png" />
						</a>
						<a href="https://bank.hackclub.com/hackbackbetter/donations" className={styles.vertCenter}>
							<div style={{
							border: '2px solid transparent',
							background: '#8899aa33',
							borderRadius: '8px',
							height: '89.336px'
							}}
							className={styles.sponsor}> 
								<center>
									<h2 style={{
										marginBottom: '0px',
										whiteSpace: 'wrap',
										textOverflow: 'wrap',
										width: 'calc(100% - 60px)',
										overflow: 'hidden'
									}}>The Gilmartin Family</h2>
								</center>
							</div>
						</a>
						<a href="https://hackerone.com/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/HackerOneLogo.png" />
						</a>
						<a href="https://www.x-camp.academy/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/XCampLogo.png" />
						</a>
						<a href="https://www.valleywater.org/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/ValleyWaterLogo.png" />
						</a>
						<a href="https://sparkhubfoundation.org/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/SparkhubLogo.png" />
						</a>
						<a href="https://www.postman.com/student-program/#student-expert-program" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/postmanLogo.png" />
						</a>
						<h2>In-Kind Sponsors:</h2>
						<a href="https://doordash.com/" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/DoorDashLogo.png" />
						</a>
						<a href="https://wolfram.com" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/WolframLogo.png" />
						</a>
						<a href="https://porkbun.com" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/PorkbunLogo.png" />
						</a>
						<a href="https://identity.digital" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/dotLiveLogo.png" />
						</a>
						<a href="https://digitalocean.com" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/DigitalOceanLogo.png" />
						</a>
						<a href="https://github.com" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/GitHubLogo.svg" />
						</a>
						<a href="https://echo3d.com" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/echo3DLogo.png" />
						</a>
						<a href="https://janestreet.com" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/JaneStreetLogo.png" />
						</a>
						<a href="https://aops.com" className={styles.vertCenter}>
							<img className={styles.sponsor} src="https://cdn.hackbackbetter.live/sponsor-assets/aopsLogo.png" />
						</a>
					</center>
					<center>
						<h2>And:</h2>
						<div style={{
							height: '100px',
							border: '2px solid transparent',
							marginTop: '10px',
							background: '#8899aa33',
							borderRadius: '8px',
							width: 'auto',
							maxWidth: '400px'
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
					<center>
						<div>
							HackBackBetter is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club). <br />
							Nonprofit EIN: 81-2908499.
							<br />
							We'd like to thank <a href="https://hackoc.org" style={{ color: 'var(--l-purple)', textDecoration: 'underline' }}>HackOC</a> for making their website open source and allowing us to borrow some of their code.
						</div>
					</center>
					<div style={{ marginTop: '10px', marginBottom: '-8px' }}>
						<a href="https://instagram.com/hackbackbetter2023">
							<Icon glyph='instagram' size={32} />
						</a>
						<a href="https://bank.hackclub.com/hackbackbetter">
							<Icon glyph='bank-account' size={32} />
						</a>
						<a href="mailto:info@hackbackbetter.live">
							<Icon glyph='email' size={32} />
						</a>
						<a href="https://twitter.com/HackBackBetter">
							<Icon glyph='twitter' size={32} />
						</a>
					</div>
				</div>
			</div>
		</>
	)
}
