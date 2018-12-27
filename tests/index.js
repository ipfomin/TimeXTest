const WAIT_FOR_LOADED = 10000
const PAUSE = 1000

const URL = 'https://exchange.tp.ntr1x.com/'

// Selectors
const SUBMIT_SELECTOR = '[data-selenium-id="submit"]'
const CANCEL_SELECTOR = '[data-selenium-id="cancel"]'

// Errors
const ACCOUNT_NAME_REQUIRED = 'Account Name is a required field'
const PASSWORD_REQUIRED = 'Password is a required field'
const PASSWORD_CONFIRMATION_REQUIRED = 'Password Confirmation is a required field'
const PASSWORD_CONFIRMATION_SHOULD_BE_EQUAL_TO_PASSWORD = 'Password Confirmation should be equal to Password'

const ACCOUNT_NAME = '123'
const PASSWORD = 'qwerty'
const INCORRECT_PASSWORD = 'qwert'

module.exports = {
  'Create an account' : function (browser) {
    const mnemonic = {}

    browser
      .url(URL)
      .waitForElementVisible('[data-selenium-id="create"]', WAIT_FOR_LOADED)
      .click('[data-selenium-id="create"]')
      .pause(PAUSE)
      .waitForElementVisible('[data-selenium-id="name"]', WAIT_FOR_LOADED)
      .waitForElementVisible('[data-selenium-id="password"]', WAIT_FOR_LOADED)
      .waitForElementVisible('[data-selenium-id="confirmation"]', WAIT_FOR_LOADED)
      .waitForElementVisible(SUBMIT_SELECTOR, WAIT_FOR_LOADED)
      .click(SUBMIT_SELECTOR)
      .pause(PAUSE)

    // check input account name field
    inputDataFieldWithCheck(browser, 'name', ACCOUNT_NAME, ACCOUNT_NAME_REQUIRED)
    // check input password field
    inputDataFieldWithCheck(browser, 'password', PASSWORD, PASSWORD_REQUIRED)
    
    browser
      // check input password confirmation field
      .waitForElementVisible('[data-selenium-id="confirmation"] div .underline-text', WAIT_FOR_LOADED)
      .assert.containsText('[data-selenium-id="confirmation"] div .underline-text', PASSWORD_CONFIRMATION_REQUIRED)
      .pause(PAUSE)
      .setValue('[data-selenium-id="confirmation"] div input', INCORRECT_PASSWORD)
      .pause(PAUSE)
      .assert.containsText('[data-selenium-id="confirmation"] div .underline-text', PASSWORD_CONFIRMATION_SHOULD_BE_EQUAL_TO_PASSWORD)
      .clearValue('[data-selenium-id="confirmation"] div input')
      .pause(PAUSE)
      .setValue('[data-selenium-id="confirmation"] div input', PASSWORD)
      .pause(PAUSE)
      .assert.elementNotPresent('[data-selenium-id="confirmation"] div .underline-text')
      // click submit
      .click(SUBMIT_SELECTOR)
      .pause(PAUSE)
      // get mnemonic
      .waitForElementVisible('.root-mnemonic-field .content', WAIT_FOR_LOADED)
      .getText('.root-mnemonic-field .content', content => {
        mnemonic.value = content.value.trim()
      })
      .waitForElementVisible(SUBMIT_SELECTOR, WAIT_FOR_LOADED)
      .click(SUBMIT_SELECTOR)

      // input mnemonic
      .waitForElementVisible('.root-mnemonic-confirm-partial', WAIT_FOR_LOADED)
      .waitForElementVisible(SUBMIT_SELECTOR, WAIT_FOR_LOADED)
      .perform((done) => {
        mnemonic.value.split(' ').forEach(word => {
          browser
            .waitForElementVisible(`[data-selenium-value="${word}"]`, WAIT_FOR_LOADED)
            .click(`[data-selenium-value="${word}"]`)
        })
        done()
      })
      // click submit
      .pause(PAUSE)
      .click(SUBMIT_SELECTOR)
      // next
      .waitForElementVisible('.root-wallet-backup-partial', WAIT_FOR_LOADED)
      .waitForElementVisible(SUBMIT_SELECTOR, WAIT_FOR_LOADED)
      .pause(PAUSE)
      .click(SUBMIT_SELECTOR)
      // next
      .waitForElementVisible('.root-api-keys-welcom-page', WAIT_FOR_LOADED)
      .waitForElementVisible(CANCEL_SELECTOR, WAIT_FOR_LOADED)
      .pause(PAUSE)
      .click(CANCEL_SELECTOR)
       // if root-private-page is current page, test done
      .waitForElementVisible('.root-private-page', WAIT_FOR_LOADED)
      .pause(PAUSE)

      .end();
  }
};

function inputDataFieldWithCheck(browser, fieldName, data, expectError) {
  browser
    .waitForElementVisible(`[data-selenium-id="${fieldName}"] div .underline-text`, WAIT_FOR_LOADED)
    .assert.containsText(`[data-selenium-id="${fieldName}"] div .underline-text`, expectError)
    .pause(PAUSE)
    .setValue(`[data-selenium-id="${fieldName}"] div input`, data)
    .pause(PAUSE)
    .assert.elementNotPresent(`[data-selenium-id="${fieldName}"] div .underline-text`)
}
