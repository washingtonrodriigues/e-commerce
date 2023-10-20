import { prismaClient } from "@/lib/prisma";

interface ProductDetailsProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!product) return null;
  return <div>{product.name}</div>;
};

export default ProductDetailsPage;
