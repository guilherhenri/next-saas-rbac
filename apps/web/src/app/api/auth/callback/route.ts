import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { acceptInvite } from '@/http/accept-invite'
import { signWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found.' },
      { status: 400 },
    )
  }

  const { token } = await signWithGithub({ code })

  const cookieStore = await cookies()

  const inviteId = cookieStore.get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptInvite(inviteId)
      cookieStore.delete('inviteId')
    } catch {}
  }

  cookieStore.set('token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
