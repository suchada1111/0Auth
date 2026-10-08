import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "./auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="main-container">
      {/* ส่วนหัว Navbar ด้านบน */}
      <header className="navbar-header">
        <div className="brand-logo">
          <span className="brand-icon">⚡</span>
          <span className="brand-title">Product<span className="highlight-text">Pulse</span></span>
        </div>
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>

      {/* ข้อความต้อนรับสไตล์มินิมอล */}
      <section className="hero-banner">
        <div className="hero-badge">✨ New Technology Collection 2026</div>
        <h1 className="hero-heading">สำรวจอุปกรณ์ไอทียอดนิยม</h1>
        <p className="hero-subtext">
          คัดสรรแกดเจ็ตและอุปกรณ์เสริมเพื่อการทำงานที่ยอดเยี่ยมและคุ้มค่าที่สุด
        </p>
      </section>

      {/* รายการสินค้า */}
      <section className="catalog-section">
        <div className="section-title-row">
          <div>
            <h2 className="section-title">สินค้าที่แนะนำ</h2>
            <p className="section-subtitle">พร้อมส่งทุกรายการ อัปเดตล่าสุด</p>
          </div>
          <span className="product-count-chip">{products.length} รายการ</span>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <article key={product.id} className="modern-card" data-testid="product">
              
              {/* โซนรูปภาพสินค้า */}
              <div className="card-image-box">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="card-img" 
                  />
                ) : (
                  <div className="card-img-placeholder">📦</div>
                )}
                <span className="card-badge">พร้อมส่ง</span>
              </div>

              {/* โซนรายละเอียดสินค้า */}
              <div className="card-body">
                <div className="card-meta">
                  <span className="category-tag">{product.category || "General"}</span>
                  <span className="stock-info">คงเหลือ 10 ชิ้น</span>
                </div>

                <h3 className="card-title">{product.name}</h3>
                <p className="card-desc">{product.description}</p>

                <div className="card-footer-row">
                  <div className="price-tag">
                    <span className="currency">฿</span>
                    <span className="amount">{product.price.toLocaleString("th-TH")}</span>
                  </div>
                </div>

                {/* ปุ่มแก้ไข / ลบ (แสดงเมื่อเข้าสู่ระบบแล้วเท่านั้น) */}
                {isLoggedIn && (
                  <div className="admin-actions">
                    <Link href={`/products/${product.id}/edit`} className="action-btn edit-btn">
                      ✏️ แก้ไข
                    </Link>
                    <Link href={`/products/${product.id}/delete`} className="action-btn delete-btn">
                      🗑️ ลบ
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}

          {products.length === 0 && (
            <div className="empty-state" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
              <span style={{ fontSize: "2.5rem" }}>📦</span>
              <p>ขณะนี้ยังไม่มีรายการสินค้า</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer ท้ายหน้า */}
      <footer style={{ textAlign: "center", marginTop: "80px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
        <p>© 2026 ProductPulse. All rights reserved.</p>
        <p style={{ marginTop: "4px", fontSize: "0.78rem", opacity: 0.8 }}>Developed with Next.js & Google OAuth</p>
      </footer>
    </main>
  );
}