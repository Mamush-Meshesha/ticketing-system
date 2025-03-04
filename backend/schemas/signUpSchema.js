import z from "zod"

export const signUpSchema = z.object({
    name: z.string().nonempty("name should not be empty"),
    email: z.string().nonempty("email is required").email(),
    password: z.string().nonempty("password is required"),
})