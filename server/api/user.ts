import { createClient } from '@vercel/kv'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  console.log('hiiii')
  // Create a helper function to get an environment variable with a default value
  // const getEnvVar = (name, defaultValue) => {
  //   return process.env[name] || defaultValue
  // }

  // const users = createClient({
  //   url: getEnvVar('USERS_REST_API_URL', ''),
  //   token: getEnvVar('USERS_REST_API_TOKEN', '')
  // })

  // const user = await users.hgetall('user:me')

  // const products = createClient({
  //   url: getEnvVar('PRODUCTS_REST_API_URL', ''),
  //   token: getEnvVar('PRODUCTS_REST_API_TOKEN', '')
  // })

  // const product = await products.hgetall('product:shirt')

  return response.status(200).json({ name: "roy" })
}
