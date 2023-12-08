// https://turbo-turtles.vercel.app/api/data 

import { kv } from '@vercel/kv'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const user = request.query.user as string
  const steps = request.query.steps as string
  console.log(`user: ${user}, steps: ${steps}`)

  if (!user || !steps) {
    return response.status(400).json({ error: "user and steps are required" })
  }

  try {
    const users_str = await kv.get('###users') as string | undefined
    const users = users_str ? JSON.parse(users_str) : []
    const data: { user: string, steps: number, color: string }[] = []

    for (const user of users) {
      const steps = await kv.get(user) as number
      console.log(`user: ${user}, steps: ${steps}`)
      data.push({ user, steps, color: 'blue' })
    }

    response.status(200).json(data)

  } catch (error) {
    return response.status(400).json({ error: "error updating steps" })
  }
}
