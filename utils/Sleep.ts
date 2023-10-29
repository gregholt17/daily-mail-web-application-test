class SleepUtil {
    static sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
};

export { SleepUtil };
