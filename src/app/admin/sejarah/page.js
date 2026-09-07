"use client";
import { useState, useEffect, useRef } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import Image from "next/image";
import Toast from "@/components/Toast";

export default function SejarahAdmin() {
  const [form, setForm] = useState({ title: "Sejarah Sekolah", content: "", photoUrl: "" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const fileInputRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3500);
  };

  const fetchSejarah = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sejarah");
      const data = await res.json();
      if (data && data.id) {
        setForm({
          title: data.title || "Sejarah Sekolah",
          content: data.content,
          photoUrl: data.photoUrl || ""
        });
      }
    } catch (error) {
      console.error("Error fetching sejarah:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSejarah();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = form.photoUrl;

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

      const payload = { ...form, photoUrl: finalImageUrl };

      const res = await fetch("/api/sejarah", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          showNotification("Sesi Anda telah habis, silakan login kembali.", "error");
          setTimeout(() => { window.location.href = "/admin/login"; }, 1500);
        } else {
          showNotification("Gagal menyimpan data.", "error");
        }
        setLoading(false);
        return;
      }
      
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      showNotification("Sejarah Sekolah berhasil disimpan!", "success");
      fetchSejarah();
    } catch (error) {
      console.error("Error saving sejarah:", error);
      showNotification("Terjadi kesalahan saat menyimpan data.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toast notification={notification} onClose={() => setNotification({ message: '', type: '' })} />
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#1e293b" }}>Kelola Sejarah Sekolah</h2>

      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#334155" }}>
          Edit Konten Sejarah
        </h3>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            
            {/* Foto Gedung / Sejarah */}
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569" }}>Foto Sekolah (Unggah)</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setImageFile(e.target.files[0])}
                style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              />
              {imageFile ? (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={URL.createObjectURL(imageFile)} 
                    alt="Preview" 
                    style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : form.photoUrl ? (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Foto Saat Ini:</p>
                  <img 
                    src={form.photoUrl} 
                    alt="Current" 
                    style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : null}
            </div>

            {/* Judul */}
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569" }}>Judul</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Misal: Sejarah Sekolah"
                style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                required
              />
            </div>

            {/* Isi */}
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569" }}>Isi Konten (Bisa berisi paragraf panjang)</label>
              <RichTextEditor value={form.content} onChange={(val) => setForm({ ...form, content: val }) } style={{ height: '300px', marginBottom: '50px', background: 'white' }} />
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
                Tip: Gunakan "Enter" untuk membuat paragraf baru.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" disabled={loading} style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
