import { isElementAccessExpression } from 'typescript';
import { z } from 'zod';


export const loginBodySchema = z.object({
    email:z.email()  
})

export const registerBodySchema = z.object({
    given_name:z.string().min(1),
    family_name:z.string().min(1),
    birth_date:z.coerce.date()
}) 


export const codeBodySchema = z.object({   
    code:z.string().min(5)
})


export const accommodationCreateSchema = z.object({
    
})



