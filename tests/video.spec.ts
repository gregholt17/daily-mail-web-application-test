import { test, expect, Browser, chromium } from '@playwright/test';
import { VideoPageUtil } from '../utils/VideoPageUtil';

let browser: Browser;

test.setTimeout(1000*60*30);

test.beforeAll('Setup', async() => {
    browser = await chromium.launch({ headless: false });
});

test('Play Video', async () => {
    const videoPage = await VideoPageUtil.mainVideoSetup(browser);
    await videoPage.playMainVideoViaBigButton();
    await videoPage.toggleMainVideoPlayback();
    await videoPage.closeContext();
});

test('Next Video', async() => {
    const videoPage = await VideoPageUtil.mainVideoSetup(browser);
    const videoTitleBefore = await videoPage.getVideoTitle();
    console.log(`Video title before pressing next: \`${videoTitleBefore}\``);
    await videoPage.playMainVideoNextVideo();
    await videoPage.pageSleep(3000);
    const videoTitleAfter = await videoPage.getVideoTitle();
    console.log(`Video title after pressing next: \`${videoTitleAfter}\``);
    expect(videoTitleBefore).not.toStrictEqual(videoTitleAfter);
    await videoPage.closeContext();
});

test('Previous Video', async() => {
    const videoPage = await VideoPageUtil.mainVideoSetup(browser);
    await videoPage.playMainVideoPreviousVideo();
    // Pressing previous doesn't do anything in this context - if I could
    // play videos adequately without errors then I would assert the timer
    // element or something else etc.
    await videoPage.closeContext();
});

test('Mute', async() => {
    const videoPage = await VideoPageUtil.mainVideoSetup(browser);
    await videoPage.toggleMainVideoSpeaker();
    expect(await videoPage.getMainVideoVolume()).toStrictEqual(0);
    await videoPage.pageSleep(1000);
    await videoPage.toggleMainVideoSpeaker();
    expect(await videoPage.getMainVideoVolume()).toStrictEqual(3);
    await videoPage.closeContext();
});

test.afterAll('Cleanup', async() => {
    await browser.close();
});