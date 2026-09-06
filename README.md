# bosq.app — Landing Page & Setup Guide

This repository contains the landing page for **bosq** (`bosq.app`), designed with a clean, mindful aesthetic featuring Google Fonts' **Marck Script** for branding and titles, and optimized for instant hosting on **GitHub Pages** with custom domain routing.

---

## 🚀 Quick Start (Local Preview)

You can preview the website locally using any static file server:

```powershell
# Using npx serve (recommended)
npx serve .

# Or using Python built-in server
python -m http.server 8000
```
Then open `http://localhost:8000` (or `http://localhost:3000`) in your browser.

---

## 🌐 Step 1: Namecheap DNS Configuration for `bosq.app`

Follow these steps to connect your domain purchased on Namecheap to GitHub Pages:

1. Log in to your [Namecheap Account Dashboard](https://ap.www.namecheap.com/).
2. Go to **Domain List** and click **Manage** next to `bosq.app`.
3. In the **Domain** tab, ensure **Nameservers** is set to **Namecheap BasicDNS** (click the green checkmark to save if changed).
4. Go to the **Advanced DNS** tab.
5. In the **Host Records** section, delete any existing default parking records (e.g. ParkingPage or redirect records), and add the following:

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `185.199.108.153` | Automatic |
| **A Record** | `@` | `185.199.109.153` | Automatic |
| **A Record** | `@` | `185.199.110.153` | Automatic |
| **A Record** | `@` | `185.199.111.153` | Automatic |
| **CNAME Record** | `www` | `<your-github-username>.github.io.` | Automatic |

> ⚠️ Replace `<your-github-username>` with your actual GitHub username (e.g., `dobrygazon.github.io.`). Keep the trailing dot if Namecheap adds it.

---

## 📦 Step 2: Push to GitHub

Initialize the git repository and push to your GitHub account:

```powershell
git init
git add .
git commit -m "feat: initial bosq.app landing page with Marck Script branding and GitHub Pages config"
git branch -M main

# If you create a new repository on GitHub (e.g. named bosqapp or bosqapp-site):
git remote add origin https://github.com/<your-username>/bosqapp-site.git
git push -u origin main
```

---

## ⚙️ Step 3: Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**.
   - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.
   *(Alternatively, select **GitHub Actions** to use the automated `.github/workflows/deploy.yml` workflow included in this repo).*
4. Under **Custom domain**:
   - Verify `bosq.app` is entered (it will automatically read from the `CNAME` file in the repo).
   - Click **Save**.
5. Once DNS propagation finishes (typically 5–30 minutes), check the box **Enforce HTTPS**.

---

## 🎨 Design & Fonts

- **Title & Brand Font**: [Marck Script](https://fonts.google.com/specimen/Marck+Script) (Cursive, elegant, handwritten aesthetic)
- **Body / Interface Font**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Clean, geometric, high legibility)
- **Features**:
  - Dark / Light mode toggle with local storage persistence.
  - Interactive device preview mockup.
  - Interactive feature tabs (Focus Mode, Inspiring Spaces, Deep Reflection, Universal Sync).
  - Smooth FAQ accordion.
  - Responsive mobile drawer navigation.
  - Early access waitlist form with live visual validation.
