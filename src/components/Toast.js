'use client';

export default function Toast({ notification, onClose }) {
  if (!notification || !notification.message) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div 
      style={{
        position: 'fixed', 
        top: '25px', 
        right: '25px', 
        zIndex: 99999,
        background: isSuccess ? '#059669' : '#dc2626',
        color: 'white', 
        padding: '14px 22px', 
        borderRadius: '10px',
        boxShadow: '0 12px 28px -4px rgba(0,0,0,0.25)', 
        fontWeight: '600',
        fontSize: '0.95rem',
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        maxWidth: '420px',
        border: `1px solid ${isSuccess ? '#34d399' : '#f87171'}`,
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <span style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '24px', 
        height: '24px', 
        borderRadius: '50%', 
        background: 'rgba(255,255,255,0.2)',
        fontSize: '0.9rem',
        flexShrink: 0
      }}>
        {isSuccess ? '✓' : '✕'}
      </span>
      <span style={{ flex: 1 }}>{notification.message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1.1rem',
            opacity: 0.8,
            padding: '0 4px',
            lineHeight: 1
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
