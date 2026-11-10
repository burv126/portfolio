import { About } from "@/components/sections/About";
import { AiExpertise } from "@/components/sections/AiExpertise";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { WhyMe } from "@/components/sections/WhyMe";
import { getContactDelivery } from "@/lib/contact-delivery";

export default function HomePage() {
  return (
    <main id="content" className="flex-1">
      <Hero />
      <About />
      <Services />
      <Projects />
      <AiExpertise />
      <Technologies />
      <Process />
      <WhyMe />
      <Contact delivery={getContactDelivery()} />
    </main>
  );
}
