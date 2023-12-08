// https://turbo-turtles-edge.vercel.app/api/data 

import { kv } from '@vercel/kv'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(request: VercelRequest, response: VercelResponse) {

  try {
    const users_str = await kv.get('users') as string | undefined
    const users = users_str ? JSON.parse(users_str) : []
    const data: { name: string, steps: number, color: string }[] = []

    for (const user of users) {
      const steps = await kv.get(user) as number
      console.log(`user: ${user}, steps: ${steps}`)
      data.push({ name: user, steps, color: 'blue' })
    }

    response.status(200).json(data)

  } catch (error) {
    return response.status(400).json({ error: "error updating steps" })
  }
}
