import { cookies } from 'next/headers';

export async function gateOpen() {
  const c = await cookies();
  return c.get('folio_gate')?.value === '1';
}
