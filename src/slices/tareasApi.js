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

        crearTarea: build.mutation({
            query: (datosTarea) => ({
                url: '/tareas.php',
                method: 'POST',
                body: datosTarea,
            }),
            invalidatesTags: ['Tarea'],
        }),

        cambiarEstado: build.mutation({
            query: (tarea) => ({
                url: '/tareas.php',
                method: 'PUT',
                body: { id: tarea.id, completada: !tarea.completada },
            }),
            invalidatesTags: ['Tarea'],
        }),

        editarTarea: build.mutation({
            query: ({ id, datos }) => ({
                url: '/tareas.php',
                method: 'PUT',
                body: { id, ...datos },
            }),
            invalidatesTags: ['Tarea'],
        }),

    }),
})

export const {
    useGetTareasQuery,
    useCrearTareaMutation,
    useCambiarEstadoMutation,
    useEditarTareaMutation,     
} = tareasApi