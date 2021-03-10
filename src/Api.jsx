export const API_URL = 'https://lab-api-bq.herokuapp.com/';

export function USER_POST(email, password) {
  return {
    url: `${API_URL}auth`,
    body: `email=${email}&password=${password}`,
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
  };
}
