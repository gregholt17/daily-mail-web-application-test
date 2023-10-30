import { Browser, chromium } from "@playwright/test";
import { ENV_VARS } from "../env";

const {
    BROWSERSTACK_CAPS,
    EXECUTION_TYPE,
    EXECUTION_HEADLESS
} = ENV_VARS;

class BrowserStackUtil {

    static getBrowser = async (): Promise<Browser> => {
        if (EXECUTION_TYPE === "LOCAL") {
            if (EXECUTION_HEADLESS) {
                console.log(`Running tests locally (headless)...`);
            } else {
                console.log(`Running tests locally (headed)...`);
            }
            return await chromium.launch({ headless: EXECUTION_HEADLESS });
        } else if (EXECUTION_TYPE === "BROWSERSTACK") {
            console.log(`Running tests on BrowserStack...`);
            return await chromium.connect({
                wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(BROWSERSTACK_CAPS))}`,
            });
        } else {
            throw new Error(`Unknown EXECUTION_TYPE`);
        }
    }

}

export { BrowserStackUtil };