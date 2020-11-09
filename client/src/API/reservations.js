const api_url = 'http://localhost:4000/api/reservations'

export async function listReservations() {
  const response = await fetch(api_url);
  return response.json();
}