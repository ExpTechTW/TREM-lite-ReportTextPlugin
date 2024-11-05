const fs = require("fs");
const path = require("path");

class Plugin {
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
  }

  onLoad() {
    const { TREM, logger, MixinManager } = this.#ctx;

    const _onReportRelease = (original, ...args) => {
      const result = original(...args);
      const [ans] = args;

      // 定義儲存檔案的路徑和名稱
      const filePath = path.join(__dirname, "reports", `${Date.now()}_report.txt`);
      const content = JSON.stringify(ans.data, null, 2);

      // 確保 reports 資料夾存在
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // 寫入檔案
      fs.writeFileSync(filePath, content, "utf8");

      // 記錄到 log
      logger.info(`Report saved to ${filePath}`);

      // 執行原始的 onReportRelease 方法
      return result;
    };

    logger.info("Loading report plugin...");

    MixinManager.inject(
      TREM.class.ReportManager,
      "onReportRelease",
      _onReportRelease,
      0,
    );
  }
}

module.exports = Plugin;
