export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("V2DEY Support is running!");
    }

    try {
      const update = await request.json();

      if (update.message?.web_app_data) {
        const userId = update.message.from.id;
        const data = JSON.parse(update.message.web_app_data.data);

        if (data.type === "ticket") {
          const text =
            "🎫 تیکت جدید V2DEY\n\n" +
            "👤 کاربر: " + userId + "\n\n" +
            "💬 پیام:\n" + data.message;

          await fetch(
            `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                chat_id: "132699217",
                text: text
              })
            }
          );
        }
      }

      return new Response("OK");
    } catch (error) {
      return new Response("Error", { status: 500 });
    }
  }
};
