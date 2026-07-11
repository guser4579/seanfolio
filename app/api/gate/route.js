import { NextResponse } from 'next/server';

export async function POST(request) {
  const form = await request.formData();
  const password = form.get('password');
  const returnTo = form.get('returnTo') || '/';
  const url = new URL(String(returnTo), request.url);

  if (
    process.env.CASE_STUDY_PASSWORD &&
    password === process.env.CASE_STUDY_PASSWORD
  ) {
    const res = NextResponse.redirect(url, 303);
    res.cookies.set('folio_gate', '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    return res;
  }

  url.searchParams.set('gate_error', '1');
  return NextResponse.redirect(url, 303);
}
