import { Context } from "hono";
import { JSONArray, JSONObject } from "hono/utils/types";

export const getNoticesFromStoredDb = async (c: Context): Promise<any[]> => {
  try {
    const result = await c.env.DB.prepare("SELECT * FROM LastNotices ORDER BY noticeid DESC").all();
    const LastNotices = result.results as JSONArray;
    return LastNotices.slice(0, 3) || [];
  } catch (error) {
    console.error("Error fetching notices from the database:", error);
    return [];
  }
};

export const getNoticesFromMakautServer = async (): Promise<any[]> => {
  try {
    const response: JSONObject = await fetch(
      "https://makaut1.ucanapply.com/smartexam/public/api/notice-data"
    ).then((res) => res.json());

    const LastNotices = response.data as JSONArray;

    return LastNotices.slice(0, 3);
  } catch (error) {
    console.error("Error fetching notices from the server:", error);
    return [];
  }
};

// Function to save the last two new notices to the database
export const saveNoticesToDb = async (c: Context, notices: any[]) => {
  for (const notice of notices) {
    try {
      const stmt = await c.env.DB.prepare(
        `INSERT INTO LastNotices (noticeid, title, status, filepath, noticedate, sesscode, imp) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`
      );

      await stmt
        .bind(
          parseInt(notice.id, 10), // Map `id` as `noticeid`
          notice.notice_title, // Notice title
          parseInt(notice.status, 10), // Convert `status` to an integer
          notice.file_path, // File path
          notice.notice_date, // Notice date
          notice.sesscode || null, // Session code (allow null if optional)
          parseInt(notice.imp || 1, 10) // Default importance to 1
        )
        .run();
    } catch (error) {
      console.error("Error saving notice to the database:", notice, error);
    }
  }
};


export const checkNewNotices = async (c: Context) => {
    try {
      const dbNotices = await getNoticesFromStoredDb(c);
      const serverNotice = await getNoticesFromMakautServer();
  
      // Ensure proper matching between server and db notices
      const newNotices = serverNotice.filter(
        (notice) => !dbNotices.some((dbNotice) => dbNotice.noticeid === notice.id)
      );
  
      if (newNotices.length > 0) {
        // console.log("New Notices:", newNotices);
        await saveNoticesToDb(c, newNotices);
        return {
          message: "New Notices Added!",
          newNotices,
          totalNewNotices: newNotices.length,
        };

        // send new notices to subscribed users
        // await sendNoticesToSubscribedUsers(c, newNotices);

      }
  
      return {
        message: "No new notices found",
        error: null,
      };
    } catch (error: any) {
      console.error("Error in checkNewNotices:", error);
      return {
        message: "An error occurred while checking notices",
        error: error.message,
      };
    }
  };
  