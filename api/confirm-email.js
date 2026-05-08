export default async function handler(req, res) {

  try {

    const token = req.query.token;

    if (!token) {
      return res.status(400).send("Token inválido.");
    }

    const resposta = await fetch(
      `https://frcolkudeiddfddccvmi.supabase.co/rest/v1/clientes?token_confirmacao=eq.${token}`,
      {
        headers: {
          apikey: "sb_publishable_yu4G73-jorUbTivFrSM3Gg_t9UZt31G",
          Authorization: "Bearer sb_publishable_yu4G73-jorUbTivFrSM3Gg_t9UZt31G"
        }
      }
    );

    const usuarios = await resposta.json();

    if (!usuarios.length) {
      return res.status(404).send("Cadastro não encontrado.");
    }

    await fetch(
      `https://frcolkudeiddfddccvmi.supabase.co/rest/v1/clientes?token_confirmacao=eq.${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: "sb_publishable_yu4G73-jorUbTivFrSM3Gg_t9UZt31G",
          Authorization: "Bearer sb_publishable_yu4G73-jorUbTivFrSM3Gg_t9UZt31G"
        },
        body: JSON.stringify({
          email_confirmado: true
        })
      }
    );

    return res.send(`
      <html>
        <body style="
          font-family: Arial;
          display:flex;
          align-items:center;
          justify-content:center;
          height:100vh;
          background:#f5f5f5;
        ">
          <div style="
            background:white;
            padding:40px;
            border-radius:12px;
            text-align:center;
            box-shadow:0 0 20px rgba(0,0,0,0.08);
          ">
            <h1>✅ E-mail confirmado!</h1>

            <p>
              Seu cadastro foi validado com sucesso.
            </p>

            <p>
              Boa sorte nos sorteios 🍀
            </p>
          </div>
        </body>
      </html>
    `);

  } catch (erro) {

    return res.status(500).send("Erro interno.");

  }
}
