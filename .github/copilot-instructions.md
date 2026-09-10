<!-- mermaid-ai-skills:start -->
## Mermaid Diagrams

When the user asks to create, edit, or visualize a diagram, follow the
instructions in `.github/instructions/mermaid.instructions.md`.
<!-- mermaid-ai-skills:end -->

## Aturan Kerja Repo (Wajib)

Patuhi `AGENTS.md` di root repo: setiap update kode WAJIB diikuti update
`PRD.md` (+ `Server.md` bila terkait infra/keamanan), verifikasi
`npm run build` + `pm2 restart web-sekolah` + `curl`, lalu commit + push
otomatis. Jangan pernah menulis nilai rahasia ke file ter-commit.
