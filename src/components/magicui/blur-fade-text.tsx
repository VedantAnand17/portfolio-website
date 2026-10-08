import BlurFade from "@/components/magicui/blur-fade";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
}

export default function BlurFadeText({ text, ...props }: BlurFadeTextProps) {
  return <BlurFade {...props}>{text}</BlurFade>;
}
