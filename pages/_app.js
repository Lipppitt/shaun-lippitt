import {ReCaptchaProvider} from "next-recaptcha-v3";
import "../styles/styles.scss";
function MyApp({ Component, pageProps }) {
  return (
      <ReCaptchaProvider>
        <Component {...pageProps} />
      </ReCaptchaProvider>
  );
}

export default MyApp


