const {I} = inject();
const assert = require('assert');

module.exports = {
    locators: {        
        themeSelector: '//div[@class="navbar__control"]',
        nightThemeValue: '//*[contains(@class, "--night")]',
        origin: '//input[@id="origin"]',
        destination: '//input[@id="destination"]',
        departureDateField: '//div[@class="trip-duration__field --departure"]',       
        tripDurationContent: '//span[@data-test-id="trip-duration-content-title"]',  
        noReturnTicketButton: '//button[@data-test-id="no-return-ticket"]',
        passengersField: '//div[@data-test-id="passengers-field"]',
        adultPassengersIncrement: '//div[@data-test-id="passengers-adults-field"]//a[@class="additional-fields__passenger-control --increment"]',
        searchButton: '//button[@type="submit"]'
    },

    selectNightTheme() {
        I.waitForVisible(this.locators.themeSelector, 10);
        I.click(this.locators.themeSelector);
        I.waitForElement(this.locators.nightThemeValue, 10);
    },

    addRoute(from, to) {
        I.clearField(this.locators.origin);
        I.fillField(this.locators.origin, from);
        I.wait(2);
        I.clearField(this.locators.destination)
        I.fillField(this.locators.destination, to);
    },

    selectDepartureDate(departureDate) {
        I.click(this.locators.departureDateField);
        I.waitForElement(this.locators.tripDurationContent, 10);
        I.click(`//div[@aria-label="${departureDate}"]`);
    }, 

    selectNoReturnTicket() {
        I.click(this.locators.noReturnTicketButton);
        I.waitForInvisible(this.locators.tripDurationContent, 10);
    },

    addPassengers() {
        I.click(this.locators.passengersField);
        I.click(this.locators.adultPassengersIncrement);
        I.waitForElement("//div[contains(text(),'2 passengers')]", 10);
    },

    clickSearchButton() {
        I.click(this.locators.searchButton);
    },

    waitForSearch() {
        I.waitInUrl('/search', 10);
        I.waitForInvisible('//div[@class="search-countdown__title"]', 60);
    },

    verifyDisplayedOrigin(expectedOrigin) {
        const displayedOrigin = I.grabTextFrom(this.locators.origin);
        assert.equal(displayedOrigin, expectedOrigin, "Displayed origin is not the same as previously entered");
    },

    verifyDisplayedDestination(expectedDestination) {
        const displayedDestination = I.grabTextFrom(this.locators.destination);
        assert.equal(displayedDestination, expectedDestination, "Displayed destination is not the same as previously entered");
    },

    verifyDisplayedDate(expectedDate) {
        const displayedDate = I.grabTextFrom(this.locators.departureDateField);
        assert.equal(displayedDate, expectedDate, "Displayed date is not the same as previously entered");
    }
}