import Command, { RunCallback } from "../structures/Command";
import pickPlayer from "../util/actions/pickPlayer";
import getPermission, { PermissionLevel } from "../util/permission";

const run: RunCallback = async (client, message, args, settings) => {
  if (!message.member) return;

  if (getPermission(message.member, settings) < PermissionLevel.ADMIN) {
    message.channel.send("You don't have permission to do that!");
    return;
  }

  if (!message.mentions.members) {
    message.channel.send("You need to tag someone as an argument!");
    return;
  }

  const picked = message.mentions.members.first();
  if (!picked) {
    message.channel.send("That member was not found!");
    return;
  }

  pickPlayer(settings.pick, picked, settings);
};

const ForcePickCommand: Command = {
  name: "forcepick",
  aliases: ["fp"],
  run,
};

module.exports = ForcePickCommand;
