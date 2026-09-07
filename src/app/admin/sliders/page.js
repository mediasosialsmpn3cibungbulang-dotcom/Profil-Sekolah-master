"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Toast from "@/components/Toast";

export default function SlidersAdmin() {
  const [sliders, setSliders] = useState([]);
  const [form, setForm] = useState({ imageUrl: "", caption: "", order: 0 });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const fileInputRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3500);
  };

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sliders");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSliders(data);
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = form.imageUrl;

      // Upload image first if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.imageUrl;
        } else {
          showNotification("Gagal mengunggah gambar.", "error");
          setLoading(false);
          return;
        }
      }

      if (!finalImageUrl) {
        showNotification("Gambar tidak boleh kosong.", "error");
        setLoading(false);
        return;
      }

      const payload = { ...form, imageUrl: finalImageUrl };

      if (editingId) {
        await fetch(`/api/sliders/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        showNotification("Banner slider berhasil diperbarui!", "success");
      } else {
        await fetch("/api/sliders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        showNotification("Banner slider berhasil ditambahkan!", "success");
      }
      
      // Reset form
      setForm({ imageUrl: "", caption: "", order: 0 });
      setImageFile(null);
      setEditingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      fetchSliders();
    } catch (error) {
      console.error("Error saving slider:", error);
      showNotification("Terjadi kesalahan saat menyimpan data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slider) => {
    setForm({
      imageUrl: slider.imageUrl,
      caption: slider.caption || "",
      order: slider.order,
    });
    setEditingId(slider.id);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus slider ini?")) {
      try {
        await fetch(`/api/sliders/${id}`, { method: "DELETE" });
        showNotification("Banner slider berhasil dihapus!", "success");
        fetchSliders();
      } catch (err) {
        showNotification("Gagal menghapus slider.", "error");
      }
    }
  };

  return (
    <div>
      <Toast notification={notification} onClose={() => setNotification({ message: '', type: '' })} />
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#1e293b" }}>Kelola Banner (Slider)</h2>

      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#334155" }}>
          {editingId ? "Ubah Slider" : "Tambah Slider Baru"}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", color: "#475569" }}>Gambar Banner (Unggah)</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              required={!editingId && !form.imageUrl}
            />
            {imageFile ? (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={URL.createObjectURL(imageFile)} 
                  alt="Preview" 
                  style={{ width: '100%', maxWidth: '300px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                />
              </div>
            ) : form.imageUrl && editingId ? (
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Gambar Saat Ini:</p>
                <img 
                  src={form.imageUrl} 
                  alt="Current" 
                  style={{ width: '100%', maxWidth: '300px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                />
              </div>
            ) : null}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", color: "#475569" }}>Caption (Teks di Gambar)</label>
            <input
              type="text"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", color: "#475569" }}>Urutan (Order)</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value ? parseInt(e.target.value) : '' })}
              style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              required
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" disabled={loading} style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Menyimpan..." : (editingId ? "Simpan Perubahan" : "Tambah")}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ imageUrl: "", caption: "", order: 0 });
                  setImageFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                style={{ padding: "10px 20px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#334155" }}>Daftar Slider Saat Ini</h3>
        {loading ? (
          <p>Memuat data...</p>
        ) : sliders.length === 0 ? (
          <p>Belum ada slider yang ditambahkan.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "12px", color: "#475569" }}>Gambar</th>
                <th style={{ padding: "12px", color: "#475569" }}>Caption</th>
                <th style={{ padding: "12px", color: "#475569" }}>Urutan</th>
                <th style={{ padding: "12px", color: "#475569" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map((slider) => (
                <tr key={slider.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ position: "relative", width: "150px", height: "80px", background: "#eee", borderRadius: "4px", overflow: "hidden" }}>
                      <Image src={slider.imageUrl} alt="Slider" fill style={{ objectFit: "cover" }} unoptimized />
                    </div>
                  </td>
                  <td style={{ padding: "12px", color: "#334155" }}>{slider.caption || "-"}</td>
                  <td style={{ padding: "12px", color: "#334155" }}>{slider.order}</td>
                  <td style={{ padding: "12px" }}>
                    <button onClick={() => handleEdit(slider)} style={{ marginRight: "10px", padding: "6px 12px", background: "#eab308", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      Ubah
                    </button>
                    <button onClick={() => handleDelete(slider.id)} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
