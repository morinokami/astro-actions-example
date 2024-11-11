import { actions, isInputError } from "astro:actions";

export function ContactForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // アクションの呼び出し
    const form = event.currentTarget;
    const formData = new FormData(form);
    const { data, error } = await actions.contact.add(formData);

    // エラー処理
    if (error) {
      if (isInputError(error)) {
        alert("入力エラー");
      } else if (error.code === "INTERNAL_SERVER_ERROR") {
        alert(error.message);
      } else {
        alert("不明なエラー");
      }
      return;
    }

    // 成功時の処理
    alert(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        名前:
        <input type="text" name="name" />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <br />
      <label>
        メッセージ:
        <textarea name="message"></textarea>
      </label>
      <br />
      <button type="submit">送信</button>
    </form>
  );
}
