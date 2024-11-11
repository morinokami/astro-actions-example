import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const contact = {
  add: defineAction({
    input: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      message: z.string().min(1),
    }),
    accept: "form",
    handler: async (input) => {
      // TODO: フォームの内容を保存し、メールを送信する
      console.log(input);

      // ランダムに失敗させる
      if (Math.random() < 0.5) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "サーバーエラー",
        });
      }

      return "お問い合わせを受け付けました！";
    },
  }),
};
