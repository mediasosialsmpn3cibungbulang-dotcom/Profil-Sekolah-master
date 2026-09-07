"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Toast from "@/components/Toast";

export default function ProfilAdmin() {
  const [form, setForm] = useState({ 
    title: "Profil Sekolah",
    schoolName: "SMP NEGERI 3 CIBUNGBULANG",
    status: "TERAKREDITASI A (UNGGUL)",
    tahunBerdiri: "2005",
    branding: "SEKOLAH RAMAH ANAK",
    waktuBelajar: "5 HARI (SENIN - JUMAT)",
    kurikulum: "MERDEKA",
    kemitraan: "DALAM NEGERI",
    jumlahRombel: "24 ROMBEL",
    programUnggulan: "TAHFIDZ",
    kepalaSekolah: "KEPALA SEKOLAH, S.PD.",
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

  const fetchProfil = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profil");
      const data = await res.json();
      if (data && data.id) {
        setForm({
          title: data.title || "Profil Sekolah",
          schoolName: data.schoolName || "SMP NEGERI 3 CIBUNGBULANG",
          status: data.status || "",
          tahunBerdiri: data.tahunBerdiri || "",
          branding: data.branding || "",
          waktuBelajar: data.waktuBelajar || "",
          kurikulum: data.kurikulum || "",
          kemitraan: data.kemitraan || "",
          jumlahRombel: data.jumlahRombel || "",
          programUnggulan: data.programUnggulan || "",
          kepalaSekolah: data.kepalaSekolah || "",
          photoUrl: data.photoUrl || ""
        });
      }
    } catch (error) {
      console.error("Error fetching profil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfil();
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

      const res = await fetch("/api/profil", {
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
      showNotification("Profil Sekolah berhasil disimpan!", "success");
      fetchProfil();
    } catch (error) {
      console.error("Error saving profil:", error);
      showNotification("Terjadi kesalahan saat menyimpan data.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toast notification={notification} onClose={() => setNotification({ message: '', type: '' })} />
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#1e293b" }}>Kelola Profil Sekolah</h2>

      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#334155" }}>
          Edit Data Metrik Sekolah
        </h3>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            
            {/* Foto Gedung / Sejarah */}
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Foto Background Latar (Unggah)</label>
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
                    style={{ width: '300px', height: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : form.photoUrl ? (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Foto Saat Ini:</p>
                  <img 
                    src={form.photoUrl} 
                    alt="Current" 
                    style={{ width: '300px', height: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : null}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Judul Halaman</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Nama Sekolah</label>
                <input type="text" name="schoolName" value={form.schoolName} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Status / Akreditasi</label>
                <input type="text" name="status" value={form.status} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Tahun Berdiri</label>
                <input type="text" name="tahunBerdiri" value={form.tahunBerdiri} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Branding</label>
                <input type="text" name="branding" value={form.branding} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Waktu Belajar</label>
                <input type="text" name="waktuBelajar" value={form.waktuBelajar} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Kurikulum</label>
                <input type="text" name="kurikulum" value={form.kurikulum} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Kemitraan</label>
                <input type="text" name="kemitraan" value={form.kemitraan} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Jumlah Rombel</label>
                <input type="text" name="jumlahRombel" value={form.jumlahRombel} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Program Unggulan</label>
                <input type="text" name="programUnggulan" value={form.programUnggulan} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>Kepala Sekolah</label>
                <input type="text" name="kepalaSekolah" value={form.kepalaSekolah} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} required />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
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
