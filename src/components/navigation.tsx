import Navbar from "./navbar";
import { TooltipProvider } from "./ui/tooltip";

export default function Navigation({ pathname }: { pathname: string }) {
  return (
    <TooltipProvider
      delayDuration={350}
      skipDelayDuration={300}
      disableHoverableContent
    >
      <Navbar pathname={pathname} />
    </TooltipProvider>
  );
}
