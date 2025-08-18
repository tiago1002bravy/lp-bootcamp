export async function POST(req: Request) {
  try {
    const input = (await req.json()) as {
      fullName: string;
      email: string;
      phone: string;
      planLabel?: string;
      utms?: Record<string, string | undefined>;
      from?: string;
    };

    const now = new Date();
    const onlyDigits = (v: string) => v.replace(/\D+/g, "");
    const digitsPhone = onlyDigits(input.phone || "");
    const formattedPhone = `+${digitsPhone}`;

    const host = req.headers.get("host") || "";
    const realIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "";
    const userAgent = req.headers.get("user-agent") || "";

    const payload = [
      {
        headers: {
          host,
          "x-real-ip": realIp,
          "x-forwarded-for": realIp,
          "user-agent": userAgent,
          accept: "*/*",
          "accept-language": "*",
          "content-type": "application/json",
        },
        params: {},
        query: {},
        body: {
          id: Date.now(),
          from: input.from || "bootcamp-indefinido",
          created: now.toISOString(),
          content: {
            email: input.email,
            name: input.fullName,
            whatsapp: input.phone,
            utms: input.utms || {},
            from: input.from || "bootcamp-indefinido",
          },
          name: input.fullName,
          telefone: input.phone,
          email: input.email,
          whatsapp: digitsPhone,
          formatted_phone: formattedPhone,
        },
        webhookUrl: "https://n8n.bravy.com.br/webhook/lp-bootcamp",
        executionMode: "production",
      },
    ];

    const res = await fetch("https://n8n.bravy.com.br/webhook/lp-bootcamp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const ok = res.ok;
    const text = await res.text().catch(() => "");
    return new Response(JSON.stringify({ ok, upstreamStatus: res.status, upstreamBody: text }), {
      status: ok ? 200 : 502,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: (error as Error).message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}


