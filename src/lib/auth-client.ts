import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [ 
      usernameClient() 
    ],
    baseURL: "http://localhost:3000"
})

export const { signIn, signUp, useSession } = createAuthClient()