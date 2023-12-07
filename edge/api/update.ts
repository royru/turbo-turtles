// https://turbo-turtles.vercel.app/api/update?user=roy&steps=5

export default function handler(request, response) {
   const user = request.query.user
   const steps = request.query.steps
   console.log(`user: ${user}, steps: ${steps}`)

   response.status(200).json({
      body: request.body,
      query: request.query,
      cookies: request.cookies
   })
}
