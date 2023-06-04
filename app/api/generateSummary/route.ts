import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log({ todos });

  //communicate with Open AI
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `When responding , Welcome the user always as Mr.Akshay and say welcome to Akshay's AI powered task and project handler App! Limit the response to 200 characters`,
        },
        {
          role: "user",
          content: `Hi there , provide a summary of the following todos. Count how many todos are in each category such as To do , in progress and done, the tell the user to have a productive day! , her is the data : ${JSON.stringify(
            todos
          )}`,
        },
      ],
      temperature: 0.7,
      n: 1,
      stream: false,
    });

    const { data } = response;
    //   console.log("Data is ====> ", data);
    console.log("Data choice message ====> ", data.choices[0].message);
    //   return data

    return NextResponse.json(data.choices[0].message);
  } catch (error: any) {
    return error;
  }
}
