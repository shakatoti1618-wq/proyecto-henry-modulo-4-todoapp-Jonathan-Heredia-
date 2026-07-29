import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { toEmail, tasks } = req.body;

  if (!toEmail || !Array.isArray(tasks)) {
    return res.status(400).json({ error: "Payload inválido" });
  }

  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  const body = `
    Resumen de tus tareas:
    - Pendientes: ${pending}
    - Completadas: ${completed}
    - Total: ${tasks.length}
  `;

  try {
    await ses.send(
      new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [toEmail] },
        Message: {
          Subject: { Data: "Resumen de tareas - TodoApp" },
          Body: { Text: { Data: body } },
        },
      })
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al enviar el email" });
  }
}