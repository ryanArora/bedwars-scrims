import Client from "../structures/Client";
import { Message } from "discord.js";
import Event from "../structures/Event";
import Settings from "../schemas/Settings";

const messageCreate = async (client: Client, message: Message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.prefix)) return;

  const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
  const commandName = args.shift()!.toLowerCase();
  if (!commandName) return;

  const command = client.commands.get(commandName) ?? client.commands.find((cmd) => (cmd.aliases ? cmd.aliases.includes(commandName) : false));
  if (!command) return;

  const settings = await Settings.findOne({ id: message.guild.id });
  if (!settings) {
    message.channel.send("Please configure this server's settings before using the bot!");
    return;
  }

  if (message.channel.id !== settings.scrimsChat) {
    message.channel.send(`Please run that command in <#${settings.scrimsChat}>`);
    return;
  }

  command.run(client, message, args, settings);
};

const MessageCreateEvent: Event = {
  name: "messageCreate",
  run: messageCreate,
};

module.exports = MessageCreateEvent;
