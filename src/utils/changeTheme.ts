import { light, dark } from "../style/theme";
import cssVars from "css-vars-ponyfill";
const initTheme = (theme: string) => {
  cssVars({
    watch: true,
    variables: theme === "light" ? light : dark,
    onlyLegacy: true, // 需要设置为true，说明cssVarsPonyfill只会在不支持css变量的浏览器上运行，而在支持变量的浏览器上不做操作
  });
};
export default initTheme;
