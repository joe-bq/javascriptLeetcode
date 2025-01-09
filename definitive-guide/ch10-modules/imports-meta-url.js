// 可以通过import.meta.url 的方式获取当前模块的 URL
function localStringsUrl(locale) { 
    return new URL(`./i18n/${locale}.json`, import.meta.url);
}