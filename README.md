# Hanzala04 — Cross-Platform Offline Messenger

> **Clean, modern, offline-first mobile messaging application designed with a signature green and white theme for Android and iPhone.**

---

## 🌟 Live Public Web Application

The production web build of Hanzala04 is deployed and publicly accessible:

- **Live Public URL**: [https://ais-pre-uv2fatdwbypefyfaxzh62j-629144307979.asia-southeast1.run.app](https://ais-pre-uv2fatdwbypefyfaxzh62j-629144307979.asia-southeast1.run.app)
- **Development Preview**: [https://ais-dev-uv2fatdwbypefyfaxzh62j-629144307979.asia-southeast1.run.app](https://ais-dev-uv2fatdwbypefyfaxzh62j-629144307979.asia-southeast1.run.app)

---

## 📱 Core Features

1. **Clean Green & White Interface**: Familiar, responsive mobile design styled with Emerald (`#0F5132` / `#059669` / `#10B981`) and crisp white surfaces.
2. **5 Core App Views**:
   - **Home Screen**: Overview dashboard, local message counters, recent chats, and quick action shortcuts.
   - **Chat List**: Active peer conversations with unread indicators, search filtering, and timestamps.
   - **Conversation Interface**: End-to-end local messaging, photo/document sharing previews, and delivery receipts (`sent`, `delivered`, `read`).
   - **Contacts Screen**: Local contact book with phone numbers, device models, search, and "Add Contact" modal.
   - **Profile Screen**: User display name, mobile number, bio/status, device info, and local data export/reset.
3. **Local Message Storage**: Messages, delivery receipts, and contacts are saved directly in local device storage without requiring internet, login servers, or paid databases.
4. **Zero Gatekeeping**: Opens directly for use without requiring phone SMS OTP verification codes or API credentials.
5. **Clean Architecture**: Stable client code prepared for future native connectivity expansions.
6. **Downloadable Source Code**: Full source code exportable directly in-app or via `Hanzala04-SourceCode.zip`.

---

## 🚀 Free Web Deployment Options

Hanzala04 is pre-configured for 100% free hosting providers with zero credit card required:

### 1. Google AI Studio Live URL (Instant)
The app is immediately live and testable via the production container:
```
https://ais-pre-uv2fatdwbypefyfaxzh62j-629144307979.asia-southeast1.run.app
```

### 2. Vercel Free Hosting (Zero Config)
Configuration included in `vercel.json`:
1. Push repository to GitHub or run `npx vercel`.
2. Vercel automatically detects the Vite SPA framework.
3. Build command: `npm run build`, Output directory: `dist`.
4. Free HTTPS domain provided automatically (e.g. `hanzala04.vercel.app`).

### 3. Netlify Free Hosting (Zero Config)
Configuration included in `netlify.toml`:
1. Drag and drop the `dist/` directory into [app.netlify.com/drop](https://app.netlify.com/drop) or connect your Git repo.
2. Build command: `npm run build`, Publish directory: `dist`.
3. Single-Page Application (SPA) redirect rules (`/*` -> `/index.html 200`) are already defined.

### 4. GitHub Pages (Fixed for blank white screen)
GitHub Pages hosts project sites on subpaths (`https://<username>.github.io/<repo-name>/`).
The repository is now pre-configured so it **never shows a blank white page**:
1. `vite.config.ts` includes `base: './'` to generate relative asset links.
2. `public/.nojekyll` prevents GitHub's Jekyll engine from hiding Vite asset chunks.
3. `public/404.html` ensures clean fallback routing.
4. `.github/workflows/deploy.yml` automatically builds and deploys on every push.

**How to enable on GitHub:**
- Go to your repository on GitHub.
- Click **Settings** ➔ **Pages** (under Code and automation).
- Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
- Push your changes to `main` (or trigger the workflow under the **Actions** tab).
- Your site will deploy within 1–2 minutes without any blank page!

---

## 💻 Local Development Setup

To run Hanzala04 locally:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Compile for production
npm run build
```

---

## 📄 License & Privacy
100% Free & Open Source under the MIT License. No tracking telemetry, no cloud quotas, zero subscription fees.
