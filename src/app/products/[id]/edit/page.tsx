import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <main className="main-container" style={{ maxWidth: "600px" }}>
      <div style={{
        background: "white",
        padding: "32px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px -5px rgba(255, 105, 135, 0.12)",
        border: "1px solid rgba(255, 214, 224, 0.7)"
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "var(--primary-color)" }}>
          ✏️ แก้ไขข้อมูลสินค้า
        </h1>

        <form action={updateAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label htmlFor="name" style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>ชื่อสินค้า</label>
            <input 
              id="name" 
              name="name" 
              defaultValue={product.name} 
              required 
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label htmlFor="image" style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>ลิงก์รูปภาพ (Image URL)</label>
            <input 
              id="image" 
              name="image" 
              type="url"
              placeholder="https://images.unsplash.com/..." 
              defaultValue={product.image || ""} 
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label htmlFor="price" style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>ราคา (บาท)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product.price}
              required
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label htmlFor="description" style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>รายละเอียดสินค้า</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description}
              required
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <button 
              type="submit" 
              style={{
                flex: 1,
                background: "var(--primary-color)",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              บันทึกการเปลี่ยนแปลง
            </button>
            <Link 
              href="/" 
              style={{
                padding: "12px 20px",
                borderRadius: "12px",
                background: "#f1f5f9",
                color: "#475569",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              ยกเลิก
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}