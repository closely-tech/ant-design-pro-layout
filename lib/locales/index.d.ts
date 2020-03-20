declare const locales: {
    'zh-CN': {
        'app.setting.pagestyle': string;
        'app.setting.pagestyle.dark': string;
        'app.setting.pagestyle.light': string;
        'app.setting.content-width': string;
        'app.setting.content-width.fixed': string;
        'app.setting.content-width.fluid': string;
        'app.setting.themecolor': string;
        'app.setting.themecolor.dust': string;
        'app.setting.themecolor.volcano': string;
        'app.setting.themecolor.sunset': string;
        'app.setting.themecolor.cyan': string;
        'app.setting.themecolor.green': string;
        'app.setting.themecolor.daybreak': string;
        'app.setting.themecolor.geekblue': string;
        'app.setting.themecolor.purple': string;
        'app.setting.navigationmode': string;
        'app.setting.sidemenu': string;
        'app.setting.topmenu': string;
        'app.setting.fixedheader': string;
        'app.setting.fixedsidebar': string;
        'app.setting.fixedsidebar.hint': string;
        'app.setting.hideheader': string;
        'app.setting.hideheader.hint': string;
        'app.setting.othersettings': string;
        'app.setting.weakmode': string;
        'app.setting.copy': string;
        'app.setting.loading': string;
        'app.setting.copyinfo': string;
        'app.setting.production.hint': string;
    };
    'zh-TW': {
        'app.setting.pagestyle': string;
        'app.setting.pagestyle.dark': string;
        'app.setting.pagestyle.light': string;
        'app.setting.content-width': string;
        'app.setting.content-width.fixed': string;
        'app.setting.content-width.fluid': string;
        'app.setting.themecolor': string;
        'app.setting.themecolor.dust': string;
        'app.setting.themecolor.volcano': string;
        'app.setting.themecolor.sunset': string;
        'app.setting.themecolor.cyan': string;
        'app.setting.themecolor.green': string;
        'app.setting.themecolor.daybreak': string;
        'app.setting.themecolor.geekblue': string;
        'app.setting.themecolor.purple': string;
        'app.setting.navigationmode': string;
        'app.setting.sidemenu': string;
        'app.setting.topmenu': string;
        'app.setting.fixedheader': string;
        'app.setting.fixedsidebar': string;
        'app.setting.fixedsidebar.hint': string;
        'app.setting.hideheader': string;
        'app.setting.hideheader.hint': string;
        'app.setting.othersettings': string;
        'app.setting.weakmode': string;
        'app.setting.copy': string;
        'app.setting.loading': string;
        'app.setting.copyinfo': string;
        'app.setting.production.hint': string;
    };
    'en-US': {
        'app.setting.pagestyle': string;
        'app.setting.pagestyle.dark': string;
        'app.setting.pagestyle.light': string;
        'app.setting.content-width': string;
        'app.setting.content-width.fixed': string;
        'app.setting.content-width.fluid': string;
        'app.setting.themecolor': string;
        'app.setting.themecolor.dust': string;
        'app.setting.themecolor.volcano': string;
        'app.setting.themecolor.sunset': string;
        'app.setting.themecolor.cyan': string;
        'app.setting.themecolor.green': string;
        'app.setting.themecolor.daybreak': string;
        'app.setting.themecolor.geekblue': string;
        'app.setting.themecolor.purple': string;
        'app.setting.navigationmode': string;
        'app.setting.sidemenu': string;
        'app.setting.topmenu': string;
        'app.setting.fixedheader': string;
        'app.setting.fixedsidebar': string;
        'app.setting.fixedsidebar.hint': string;
        'app.setting.hideheader': string;
        'app.setting.hideheader.hint': string;
        'app.setting.othersettings': string;
        'app.setting.weakmode': string;
        'app.setting.copy': string;
        'app.setting.loading': string;
        'app.setting.copyinfo': string;
        'app.setting.production.hint': string;
    };
    'it-IT': {
        'app.setting.pagestyle': string;
        'app.setting.pagestyle.dark': string;
        'app.setting.pagestyle.light': string;
        'app.setting.content-width': string;
        'app.setting.content-width.fixed': string;
        'app.setting.content-width.fluid': string;
        'app.setting.themecolor': string;
        'app.setting.themecolor.dust': string;
        'app.setting.themecolor.volcano': string;
        'app.setting.themecolor.sunset': string;
        'app.setting.themecolor.cyan': string;
        'app.setting.themecolor.green': string;
        'app.setting.themecolor.daybreak': string;
        'app.setting.themecolor.geekblue': string;
        'app.setting.themecolor.purple': string;
        'app.setting.navigationmode': string;
        'app.setting.sidemenu': string;
        'app.setting.topmenu': string;
        'app.setting.fixedheader': string;
        'app.setting.fixedsidebar': string;
        'app.setting.fixedsidebar.hint': string;
        'app.setting.hideheader': string;
        'app.setting.hideheader.hint': string;
        'app.setting.othersettings': string;
        'app.setting.weakmode': string;
        'app.setting.copy': string;
        'app.setting.loading': string;
        'app.setting.copyinfo': string;
        'app.setting.production.hint': string;
    };
};
export declare type localeType = keyof typeof locales;
declare const getLanguage: () => string;
export { getLanguage };
declare const _default: (locale?: "zh-CN" | "zh-TW" | "en-US" | "it-IT" | undefined) => {
    [key: string]: string;
};
export default _default;
