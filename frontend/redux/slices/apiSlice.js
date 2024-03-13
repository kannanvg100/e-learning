import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addUser, removeUser } from "./userSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.user?.accessToken;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
        if (refreshResult?.data) {
            api.dispatch(addUser({ ...refreshResult.data }));
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(removeUser());
        }
    } else if (result?.error?.originalStatus === 402) {
        console.log(result?.error)
        api.dispatch(removeUser())
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});