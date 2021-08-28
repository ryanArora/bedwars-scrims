import Command, { RunCallback } from "../structures/Command";
import getPermission, { PermissionLevel } from "../util/permission";
import queueEmbed from "../util/queueEmbed";

const run: RunCallback = async (client, message, args, settings) => {
  if (!message.member) return;

  if (getPermission(message.member, settings) < PermissionLevel.BANNED) {
    message.channel.send("You dont have permission to do that!");
    return;
  }

  const embed = queueEmbed(settings);
  message.channel.send({ embeds: [embed] });
};

const QueueCommand: Command = {
  name: "queue",
  aliases: ["q"],
  run,
};

module.exports = QueueCommand;
