import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WidgetShowcase } from "@/components/widget-showcase";
import { ExperienceLayers } from "@/components/experience-layers";
import { CodeReveal } from "@/components/code-reveal";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <Navbar />
      <main className="flex flex-1 flex-col gap-24 pt-16 md:pt-20">
        <Hero />
        <WidgetShowcase />
        <ExperienceLayers />
        <CodeReveal />
        <Footer />
      </main>
    </div>
  );
}
