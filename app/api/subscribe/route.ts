/** Newsletter sign-up endpoint used by the home page form.
 * The original site posted to its Framer form; connect a real mailing-list provider here. */
export async function POST(req: Request) {
  const data = await req.formData();
  const email = String(data.get("email") ?? "");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ ok: false }, { status: 400 });
  return Response.json({ ok: true });
}
