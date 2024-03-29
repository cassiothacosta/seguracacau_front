import { useRef } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { useState } from 'react'

const apiLink = process.env.BACKEND_API

const fetcher = (url: any) =>
  fetch(url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null }
    })

export function useUser({ redirectTo, redirectIfFound }: any = {}) {
  const { data, error } = useSWR(apiLink + '/api/user', fetcher, {revalidateOnFocus : false})
  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useRef(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  })

  return error ? null : user
}
