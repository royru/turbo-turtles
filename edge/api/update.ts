// https://turbo-turtles-edge.vercel.app/api/update?user=roy&steps=5

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
    let total_steps_str = await kv.get(user) as string
    let total_steps = total_steps_str ? Number.parseInt(total_steps_str) : 0
    console.log({ total_steps })
    if (total_steps == 0) {
      const users_str = await kv.get('111users') as string | null
      console.log({ users_str })
      const users = users_str ? JSON.parse(users_str) : []
      users.push(user)
      console.log({ users })
      await kv.set('111users', JSON.stringify(users))
    }
    total_steps = total_steps + Number.parseInt(steps)
    await kv.set(user, total_steps.toString())
    response.status(200).json({ user, steps: total_steps })
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error: "error updating steps" })
  }
}
