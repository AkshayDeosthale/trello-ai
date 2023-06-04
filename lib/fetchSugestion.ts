import axios from "axios";
import { formatTodosFoaAI } from "./formatTodosFoaAI";

export async function fetchSugestion(board: Board) {
  const todo = await formatTodosFoaAI(board);

  console.log("in fetch suggestion =================>", todo);

  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const GPTData: any = await res.json();
  const { content } = GPTData;

  return content;
}

export default fetchSugestion;
