# Deploying to Vercel

Since your code is now on GitHub, deploying to Vercel is straightforward.

## Prerequisites
- A [Vercel Account](https://vercel.com/signup).
- Your GitHub repository URL: `https://github.com/rootkitexe/SAAMA`

## Step-by-Step Guide

### 1. Import Project
1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Import"** next to your `SAAMA` repository.

### 2. Configure Project
1.  **Framework Preset**: Next.js (should be auto-detected).
2.  **Root Directory**: `./` (default).
3.  **Environment Variables** (CRITICAL):
    Expand the "Environment Variables" section and add the keys from your `.env.local` file:
    
    | Key | Value |
    | :--- | :--- |
    | `NEXT_PUBLIC_SUPABASE_URL` | `https://ofgoaeppmtbtncwyvnxl.supabase.co` |
    | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_cgA4owA1FufE6-x_uneKcg_A6siOCxt` |

    *Note: You can copy-paste the entire content of `.env.local` into the first field, and Vercel will parse it automatically.*

### 3. Deploy
1.  Click **"Deploy"**.
2.  Wait for the build to complete (usually 1-2 minutes).
3.  Once finished, you will get a live URL (e.g., `saama.vercel.app`).

### 4. Post-Deployment (Supabase)
**Important**: You need to update your Supabase Auth settings to allow the new Vercel URL.
1.  Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Navigate to **Authentication** -> **URL Configuration**.
3.  Add your new Vercel URL (e.g., `https://saama.vercel.app`) to **Site URL** or **Redirect URLs**.
    *   *If you don't do this, login will fail on the live site.*

## Done!
Your site is now live! 🚀
