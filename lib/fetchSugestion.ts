import { formatTodosFoaAI } from "./formatTodosFoaAI";

export async function fetchSugestion(board: Board) {
  const todo = formatTodosFoaAI(board);
  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo }),
  });

  const GPTData = await res.json();
  const { content } = GPTData;

  return content;
}

export default fetchSugestion;
