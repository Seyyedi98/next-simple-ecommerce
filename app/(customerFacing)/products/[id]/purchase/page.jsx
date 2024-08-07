import prisma from "@/db/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PurchasePage({ params: { id } }) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (product == null) return notFound();

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image src={product.imagePath} fill alt={product.name} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg">{product.price}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
}
