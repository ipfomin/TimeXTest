module.exports = {
  src_folders: ['tests'],

  output_folder : './reports',

  webdriver: {
    start_process: true,
    server_path: 'node_modules/.bin/chromedriver',
    port: 9515
  },

  test_settings : {
    default : {
      launch_url: "https://exchange.tp.ntr1x.com",
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["window-size=1366,1024", "disable-web-security", "test-type"]
        }
      }
    }
  }
}