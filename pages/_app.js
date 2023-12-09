import AuthProvider from "@/components/Provider/AuthProvider";
import PrivateWrapper from "../components/Wrapper/index";
import "../styles/globals.css";
import { color } from "../theme/theme.config";
import { App as AppProvider, ConfigProvider } from "antd";
import dayjs from "dayjs";
import viVN from "antd/lib/locale/vi_VN";
import "dayjs/locale/vi";
const theme = {
  token: {
    fontsizeBase: "14px",
    fontFamily: "Montserrat",
    colorPrimary: color.primary,
    colorSecondary: color.secondary,
    colorSuccess: color.success,
    colorWarning: color.warning,
    colorError: color.error,
    colorInfo: color.info,
    colorTextBase: color.textBase,
    colorBgBase: color.bgBase,
    colorWhite: color.white,
  },
};

dayjs.locale("vi");

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider theme={theme} locale={viVN}>
      <AppProvider>
        <AuthProvider>
          <PrivateWrapper>
            <Component {...pageProps} />
          </PrivateWrapper>
          {/* <Component {...pageProps} /> */}
        </AuthProvider>
      </AppProvider>
    </ConfigProvider>
  );
}
