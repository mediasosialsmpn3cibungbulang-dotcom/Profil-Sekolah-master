"use client";
import { useState, useEffect, useRef } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import Toast from "@/components/Toast";

export default function MarsAdmin() {
  const [form, setForm] = useState({ 
    title: "",
    videoUrl: "",
    content: "",
    photoUrl: "" 
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const fileInputRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3500);
  };

  const fetchMars = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mars");
      const data = await res.json();
      if (data && data.id) {
        setForm({
          title: data.title || "",
          videoUrl: data.videoUrl || "",
          content: data.content || "",
          photoUrl: data.photoUrl || ""
        });
      }
    } catch (error) {
      console.error("Error fetching mars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMars();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

      const res = await fetch("/api/mars", {
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
      showNotification("Mars Sekolah berhasil disimpan!", "success");
      fetchMars();
    } catch (error) {
      console.error("Error saving mars:", error);
      showNotification("Terjadi kesalahan saat menyimpan data.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toast notification={notification} onClose={() => setNotification({ message: '', type: '' })} />
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#1e293b" }}>Kelola Mars Sekolah</h2>

      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
            
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>
                Judul Mars
              </label>
              <input 
                type="text"
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} 
                required 
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>
                URL Video (Sematkan YouTube / iframe src)
              </label>
              <input 
                type="text"
                name="videoUrl" 
                value={form.videoUrl} 
                onChange={handleChange} 
                placeholder="Contoh: https://www.youtube.com/embed/2LhVa_2f_2Q"
                style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} 
                required 
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>
                Lirik Mars (Opsional)
              </label>
              <RichTextEditor
                value={form.content} 
                onChange={(val) => setForm({ ...form, content: val })} 
                style={{ height: '300px', marginBottom: '50px', background: 'white' }} 
              />
              <small style={{ color: "#64748b" }}>Kosongkan jika Anda tidak ingin menampilkan teks lirik.</small>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>
                Foto Sekolah Tambahan (Opsional)
              </label>
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
                    style={{ width: '300px', height: 'auto', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : form.photoUrl ? (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Foto Saat Ini:</p>
                  <img 
                    src={form.photoUrl} 
                    alt="Current" 
                    style={{ width: '300px', height: 'auto', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : null}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button type="submit" disabled={loading} style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold" }}>
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
