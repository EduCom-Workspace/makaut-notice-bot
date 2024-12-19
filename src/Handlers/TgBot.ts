export type MsgObj = {
  chat_id: string;
  text: string;
};

export type FileObj = {
  chat_id: string;
  caption: string;
  document: string; // URL or file ID or path
};

export class TgBot {
  token: string;
  base_url!: string;

  constructor(t: string) {
    // Initialize Telegram Bot API
    this.token = t;
    this.base_url = `https://api.telegram.org/bot${this.token}`;
  }

  async sendMessage(obj: MsgObj): Promise<Response> {
    const url = `${this.base_url}/sendMessage`;
    const requestBody = JSON.stringify(obj);
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });
  }

  async sendDocument(obj: FileObj): Promise<Response> {
    const url = `${this.base_url}/sendDocument`;

    const formData = new FormData();
    formData.append("chat_id", obj.chat_id);
    formData.append("caption", obj.caption);

    // Handle file sending (URL or file ID)
    if (obj.document.startsWith("http")) {
      formData.append("document", obj.document); // If document is a URL
    } else {
      const file = await fetch(obj.document); // Fetch the file content if it's a file path
      formData.append("document", file.body as any); // Attach the file as a stream
    }

    return await fetch(url, {
      method: "POST",
      body: formData,
    });
  }
}
