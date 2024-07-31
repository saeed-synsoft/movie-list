import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '@/utils'



export const api = createApi({
  reducerPath: 'apis',
  tagTypes: ['movie', 'profile'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { }) => {
      if (getCookie('token')) headers.set('Authorization', `Bearer ${getCookie('token')}`)

      const organization = getCookie('organization')
      if (organization) headers.set('organizationId', JSON.parse(organization).id)

      return headers
    }
  }),
  endpoints: () => ({}),
})