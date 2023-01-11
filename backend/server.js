import config from "./config/config.js";

import app from "./app.js";

app.listen(config.PORT, () => {
  console.log(`Server is running at port ${config.PORT}`);
});
