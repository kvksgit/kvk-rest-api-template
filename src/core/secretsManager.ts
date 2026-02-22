import fs from "node:fs/promises";

class SecretsManager {
  secrets: { [key: string]: unknown } = {};

  async load() {
    if (process.env.SECRETS_FILE) {
      const data = await fs.readFile(process.env.SECRETS_FILE);
      this.secrets = JSON.parse(data.toString());
    }
  }

  get(key: string): unknown {
    return this.secrets[key];
  }
}

export const secretsManager = new SecretsManager();
