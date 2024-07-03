import {ReCaptchaProvider} from "next-recaptcha-v3";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import "../styles/styles.scss";
function MyApp({ Component, pageProps }) {
  return (
      <>
          <ReCaptchaProvider>
              <Component {...pageProps} />
          </ReCaptchaProvider>
          <SpeedInsights/>
          <Analytics/>
      </>
  );
}

export default MyApp


