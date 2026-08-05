import { NextResponse } from 'next/server'

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
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px; margin-top: 0;">Pesan Baru dari Web Portofolio</h2>
            <p style="margin: 8px 0;"><strong>Nama Pengirim:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email Pengirim:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Subjek:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="margin: 8px 0;"><strong>Isi Pesan:</strong></p>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap; color: #1f2937; line-height: 1.6;">${message}</div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">Pesan ini dikirimkan otomatis melalui formulir kontak portofolio Anda. Anda dapat langsung menekan tombol Balas (Reply) di email ini untuk membalas ke email pengirim.</p>
          </div>
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
