// https://turbo-turtles.vercel.app/update?user=roy&steps=5

import { NowRequest, NowResponse } from '@vercel/node'

export default async (req: NowRequest, res: NowResponse) => {
  const user = req.query.user
  const steps = req.query.steps
  console.log(`user: ${user}, steps: ${steps}`)
}
