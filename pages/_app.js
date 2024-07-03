import {ReCaptchaProvider} from "next-recaptcha-v3";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import "../styles/styles.scss";
import localFont from "@next/font/local";

const spaceGrotesk = localFont({
    src: [
        {
            path: '../public/fonts/SpaceGrotesk-Regular.ttf',
            weight: '400'
        },
        {
            path: '../public/fonts/SpaceGrotesk-SemiBold.ttf',
            weight: '500'
        },
        {
            path: '../public/fonts/SpaceGrotesk-Bold.ttf',
            weight: '700'
        }
    ],
});

const dmSans = localFont({
    src: [
        {
            path: '../public/fonts/DMSans-Regular.ttf',
            weight: '400',
        },
        {
            path: '../public/fonts/DMSans-Semibold.ttf',
            weight: '400',
        },
        {
            path: '../public/fonts/DMSans-Bold.ttf',
            weight: '700'
        },
    ]
})

function MyApp({ Component, pageProps }) {
  return (
      <>
          <style jsx global>{`
                :root {
                    --font-spacegrotesk: ${spaceGrotesk.style.fontFamily};
                    --font-dmsans: ${dmSans.style.fontFamily}
                }
            `}</style>
          <ReCaptchaProvider>
              <Component {...pageProps} />
          </ReCaptchaProvider>
          <SpeedInsights/>
          <Analytics/>
      </>
  );
}

export default MyApp


