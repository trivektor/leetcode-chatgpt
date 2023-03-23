const fs = require("fs");
const path = require("path");

export default function handler(request, response) {
  const content = fs.readFileSync(path.join(process.cwd(), "questions.json"));

  response.status(200).json(JSON.parse(content));
}
