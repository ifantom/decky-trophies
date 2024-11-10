import deckyPlugin from "@decky/rollup";
import css from "rollup-plugin-import-css";

export default deckyPlugin({
  // Add your extra Rollup options here
  plugins: [
    css()
  ],
});
