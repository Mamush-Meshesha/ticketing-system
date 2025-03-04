import z from "zod"

export const ticketValidation = z.object({
    title: z.string().nonempty("title should not be empty"),
    description: z.string().nonempty("title is required"),
    category: z.string().nonempty("category is required"),
    status: z.string().nonempty("status is required"),
    priority: z.string().nonempty("priority is required")
})