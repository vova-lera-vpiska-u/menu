const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/assets`

export const getAssetUrl = (fileName: string): string => `${STORAGE_BASE}/${fileName}`
