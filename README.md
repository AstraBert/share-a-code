# Share-a-Code

Share-a-Code is an application aimed at easing the process of sharing code with your co-workers, students, teachers, candidates or friends!

With support for 11 languages (among which Python, Javascript, TypeScript and HTML), you can write code in the browser or paste it from your favorite IDE, and then create a new project or update an existing one.

To share projects with other people, you just need to copy the code associated to it and send it to someone!

[Sign up](https://app.shareacode.cc) now!

## Developer Guide

If you want to reproduce Share-a-Code, you can do it following these steps:

### 1. Installing

Clone this repository:

```bash
git clone https://github.com/AstraBert/share-a-code
cd share-a-code
```

Install all the needed dependencies:

```bash
npm install
```

### 2. Supabase Configuration

For this project you need [Supabase](https://supabase.com), so make sure to have an account with them or to create one!

Once you have your Supabase account set up, you can first create a table where we will store the code projects using the SQL editor:

```sql
CREATE TABLE code (
    id INT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    code TEXT,
    instructions TEXT DEFAULT NULL,
    shareCode TEXT,
);
```

Then, you need to create three policies (`SELECT`, `INSERT` and `UPDATE`) to allow authenticated users to access the content of this table:

```sql
-- Allow only authenticated users to write the database table
create policy "authenticated can write code"
on "public"."code"
as PERMISSIVE
for INSERT
to authenticated
with check (true);

-- Allow only authenticated users to read the database table
create policy "authenticated can read code"
on "public"."code"
as PERMISSIVE
for SELECT
to authenticated
with check (true);

-- Allow only authenticated users to update the database table
create policy "authenticated can update code"
on "public"."code"
as PERMISSIVE
for UPDATE
to authenticated
with check (true);
```

Now that your table is all set, go to the *Authentication* section in your Supabase dashboard and make sure that both the email authentication provider and the GitHub authentication provider are activated. If GitHub is inactive, follow [this guide](https://supabase.com/docs/guides/auth/social-login/auth-github) to set up a GitHub OAuth application and hook it with Supabase.

Once your Supabase configuration is completed, put the Supabase Project URL and the ANON Key in a `.env` (or `.env.local` for local development) file:

```env
NEXT_PUBLIC_SUPABASE_URL="https://<project-id>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key".
```

### 3. Launch

For local development, you can launch the application using:

```bash
npm run dev
```

If you want a production-ready build, you can use:

```bash
npm run build
npm run start
```

In the case of a production deployment, make sure to add `NEXT_PUBLIC_URL` as an environment variable pointing to the production URL of your application.
