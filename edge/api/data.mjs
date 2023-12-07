// https://turbo-turtles.vercel.app/api/data 

export default function handler(
  request,
  response,
) {

  response.status(200).json({
    users: [
      { name: 'roy', steps: 5, color: 'red' },
      { name: 'anastasia', steps: 10, color: 'blue' },
      { name: 'sheena', steps: 15, color: 'green' }
    ]
  })
}