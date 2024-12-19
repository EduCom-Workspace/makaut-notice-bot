import { Context } from "hono";
import { TgBot } from "src/Handlers/TgBot";

export const handelTgCallback = async (c: Context) => {
  try {
    const update = await c.req.json(); // Parse the update sent by Telegram

    const tgBot = new TgBot(c.env.TG_TOKEN);

    if (update.message) {
      const chatId = update.message.chat.id;
      const username = update.message.chat.username || null;
      const first_name = update.message.chat.first_name || null;
      const text = update.message.text || null;

      let message: string = "";

      if (!chatId || !username || !first_name || !text) {
        return c.json({ ok: true });
      }

      if (text === "/start") {
        const checkExisting = await c.env.DB.prepare(
          "SELECT * FROM UserInfo WHERE tgid = ?"
        )
          .bind(chatId)
          .first(); // Use .first() for a single result

        if (!checkExisting) {
          // Check for null, not length
          const { success } = await c.env.DB.prepare(
            "INSERT INTO UserInfo (tgid, userName, name) VALUES (?, ?, ?)"
          )
            .bind(chatId, username, first_name)
            .run();
        }
        message = `Hello, ${first_name}! This is Makaut Notice Bot.\nGet updates instantly as soon as Makaut publishes notices.\nTo subscribe, send /subscribe \nTo unsubscribe, send /unsubscribe \nTo get Last Notice, send /lastupdates`;
      } else if (text === "/subscribe") {
        const isSubscribed = await c.env.DB.prepare(
          "SELECT * FROM UserInfo WHERE tgid = ? AND isSubscribed = ?"
        )
          .bind(chatId, 1)
          .first(); // Use .first() for a single result

        if (!isSubscribed) {
          // Check for null, not length
          const { success } = await c.env.DB.prepare(
            "UPDATE UserInfo SET isSubscribed = ? WHERE tgid = ?"
          )
            .bind(1, chatId)
            .run();
          message = `Subscribed to Makaut notices! You'll receive updates as soon as they're published.`;
        } else {
          message = `You're already subscribed to Makaut notices.`;
        }
      } else if (text === "/unsubscribe") {
        const isSubscribed = await c.env.DB.prepare(
          "SELECT * FROM UserInfo WHERE tgid = ? AND isSubscribed = ?"
        )
          .bind(chatId, 1) // Check if the user is subscribed (isSubscribed = 1)
          .first();
        if (isSubscribed.length > 0) {
          // If user is subscribed, unsubscribe them
          await c.env.DB.prepare(
            "UPDATE UserInfo SET isSubscribed = ? WHERE tgid = ?"
          )
            .bind(0, chatId) // Set isSubscribed to 0 (unsubscribe)
            .run();

          message =
            "Unsubscribed from Makaut notices! You won't receive updates anymore.";
        } else {
          // If user is not subscribed, inform them
          message =
            "You haven't subscribed to Makaut notices! Subscribe first.";
        }
      } else if (text == "/lastupdates") {
        const notices = await c.env.DB.prepare(
          "SELECT * FROM LastNotices ORDER BY noticeid ASC LIMIT 2"
        ).all();
        const lastNotices = notices.results;

        if (lastNotices.length > 0) {
          for (let i = lastNotices.length - 1; i >= 0; i--) {
            const notice = lastNotices[i];
            await tgBot.sendDocument({
              chat_id: chatId,
              caption: notice.title,
              document: notice.filepath,
            });
          }
        } else {
          await tgBot.sendMessage({
            chat_id: chatId,
            text: "No new notices available.",
          });
        }
      }

      if (["/start", "/subscribe", "/unsubscribe"].includes(text)) {
        await tgBot.sendMessage({
          chat_id: chatId,
          text: message,
        });
      }
    }

    return c.json({ ok: true });
  } catch (error: any) {
    console.log(error);

    return c.json(
      { error: "Failed to process the request", details: error.message },
      500
    );
  }
};
