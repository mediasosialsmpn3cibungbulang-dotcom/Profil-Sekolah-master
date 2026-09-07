"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Toast from "@/components/Toast";

export default function AdminSarana() {
  const [sarana, setSarana] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3500);
  };

  useEffect(() => {
    fetchSarana();
  }, []);

  const fetchSarana = async () => {
    try {
      const res = await fetch("/api/sarana");
      const data = await res.json();
      setSarana(data);
    } catch (error) {
      console.error("Error fetching Sarana:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus fasilitas ini?")) {
      try {
        const res = await fetch(`/api/sarana/${id}`, { method: "DELETE" });
        if (res.ok) {
          showNotification("Fasilitas berhasil dihapus!", "success");
          fetchSarana();
        } else {
          showNotification("Gagal menghapus fasilitas.", "error");
        }
      } catch (error) {
        console.error("Error deleting Sarana:", error);
        showNotification("Terjadi kesalahan saat menghapus fasilitas.", "error");
      }
    }
  };

  if (loading) return <div style={{ color: "#334155" }}>Memuat data...</div>;

  return (
    <div>
      <Toast notification={notification} onClose={() => setNotification({ message: '', type: '' })} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "2rem", color: "#1e293b", margin: 0 }}>Kelola Sarana & Prasarana</h2>
        <Link href="/admin/sarana/form" style={{
          background: "#10b981", color: "white", padding: "10px 20px", 
          borderRadius: "6px", textDecoration: "none", fontWeight: "bold"
        }}>
          + Tambah Fasilitas
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              <th style={{ padding: "15px", color: "#475569" }}>No</th>
              <th style={{ padding: "15px", color: "#475569" }}>Foto</th>
              <th style={{ padding: "15px", color: "#475569" }}>Judul Fasilitas</th>
              <th style={{ padding: "15px", color: "#475569" }}>Tanggal Dibuat</th>
              <th style={{ padding: "15px", color: "#475569", textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sarana.length > 0 ? (
              sarana.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "15px", color: "#334155" }}>{index + 1}</td>
                  <td style={{ padding: "15px" }}>
                    {item.photoUrl ? (
                      <img src={item.photoUrl} alt={item.title} style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
                    ) : (
                      <span style={{ color: "#94a3b8" }}>Tidak ada foto</span>
                    )}
                  </td>
                  <td style={{ padding: "15px", color: "#334155", fontWeight: "bold" }}>{item.title}</td>
                  <td style={{ padding: "15px", color: "#64748b" }}>
                    {new Date(item.createdAt).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <Link href={`/admin/sarana/form?id=${item.id}`} style={{
                      background: "#3b82f6", color: "white", padding: "6px 12px", 
                      borderRadius: "4px", textDecoration: "none", fontSize: "0.85rem", marginRight: "10px"
                    }}>
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      style={{
                        background: "#ef4444", color: "white", padding: "6px 12px", 
                        border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem"
                      }}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
                  Belum ada fasilitas sarana yang ditambahkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
