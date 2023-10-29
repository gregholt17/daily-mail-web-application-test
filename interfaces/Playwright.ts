import { ElementHandle, Frame, Locator, Page } from "playwright";

interface PageWaitForSelectorOptions {
    state?: "attached"|"detached"|"visible"|"hidden";
    strict?: boolean;
    timeout?: number;
}

interface GetByOptions {
    exact?: boolean;
    parentSelector?: string | RegExp;
    parentLocator?: string | RegExp;
}

interface LocatorOptions {
    has?: Locator;
    hasNot?: Locator;
    hasNotText?: string|RegExp;
    hasText?: string|RegExp;
    timeout?: number;
    retries?: number;
    coolOff?: number;
    parent?: string | RegExp | Locator | ElementHandle | Frame | Page;
}

interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface LogOptions {
    showLogs?: boolean,
    logPrefix?: string,
}

interface ScreenshotOptions {
    /**
     * When set to `"disabled"`, stops CSS animations, CSS transitions and 
     * Web Animations. Animations get different treatment depending on 
     * their duration:
     * - finite animations are fast-forwarded to completion, so they'll 
     * fire `transitionend` event.
     * - infinite animations are canceled to initial state, and then played
     * over after the screenshot.
     *
     * Defaults to `"allow"` that leaves animations untouched.
     */
    animations?: "disabled"|"allow";

    /**
     * When set to `"hide"`, screenshot will hide text caret. When set to 
     * `"initial"`, text caret behavior will not be changed.  Defaults to 
     * `"hide"`.
     */
    caret?: "hide"|"initial";

    /**
     * Specify locators that should be masked when the screenshot is taken. 
     * Masked elements will be overlaid with a pink box `#FF00FF` that 
     * completely covers its bounding box.
     */
    mask?: Array<Locator>;

    /**
     * Hides default white background and allows capturing screenshots with
     * transparency. Not applicable to `jpeg` images. Defaults to `false`.
     */
    omitBackground?: boolean;

    /**
     * The file path to save the image to. The screenshot type will be
     * inferred from file extension. If `path` is a relative path, then it
     * is resolved relative to the current working directory. If no path is
     * provided, the image won't be saved to the disk.
     */
    path?: string;

    /**
     * The quality of the image, between 0-100. Not applicable to `png` images.
     */
    quality?: number;

    /**
     * When set to `"css"`, screenshot will have a single pixel per each css
     * pixel on the page. For high-dpi devices, this will keep screenshots
     * small. Using `"device"` option will produce a single pixel per each
     * device pixel, so screenshots of high-dpi devices will be twice as large
     * or even larger.
     *
     * Defaults to `"device"`.
     */
    scale?: "css"|"device";

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The default
     * value can be changed via `actionTimeout` option in the config, or by
     * using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
     */
    timeout?: number;

    /**
     * Specify screenshot type, defaults to `png`.
     */
    type?: "png"|"jpeg";
    }

    interface DragToOptions {
    /**
     * Whether to bypass the [actionability]
     * (https://playwright.dev/docs/actionability) checks. Defaults to `false`.
     */
    force?: boolean;

    /**
     * Actions that initiate navigations are waiting for these navigations to
     * happen and for pages to start loading. You can opt out of waiting via
     * setting this flag. You would only need this option in the exceptional
     * cases such as navigating to inaccessible pages. Defaults to `false`.
     */
    noWaitAfter?: boolean;

    /**
     * Clicks on the source element at this point relative to the top-left
     * corner of the element's padding box. If not specified, some visible
     * point of the element is used.
     */
    sourcePosition?: {
        x: number;

        y: number;
    };

    /**
     * Drops on the target element at this point relative to the top-left
     * corner of the element's padding box. If not specified, some visible
     * point of the element is used.
     */
    targetPosition?: {
        x: number;

        y: number;
    };

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The
     * default value can be changed via `actionTimeout` option in the
     * config, or by using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
     */
    timeout?: number;

    /**
     * When set, this method only performs the [actionability]
     * (https://playwright.dev/docs/actionability) checks and skips the
     * action. Defaults to `false`. Useful to wait until the element is
     * ready for the action without performing it.
     */
    trial?: boolean;
    }

    interface DoubleClickOptions {
    /**
     * Defaults to `left`.
     */
    button?: "left"|"right"|"middle";

    /**
     * Time to wait between `mousedown` and `mouseup` in milliseconds.
     * Defaults to 0.
     */
    delay?: number;

    /**
     * Whether to bypass the [actionability]
     * (https://playwright.dev/docs/actionability) checks. Defaults to `false`.
     */
    force?: boolean;

    /**
     * Modifier keys to press. Ensures that only these modifiers are
     * pressed during the operation, and then restores current modifiers back.
     * If not specified, currently pressed modifiers are used.
     */
    modifiers?: Array<"Alt"|"Control"|"Meta"|"Shift">;

    /**
     * Actions that initiate navigations are waiting for these navigations to
     * happen and for pages to start loading. You can opt out of waiting via
     * setting this flag. You would only need this option in the exceptional
     * cases such as navigating to inaccessible pages. Defaults to `false`.
     */
    noWaitAfter?: boolean;

    /**
     * A point to use relative to the top-left corner of element padding box.
     * If not specified, uses some visible point of the element.
     */
    position?: {
        x: number;

        y: number;
    };

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The default
     * value can be changed via `actionTimeout` option in the config, or by
     * using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
     */
    timeout?: number;

    /**
     * When set, this method only performs the [actionability]
     * (https://playwright.dev/docs/actionability) checks and skips the
     * action. Defaults to `false`. Useful to wait until the element is
     * ready for the action without performing it.
     */
    trial?: boolean;
}

interface ClickOptions {
    /**
     * Defaults to `left`.
     */
    button?: "left"|"right"|"middle";

    /**
     * defaults to 1. See [UIEvent.detail].
     */
    clickCount?: number;

    /**
     * Time to wait between `mousedown` and `mouseup` in milliseconds.
     * Defaults to 0.
     */
    delay?: number;

    /**
     * Whether to bypass the [actionability]
     * (https://playwright.dev/docs/actionability) checks. Defaults to `false`.
     */
    force?: boolean;

    /**
     * Modifier keys to press. Ensures that only these modifiers are pressed
     * during the operation, and then restores current modifiers back. If not
     * specified, currently pressed modifiers are used.
     */
    modifiers?: Array<"Alt"|"Control"|"Meta"|"Shift">;

    /**
     * Actions that initiate navigations are waiting for these navigations to
     * happen and for pages to start loading. You can opt out of waiting via
     * setting this flag. You would only need this option in the exceptional
     * cases such as navigating to inaccessible pages. Defaults to `false`.
     */
    noWaitAfter?: boolean;

    /**
     * A point to use relative to the top-left corner of element padding box.
     * If not specified, uses some visible point of the element.
     */
    position?: {
        x: number;

        y: number;
    };

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The default
     * value can be changed via `actionTimeout` option in the config, or by
     * using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
     */
    timeout?: number;

    /**
     * When set, this method only performs the [actionability]
     * (https://playwright.dev/docs/actionability) checks and skips the action.
     * Defaults to `false`. Useful to wait until the element is ready for the
     * action without performing it.
     */
    trial?: boolean;
    }

    interface ClearOptions {
    /**
     * Whether to bypass the [actionability]
     * (https://playwright.dev/docs/actionability) checks. Defaults to `false`.
     */
    force?: boolean;

    /**
     * Actions that initiate navigations are waiting for these navigations to
     * happen and for pages to start loading. You can opt out of waiting via
     * setting this flag. You would only need this option in the exceptional
     * cases such as navigating to inaccessible pages. Defaults to `false`.
     */
    noWaitAfter?: boolean;

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The default
     * value can be changed via `actionTimeout` option in the config, or by
     * using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout)
     * methods.
     */
    timeout?: number;
}

interface CheckOptions {
    /**
     * Whether to bypass the [actionability]
     * (https://playwright.dev/docs/actionability) checks. Defaults to `false`.
     */
    force?: boolean;

    /**
     * Actions that initiate navigations are waiting for these navigations to
     * happen and for pages to start loading. You can opt out of waiting via
     * setting this flag. You would only need this option in the exceptional
     * cases such as navigating to inaccessible pages. Defaults to `false`.
     */
    noWaitAfter?: boolean;

    /**
     * A point to use relative to the top-left corner of element padding box.
     * If not specified, uses some visible point of the element.
     */
    position?: {
        x: number;

        y: number;
    };

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The default
     * value can be changed via `actionTimeout` option in the config, or by
     * using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout)
     * methods.
     */
    timeout?: number;

    /**
     * When set, this method only performs the [actionability]
     * (https://playwright.dev/docs/actionability) checks and skips the
     * action. Defaults to `false`. Useful to wait until the element is
     * ready for the action without performing it.
     */
    trial?: boolean;
}

interface TimeoutOption {
    timeout?: number;
}

interface ExactOption {
    exact?: true;
}

interface RoleOptions {
    /**
     * An attribute that is usually set by `aria-checked` or native
     * `<input type=checkbox>` controls.
     * Learn more about [`aria-checked`]
     * (https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
     */
    checked?: boolean;

    /**
     * An attribute that is usually set by `aria-disabled` or `disabled`.
     * **NOTE** Unlike most other attributes, `disabled` is inherited
     * through the DOM hierarchy. Learn more about
     * [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
     */
    disabled?: boolean;

    /**
     * Whether `name` is matched exactly: case-sensitive and whole-string.
     * Defaults to false. Ignored when `name` is a regular expression.
     * Note that exact match still trims whitespace.
     */
    exact?: boolean;

    /**
     * An attribute that is usually set by `aria-expanded`.
     * Learn more about [`aria-expanded`]
     * (https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
     */
    expanded?: boolean;

    /**
     * Option that controls whether hidden elements are matched. By default,
     * only non-hidden elements, as [defined by ARIA]
     * (https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion), are matched by
     * role selector. Learn more about [`aria-hidden`]
     * (https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
     */
    includeHidden?: boolean;

    /**
     * A number attribute that is usually present for roles `heading`,
     * `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>`
     * elements.
     * Learn more about [`aria-level`]
     * (https://www.w3.org/TR/wai-aria-1.2/#aria-level).
     */
    level?: number;

    /**
     * Option to match the [accessible name]
     * (https://w3c.github.io/accname/#dfn-accessible-name). By default,
     * matching is case-insensitive and searches for a substring, use
     * `exact` to control this behavior.
     * Learn more about [accessible name]
     * (https://w3c.github.io/accname/#dfn-accessible-name).
     */
    name?: string|RegExp;

    /**
     * An attribute that is usually set by `aria-pressed`.
     * Learn more about [`aria-pressed`]
     * (https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
     */
    pressed?: boolean;

    /**
     * An attribute that is usually set by `aria-selected`.
     * Learn more about [`aria-selected`]
     * (https://www.w3.org/TR/wai-aria-1.2/#aria-selected).
     */
    selected?: boolean;
}

interface HoverOptions {
    /**
    * Whether to bypass the [actionability]
    * (https://playwright.dev/docs/actionability) checks. Defaults to `false`.
    */
    force?: boolean;

    /**
     * Modifier keys to press. Ensures that only these modifiers are pressed
     * during the operation, and then restores current modifiers back. If not
     * specified, currently pressed modifiers are used.
     */
    modifiers?: Array<"Alt"|"Control"|"Meta"|"Shift">;

    /**
     * Actions that initiate navigations are waiting for these navigations to
     * happen and for pages to start loading. You can opt out of waiting via
     * setting this flag. You would only need this option in the exceptional
     * cases such as navigating to inaccessible pages. Defaults to `false`.
     */
    noWaitAfter?: boolean;

    /**
     * A point to use relative to the top-left corner of element padding box.
     * If not specified, uses some visible point of the element.
     */
    position?: {
            x: number;

            y: number;
    };

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The default
     * value can be changed via `actionTimeout` option in the config, or by
     * using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout)
     * methods.
     */
    timeout?: number;

    /**
     * When set, this method only performs the [actionability]
     * (https://playwright.dev/docs/actionability) checks and skips the
     * action. Defaults to `false`. Useful to wait until the element is
     * ready for the action without performing it.
     */
    trial?: boolean;
}

interface PressKeyOptions {
    /**
     * Time to wait between `keydown` and `keyup` in milliseconds.
     * Defaults to 0.
     */
    delay?: number;

    /**
     * Actions that initiate navigations are waiting for these
     * navigations to happen and for pages to start loading. You can opt
     * out of waiting via setting this flag. You would only need this
     * option in the exceptional cases such as navigating to inaccessible
     * pages. Defaults to `false`.
     */
    noWaitAfter?: boolean;

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The
     * default value can be changed via `actionTimeout` option in the
     * config, or by using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout)
     * methods.
     */
    timeout?: number;
}

interface SelectOptionOptions {
    /**
    * Whether to bypass the [actionability]
    * (https://playwright.dev/docs/actionability) checks. Defaults to `false`.
    */
    force?: boolean;

    /**
     * Actions that initiate navigations are waiting for these navigations to
     * happen and for pages to start loading. You can opt out of waiting via
     * setting this flag. You would only need this option in the exceptional
     * cases such as navigating to inaccessible pages. Defaults to `false`.
     */
    noWaitAfter?: boolean;

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The
     * default value can be changed via `actionTimeout` option in the config,
     * or by using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout)
     * methods.
     */
    timeout?: number;
}

interface SelectTextOptions {
    /**
    * Whether to bypass the [actionability]
    * (https://playwright.dev/docs/actionability) checks. Defaults to `false`.
    */
    force?: boolean;

    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The default
     * value can be changed via `actionTimeout` option in the config, or by
     * using the [browserContext.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)]
     * (https://playwright.dev/docs/api/class-page#page-set-default-timeout)
     * methods.
     */
    timeout?: number;
}

interface FillOptions {
    force?: boolean,
    noWaitAfter?: boolean,
    timeout?: number,
}

interface VerifyVisibilityOptions {
    descriptor: string;
    element: Locator;
    expectedVisibility: boolean;
    showLogs?: boolean;
}

export { PageWaitForSelectorOptions, GetByOptions, LocatorOptions, BoundingBox, 
    ScreenshotOptions, DragToOptions, DoubleClickOptions, ClickOptions, ClearOptions, 
    CheckOptions, TimeoutOption, ExactOption, RoleOptions, HoverOptions, 
    PressKeyOptions, SelectOptionOptions, SelectTextOptions, FillOptions, 
    VerifyVisibilityOptions, LogOptions }