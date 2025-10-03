import { apiSlice } from "./apiSlice";
const USER_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method:'POST'
            })
        }),
        registerUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/registeruser`,
                method:'POST',
                body:data
            })
        }),
        registerDoctor:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/registerdoctor`,
                method:'POST',
                body:data
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/profile`,
                method:'POST',
                body:data
            })
        }),
        getUser:builder.mutation({
            query:()=>({
                url:`${USER_URL}/profile`,
                method:'GET',
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterUserMutation,
    useRegisterDoctorMutation,
    useUpdateUserMutation,
    useGetUserMutation
} = userApiSlice
