import { Browser, chromium, expect } from '@playwright/test';
import { VideoPageUtil } from '../utils/VideoPageUtil';
import { VideoPage } from '../pages/Video';
import { After, BeforeAll, Given, Then, When } from '@cucumber/cucumber';

let browser: Browser;
let videoPage: VideoPage;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Given('I am on the Daily Mail Video Page', async function () {
    videoPage = await VideoPageUtil.mainVideoSetup(browser);
});

When('I click on the video to begin playback', async function () {
    await videoPage.playMainVideoViaBigButton();
    await videoPage.toggleMainVideoPlayback();
});

When('I click on the next video button', async function () {
    await videoPage.playMainVideoNextVideo();
});

When('I click on the previous video button', async function () {
    await videoPage.playMainVideoPreviousVideo();
});
  
When('I click the video again to pause playback', async function () {
    await videoPage.toggleMainVideoPlayback();
});
  
When('I toggle the main video speaker to mute', async function () {
    await videoPage.toggleMainVideoSpeaker();
});
  
Then('the video should start playing', async function () {
    // Implement code to verify that the video is playing
});
  
Then('the next video should be selected', async function () {
    // Implement code to verify that the next video is selected
});
  
Then('the previous video should be selected', async function () {
    // Implement code to verify that the previous video is selected
});
  
Then('the video should pause', async function () {
    // Implement code to verify that the video is paused
});
  
Then('the main video volume should be {int}', async function (volume: number) {
    const actualVolume = await videoPage.getMainVideoVolume();
    expect(actualVolume).toStrictEqual(volume);
});
  
After('Close browser', async function() {
    await videoPage.closeBrowser();
});
  
