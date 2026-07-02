import Hero from '../components/sections/Hero.jsx';
import TrustBar from '../components/sections/TrustBar.jsx';
import PartnersBar from '../components/sections/PartnersBar.jsx';
import About from '../components/sections/About.jsx';
import WhyUs from '../components/sections/WhyUs.jsx';
import Projects from '../components/sections/Projects.jsx';
import Services from '../components/sections/Services.jsx';
import Testimonial from '../components/sections/Testimonial.jsx';
import BlogPreview from '../components/sections/BlogPreview.jsx';
import CTA from '../components/sections/CTA.jsx';
import Contact from '../components/sections/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PartnersBar />
      <About />
      <WhyUs />
      <Projects />
      <Services />
      <Testimonial />
      <BlogPreview />
      <CTA />
      <Contact />
    </>
  );
}
