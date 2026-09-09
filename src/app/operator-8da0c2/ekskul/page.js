'use client';

import { useState, useEffect } from 'react';
import RichTextEditor from "@/components/RichTextEditor";
import Toast from "@/components/Toast";

export default function AdminEkskul() {
  const [ekskuls, setEkskuls] = useState([]);
  const [title, setTitle] = useState('');
  const [jadwal, setJadwal] = useState('');
  const [pembina, setPembina] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchEkskuls();
  }, []);

  const fetchEkskuls = async () => {
    try {
      const res = await fetch('/api/ekskul');
      const data = await res.json();
      if(Array.isArray(data)) setEkskuls(data);
    } catch (err) {
      showNotification('Gagal mengambil data ekstrakurikuler.', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let finalImageUrl = existingImageUrl;
      
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
          showNotification('Gagal mengunggah gambar.', 'error');
          setLoading(false);
          return;
        }
      }

      const payload = { title, jadwal, pembina, description, photoUrl: finalImageUrl };
      let res;

      if (editingId) {
        res = await fetch(`/api/ekskul/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/ekskul', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      if (res.ok) {
        setTitle('');
        setJadwal('');
        setPembina('');
        setDescription('');
        setImageFile(null);
        setEditingId(null);
        setExistingImageUrl('');
        if (e.target) e.target.reset(); // Reset file input
        showNotification(editingId ? 'Ekstrakurikuler berhasil diperbarui!' : 'Ekstrakurikuler berhasil ditambahkan!', 'success');
        fetchEkskuls();
      } else {
        showNotification('Gagal menyimpan ekstrakurikuler (Unauthorized).', 'error');
      }
    } catch (err) {
      showNotification('Terjadi kesalahan jaringan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ach) => {
    setTitle(ach.title);
    setJadwal(ach.jadwal || '');
    setPembina(ach.pembina || '');
    setDescription(ach.description || '');
    setEditingId(ach.id);
    setExistingImageUrl(ach.photoUrl || '');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setTitle('');
    setJadwal('');
    setPembina('');
    setDescription('');
    setEditingId(null);
    setExistingImageUrl('');
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if(confirm('Yakin ingin menghapus ekstrakurikuler ini? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        const res = await fetch(`/api/ekskul/${id}`, { method: 'DELETE' });
        if (res.ok) {
          showNotification('Ekstrakurikuler berhasil dihapus!', 'success');
          fetchEkskuls();
        } else {
          showNotification('Gagal menghapus ekstrakurikuler (Unauthorized).', 'error');
        }
      } catch (err) {
        showNotification('Terjadi kesalahan jaringan.', 'error');
      }
    }
  };

  return (
    <div>
      <Toast notification={notification} onClose={() => setNotification({ message: '', type: '' })} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1e293b', margin: 0 }}>Kelola Ekstrakurikuler Siswa</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* Form Add Post */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', height: 'fit-content' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, color: '#334155' }}>{editingId ? 'Ubah Ekstrakurikuler' : 'Tambah Ekstrakurikuler Baru'}</h3>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: '25px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Judul Ekstrakurikuler</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
                placeholder="Misal: Pramuka, Paskibra, Futsal"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Jadwal</label>
                <input 
                  type="text"
                  value={jadwal} 
                  onChange={e => setJadwal(e.target.value)} 
                  required
                  placeholder="Misal: Setiap Selasa & Kamis, 15:00"
                  style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', background: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Nama Pembina</label>
                <input 
                  type="text" 
                  value={pembina} 
                  onChange={e => setPembina(e.target.value)} 
                  required 
                  placeholder="Misal: Budi Santoso, S.Pd"
                  style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Deskripsi Ekstrakurikuler</label>
              <RichTextEditor
                value={description} 
                onChange={(val) => setDescription(val)} 
                placeholder="Tuliskan deskripsi lengkap ekstrakurikuler di sini..."
              />
            </div>



            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Gambar Ekstrakurikuler (Wajib)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
              {imageFile ? (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={URL.createObjectURL(imageFile)} 
                    alt="Preview" 
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : existingImageUrl ? (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Gambar Saat Ini:</p>
                  <img 
                    src={existingImageUrl} 
                    alt="Current" 
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : null}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" disabled={loading} style={{ 
                flex: 1, background: '#3b82f6', color: 'white', padding: '12px', border: 'none', 
                borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1rem',
                transition: 'background 0.2s'
              }}>
                {loading ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Tambah Ekstrakurikuler')}
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

        {/* List of Ekskuls */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#334155' }}>Daftar Ekstrakurikuler</h3>
            <span style={{ background: '#e2e8f0', color: '#475569', padding: '2px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              Total: {ekskuls.length}
            </span>
          </div>
          
          <div style={{ padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
            {ekskuls.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏆</div>
                <p>Belum ada data ekstrakurikuler siswa.</p>
              </div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {ekskuls.map(ach => (
                  <li key={ach.id} style={{ 
                    borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '20px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', lineHeight: '1.4' }}>{ach.title}</h4>
                        {ach.photoUrl && (
                          <div style={{ marginBottom: '10px' }}>
                            <img src={ach.photoUrl} alt={ach.title} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                          </div>
                        )}
                        <div style={{ margin: '0 0 6px 0', color: '#64748b', fontSize: '0.9rem' }}>
                          <strong>Pembina:</strong> {ach.pembina} <br/>
                          <strong>Jadwal:</strong> {ach.jadwal}
                        </div>
                        <div 
                          style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', whiteSpace: 'normal', wordBreak: 'break-word' }}
                          dangerouslySetInnerHTML={{ __html: (ach.description || '').replace(/&nbsp;|\u00A0/g, ' ') }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => handleEdit(ach)} 
                          style={{ 
                            background: '#fef08a', color: '#a16207', padding: '8px 12px', border: '1px solid #fde047', 
                            borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.2s', flexShrink: 0
                          }}
                          onMouseOver={(e) => { e.target.style.background = '#eab308'; e.target.style.color = 'white'; }}
                          onMouseOut={(e) => { e.target.style.background = '#fef08a'; e.target.style.color = '#a16207'; }}
                        >
                          Ubah
                        </button>
                        <button 
                          onClick={() => handleDelete(ach.id)} 
                          style={{ 
                            background: '#fee2e2', color: '#ef4444', padding: '8px 12px', border: '1px solid #fecaca', 
                            borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.2s', flexShrink: 0
                          }}
                          onMouseOver={(e) => { e.target.style.background = '#ef4444'; e.target.style.color = 'white'; }}
                          onMouseOut={(e) => { e.target.style.background = '#fee2e2'; e.target.style.color = '#ef4444'; }}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
