export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhook = process.env.GAS_WEBHOOK_URL
  if (!webhook) {
    return res.status(500).json({ error: 'GAS_WEBHOOK_URL not configured on server' })
  }

  try {
    const data = req.body || {}

    // Forward to Google Apps Script webhook
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!resp.ok) {
      const text = await resp.text()
      console.error('GAS responded with', resp.status, text)
      return res.status(502).json({ error: 'Failed to forward to Google Apps Script' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
