var data = FileTools.ReadJSON(__dir__ + "data.json");
var ores = {},
	maxWeight = 0;

World.setBlockChangeCallbackEnabled(4, true);

Callback.addCallback("PostLoaded", function () {
	for (let mod in data) {
		if (data[mod].enable) {
			for (let ore in data[mod].ores) {
				ores[(mod == "Minecraft" ? "VanillaBlockID." : "BlockID.") + ore] = data[mod].ores[ore];
				maxWeight += data[mod].ores[ore];
			}
		}
	}
});

Callback.addCallback("BlockChanged", function (coords, block1, block2, int1, int2) {
	if (block1.id == 10 && block2.id == 4 && Object.keys(ores).length) {
		let rand = Math.round(Math.random() * maxWeight);
		let weight = 0;
		for (let ore in ores) {
			weight += ores[ore] ^ 0;
			if (rand <= weight) {
				World.setBlock(coords.x, coords.y, coords.z, eval(ore.split(":")[0]), eval(ore.split(":")[1]));
				break;
			}
		}
	}
});