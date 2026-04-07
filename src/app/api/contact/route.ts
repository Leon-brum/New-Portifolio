import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "leu-profissional@hotmail.com",
    subject: `[Portfólio] Nova mensagem de ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6c63ff;">Nova mensagem pelo portfólio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <blockquote style="border-left: 3px solid #6c63ff; padding-left: 1rem; color: #555;">
          ${message.replace(/\n/g, "<br/>")}
        </blockquote>
        <hr/>
        <p style="color: #999; font-size: 12px;">Enviado via portfólio — Leonardo Moreno</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Falha ao enviar email." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
