import { PageHeader } from "@/app/admin/_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({ params: { id } }) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  return (
    <>
      <PageHeader>Editt Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
