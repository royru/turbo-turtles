import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
   request,
   response
) {
   const user = await kv.hgetall('user:me')
   return response.status(200).json(user)
}
