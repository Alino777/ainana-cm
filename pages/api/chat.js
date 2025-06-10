
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    // Simulazione risposta GPT (sostituibile con chiamata OpenAI reale)
    const response = message.includes("zucchero")
      ? "Ricorda che nella tua dieta il consumo di zucchero è limitato."
      : "Il nutrizionista ti risponderà al più presto!";

    res.status(200).json({ response });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
