import { Browser, ElementHandle, Locator } from "@playwright/test";
import { BasePage } from "./Base";

type VideoPageWebElement = 
    "closeSmallVideoButton" | 
    "cookiesGotItButton" | 
    "mainVideoDiv" | 
    "mainVideoBigPlayButton" | 
    "mainVideoControlBar" | 
    "mainVideoPreviousVideoButton" | 
    "mainVideoPlayPauseVideoButton" |
    "mainVideoNextVideoButton" | 
    "mainVideoFullScreenButton" | 
    "mainVideoSpeakerButton" | 
    "sportMenuButton";

class VideoPage extends BasePage {

    mainVideoSoundEnabled: boolean = true;

    VIDEO_PAGE_URL: string = "https://www.dailymail.co.uk/video/index.html";

    videoTitleLocator: Locator;

    webElements: Record<VideoPageWebElement,{
        selector: string,
        findType: string,
        locator: Locator | undefined
    }> = {
        closeSmallVideoButton: {
            selector: "#closeButton",
            findType: "selector",
            locator: undefined,
        },
        cookiesGotItButton: {
            selector: "Got it",
            findType: "byText",
            locator: undefined,
        },
        mainVideoDiv: {
            selector: "#vjs_video_3",
            findType: "selector",
            locator: undefined,
        },
        mainVideoBigPlayButton: {
            selector: "div.vjs-big-play-button",
            findType: "selector",
            locator: undefined,
        },
        mainVideoControlBar: {
            selector: "div.vjs-control-bar",
            findType: "selector",
            locator: undefined,
        },
        mainVideoPreviousVideoButton: {
            selector: "div.mol-previous-control.vjs-control",
            findType: "selector",
            locator: undefined,
        },
        mainVideoPlayPauseVideoButton: {
            selector: "div.vjs-play-control.vjs-control",
            findType: "selector",
            locator: undefined,
        },
        mainVideoNextVideoButton: {
            selector: "div.mol-skip-control.vjs-control",
            findType: "selector",
            locator: undefined,
        },
        mainVideoFullScreenButton: {
            selector: "div.vjs-fullscreen-control.vjs-control",
            findType: "selector",
            locator: undefined,
        },
        mainVideoSpeakerButton: {
            selector: "div.vjs-volume-menu-button.vjs-menu-button.vjs-control",
            findType: "selector",
            locator: undefined,
        },
        sportMenuButton: {
            selector: "li.sport",
            findType: "selector",
            locator: undefined,
        }
    }

    constructor(browser: Browser) {
        super(browser);
    }

    async initialiseVideoPage() {
        await this.initialiseBasePage();
        this.page = await this.context.newPage();
        await this.page.goto(this.VIDEO_PAGE_URL);
        // await this.waitForPageLoad();
        await this.pageSleep(2000);
        this.initialisePageLocators();
        await this.cookiesGotIt();
    }

    initialisePageLocators() {
        for (const [key, value] of Object.entries(this.webElements)) {
            const { selector, findType } = value;
            if (findType === "selector") {
                this.webElements[key].locator = this.page.locator(selector);
            } else if (findType === "byText") {
                this.webElements[key].locator = this.page.getByText(selector);
            }
        };
        // this.closeSmallVideoButton = this.page.locator(this.closeSmallVideoButtonSelector);
        // this.cookiesGotItButton = this.page.getByText(this.cookiesGotItText);
        // this.mainVideoDiv = this.page.locator(this.mainVideoDivSelector);
        // this.mainVideoBigPlayButton = this.page.locator()
        this.videoTitleLocator = this.page
            .locator('div.vjs-title-text')
            .locator('xpath=./div') as Locator;
        console.log(`Page locators initialised.`);
    }

    async cookiesGotIt() {
        try {
            const locator: Locator = this.webElements.cookiesGotItButton.locator as Locator;
            await locator.click({ timeout: 5000 });
            console.log(`Clicked cookies got it button.`);
        } catch (error) {
            throw new Error(`Failed clicking \`Got it\` for cookies prompt` + 
                ` - Error:\n${error.message}`);
        }
    }

    async waitForSmallVideo() {
        try {
            const locator: Locator = this.webElements.closeSmallVideoButton.locator as Locator;
            await locator.waitFor({ state: "visible", timeout: 10000 });
            return true;
        } catch (error) {
            console.error(`Failed waiting for small video close button.`);
        }
        try {
            const footballLocator: Locator = this.page.locator('div.footballco-close-button');
            await footballLocator.waitFor({ state: "visible", timeout: 10000 });
            return true;
        } catch (error) {
            console.error(`Failed waiting for football small video close button.`);
        }
        return false;
    }

    async closeSmallVideo() {
        try {
            const locator: Locator = this.webElements.closeSmallVideoButton.locator as Locator;
            await locator.click({ timeout: 5000 });
            console.log(`Closed small video.`);
        } catch (error) {
            console.error(`Failed closing small video`);
        }
        try {
            const footballLocator: Locator = this.page.locator('div.footballco-close-button');
            await footballLocator.click({ timeout: 5000 });
            console.log(`Closed football small video.`);
        } catch (error) {
            console.error(`Failed closing football small video`);
        }
    }

    async scrollToMainVideo() {
        try {
            const locator: Locator = this.webElements.mainVideoDiv.locator as Locator;
            await locator.scrollIntoViewIfNeeded({ timeout: 10000 });
        } catch (error) {
            throw new Error(`Failed scrolling main video into view - Error:\n${error.message}`);
        }
    }

    async playMainVideoViaBigButton() {
        try {
            const locator: Locator = this.webElements.mainVideoBigPlayButton.locator as Locator;
            await locator.click({ timeout: 10000 });
        } catch (error) {
            throw new Error(`Failed playing main video - Error:\n${error.message}`);
        }
    }

    async toggleMainVideoPlayback() {
        try {
            const locator: Locator = this.webElements.mainVideoPlayPauseVideoButton.locator as Locator;
            await locator.click({ timeout: 10000 });
            console.log(`Toggled main video playback.`);
        } catch (error) {
            throw new Error(`Failed pausing main video - Error:\n${error.message}`);
        }
    }

    async playMainVideoNextVideo() {
        try {
            const locator: Locator = this.webElements.mainVideoNextVideoButton.locator as Locator;
            await locator.click({ timeout: 10000 });
            console.log(`Selected next video.`);
        } catch (error) {
            throw new Error(`Failed playing next video - Error:\n${error.message}`);
        }
    }

    async waitForVideoTitle() {
        await this.videoTitleLocator.waitFor({ state: 'visible', timeout: 5000 });
    }

    async getVideoTitle() {
        try {
            await this.waitForVideoTitle();
            const videoTitle = await this.videoTitleLocator.innerText({ timeout: 10000 });
            return videoTitle;
        } catch (error) {
            throw new Error(`Failed getting video title - Error:\n${error.message}`);
        }
    }

    async playMainVideoPreviousVideo() {
        try {
            const locator: Locator = this.webElements.mainVideoPreviousVideoButton.locator as Locator;
            await locator.click({ timeout: 10000 });
            console.log(`Selected previous video.`);
        } catch (error) {
            throw new Error(`Failed playing previous video - Error:\n${error.message}`);
        }
    }

    async getMainVideoVolume(): Promise<number> {
        try {
            const locator: Locator = this.webElements.mainVideoSpeakerButton.locator as Locator;
            const mainVideoClass = await locator.getAttribute('class');
            const classArr: string[] | undefined = mainVideoClass?.split(" ");
            let volumeClass: string;
            if (classArr) {
                volumeClass = classArr[classArr.length-1];
            } else {
                throw new Error(`Error splitting class.`);
            }
            return parseInt(volumeClass.replace("vjs-vol-",""));
        } catch (error) {
            throw new Error(`Failed getting main video volume - Error:\n${error.message}`);
        }
    }

    async toggleMainVideoSpeaker(options: { showLogs?: boolean } = {}) {
        const { showLogs = true } = options;
        try {
            const locator: Locator = this.webElements.mainVideoSpeakerButton.locator as Locator;
            await locator.click({ timeout: 5000 });
            if (this.mainVideoSoundEnabled) {
                this.mainVideoSoundEnabled = false;
                if (showLogs) {
                    console.log(`Main video sound disabled.`);
                }
            } else {
                this.mainVideoSoundEnabled = true;
                if (showLogs) {
                    console.log(`Main video sound enabled.`);
                }
            }
        } catch (error) {
            throw new Error(`Failed toggling video speaker - Error:\n${error.message}`);
        }
    }

    async selectSportPage() {
        try {
            const locator: Locator = this.page
                .locator('li')
                .filter({ hasText: 'Sport' })
                .first();
            await locator.click({ timeout: 10000 });
        } catch (error) {
            throw new Error(`Failed selecting sport page - Error:\n${error.message}`);
        }
    }

}

export { VideoPage };