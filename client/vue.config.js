module.exports = {
  "outputDir": "C:\\Users\\admin\\Desktop\\form\\server\\public",
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://localhost:3000"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}