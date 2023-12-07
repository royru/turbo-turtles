// https://turbo-turtles.vercel.app/api/update?user=roy&steps=5

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {

  const user = request.query.user
  const steps = request.query.steps
  console.log(`user: ${user}, steps: ${steps}`)

  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  })
}