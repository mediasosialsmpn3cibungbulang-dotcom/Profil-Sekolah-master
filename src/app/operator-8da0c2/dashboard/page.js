export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ color: '#1e293b', marginBottom: '20px' }}>Dashboard Admin</h1>
      <div style={{ padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '10px' }}>Selamat Datang!</h3>
        <p>Gunakan menu di sebelah kiri untuk mengelola konten website profil sekolah Anda.</p>
        <p style={{ marginTop: '10px' }}>Saat ini sistem berjalan dengan baik menggunakan Next.js dan database SQLite.</p>
      </div>
    </div>
  );
}
