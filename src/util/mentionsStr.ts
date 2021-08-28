import { Snowflake } from "discord.js";

const mentionsStr = (mentions: Snowflake[], delimeter?: string, fallback?: string) => {
  if (mentions.length === 0) return fallback as string;
  if (!delimeter) delimeter = "";

  let str = "";
  for (const id of mentions) str += `<@${id}>${delimeter}`;
  str.slice(0, -1 * delimeter.length);
  return str;
};

export default mentionsStr;
