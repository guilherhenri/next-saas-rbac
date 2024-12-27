import { api } from './api-client'

interface SignWithGithubRequest {
  code: string
}

interface SignWithGithubResponse {
  token: string
}

export async function signWithGithub({ code }: SignWithGithubRequest) {
  const result = await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<SignWithGithubResponse>()

  return result
}
