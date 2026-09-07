"use client";

import { useState, useEffect, useRef } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import Image from "next/image";
import Toast from "@/components/Toast";

export default function AdminKesiswaan() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    photoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const fileInputRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3500);
  };

  useEffect(() => {
    fetchKesiswaan();
  }, []);

  const fetchKesiswaan = async () => {
    try {
      const res = await fetch("/api/kesiswaan");
      const data = await res.json();
      if (data && Object.keys(data).length > 0) {
        setForm({
          title: data.title || "",
          content: data.content || "",
          photoUrl: data.photoUrl || "",
        });
      }
    } catch (error) {
      console.error("Error fetching Kesiswaan:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = form.photoUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
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

      const res = await fetch("/api/kesiswaan", {
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
      showNotification("Kesiswaan berhasil disimpan!", "success");
      fetchKesiswaan();
    } catch (error) {
      console.error("Error updating Kesiswaan:", error);
      showNotification("Terjadi kesalahan sistem", "error");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div style={{ color: "#334155" }}>Memuat data...</div>;
  }

  return (
    <div>
      <Toast notification={notification} onClose={() => setNotification({ message: '', type: '' })} />
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#1e293b" }}>Kelola Kesiswaan</h2>
      
      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#334155" }}>
          Edit Informasi Kesiswaan
        </h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Judul Halaman</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Teks Program Kesiswaan</label>
          <RichTextEditor
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val })}
            style={{ height: '300px', marginBottom: '50px', background: 'white' }}
          />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Gambar Kesiswaan</label>
            {form.photoUrl && !imageFile && (
              <div style={{ marginBottom: "10px" }}>
                <img src={form.photoUrl} alt="Kesiswaan Sekolah" style={{ maxWidth: "300px", borderRadius: "8px", border: "2px solid #e2e8f0" }} />
              </div>
            )}
            {imageFile && (
              <div style={{ marginBottom: "10px" }}>
                <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ maxWidth: "300px", borderRadius: "8px", border: "2px solid #e2e8f0" }} />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#3b82f6", color: "white", padding: "12px 20px", borderRadius: "6px",
              border: "none", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px", alignSelf: "flex-start"
            }}
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

        </form>
      </div>
    </div>
  );
}
