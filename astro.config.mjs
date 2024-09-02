import { defineConfig, passthroughImageService } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    icon(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
