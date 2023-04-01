import { ChatGPTAPI } from "chatgpt";

let client;

const prompTypeMappings = {
  clarificationQuestions:
    "Suggest some clarification questions for the following algorithm problem",
  exampleInputs:
    "Suggest some example inputs for the following algorithm problem",
};

const createChatGptClient = (apiKey) => {
  if (client) {
    return client;
  }

  return new ChatGPTAPI({
    apiKey,
  });
};

export default async function handler(request, response) {
  const client = createChatGptClient(request.query.apiKey);

  let res = await client.sendMessage(
    prompTypeMappings[request.body.promptType]
  );

  res = await client.sendMessage(request.body.question, {
    parentMessageId: res.id,
  });

  response.status(200).json(res);
}
