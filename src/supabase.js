import { createClient } from '@supabase/supabase-js'
 
const SUPABASE_URL = 'https://xzdxulupaesfhelgwdqk.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_jxrzJfjVG6IQOMVlJgkv9A_OVHe5JVy'
 
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
