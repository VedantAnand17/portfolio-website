import { HomeIcon, NotebookIcon } from "lucide-react";

import { Icons } from "@/components/icons";

export const DATA = {
  avatarUrl: "/vedantpfp.webp",
  contact: {
    email: "vedantanand.in@gmail.com",
    social: {
      DailyDev: {
        icon: Icons.dailydev,
        name: "Daily.Dev",
        navbar: true,
        url: "https://dly.to/jLsiMBOoTBk",
      },
      GitHub: {
        icon: Icons.github,
        name: "GitHub",
        navbar: true,
        url: "https://github.com/vedantanand17",
      },
      LinkedIn: {
        icon: Icons.linkedin,
        name: "LinkedIn",
        navbar: true,
        url: "https://linkedin.com/in/vedantanand17",
      },
      X: {
        icon: Icons.x,
        name: "X",
        navbar: true,
        url: "https://x.com/vedantsx",
      },
      email: {
        icon: Icons.email,
        name: "Send Email",
        navbar: false,
        url: "#",
      },
    },
    tel: "+917901982476",
  },
  description:
    "I build payment APIs for AI agents with x402, TypeScript, and Solidity.",
  education: [
    {
      school: "Thapar Institute of Engineering and Technology",
      href: "https://thapar.edu",
      degree:
        "Bachelor's in Engineering (B.E.) in Electrical and Computer Engineering",
      logoUrl: "/thapar.webp",
      altText:
        "Thapar Institute of Engineering and Technology logo - university",
      start: "2023",
      end: "2027",
    },
  ],
  hackathons: [
    {
      title: "ETH HackMoney 2026 (Winner)",
      dates: "12 February 2026",
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
      dates: "13 January 2026",
      location: "Remote",
      description:
        "Won the x402 Build Onchain hackathon organized by Founders Inc.",
      image: "/x402.png",
      links: [],
    },
    {
      title: "Smart India Hackathon (Waitlisted)",
      dates: "12–13 December 2024",
      location: "Bhubaneswar, Odisha",
      description:
        "Shortlisted in the college round and waitlisted for the finals. Built a tool to trace cryptocurrency transactions and identify fund recipients.",
      image: "/sih.webp",
      links: [],
    },
    {
      title: "Syrinx (CTF Winner)",
      dates: "26–27 July 2024",
      location: "Remote",
      description: "Won the CTF by solving several cybersecurity challenges.",
      image: "/syrinx.webp",
      links: [],
    },
    {
      title: "HackOWASP Intra",
      dates: "13–14 July 2024",
      location: "Remote",
      description:
        "Built a web application with TIET college information and study resources.",
      icon: "public",
      image: "/hacko.webp",
      links: [],
    },
    {
      title: "Hacklipse (Winner)",
      dates: "6–7 April 2024",
      location: "TIET, Patiala",
      description:
        "Won this hackathon by making a web app that predicts the chance of winning a hackathon by using your idea as a parameter.",
      image: "/hacklipse.webp",
      links: [],
    },
    {
      title: "HackTU 6.0",
      dates: "7–9 February 2024",
      location: "TIET, Patiala",
      description:
        "Made an app that helps students to find the best study material, scholarships for their courses.",
      image: "/hacktu.webp",
      links: [],
    },
  ],
  initials: "VA",
  location: "Punjab, India",
  locationLink: "https://www.google.com/maps/place/patiala",
  name: "Vedant Anand",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  projects: [
    {
      title: "Bags - pay-per-call APIs for AI agents",
      href: "https://www.getbags.app/",
      dates: "February 2026 – Present",
      active: true,
      description:
        "Role: Co-founder. Built x402 payment APIs for AI agents with USDC verification, payment records, and tax invoices. Supported by Founders Inc., Canopy, and Superteam.",
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
      dates: "December 2025 – September 2026",
      active: true,
      description:
        "Role: Contributor. Four merged pull requests to x402: payment-scheme validation, EIP-2612 permit tests, ERC-20 gas constants, and extension documentation.",
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
          type: "PR #3051 - Unregistered scheme guard",
          label: "PR #3051",
          href: "https://github.com/x402-foundation/x402/pull/3051",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "PR #2344 - EIP-2612 permit tests",
          label: "PR #2344",
          href: "https://github.com/x402-foundation/x402/pull/2344",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "PR #2278 - ERC-20 gas constants",
          label: "PR #2278",
          href: "https://github.com/x402-foundation/x402/pull/2278",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "PR #731 - extensions docs",
          label: "PR #731",
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
        "Role: Builder. Prototyped an agent that pays for sentiment analysis and trading signals per API request with USDC over x402. This project led to Bags.",
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
      dates: "June 2025 – February 2026",
      active: true,
      description:
        "Role: Founding engineer. Built the Next.js landing page and Solidity contracts for DeFi options. Completed in February 2026; the source covers the landing page.",
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
      title: "VeriDoc",
      href: "https://veri-doc.vercel.app/",
      dates: "May 2025 – Present",
      active: true,
      description:
        "Role: Founder and engineer. Building a document verification application using zero-knowledge proofs and Solidity. The source link provides the contracts.",
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
  skills: [
    "x402",
    "Agentic Payments",
    "Stablecoin Payments (USDC)",
    "Solidity",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Rust",
    "Foundry",
    "Docker",
    "C++",
    "C",
    "Git & GitHub",
    "Zero-Knowledge Proofs",
  ],
  summary:
    "I co-founded [Bags](https://www.getbags.app/) and contribute to the [x402 protocol](https://github.com/x402-foundation/x402/pulls?q=is%3Apr+author%3AVedantAnand17+is%3Amerged). I also build web applications and Solidity contracts.\n\nI mentored OWASP BLT contributors in Google Summer of Code 2026. I study Electrical and Computer Engineering at Thapar Institute and expect to graduate in 2027.",
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
  url: "https://www.vedant-dev.com",
  work: [
    {
      company: "Google Summer of Code",
      href: "https://summerofcode.withgoogle.com/",
      badges: ["Mentor"],
      location: "Remote",
      title: "Mentor",
      logoUrl: "/gsoc.png",
      altText: "Google Summer of Code logo - Mentor @OWASP-BLT",
      start: "February 2026",
      end: "August 2026",
      description:
        "Mentored contributors for OWASP-BLT during Google Summer of Code, supporting open source development and guiding participants through the program.",
    },
    {
      company: "Bags",
      href: "https://getbags.app",
      badges: ["Co-Founder", "x402"],
      title: "Co-Founder",
      logoUrl: "/baglogo.png",
      altText: "Bags logo - agentic commerce and x402 payments platform",
      start: "February 2026",
      end: "Present",
      description:
        "Co-founded Bags and built infrastructure for payment APIs over x402. Bags is supported by Founders Inc., Canopy, and Superteam.",
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
      description: "Developed Solidity contracts for a DeFi options protocol.",
    },
    {
      company: "VeriDoc",
      href: "https://veri-doc.vercel.app/",
      badges: ["Founder"],
      title: "Engineer and Manager",
      logoUrl: "/veri-doc.webp",
      altText: "VeriDoc logo - decentralized document verification platform",
      start: "May 2025",
      end: "Present",
      description:
        "Building a document verification application using zero-knowledge proofs and Solidity.",
    },
    {
      company: "OWASP (TIET Society)",
      href: "#",
      badges: [],
      location: "TIET, Patiala",
      title: "Joint Secretary",
      logoUrl: "/owasp.webp",
      altText: "OWASP TIET Society logo - cybersecurity organization",
      start: "November 2023",
      end: "Present",
      description:
        "Organize workshops, webinars, and technical events as Joint Secretary.",
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
        "Built prototype applications and a website with Next.js, TypeScript, Docker, and Go.",
    },
    {
      company: "Thapar Institute of Engineering and Technology",
      href: "https://thapar.edu/",
      badges: [],
      location: "Patiala, Punjab",
      title: "Research Intern",
      logoUrl: "/thapar.webp",
      altText:
        "Thapar Institute of Engineering and Technology logo - university",
      start: "June 2024",
      end: "December 2024",
      description:
        "I conducted research on different YOLO models for detecting badminton shuttles, analyzing and comparing their metrics to determine the best model for enhancing sports applications.",
    },
    {
      company: "Winter of Blockchain",
      href: "",
      badges: [],
      location: "Remote",
      title: "Project Admin",
      logoUrl: "/wob.webp",
      altText: "Winter of Blockchain logo - web3 development program",
      start: "August 2024",
      end: "November 2024",
      description:
        "Managed my project in Winter of Blockchain and guided contributors.",
    },
  ],
};
