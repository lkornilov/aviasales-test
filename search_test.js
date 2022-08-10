
const searchPage = require("./pages/searchPage");
const assert = require('assert');

Feature('Aviasales ticket search');

Scenario('Search test', async ({ I }) => {
    I.amOnPage("");
    searchPage.selectNightTheme();
    searchPage.addRoute("New York", "Berlin");
    searchPage.selectDepartureDate("Tue Aug 30 2022");
    searchPage.selectNoReturnTicket();
    searchPage.addPassengers();
    searchPage.clickSearchButton();
    searchPage.waitForSearch();
    searchPage.verifyDisplayedOrigin("New York");
    searchPage.verifyDisplayedDestination("Berlin");
    searchPage.verifyDisplayedDate("Tue, August 30");
    let tabs = await I.grabNumberOfOpenTabs();
    assert.equal(tabs, 2);
});