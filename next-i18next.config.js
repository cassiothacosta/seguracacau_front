module.exports = {
    i18n: {
      defaultLocale: 'ptbr',
      locales: ['ptbr', 'en'],
      localeDetection: false
    },
    localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',

  reloadOnPrerender: process.env.NODE_ENV === 'development',

  }