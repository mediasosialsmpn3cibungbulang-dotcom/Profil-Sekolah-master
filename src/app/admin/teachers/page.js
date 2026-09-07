'use client';

import { useState, useEffect } from 'react';
import RichTextEditor from "@/components/RichTextEditor";
import Toast from "@/components/Toast";

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Guru Kelas');
  const [description, setDescription] = useState('');
  const [additionalRole, setAdditionalRole] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/teachers');
      const data = await res.json();
      if (Array.isArray(data)) setTeachers(data);
    } catch (err) {
      console.error('Failed to fetch teachers:', err);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !subject) {
      showNotification('Mohon lengkapi data wajib!', 'error');
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = existingImageUrl || '/images/guru1.png'; // default fallback if no existing image
      
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
          showNotification('Gagal mengunggah foto', 'error');
          setLoading(false);
          return;
        }
      }
      
      const payload = { name, subject, photoUrl: finalImageUrl, description, additionalRole };
      let res;

      if (editingId) {
        res = await fetch(`/api/teachers/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      if (res.ok) {
        setName('');
        setSubject('Guru Kelas');
        setDescription('');
        setAdditionalRole('');
        setImageFile(null);
        setEditingId(null);
        setExistingImageUrl('');
        if (e.target) e.target.reset(); // Reset file input
        showNotification(editingId ? 'Data Guru berhasil diperbarui!' : 'Data Guru berhasil ditambahkan!', 'success');
        fetchTeachers();
      } else {
        throw new Error('Gagal menyimpan data');
      }
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (t) => {
    setName(t.name);
    setSubject(t.subject || 'Guru Kelas');
    setDescription(t.description || '');
    setAdditionalRole(t.additionalRole || '');
    setEditingId(t.id);
    setExistingImageUrl(t.photoUrl || '');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setName('');
    setSubject('Guru Kelas');
    setDescription('');
    setAdditionalRole('');
    setEditingId(null);
    setExistingImageUrl('');
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data guru ini?')) return;
    
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Data berhasil dihapus', 'success');
        fetchTeachers();
      }
    } catch (err) {
      showNotification('Gagal menghapus data', 'error');
    }
  };

  return (
    <div>
      <Toast notification={notification} onClose={() => setNotification({ message: '', type: '' })} />
      <h1 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '30px', fontWeight: 'bold' }}>Kelola Data Guru</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* Form Tambah */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', alignSelf: 'start' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>{editingId ? 'Ubah Data Guru' : 'Tambah Guru Baru'}</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Nama Lengkap & Gelar (Wajib)</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Misal: Drs. Budi Santoso, M.Pd."
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Jabatan / Guru Mapel (Wajib)</label>
              <input 
                type="text" 
                value={subject} 
                onChange={e => setSubject(e.target.value)} 
                placeholder="Misal: Guru Bahasa Indonesia"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Biografi / Deskripsi (Opsional)</label>
              <RichTextEditor
                value={description} 
                onChange={(val) => setDescription(val)} 
                placeholder="Tuliskan biografi atau keterangan guru..."
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Jabatan Tambahan (Opsional)</label>
              <input 
                type="text" 
                value={additionalRole} 
                onChange={e => setAdditionalRole(e.target.value)} 
                placeholder="Misal: Wali Kelas / Pembina Ekstrakurikuler"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Foto (Opsional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                style={{ width: '100%', padding: '10px', border: '1px dashed #94a3b8', borderRadius: '6px', background: '#f8fafc' }}
              />
              <small style={{ color: '#64748b', display: 'block', marginTop: '5px' }}>*Jika tidak diisi, akan menggunakan gambar default atau yang lama.</small>
              {imageFile ? (
                <div style={{ marginTop: '10px' }}>
                  <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
              ) : existingImageUrl ? (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Gambar Saat Ini:</p>
                  <img src={existingImageUrl} alt="Current" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
              ) : null}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  flex: 1, padding: '12px', background: loading ? '#94a3b8' : '#2563eb', color: 'white', 
                  border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {loading ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Simpan Data Guru')}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={handleCancelEdit} 
                  style={{ 
                    background: '#ef4444', color: 'white', padding: '12px 20px', border: 'none', 
                    borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem'
                  }}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Guru */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', alignSelf: 'start' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#1e293b', margin: 0 }}>Daftar Guru</h2>
            <span style={{ background: '#e2e8f0', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', color: '#475569', fontWeight: 'bold' }}>Total: {teachers.length}</span>
          </div>

          {teachers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <p>Belum ada data guru.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {teachers.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px', transition: 'border-color 0.2s' }} onMouseOver={e => e.currentTarget.style.borderColor = '#93c5fd'} onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #e2e8f0' }}>
                    <img src={t.photoUrl || '/images/guru1.png'} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', color: '#0f172a', fontSize: '1.05rem' }}>{t.name}</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{t.subject}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEdit(t)}
                      style={{ background: '#fef08a', color: '#a16207', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                      onMouseOver={e => { e.target.style.background = '#eab308'; e.target.style.color = 'white'; }}
                      onMouseOut={e => { e.target.style.background = '#fef08a'; e.target.style.color = '#a16207'; }}
                    >
                      Ubah
                    </button>
                    <button 
                      onClick={() => handleDelete(t.id)}
                      style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                      onMouseOver={e => { e.target.style.background = '#fecaca'; }}
                      onMouseOut={e => { e.target.style.background = '#fee2e2'; }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
