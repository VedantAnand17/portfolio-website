import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Vedant Anand",
  initials: "VA",
  url: "https://vedant-dev.com",
  location: "Punjab, India",
  locationLink: "https://www.google.com/maps/place/patiala",
  description:
    "Freelance Software Developer specializing in Full Stack & Web3 Development, Open Source Enthusiast, and a Teacher. I love to learn and share my knowledge with others.",
  summary:
    "In 2023, I started with my first line of code. Since then, I have been learning and building impactful projects through freelance work and custom software development solutions. [I am pursuing a degree in Electrical and Computer Engineering](/#education). I have worked on various real world projects and have been a part of many hackathons. I am currently working at [Timelock Protocol as a Founding Engineer](/#work) and contributing to open source, while also offering freelance software development services to clients worldwide.",
  avatarUrl: "/vedantpfp.webp",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Rust",
    "Solidity",
    "Node.js",
    "Docker",
    "C++",
    "C",
    "Git & Github",
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
      company: "Timelock Protocol",
      href: "https://www.timelock.trade/",
      badges: ["DeFi"],
      title: "Founding Engineer",
      logoUrl: "/timelock.jpg",
      start: "June 2025",
      end: "Present",
      description:
        "Developing smart contracts and DeFi protocols for options trading and yield strategies. Working on innovative DeFi solutions including perpetual options, liquidity provision, and automated market making systems.",
    },
    {
      company: "Veri Doc",
      href: "https://www.veri-doc.vercel.com/",
      badges: ["Founder"],
      title: "Engineer and Manager",
      logoUrl: "/veri-doc.webp",
      start: "May 2025",
      end: "Present",
      description:
        "Building a decentralized document verification system using zero-knowledge proofs to reduce maintenance costs and improve verification efficiency by significantly decreasing verification time compared to standard methods.",
    },
    {
      company: "Mavik Labs",
      href: "https://www.maviklabs.com/",
      badges: [],
      location: "Remote",
      title: "Full Stack Blockchain Developer",
      logoUrl: "/maviklabs_logo.webp",
      start: "October 2024",
      end: "Present",
      description:
        "Currently contributing to MVP projects and developing a website at Mavik Labs , leveraging technologies like Next.js, TypeScript, Docker, and Go.",
    },
    {
      company: "Owasp (TIET Society)",
      href: "#",
      badges: [],
      location: "TIET, Patiala",
      title: "Joint Secretary",
      logoUrl: "/owasp.webp",
      start: "November 2023",
      end: "Present",
      description:
                "As a Joint Secretary at the society, I have been actively involved in organizing workshops, webinars, and several similar events improving not just my technical skills but also my leadership and management skills.",
    },
    {
      company: "Thapar Institute of Engineering and Technology",
      href: "https://thapar.edu/",
      badges: [],
      location: "Patiala, Punjab",
      title: "Research Intern",
      logoUrl: "/thapar.webp",
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
      start: "2023",
      end: "2027",
    },
    
  ],
  projects: [
    {
      title: "Timelock Landing",
      href: "https://timelock-landing.vercel.app/",
      dates: "June 2025 - Present",
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
          href: "https://timelock-landing.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/VedantAnand17/timelock-landing",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/timelock-landing.png",
      video: "",
    },
    {
      title: "Veri Doc",
      href: "https://veri-doc.vercel.app/",
      dates: "May 2025 - Present",
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
    {
      title: "Web3 Wallet",
      href: "https://web3-wallet-phi-brown.vercel.app/",
      dates: "August 2024 - October 2024",
      active: true,
      description:
        "Wallet Generator is a React-based web application that allows users to generate secure mnemonic seed phrases for cryptocurrency wallets. Leveraging the BIP39 standard, the application facilitates the creation of seed phrases which can be used to set up wallets for both Solana and Ethereum networks. This tool is essential for developers and enthusiasts looking to manage their crypto assets securely.",
      technologies: [
        "React.js",
        "Javascript",
        "BIP39",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://web3-wallet-phi-brown.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/VedantAnand17/Web3-Wallet/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/web3-wallet.webp",
      video:
        "",
    },
    {
      title: "Web3 Faucet and Adapter",
      href: "https://web3-faucet.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "A modern React application demonstrating Solana wallet integration, development token airdrop as a faucet and SOL token management with a clean, responsive UI built using Tailwind CSS and shadcn/ui components.",
      technologies: [
        "React.js",
        "Javascript",
        "TailwindCSS",
        "Web3.js",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://web3-faucet.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/VedantAnand17/web3Adapter/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/web3-faucet.webp",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Smart India Hackathon (Waitlisted)",
      dates: "December 12th - 13th 2024",
      location: "Bhubaneswar, Odisha",
      description:
      "Got shortlisted in intra college round of this national hackathon(9,00,000+ participation) and waitlisted in the finals. Problem Statement: Development of a software solution to follow the cryptocurrency transaction trial associated with a wallet id/ transaction to find out the real reciever of the funds in a drug related transaction.",
      image:
      "/sih.webp",
      links: [ ],
    },
    {
      title: "Syrinx (CTF Winner)",
      dates: "July 26th - 27th, 2024",
      location: "Remote",
      description:
        "Won the CTF by solving several cybersecurity challenges.",
      image:
        "/syrinx.webp",
      links: [ ],
    },
    {
      title: "HackOWASP Intra",
      dates: "July 13th - 14th, 2024",
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
      dates: "April 6th - 7th, 2024",
      location: "TIET, Patiala",
      description:
        "Won this hackathon by making a web app that predicts the chance of winning a hackathon by using your idea as a parameter.",
      image:
        "/hacklipse.webp",
      links: [],
    },
    {
      title: "HackTU 6.0",
      dates: "February 7th - 9th, 2024",
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
