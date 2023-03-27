import { ChatGPTAPI } from "chatgpt";

let client;

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
  const res = await client.sendMessage(
    `${request.body.propmt} ${request.body.question}`
  );

  response.status(200).json(res);
}
