import resolveConfig from "tailwindcss/resolveConfig";
import tailwinConfig from "../../tailwind.config";

const twConfig = resolveConfig(tailwinConfig);
const mdBrackpoint = Number.parseInt((twConfig.theme?.screens as any).md)

export {mdBrackpoint};