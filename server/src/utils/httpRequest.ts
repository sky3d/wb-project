import { Client } from 'undici'

const COMMON_HEADERS = {
  'User-Agent': '@wbarsoft/renku-app',
}

// Check access token: https://docs.github.com/en/rest/apps/oauth-applications#check-a-token
export const fetchGithubUser = async (token: string) => {
  const client = new Client('https://api.github.com')

  const clientId = process.env.GITHUB_CLIENT_ID as string
  const authData = `${clientId}:${process.env.GITHUB_CLIENT_SECRET}`

  return client.request({
    method: 'POST',
    path: `/applications/${clientId}/token`,
    headers: {
      Authorization: `Basic  ${Buffer.from(authData).toString('base64')}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...COMMON_HEADERS
    },
    body: JSON.stringify({ access_token: token }),
  })
}

export const fetchGoogleUser = async (token: string) => {
  const client = new Client('https://www.googleapis.com')

  return client.request({
    method: 'GET',
    path: '/oauth2/v2/userinfo',
    headers: {
      Authorization: `Bearer ${token}`,
      ...COMMON_HEADERS
    }
  })
}
