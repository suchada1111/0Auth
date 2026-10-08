import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({
  params,
}: DeleteProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    <main className="page-wrapper" style={{ maxWidth: "500px" }}>
      <div className="minimal-panel" style={{ textAlign: "center" }}>
        <h1 className="panel-title" style={{ color: "var(--danger)", fontSize: "1.2rem" }}>ยืนยันการลบ</h1>
        <p style={{ margin: "20px 0" }}>ต้องการลบสินค้า “{product.name}” หรือไม่?</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <form action={deleteAction}>
            <button type="submit" className="btn-minimal btn-solid" style={{ background: "var(--danger)" }}>
              ยืนยันการลบ
            </button>
          </form>
          <Link href="/" className="btn-minimal btn-outline" style={{ textDecoration: "none" }}>
            ยกเลิก
          </Link>
        </div>
      </div>
    </main>
  );
}