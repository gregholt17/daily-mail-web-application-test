import { Browser, BrowserContext, BrowserContextOptions, 
    ElementHandle, Frame, Locator, Page } from "@playwright/test";
import { LocatorOptions, PageWaitForSelectorOptions } from "../interfaces/Playwright";

class BasePage {

    browser: Browser;
    context: BrowserContext;
    page: Page;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    setPage(page: Page) {
        this.page = page;
    }

    async initialiseBasePage(
        contextOptions: BrowserContextOptions = {},
    ): Promise<void> {
        this.context = await this.browser.newContext(contextOptions);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
    }

    async waitForNewPage(): Promise<Page> {
        const page: Page = await this.context.waitForEvent('page');
        return page;
    }

    async waitForAndSetNewPageAsDefault(): Promise<void> {
        const newPage: Page = await this.context.waitForEvent('page');
        this.page = newPage;
    }

    async bringPageToFront(page: Page): Promise<void> {
        try {
            await this.page.bringToFront();
        } catch (error) {
            throw new Error(`Failed bringing page to front` + 
                ` - Error:\n${error.message}>`);
        }
    }

    async bringCurrentPageToFront(): Promise<void> {
        await this.bringPageToFront(this.page);
    }

    async pageSleep(timeout: number): Promise<void> {
        await this.page.waitForTimeout(timeout);
    }

    getLocator(
        selector: string, 
        locatorOptions: LocatorOptions = {},
    ): Locator {
        let theParent: any;
        const { parent } = locatorOptions;
        let locator: Locator;
        if (parent) {
            theParent = parent;
            locator = theParent.locator(selector, locatorOptions);
        } else {
            locator = this.page.locator(selector, locatorOptions);
        }
        return locator;
    }

    async clickElement(
        elementIdentifier: string | Locator | ElementHandle,
        locatorOptions: LocatorOptions = {},
    ): Promise<void> {
        if (typeof elementIdentifier === 'string') {
            const locator: Locator = this.getLocator(
                elementIdentifier,
                locatorOptions
            );
            elementIdentifier = locator;
        }
        try {
            await elementIdentifier.click();
        } catch (error) {
            throw new Error(`Failed clicking element` + 
                ` - Error:\n${error.message}`);
        }
    }

    async pressKey(key: string): Promise<void> {
        try {
            await this.page.keyboard.press(key);
        } catch (error) {
            console.error(`Failed pressing key: \`${key}\`` + 
                ` - Error:\n${error.message}`);
        }
    }

    async typeText(text: string): Promise<void> {
        try {
            await this.page.keyboard.type(text);
        } catch (error) {
            console.error(`Failed typing text: \`${text}\`` + 
                ` - Error:\n${error.message}`);
        }
    }

    async goTo(url: string): Promise<void> {
        try {
            await this.page.goto(url);
        } catch (error) {
            throw new Error(`Failed going to URL: \`${url}\`` + 
                ` - Error:\n${error.message}`);
        }
    }

    async closeContext(): Promise<void> {
        try {
            await this.context.close();
        } catch (error) {
            console.error(`Failed closing browser context` + 
                ` - Error:\n${error.message}>`);
        }
    }

    async closeBrowser(): Promise<void> {
        try {
            await this.page.close();
            await this.browser.close();
        } catch (error) {
            console.error(`Failed closing browser` + 
                ` - Error:\n${error.message}>`);
        }
    }

    async waitForElement(
        elementIdentifier: string | Locator, 
        selectorOptions: PageWaitForSelectorOptions = {}
    ): Promise<void> {
        if (typeof elementIdentifier === 'string') {
            const locator: Locator = this.getLocator(elementIdentifier);
            elementIdentifier = locator;
        }
        if (!selectorOptions) {
            selectorOptions = {
                state: "visible",
                strict: true,
                timeout: 1000
            };
        }
        try {
            await elementIdentifier.waitFor(selectorOptions);
        } catch (error) {
            throw new Error(`Failed waiting for locator element` + 
                ` - Error:\n${error.message}`);
        }
    }

    async maximisePage(): Promise<void> {
        await this.page.evaluate(() => {
            window.innerWidth = window.screen.availWidth;
            window.innerHeight = window.screen.availHeight
        });
    }

    async scrollIntoViewIfNeeded(
        placeholder: string | Locator | ElementHandle,
        locatorOptions: LocatorOptions = {},
    ): Promise<void> {
        if (typeof placeholder === 'string') {
            const locator = this.getLocator(placeholder, locatorOptions);
            placeholder = locator;
        }
        await placeholder.scrollIntoViewIfNeeded();
    }

    async pageRefresh(): Promise<void> {
        await this.page.reload();
    }

}

export { BasePage };