function dumpBattle() {
	for (let playnum = 0; playnum < maxPlayers; playnum++) {
		playerData[playnum].droid = enumDroid(playnum).length;
		playerData[playnum].struct = enumStruct(playnum).length;
	}
	debug(
		"__REPORT__" +
      JSON.stringify({ gameTime: gameTime, playerData: playerData }) +
      "__ENDREPORT__"
	);
}
/*
function spam() {
	chat(ALLIES, "This is an automatic ranking system.");
	chat(
		ALLIES,
		"Host is not a human. Game results with research logs and in-game profiles will be published on the"
	);
	chat(ALLIES, "Autorating website: http://bruh.software/wz.");
	chat(ALLIES, "Visit the about page for detailed info about this system.");
	chat(ALLIES, "Feel free to contact us, all feedback is welcomed.");
}
*/
namespace("rp_");

var attacker = [];

function rp_eventGameInit() {
	for (let playnum = 0; playnum < maxPlayers; playnum++) {
		playerData[playnum].droidLost = 0;
		playerData[playnum].droidLoss = 0;
		playerData[playnum].structureLost = 0;
		playerData[playnum].kills = 0;
		playerData[playnum].droidBuilt = 0;
		playerData[playnum].structBuilt = 0;
		playerData[playnum].droid = 0;
		playerData[playnum].struct = 0;
		attacker[playnum] = [];
		attacker[playnum].droid = [];
	}
	attacker[scavengerPlayer] = [];
	attacker[scavengerPlayer].droid = [];
	setTimer("dumpBattle", 20000);
  //	spam();
  //	queue("spam", 30 * 1000);
}

function rp_eventDestroyed(victim) {
  //	console("dest:"+victim.player);
	if (victim.player == scavengerPlayer) {
		return;
	}
	if (victim.type == DROID && attacker[victim.player].droid[victim.id]) {
		if (attacker[victim.player].droid[victim.id] == scavengerPlayer) {
			playerData[victim.player].droidLoss++;
		} else {
			playerData[victim.player].droidLost++;
			playerData[attacker[victim.player].droid[victim.id]].kills++;
		}
	}
	if (victim.type == STRUCTURE) {
		playerData[victim.player].structureLost++;
	}
}

function rp_eventAttacked(victimObj, attackerObj) {
  //	console("attack:"+attackerObj.player+"->"+victimObj.player);
	if (victimObj.type == DROID) {
		{
			attacker[victimObj.player].droid[victimObj.id] = attackerObj.player;
		}
	}
}

function rp_eventDroidBuilt(droid) {
	playerData[droid.player].droidBuilt++;
}

function rp_eventStructureBuilt(struct) {
	playerData[struct.player].structBuilt++;
}