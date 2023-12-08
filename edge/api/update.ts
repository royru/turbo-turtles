// https://turbo-turtles.vercel.app/api/update?user=roy&steps=5

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
    let total_steps = await kv.get(user) as number
    if (total_steps) {
      total_steps = total_steps + Number.parseInt(steps)
    } else {
      total_steps = Number.parseInt(steps)
      const users_str = await kv.get('###users') as string | undefined
      const users = users_str ? JSON.parse(users_str) : []
      users.push(user)
      await kv.sadd('###users ', users)
    }
    await kv.set(user, total_steps.toString())
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error: "error updating steps" })
  }

  response.status(200)
}
