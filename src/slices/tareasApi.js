import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tareasApi = createApi({

    reducerPath: 'tareasApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
    }),

    tagTypes: ['Tarea'],

    keepUnusedDataFor: 60,

    endpoints: (build) => ({

        getTareas: build.query({
            query: () => '/tareas.php',      
            providesTags: ['Tarea'],         
        }),

    }),
})

export const { useGetTareasQuery } = tareasApi