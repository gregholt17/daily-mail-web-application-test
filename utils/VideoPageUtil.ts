import { Browser, chromium } from "@playwright/test";
import { VideoPage } from "../pages/Video";

class VideoPageUtil {

    static async mainVideoSetup(browser: Browser): Promise<VideoPage> {
        const videoPage = new VideoPage(browser);
        await videoPage.initialiseVideoPage();
        await videoPage.waitForSmallVideo();
        await videoPage.closeSmallVideo();
        await videoPage.scrollToMainVideo();
        return videoPage;
    }

}

export { VideoPageUtil }