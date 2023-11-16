"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn } from "@/animations/variants";

const PromoBanner = ({ className, alt, ...props }: ImageProps) => {
  return (
    <motion.div
      className="div"
      variants={fadeIn("up", 0)}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <Image
        width={0}
        height={0}
        sizes="100vw"
        alt={alt}
        className={cn(className, "h-auto w-full px-5")}
        {...props}
      />
    </motion.div>
  );
};

export default PromoBanner;
