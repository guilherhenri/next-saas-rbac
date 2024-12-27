import type { Role } from '@saas/auth'

import { api } from './api-client'

interface GetPendingInvitesResponse {
  invites: {
    id: string
    createdAt: string
    role: Role
    email: string
    author: {
      name: string | null
      id: string
    } | null
    organization: {
      name: string
    }
  }[]
}

export async function getPendingInvites() {
  const result = await api
    .get('pending-invites')
    .json<GetPendingInvitesResponse>()

  return result
}
