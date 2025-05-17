module.exports = {
  resolve: {
    alias: {
      'react/jsx-runtime': path.resolve(__dirname, 'src/jsx-runtime-shim.js')
    }
  }
};