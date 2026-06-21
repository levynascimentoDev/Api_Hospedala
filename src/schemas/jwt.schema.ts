import z, { string } from "zod";

export const tempJwtSchema = z.object({
    action:z.enum(["checkout", "complete"]),
    given_name:z.string().min(1).optional(),
    code:z.string().min(5),
    email:z.email()
})


export const accessJwtSchema = z.object({
    user_id:z.number()
})

