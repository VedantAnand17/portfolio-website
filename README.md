# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, ShadCN, and Framer Motion.

![Portfolio Preview](/public/portfolio.png)

## 🌟 Features

- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Responsive Design**: Looks great on all devices
- **Dark Mode**: Automatic and manual theme switching
- **Animations**: Smooth animations using Framer Motion
- **Blog Support**: MDX-based blog with syntax highlighting
- **SEO Optimized**: Meta tags and OpenGraph support
- **Performance**: Optimized for Core Web Vitals with image optimization and lazy loading
- **Type Safe**: Full TypeScript support with Zod validation
- **Component Library**: Built with shadcn/ui components
- **Error Handling**: Comprehensive error boundaries and validation
- **Analytics**: Built-in performance monitoring and user interaction tracking
- **Accessibility**: ARIA labels and semantic HTML
- **Performance Monitoring**: Custom hooks for state management and performance tracking

## 🚀 Quick Start

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── magicui/        # Animation components
│   │   └── ui/             # UI components
│   ├── data/               # Data and content
│   └── lib/                # Utility functions
├── content/                # MDX blog posts
├── public/                 # Static assets
└── styles/                # Global styles
```

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [MDX](https://mdxjs.com/) - Blog content
- [Radix UI](https://www.radix-ui.com/) - Headless UI components

## 📝 Blog

The blog is powered by MDX. To add a new blog post:

1. Create a new `.mdx` file in the `content` directory
2. Add frontmatter with title, date, and summary
3. Write your content in MDX format

Example:

```mdx
---
title: "My New Post"
publishedAt: "2024-01-01"
summary: "A brief summary of the post"
---

Your content here...
```

## 🎨 Customization

1. Update `src/data/resume.tsx` with your information
2. Modify theme colors in `tailwind.config.ts`
3. Add your own components in `src/components`
4. Customize animations in `src/components/magicui`

## 📱 Components

The project includes several reusable components:

- `BlurFade`: Fade-in animation with blur effect
- `BlurFadeText`: Text animation with character-by-character support
- `Dock`: macOS-style dock component
- `ProjectCard`: Card component for showcasing projects
- `ResumeCard`: Card component for work experience

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For any questions or feedback, feel free to reach out:

- Twitter: [@vedantsx](https://twitter.com/vedantsx)
- Email: vedantanand.in@gmail.com
- Website: [vedant-dev.com](https://vedant-dev.com)
