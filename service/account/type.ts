export type GetAccountGraphQlResponse = {
    name: string,
    email: string,
    photo_profile_url: string,
    created_dt: string,
    updated_dt: string | null
}

export type UpdateProfileApiParam = {
    name?: string | null, 
    photo_profile?: File | null
}

export type UpdateProfileApiResponse = {
    name: string | null, 
    photo_profile_url: string | null
}