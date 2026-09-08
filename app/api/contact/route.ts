import { NextResponse } from 'next/server'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Semua kolom wajib diisi' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const receiverEmail = process.env.MY_PERSONAL_EMAIL || 'aderamadhaniputra35@gmail.com'

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key Resend belum dikonfigurasi' },
        { status: 500 }
      )
    }

    const safeName = escapeHtml(name.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeSubject = escapeHtml(subject.trim())
    const safeMessage = escapeHtml(message.trim())
    const initialLetter = safeName.charAt(0).toUpperCase() || 'R'
    const replySubject = encodeURIComponent(`Re: ${subject.trim()}`)

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date())

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [receiverEmail],
        reply_to: email,
        subject: `[Portfolio Contact] ${subject} - dari ${name}`,
        text: `Pesan Baru dari Web Portofolio (rama-x2.my.id)\n\nWaktu: ${formattedDate} WIB\nNama Pengirim: ${name}\nEmail Pengirim: ${email}\nSubjek: ${subject}\n\nIsi Pesan:\n${message}\n\n---\nPesan ini dikirimkan otomatis melalui formulir kontak web https://rama-x2.my.id`,
        html: `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pesan Baru dari ${safeName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0d19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0b0d19; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #131528; border: 1px solid #282c4b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);">
          
          <!-- Top Neon Gradient Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 28px 28px 20px 28px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <!-- Pill Badge -->
                    <div style="display: inline-block; padding: 5px 14px; background-color: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.35); border-radius: 9999px; font-size: 11px; font-weight: 700; color: #a5b4fc; letter-spacing: 0.8px; text-transform: uppercase;">
                      ✦ Pesan Masuk Portofolio
                    </div>
                    <!-- Title -->
                    <h1 style="margin: 14px 0 6px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                      Ada Pesan Baru untuk Anda! 📬
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                      Diterima pada ${formattedDate} WIB via <a href="https://rama-x2.my.id" style="color: #818cf8; text-decoration: none;">rama-x2.my.id</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 28px;">
              <div style="height: 1px; background-color: #232742;"></div>
            </td>
          </tr>

          <!-- Sender Identity Card -->
          <tr>
            <td style="padding: 20px 28px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0d0f1f; border: 1px solid #222644; border-radius: 12px; padding: 16px 18px;">
                <tr>
                  <td width="48" valign="middle" style="padding-right: 14px;">
                    <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #ec4899); color: #ffffff; font-size: 18px; font-weight: 700; line-height: 44px; text-align: center; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);">
                      ${initialLetter}
                    </div>
                  </td>
                  <td valign="middle">
                    <div style="font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 3px;">
                      ${safeName}
                    </div>
                    <div style="font-size: 13px; color: #818cf8;">
                      <a href="mailto:${safeEmail}" style="color: #818cf8; text-decoration: none;">${safeEmail}</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subject Block -->
          <tr>
            <td style="padding: 0 28px 16px 28px;">
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px;">
                Subjek Pesan
              </div>
              <div style="background-color: #171a33; border: 1px solid #2a2f54; border-radius: 8px; padding: 12px 16px; font-size: 14px; font-weight: 600; color: #e2e8f0;">
                ${safeSubject}
              </div>
            </td>
          </tr>

          <!-- Message Body Block -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px;">
                Isi Pesan
              </div>
              <div style="background-color: #0a0b16; border: 1px solid #232742; border-left: 4px solid #8b5cf6; border-radius: 10px; padding: 16px 18px; font-size: 14px; line-height: 1.65; color: #cbd5e1; white-space: pre-wrap; word-break: break-word;">${safeMessage}</div>
            </td>
          </tr>

          <!-- CTA Button Block -->
          <tr>
            <td style="padding: 0 28px 28px 28px;" align="center">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="border-radius: 10px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);">
                    <a href="mailto:${safeEmail}?subject=Re:%20${replySubject}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 10px;">
                      ✉️ Balas Pesan ke ${safeName}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748b;">
                Atau Anda juga bisa langsung menekan tombol <strong>Reply</strong> di aplikasi Gmail Anda.
              </p>
            </td>
          </tr>

          <!-- Footer Block -->
          <tr>
            <td style="padding: 20px 28px; background-color: #0d0f1f; border-top: 1px solid #232742;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font-size: 12px; color: #64748b; line-height: 1.5;">
                    <strong style="color: #94a3b8;">Ade Ramadhani Putra (Rama-X2)</strong><br />
                    Web Portofolio: <a href="https://rama-x2.my.id" style="color: #818cf8; text-decoration: none;">rama-x2.my.id</a>
                  </td>
                  <td align="right" valign="middle" style="font-size: 11px; color: #475569;">
                    Secured by Resend API
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Gagal mengirim pesan via Resend' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan pada server' },
      { status: 500 }
    )
  }
}