import z from "zod"

export const loginSchema = z.object({
    email: z.string().nonempty("email is required").email(),
    password: z.string().nonempty("password is required"),
})