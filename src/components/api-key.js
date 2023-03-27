import { Link, TextField } from "@mui/material";
import { useState } from "react";

const ApiKey = () => {
  const onChange = (event) => {
    localStorage.setItem("chatgptApiKey", event.target.value);
    setValue(event.target.value);
  };
  const [value, setValue] = useState(
    localStorage.getItem("chatgptApiKey") || ""
  );

  return (
    <>
      <TextField
        size="small"
        variant="filled"
        fullWidth
        label="API Key"
        onChange={onChange}
        value={value}
        helperText={
          <>
            Get your API Key at{" "}
            <Link
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
            >
              https://platform.openai.com/account/api-keys
            </Link>
          </>
        }
      />
    </>
  );
};

export default ApiKey;
