import Client from "./Client";
import { Message } from "discord.js";
import { ISettings } from "../schemas/Settings";

export type RunCallback = (client: Client, message: Message, args: string[], settings: ISettings) => void;

export default interface Command {
  name: string;
  run: RunCallback;
  aliases?: string[];
}
