class Plugin {
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
  }

  onLoad() {
    const { TREM, logger, MixinManager } = this.#ctx;

    const _onReportRelease = (original, ...args) => {
      logger.info("Refreshing reports...");
      const result = original(...args); // 執行原本的東西
      logger.info("Reports refreshed");
      return result;
    };

    logger.info("Loading example plugin...");

    MixinManager.inject(
      TREM.class.ReportManager,
      "onReportRelease",
      _onReportRelease,
      0,
    );
  }
}

module.exports = Plugin;
