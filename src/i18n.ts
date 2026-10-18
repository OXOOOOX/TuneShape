// Small example adapter. The online editor's localization system is not distributed.
const labels:Record<string,string>={'项目阶段演示':'Project stages'};
export const t=(text:string)=>labels[text]??text;
export const useLanguage=()=> 'en' as const;
