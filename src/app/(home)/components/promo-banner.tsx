import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      width={0}
      height={0}
      sizes="100vw"
      alt={alt}
      className="h-auto w-full px-5"
      {...props}
    />
  );
};

export default PromoBanner;
