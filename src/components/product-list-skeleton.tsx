const ProductListSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      <div className="flex w-full min-w-[160px] flex-col gap-2 overflow-hidden lg:w-[200px]">
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-accent lg:h-[200px] lg:w-[200px]"></div>
      </div>

      <div className="flex w-full min-w-[160px] flex-col gap-2 overflow-hidden lg:w-[200px]">
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-accent lg:h-[200px] lg:w-[200px]"></div>
      </div>

      <div className="flex w-full min-w-[160px] flex-col gap-2 overflow-hidden lg:w-[200px]">
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-accent lg:h-[200px] lg:w-[200px]"></div>
      </div>

      <div className="flex w-full min-w-[160px] flex-col gap-2 overflow-hidden lg:w-[200px]">
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-accent lg:h-[200px] lg:w-[200px]"></div>
      </div>

      <div className="flex w-full min-w-[160px] flex-col gap-2 overflow-hidden lg:w-[200px]">
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-accent lg:h-[200px] lg:w-[200px]"></div>
      </div>

      <div className="flex w-full min-w-[160px] flex-col gap-2 overflow-hidden lg:w-[200px]">
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-accent lg:h-[200px] lg:w-[200px]"></div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
