/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
	    {
	      source: "/bee.js",
	      destination: "https://cdn.splitbee.io/sb.js",
        
	    },
	    {
	      source: "/_hive/:slug",
	      destination: "https://hive.splitbee.io/:slug",
	    },
	  ];
  },
  redirects: async () => {
    return [
      {
        source: '/discord',
        destination: 'https://discord.hackbackbetter.live',
        basePath: false,
        permanent: false
      },
      {
        source: '/branding',
        destination: 'https://www.figma.com/file/ozI9JSw39NfG1JIOybBOeM/HackBackBetter-Branding?node-id=0%3A1&t=Rs50fZtw1vbBr4rL-1',
        basePath: false,
        permanent: false
      },
      {
        source: '/liability',
        destination: 'https://cdn.hackbackbetter.live/[FIRSTNAME]-[LASTNAME]_HackBackBetter_Event_Liability_Release.pdf',
        basePath: false,
        permanent: false
      },
      {
        source: '/gh/:repo',
        destination: 'https://github.com/',
        basePath: false,
        permanent: false
      },
      {
        source: '/github/:repo',
        destination: 'https://github.com/',
        basePath: false,
        permanent: false
      },
      {
        source: '/finances',
        destination: 'https://bank.hackclub.com/hackbackbetter',
        basePath: false,
        permanent: false
      },
      {
        source: '/bank',
        destination: 'https://hackbackbetter.live/finances',
        basePath: false,
        permanent: false
      },
      {
        source: '/money',
        destination: 'https://hackbackbetter.live/finances',
        basePath: false,
        permanent: false
      },
      {
        source: '/github',
        destination: 'https://github.com/',
        basePath: false,
        permanent: false
      },
      {
        source: '/donate',
        destination: 'https://bank.hackclub.com/donations/start/hackbackbetter',
        basePath: false,
        permanent: false
      },
      {
        source: '/contact',
        destination: 'mailto:info@hackbackbetter.live',
        basePath: false,
        permanent: false
      },
      {
        source: '/prospectus',
        destination: 'https://cdn.hackbackbetter.live/prospectus.pdf',
        basePath: false,
        permanent: false
      },
      {
        source: '/sponsorship-prospectus',
        destination: 'https://hackbackbetter.live/prospectus',
        basePath: false,
        permanent: false
      },
      {
        source: '/email',
        destination: 'mailto:info@hackbackbetter.live',
        basePath: false,
        permanent: false
      },
      {
        source: '/f5f786d9-9845-4a82-a061-279a8e69d517/79a15fc1-7155-41b3-90dc-924027a864d8/HackBackBetter_Sponsor_Prospectus.pdf',
        destination: 'https://hackbackbetter.live/prospectus',
        basePath: false,
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
