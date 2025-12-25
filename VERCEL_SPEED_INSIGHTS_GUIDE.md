# Getting started with Speed Insights 🚀

This guide will help you get started with using Vercel Speed Insights on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed. If you don't have it, you can install it using the following command:

```bash
# Using pnpm
pnpm i vercel

# Using yarn
yarn i vercel

# Using npm
npm i vercel

# Using bun
bun i vercel
```

## Step-by-Step Setup

### 1. Enable Speed Insights in Vercel

On the [Vercel dashboard](/dashboard), select your Project followed by the **Speed Insights** tab. You can also select the button below to be taken there. Then, select **Enable** from the dialog.

> **💡 Note:** Enabling Speed Insights will add new routes (scoped at`/_vercel/speed-insights/*`) after your next deployment.

### 2. Add `@vercel/speed-insights` to your project

Using the package manager of your choice, add the `@vercel/speed-insights` package to your project:

```bash
# Using pnpm
pnpm i @vercel/speed-insights

# Using yarn
yarn i @vercel/speed-insights

# Using npm
npm i @vercel/speed-insights

# Using bun
bun i @vercel/speed-insights
```

> **💡 Note:** If you're using plain HTML without a framework, there is no need to install the `@vercel/speed-insights` package. See the [HTML](#for-html) section for instructions.

### 3. Add the `SpeedInsights` component to your app

The implementation varies based on your framework. Choose the appropriate section below:

#### For React (Create React App or Vite)

The `SpeedInsights` component is a wrapper around the tracking script, offering more seamless integration with React.

Add the following component to your main app file:

**TypeScript (App.tsx):**
```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div>
      {/* ... your app content ... */}
      <SpeedInsights />
    </div>
  );
}
```

**JavaScript (App.jsx):**
```jsx
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <div>
      {/* ... your app content ... */}
      <SpeedInsights />
    </div>
  );
}
```

#### For Next.js (Pages Router)

The `SpeedInsights` component is a wrapper around the tracking script, offering more seamless integration with Next.js.

Add the following component to your main app file:

**TypeScript (pages/_app.tsx):**
```tsx
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
```

**JavaScript (pages/_app.jsx):**
```jsx
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
```

For versions of Next.js older than 13.5, import the `<SpeedInsights>` component from `@vercel/speed-insights/react`. Then pass it the pathname of the route:

**TypeScript (pages/example-component.tsx):**
```tsx
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useRouter } from "next/router";

export default function Layout() {
  const router = useRouter();

  return <SpeedInsights route={router.pathname} />;
}
```

**JavaScript (pages/example-component.jsx):**
```jsx
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useRouter } from "next/router";

export default function Layout() {
  const router = useRouter();

  return <SpeedInsights route={router.pathname} />;
}
```

#### For Next.js (App Router)

The `SpeedInsights` component is a wrapper around the tracking script, offering more seamless integration with Next.js.

Add the following component to the root layout:

**TypeScript (app/layout.tsx):**
```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**JavaScript (app/layout.jsx):**
```jsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

For versions of Next.js older than 13.5, create a dedicated component to avoid opting out from SSR on the layout and pass the pathname of the route to the `SpeedInsights` component:

**TypeScript (app/insights.tsx):**
```tsx
"use client";

import { SpeedInsights } from "@vercel/speed-insights/react";
import { usePathname } from "next/navigation";

export function Insights() {
  const pathname = usePathname();

  return <SpeedInsights route={pathname} />;
}
```

**JavaScript (app/insights.jsx):**
```jsx
"use client";

import { SpeedInsights } from "@vercel/speed-insights/react";
import { usePathname } from "next/navigation";

export function Insights() {
  const pathname = usePathname();

  return <SpeedInsights route={pathname} />;
}
```

Then, import the `Insights` component in your layout:

**TypeScript (app/layout.tsx):**
```tsx
import type { ReactNode } from "react";
import { Insights } from "./insights";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Insights />
      </body>
    </html>
  );
}
```

**JavaScript (app/layout.jsx):**
```jsx
import { Insights } from "./insights";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Insights />
      </body>
    </html>
  );
}
```

#### For Remix

The `SpeedInsights` component is a wrapper around the tracking script, offering a seamless integration with Remix.

Add the following component to your root file:

**TypeScript (app/root.tsx):**
```ts
import { SpeedInsights } from '@vercel/speed-insights/remix';

export default function App() {
  return (
    <html lang="en">
      <body>
        {/* ... your app content ... */}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**JavaScript (app/root.jsx):**
```js
import { SpeedInsights } from "@vercel/speed-insights/remix";

export default function App() {
  return (
    <html lang="en">
      <body>
        {/* ... your app content ... */}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### For SvelteKit

Add the following to your root layout file:

**TypeScript (src/routes/+layout.ts):**
```ts
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

injectSpeedInsights();
```

**JavaScript (src/routes/+layout.js):**
```js
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

injectSpeedInsights();
```

#### For Vue

The `SpeedInsights` component is a wrapper around the tracking script, offering more seamless integration with Vue.

Add the following component to the main app template:

**TypeScript (src/App.vue):**
```vue
<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

**JavaScript (src/App.vue):**
```vue
<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

#### For Nuxt

The `SpeedInsights` component is a wrapper around the tracking script, offering more seamless integration with Nuxt.

Add the following component to the default layout:

**TypeScript (layouts/default.vue):**
```vue
<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

**JavaScript (layouts/default.vue):**
```vue
<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

#### For Astro

Speed Insights is available for both static and SSR Astro apps.

To enable this feature, declare the `<SpeedInsights />` component from `@vercel/speed-insights/astro` near the bottom of one of your layout components, such as `BaseHead.astro`:

**With TypeScript (BaseHead.astro):**
```astro
---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<SpeedInsights />
```

**With JavaScript (BaseHead.astro):**
```astro
---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<SpeedInsights />
```

##### Optional: Removing sensitive information from URLs

Optionally, you can remove sensitive information from the URL by adding a `speedInsightsBeforeSend` function to the global `window` object. The `<SpeedInsights />` component will call this method before sending any data to Vercel:

**With TypeScript (BaseHead.astro):**
```astro
---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<script is:inline>
  function speedInsightsBeforeSend(data){
    console.log("Speed Insights before send", data)
    return data;
  }
</script>
<SpeedInsights />
```

**With JavaScript (BaseHead.astro):**
```astro
---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<script is:inline>
  function speedInsightsBeforeSend(data){
    console.log("Speed Insights before send", data)
    return data;
  }
</script>
<SpeedInsights />
```

[Learn more about `beforeSend`](/docs/speed-insights/package#beforesend).

#### For Other Frameworks

Import the `injectSpeedInsights` function from the package, which will add the tracking script to your app. **This should only be called once in your app, and must run in the client**.

Add the following code to your main app file:

**TypeScript (main.ts):**
```ts
import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();
```

**JavaScript (main.js):**
```js
import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();
```

#### For HTML

Add the following scripts before the closing tag of the `<body>`:

```html
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

### 4. Deploy your app to Vercel

You can deploy your app to Vercel's global [CDN](https://vercel.com/docs/cdn) by running the following command from your terminal:

```bash
vercel deploy
```

Alternatively, you can [connect your project's git repository](https://vercel.com/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest pushes and merges to main.

Once your app is deployed, it's ready to begin tracking performance metrics.

> **💡 Note:** If everything is set up correctly, you should be able to find the `/_vercel/speed-insights/script.js` script inside the body tag of your page.

### 5. View your data in the dashboard

Once your app is deployed, and users have visited your site, you can view the data in the dashboard.

To do so, go to your [dashboard](https://vercel.com/dashboard), select your project, and click the **Speed Insights** tab.

After a few days of visitors, you'll be able to start exploring your metrics. For more information on how to use Speed Insights, see [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights).

---

Learn more about how Vercel supports [privacy and data compliance standards](https://vercel.com/docs/speed-insights/privacy-policy) with Vercel Speed Insights.

## Next steps

Now that you have Vercel Speed Insights set up, you can explore the following topics to learn more:

- [Learn how to use the `@vercel/speed-insights` package](https://vercel.com/docs/speed-insights/package)
- [Learn about metrics](https://vercel.com/docs/speed-insights/metrics)
- [Read about privacy and compliance](https://vercel.com/docs/speed-insights/privacy-policy)
- [Explore pricing](https://vercel.com/docs/speed-insights/limits-and-pricing)
- [Troubleshooting](https://vercel.com/docs/speed-insights/troubleshooting)

## Implementation for this project (ydweb - Vite + React)

Since this project uses **Vite with React**, you should implement Speed Insights as follows:

### Installation

```bash
# Using pnpm (recommended for this project)
pnpm i @vercel/speed-insights

# Or using npm
npm i @vercel/speed-insights
```

### Add SpeedInsights to your App

Update your main App component (`src/App.jsx`):

```jsx
import { SpeedInsights } from '@vercel/speed-insights/react';
// ... other imports ...

function App() {
  return (
    <>
      {/* Your existing app content */}
      
      <SpeedInsights />
    </>
  );
}

export default App;
```

Or, add it to your `src/main.jsx` entry point:

```jsx
import { injectSpeedInsights } from "@vercel/speed-insights";

// Inject Speed Insights early in your app
injectSpeedInsights();

// ... rest of your main.jsx code ...
```

### Enable in Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `ydweb` project
3. Navigate to the **Speed Insights** tab
4. Click **Enable**

### Deploy and Monitor

1. Commit your changes and push to your repository:
   ```bash
   git add .
   git commit -m "Add Vercel Speed Insights"
   git push origin main
   ```

2. Vercel will automatically deploy your changes

3. Once deployed, visit your site and wait for real user metrics to start accumulating

4. After a few hours of traffic, you'll be able to see performance metrics in the Speed Insights dashboard

---

## ✅ Checklist

- [ ] Speed Insights enabled in Vercel Dashboard
- [ ] `@vercel/speed-insights` package installed
- [ ] `SpeedInsights` component added to your React app
- [ ] Changes committed and pushed to main
- [ ] Deployment completed successfully
- [ ] Viewed initial metrics in Speed Insights dashboard

## 🆘 Troubleshooting

### Speed Insights script not loading

**Problem:** The `/_vercel/speed-insights/script.js` is not found in the page HTML.

**Solution:**
1. Make sure Speed Insights is enabled in the Vercel Dashboard
2. Redeploy your project
3. Clear your browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### No data appearing in the dashboard

**Problem:** No metrics showing up even after users visited your site.

**Solution:**
1. Ensure the app is deployed to Vercel (not a local environment)
2. Check that the `SpeedInsights` component is properly integrated
3. Open Developer Console (F12) and check for any errors
4. Wait at least a few hours for data to accumulate
5. Ensure your site is getting actual traffic

### Component integration issues

**Problem:** TypeScript errors or component not recognized.

**Solution:**
1. Make sure the package is properly installed: `pnpm i @vercel/speed-insights`
2. Clear node_modules and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
3. Verify you're importing from the correct path: `@vercel/speed-insights/react`
4. Restart your development server

---

**For more help**, visit the [Speed Insights Documentation](https://vercel.com/docs/speed-insights).
