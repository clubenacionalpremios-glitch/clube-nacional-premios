export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    const { email, nome, pin, tokenConfirmacao } = req.body;

    const linkConfirmacao = `https://clubenacionaldepremios.com/api/confirm-email?token=${tokenConfirmacao}`;

    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer SUA_NOVA_API_KEY_RESEND"
      },
      body: JSON.stringify({
        from: "Clube Nacional <cadastro@clubenacionaldepremios.com>",
        to: email,
        subject: "Confirme seu cadastro - Clube Nacional de Prêmios",
        html: `
          <div style="font-family:Arial;padding:20px;line-height:1.6">
            <h2>Cadastro realizado com sucesso 🎉</h2>

            <p>Olá, ${nome}</p>

            <p>Seu cadastro foi realizado com sucesso no <strong>Clube Nacional de Prêmios</strong>.</p>

            <p>Seu número da sorte é:</p>

            <div style="background:#111;color:white;padding:15px;border-radius:10px;display:inline-block;font-size:22px;font-weight:bold;">
              ${pin}
            </div>

            <p style="margin-top:25px">
              Para validar seu e-mail e melhorar sua participação nas comunicações da campanha, clique no botão abaixo:
            </p>

            <p style="margin:30px 0;">
              <a href="${linkConfirmacao}" style="background:#111;color:white;padding:14px 22px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;">
                Confirmar meu e-mail
              </a>
            </p>

            <p>Boa sorte 🍀</p>
          </div>
        `
      })
    });

    const data = await resposta.json();

    if (!resposta.ok) {
      return res.status(500).json(data);
    }

    return res.status(200).json({ sucesso: true });

  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}
