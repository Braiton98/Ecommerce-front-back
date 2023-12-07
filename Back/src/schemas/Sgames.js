import z from "zod"

export const Sgames = z.object({

    name: z.string(),
    genres: z.string(),
    description: z.string(),
    platforms: z.string(),
    img: z.string(),
    id: z.number()

})
