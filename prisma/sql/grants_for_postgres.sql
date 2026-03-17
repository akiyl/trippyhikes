-- Grants for application role (generated)
-- Replace the role name below if your app uses a different DB user.

GRANT USAGE ON SCHEMA public TO "postgres";
GRANT SELECT ON ALL TABLES IN SCHEMA public TO "postgres";
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO "postgres";

-- Ensure future tables/sequences created in this schema inherit privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO "postgres";

-- If your tables use Row Level Security (RLS), add policies instead of broad grants.
