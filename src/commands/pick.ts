import Command, { RunCallback } from "../structures/Command";
import pickPlayer from "../util/actions/pickPlayer";
import getPermission, { PermissionLevel } from "../util/permission";
import { Teams } from "../schemas/Settings";

const run: RunCallback = async (client, message, args, settings) => {
  if (!message.member) return;

  if (getPermission(message.member, settings) < PermissionLevel.DEFAULT) {
    message.channel.send("You don't have permission to do that!");
    return;
  }

  let team: Teams | undefined = undefined;
  if (settings.team1[0] === message.author.id) {
    team = Teams.ONE;
  } else if (settings.team2[0] === message.author.id) {
    team = Teams.TWO;
  } else {
    message.channel.send("You're not a captain!");
    return;
  }

  if (!(team === Teams.ONE && settings.pick === Teams.ONE) && !(team === Teams.TWO && settings.pick === Teams.TWO)) {
    message.channel.send("It's not your turn to pick!");
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

  pickPlayer(team, picked, settings);
};

const PickCommand: Command = {
  name: "pick",
  aliases: ["p"],
  run,
};

module.exports = PickCommand;
