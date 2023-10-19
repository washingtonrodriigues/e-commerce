import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import styles from "../../../styles/fonts.module.css";
import classNames from "classnames";
import { CATEGORY_ICON } from "@/constants/category-item";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <Badge
        variant="outline"
        className="flex items-center justify-center gap-2 rounded-lg py-3"
      >
        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        <span className={`text-xs font-bold ${styles.poppins}`}>
          {category.name}
        </span>
      </Badge>
    </Link>
  );
};

export default CategoryItem;
