"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/animations/variants";

const DesktopBanner = () => {
  return (
    <motion.div
      variants={fadeIn("down", 0)}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <Image
        src="/deals_banner.png"
        alt="Até 55% de desconto esse mês!"
        className="h-auto w-full"
        width={0}
        height={0}
        sizes="100vw"
      />
    </motion.div>
  );
};

export default DesktopBanner;
