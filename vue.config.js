module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/lucky-draw' : '/',
    outputDir: 'docs', // 指定打包輸出到 docs 文件夾
};
