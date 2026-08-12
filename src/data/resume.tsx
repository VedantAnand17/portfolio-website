import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Vedant Anand",
  initials: "VA",
  url: "https://vedant-dev.com",
  location: "Punjab, India",
  locationLink: "https://www.google.com/maps/place/patiala",
  description:
    "I build payment infrastructure for AI agents - agentic commerce, x402 and stablecoin payments - backed by full-stack TypeScript and production Solidity.",
  summary:
    "I build payment infrastructure for AI agents.\n\nI co-founded [Bags](/#work), an agentic commerce platform that let any API charge AI agents per request over the [x402](https://x402.org) protocol - pay-per-call links that quoted a price, verified a USDC payment across four chains, then returned the response. It reached 100,000+ cumulative visitors, was backed by Founders Inc. and Superteam, and was part of Canopy, the Founders Inc. builder cohort.\n\nI also contribute to x402 itself, the HTTP-native standard for paying for API calls in stablecoins. [Three of my pull requests are merged into the protocol repository](https://github.com/x402-foundation/x402/pulls?q=is%3Apr+author%3AVedantAnand17+is%3Amerged) - unit tests for EIP-2612 permit signing, named constants for ERC-20 approval gas defaults, and documentation for the extensions package. Before Bags I was [founding engineer at Timelock Protocol](/#work), writing Solidity for a DeFi options protocol, and spent twelve months as a full-stack blockchain developer at Mavik Labs across Next.js, TypeScript, Docker and Go. I mentor for Google Summer of Code with OWASP BLT.\n\n[I am pursuing a degree in Electrical and Computer Engineering](/#education) and graduate in 2027.",
  avatarUrl: "/vedantpfp.webp",
  skills: [
    "x402",
    "Agentic Payments",
    "Stablecoin Payments (USDC)",
    "Solidity",
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Rust",
    "Foundry",
    "Docker",
    "C++",
    "C",
    "Git & Github",
    "Zero-Knowledge Proofs",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "vedantanand.in@gmail.com",
    tel: "+917901982476",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/vedantanand17",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/vedantanand17",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/vedantsx",
        icon: Icons.x,

        navbar: true,
      },
      DailyDev: {
        name: "Daily.Dev",
        url: "https://dly.to/jLsiMBOoTBk",
        icon: Icons.dailydev,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Google Summer of Code",
      href: "https://summerofcode.withgoogle.com/",
      badges: ["Mentor"],
      location: "Remote",
      title: "Mentor",
      logoUrl: "/gsoc.png",
      altText: "Google Summer of Code logo - Mentor @OWASP-BLT",
      start: "Feb 2026",
      end: "Present",
      description:
        "Mentoring contributors for OWASP-BLT in Google Summer of Code. Supporting open source development and guiding participants through the program.",
    },
    {
      company: "Bags",
      href: "https://getbags.app",
      badges: ["Co-Founder", "x402"],
      title: "Co-Founder",
      logoUrl: "/baglogo.png",
      altText: "Bags logo - agentic commerce and x402 payments platform",
      start: "Feb 2026",
      end: "August 2026",
      description:
        "Agentic commerce infrastructure: Bags let any API charge AI agents per request over the x402 protocol. A pay-per-call link quoted a price, verified a USDC payment across four chains, then returned the response - with merchant-of-record compliance and tax invoicing behind it. Reached 100,000+ cumulative visitors, backed by Founders Inc. and Superteam, and part of Canopy, the Founders Inc. builder cohort. Wound down in 2026 for lack of product-market fit.",
    },
    {
      company: "Timelock Protocol",
      href: "https://timelock.trade",
      badges: ["DeFi"],
      title: "Founding Engineer",
      logoUrl: "/timelock.jpg",
      altText: "Timelock Protocol logo - DeFi options trading platform",
      start: "June 2025",
      end: "February 2026",
      description:
        "Developing smart contracts and DeFi protocols for options trading and yield strategies. Working on innovative DeFi solutions including perpetual options, liquidity provision, and automated market making systems.",
    },
    {
      company: "Veri Doc",
      href: "https://veri-doc.tech",
      badges: ["Founder"],
      title: "Engineer and Manager",
      logoUrl: "/veri-doc.webp",
      altText: "Veri Doc logo - decentralized document verification platform",
      start: "May 2025",
      end: "Present",
      description:
        "Building a decentralized document verification system using zero-knowledge proofs to reduce maintenance costs and improve verification efficiency by significantly decreasing verification time compared to standard methods.",
    },
    {
      company: "Owasp (TIET Society)",
      href: "#",
      badges: [],
      location: "TIET, Patiala",
      title: "Joint Secretary",
      logoUrl: "/owasp.webp",
      altText: "OWASP TIET Society logo - cybersecurity organization",
      start: "November 2023",
      end: "Present",
      description:
        "As a Joint Secretary at the society, I have been actively involved in organizing workshops, webinars, and several similar events improving not just my technical skills but also my leadership and management skills.",
    },
    {
      company: "Mavik Labs",
      href: "https://www.maviklabs.com/",
      badges: [],
      location: "Remote",
      title: "Full Stack Blockchain Developer",
      logoUrl: "/maviklabs_logo.webp",
      altText: "Mavik Labs logo - blockchain development company",
      start: "October 2024",
      end: "October 2025",
      description:
        "Currently contributing to MVP projects and developing a website at Mavik Labs , leveraging technologies like Next.js, TypeScript, Docker, and Go.",
    },
    {
      company: "Thapar Institute of Engineering and Technology",
      href: "https://thapar.edu/",
      badges: [],
      location: "Patiala, Punjab",
      title: "Research Intern",
      logoUrl: "/thapar.webp",
      altText: "Thapar Institute of Engineering and Technology logo - university",
      start: "June 2024",
      end: "December 2024",
      description:
        "I conducted research on different YOLO models for detecting badminton shuttles, analyzing and comparing their metrics to determine the best model for enhancing sports applications.",
    },
    {
      company: "Winter of Blockchain",
      href: "https://wob.girlscript.tech/wob",
      badges: [],
      location: "Remote",
      title: "Project Admin",
      logoUrl: "/wob.webp",
      altText: "Winter of Blockchain logo - web3 development program",
      start: "August 2024",
      end: "November 2024",
      description:
        "I was selected as a Project Admin at Winter of Blockchain, where I listed my project and guided several hundred contributors in web3 and in contributing to my project.",
    },
  ],
  education: [
    {
      school: "Thapar Institute of Engineering and Technology",
      href: "https://thapar.edu",
      degree: "Bachelor's in Engineering (B.E.) in Electrical and Computer Engineering",
      logoUrl: "/thapar.webp",
      altText: "Thapar Institute of Engineering and Technology logo - university",
      start: "2023",
      end: "2027",
    },

  ],
  projects: [
    {
      title: "Bags - pay-per-call APIs for AI agents",
      href: "https://www.getbags.app/",
      dates: "Feb 2026 – August 2026",
      active: false,
      description:
        "An agentic commerce platform that let any API charge AI agents per request over x402. A pay-per-call link returned an HTTP 402 with a price quote, verified the agent's USDC payment across four chains, and only then released the response - with merchant-of-record compliance and tax invoicing underneath, so a founder without a US entity could still get paid. Reached 100,000+ cumulative visitors, backed by Founders Inc. and Superteam, part of the Canopy builder cohort. Wound down in 2026: the machinery worked, the demand was not there yet.",
      technologies: [
        "x402",
        "Agentic Commerce",
        "Stablecoin Payments",
        "USDC",
        "Next.js",
        "TypeScript",
        "Compliance",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.getbags.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/baglanding.png",
      video: "",
    },
    {
      title: "x402 protocol contributions",
      href: "https://github.com/x402-foundation/x402/pulls?q=is%3Apr+author%3AVedantAnand17+is%3Amerged",
      dates: "December 2025 – May 2026",
      active: true,
      description:
        "Three merged pull requests to x402, the HTTP-native standard for paying for API calls in stablecoins. Unit tests for `sign_eip2612_permit`, which builds the EIP-712 payload facilitators verify on-chain - a regression in the domain or the Permit primary type would silently break Permit2 gas sponsoring on every chain that opts in. Named constants for the ERC-20 approval gas fee defaults, replacing hardcoded fallbacks and matching the TypeScript side. And a rewrite of the @x402/extensions documentation. All three reviewed and merged by the protocol's maintainers.",
      technologies: [
        "x402",
        "Agentic Payments",
        "EIP-2612",
        "Permit2",
        "Python",
        "TypeScript",
        "Open Source",
      ],
      links: [
        {
          type: "PR #2344 - EIP-2612 permit tests",
          href: "https://github.com/x402-foundation/x402/pull/2344",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "PR #2278 - ERC-20 gas constants",
          href: "https://github.com/x402-foundation/x402/pull/2278",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "PR #731 - extensions docs",
          href: "https://github.com/x402-foundation/x402/pull/731",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/x402.png",
      video: "",
    },
    {
      title: "AgentPay",
      href: "https://agentpay.vedant-dev.com/",
      dates: "November 2025 – December 2025",
      active: true,
      description:
        "A payment agent that buys API calls on your behalf over x402 - sentiment analysis and in-house trading signals, each metered and settled per request in USDC rather than behind a subscription. The prototype that led to Bags.",
      technologies: [
        "x402",
        "Agentic Payments",
        "USDC",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "AI",
        "Shadcn UI",
        "DeFi",
      ],
      links: [
        {
          type: "Website",
          href: "https://agentpay.vedant-dev.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/VedantAnand17/AgentPay/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/AgentPay.png",
      video: "",
    },
    {
      title: "Timelock Protocol",
      href: "https://timelock.trade",
      dates: "June 2025 – Present",
      active: true,
      description:
        "A modern landing page for Timelock Protocol showcasing advanced DeFi trading features with unlimited upside and zero liquidation risk. Features quantum-secured positions and temporal arbitrage across multiple DeFi protocols with enhanced yields.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Framer Motion",
        "DeFi",
        "Blockchain",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://timelock.trade",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/VedantAnand17/timelock-landing",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/timelock-landing-new.png",
      video: "",
    },
    {
      title: "Veri Doc",
      href: "https://veri-doc.vercel.app/",
      dates: "May 2025 – Present",
      active: true,
      description:
        "A decentralized document verification system using zero-knowledge proofs to reduce maintenance costs and improve verification efficiency. The system significantly decreases verification time compared to standard methods while maintaining security and privacy through advanced cryptographic techniques.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Zero-Knowledge Proofs",
        "Blockchain",
        "Solidity",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://veri-doc.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/VedantAnand17/Original-Docs-contracts",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/veridoc.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "ETH HackMoney 2026 (Winner)",
      dates: "February 12th, 2026",
      location: "Remote",
      description:
        "Won the ENS - Integrate ENS track with nyx, a fair launchpad using Uniswap V4 Continuous Clearing Auctions (CCA) and ENS for every token. Built permissionless token creation, fair launch, and liquidity bootstrapping in one flow, with agentic AI integration and ENS names for launched tokens and verified badges.",
      image: "/ethglobal.png",
      links: [
        {
          title: "Website",
          href: "https://ethglobal.com/showcase/nyx-byzxt",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
    {
      title: "x402 Build Onchain (Winner)",
      dates: "January 13th, 2026",
      location: "Remote",
      description:
        "Won the x402 Build Onchain hackathon organized by FBI among 500+ participating teams.",
      image:
        "/x402.png",
      links: [],
    },
    {
      title: "Smart India Hackathon (Waitlisted)",
      dates: "December 12th – 13th 2024",
      location: "Bhubaneswar, Odisha",
      description:
        "Got shortlisted in intra college round of this national hackathon(9,00,000+ participation) and waitlisted in the finals. Problem Statement: Development of a software solution to follow the cryptocurrency transaction trial associated with a wallet id/ transaction to find out the real reciever of the funds in a drug related transaction.",
      image:
        "/sih.webp",
      links: [],
    },
    {
      title: "Syrinx (CTF Winner)",
      dates: "July 26th – 27th, 2024",
      location: "Remote",
      description:
        "Won the CTF by solving several cybersecurity challenges.",
      image:
        "/syrinx.webp",
      links: [],
    },
    {
      title: "HackOWASP Intra",
      dates: "July 13th – 14th, 2024",
      location: "Remote",
      description:
        "Developed a web application which informs people about TIET college, and share study resources which impacted more than 800 students.",
      icon: "public",
      image:
        "/hacko.webp",
      links: [],
    },
    {
      title: "Hacklipse (Winner)",
      dates: "April 6th – 7th, 2024",
      location: "TIET, Patiala",
      description:
        "Won this hackathon by making a web app that predicts the chance of winning a hackathon by using your idea as a parameter.",
      image:
        "/hacklipse.webp",
      links: [],
    },
    {
      title: "HackTU 6.0",
      dates: "February 7th – 9th, 2024",
      location: "TIET, Patiala",
      description:
        "Made an app that helps students to find the best study material, scholarships for their courses.",
      image:
        "/hacktu.webp",
      links: [],
    },
  ],

  tweets: [
    {
      id: "1935588888300359901",
      title: "Learning Journey",
    },
    {
      id: "1935947881854144596",
      title: "Learning Journey",
    },
    {
      id: "1936304583573172396",
      title: "Learning Journey",
    },
    {
      id: "1936688020695949350",
      title: "Learning Journey",
    },
  ],
}
