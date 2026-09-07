"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ, Quill } = await import('react-quill-new');
    
    // Register custom line-height format
    const Parchment = Quill.import('parchment');
    const StyleAttributor = Parchment.StyleAttributor || Quill.import('attributors/style/color').constructor;
    
    const LineHeightStyle = new StyleAttributor('lineHeight', 'line-height', {
      scope: Parchment.Scope.BLOCK,
      whitelist: ['1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0']
    });
    Quill.register(LineHeightStyle, true);
    
    return RQ;
  },
  { ssr: false, loading: () => <p style={{ padding: '20px', color: '#64748b' }}>Memuat Editor...</p> }
);

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'lineHeight': ['1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0'] }],
    ['link'],
    ['clean']
  ],
};

export default function RichTextEditor({ value, onChange, placeholder, style }) {
  // Exclude fixed height so the toolbar and editor flow naturally without double scrollbars or clipping
  const { height, ...restStyle } = style || {};
  return (
    <div className="custom-quill-editor" style={restStyle}>
      <ReactQuill 
        theme="snow" 
        value={value || ''} 
        onChange={onChange} 
        modules={quillModules} 
        placeholder={placeholder}
      />
    </div>
  );
}
