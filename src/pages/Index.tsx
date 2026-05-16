import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import SelectedWorks from "../components/SelectedWorks";
import Journal from "../components/Journal";
import Explorations from "../components/Explorations";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-bg text-text-primary smooth-scroll"
      >
        <Navbar />
        <Hero />
        <Marquee />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
        <Footer />
      </motion.main>
    </>
  );
}
