import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Vedant Anand",
  initials: "VA",
  url: "https://vedant-dev.tech",
  location: "Punjab, India",
  locationLink: "https://www.google.com/maps/place/patiala",
  description:
    // "Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.",
    "Budding Full Stack & Web3 Developer, Open Source Enthusiast, and a Teacher. I love to learn and share my knowledge with others.",
  summary:
    // "At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
    "In 2023, I started with my first line of code. Since then, I have been learning and building things.[I am pursuing a degree in Electrical and Computer Engineering](/#education). I have worked on various projects and have been a part of many hackathons. I am currently working at [Mavik Labs as a Full Stack Blockchain Dev](/#work) and contributing to open source.",
  avatarUrl: "/vedantpfp.png",
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
      company: "Mavik Labs",
      href: "https://www.maviklabs.com/",
      badges: [],
      location: "Remote",
      title: "Full Stack Blockchain Developer",
      logoUrl: "/maviklabs_logo.png",
      start: "October 2024",
      end: "Present",
      description:
        "Currently contributing to MVP projects and developing a website at Mavik Labs , leveraging technologies like Next.js, TypeScript, Docker, and Go.",
    },
    {
      company: "DevRhylme Foundation",
      badges: [],
      href: "https://devrhylme.org/",
      location: "Remote",
      title: "Marketing Manager (Leading Board)",
      logoUrl: "/devrhylme.png",
      start: "October 2024",
      end: "Present",
      description:
        "I am working as a Marketing Manager, successfully securing funding for the foundation from prominent organizations like Google, playing a role in collaborating with Indian Blockchain Month (IBM) and contributed to technical aspects of the projects as well, demonstrating a balance of strategic and technical expertise.",
    },
    {
      company: "Owasp (TIET Society)",
      href: "#",
      badges: [],
      location: "TIET, Patiala",
      title: "Core Member",
      logoUrl: "/owasp.png",
      start: "November 2023",
      end: "Present",
      description:
        "Proposed and implemented an internal ruby API for sending/receiving commands to scooters over LTE networks. Developed a fully automated bike firmware update system to handle asynchronous firmware updates of over 100,000+ scooters worldwide, and provide progress reports in real-time using React, Ruby on Rails, PostgreSQL and AWS EC2 saving hundreds of developer hours.",
    },
    {
      company: "Thapar Institute of Engineering and Technology",
      href: "https://thapar.edu/",
      badges: [],
      location: "Patiala, Punjab",
      title: "Research Intern",
      logoUrl: "/thapar.png",
      start: "June 2024",
      end: "December 2024",
      description:
        "I conducted research on different YOLO models for detecting badminton shuttles, analyzing and comparing their metrics to determine the best model for enhancing sports applications.",
    },
    {
      company: "Thapar Institute of Engineering and Technology",
      href: "https://thapar.edu/",
      badges: [],
      location: "Patiala, Punjab",
      title: "Research Intern",
      logoUrl: "/thapar.png",
      start: "June 2024",
      end: "November 2024",
      description:
        "I conducted research in steganography, analyzing multiple algorithms to innovate and create a more efficient method for secure data embedding in images.",
    },
    {
      company: "Winter of Blockchain",
      href: "https://wob.girlscript.tech/wob",
      badges: [],
      location: "Remote",
      title: "Project Admin",
      logoUrl: "/wob.png",
      start: "August 2024",
      end: "November 2024",
      description:
        "I conducted research in steganography, analyzing multiple algorithms to innovate and create a more efficient method for secure data embedding in images.",
    },
  ],
  education: [
    {
      school: "Thapar Institute of Engineering and Technology",
      href: "https://thapar.edu",
      degree: "Bachelor's in Engineering (B.E.) in Electrical and Computer Engineering",
      logoUrl: "/thapar.png",
      start: "2023",
      end: "2027",
    },
    
  ],
  projects: [
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
      image: "/web3-wallet.png",
      video:
        "",
    },
    {
      title: "Web3 Facucet and Adapter",
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
      image: "/web3-faucet.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "HackTU 6.0",
      dates: "February 7th - 9th, 2024",
      location: "TIET, Patiala",
      description:
        "Made an app that helps students to find the best study material, scholarships for their courses.",
      image:
        "/hacktu.png",
      links: [],
    },
    {
      title: "Hacklipse (Winner)",
      dates: "April 6th - 7th, 2024",
      location: "TIET, Patiala",
      description:
        "Won this hackathon by making a web app that predicts the chance of winning a hackathon by using your idea as a parameter.",
      image:
        "/hacklipse.png",
      links: [],
    },
    {
      title: "HackOWASP Intra",
      dates: "July 13th - 14th, 2024",
      location: "Remote",
      description:
        "Developed a web application which informs people about TIET college, and share study resources.",
      icon: "public",
      image:
        "/hacko.png",
      links: [],
    },
    {
      title: "Syrinx (CTF Winner)",
      dates: "July 26th - 27th, 2024",
      location: "Remote",
      description:
        "Won the CTF by solving several cybersecurity challenges.",
      image:
        "/syrinx.png",
      links: [ ],
    },
    {
      title: "Smart India Hackathon (Waitlisted)",
      dates: "December 12th - 13th 2024",
      location: "Bhubaneswar, Odisha",
      description:
        "Got shortlisted in intra college round of this national hackathon(9,00,000+ participation) and waitlisted in the finals. Problem Statement: Development of a software solution to follow the cryptocurrency transaction trial associated with a wallet id/ transaction to find out the real reciever of the funds in a drug related transaction.",
      image:
        "/sih.png",
      links: [ ],
    },
  ],
} as const;
