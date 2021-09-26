//https://www.npmjs.com/package/@nuxtjs/imagemin
export default {
    enableInDev: true,
    plugins: [
        ['gifsicle', { interlaced: true }],
        ['jpegtran', { progressive: true }],
        ['optipng', { optimizationLevel: 5 }],
        ['svgo', { plugins: [{ removeViewBox: false }] }]
    ]
}