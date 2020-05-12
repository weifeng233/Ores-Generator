var __configObj__ = FileTools.ReadJSON(__dir__ + "config.json"); //__config__ is ****

var ores = {
  "cobblestone": __config__.getNumber("cobblestone"),
  "coal": __config__.getNumber("coal"),
  "iron": __config__.getNumber("iron"),
  "gold": __config__.getNumber("gold"),
  "redstone": __config__.getNumber("redstone"),
  "lapis": __config__.getNumber("lapis"),
  "emerald": __config__.getNumber("emerald"),
  "diamond": __config__.getNumber("diamond")
};
var oreIDs = {
  "cobblestone": 4,
  "coal": 16,
  "iron": 15,
  "gold": 14,
  "redstone": 73,
  "lapis": 21,
  "emerald": 129,
  "diamond": 56
};

ModAPI.addAPICallback("ICore", function(api){ //IndustrialCraft2
	if(__config__.getBool("IndustrialCraft2.enabled")){
		let IC2_oreIDs = {
			"copper": BlockID.oreCopper,
			"tin": BlockID.oreTin,
			"lead": BlockID.oreLead,
			"uranium": BlockID.oreUranium,
			"iridium": BlockID.oreIridium
		};
		for(ore in __configObj__["IndustrialCraft2"]){
			if(ore != "enabled"){
				ores[ore] = __config__.getNumber("IndustrialCraft2." + ore);
				oreIDs[ore] = IC2_oreIDs[ore];
			}
		}
	}
});

ModAPI.addAPICallback("ThermalExpansionAPI", function(api){ //ThermalExpansion
	if(__config__.getBool("ThermalExpansion.enabled")){
		let TE_oreIDs = {
			"copper": BlockID.oreCopper,
			"tin": BlockID.oreTin,
			"lead": BlockID.oreLead,
			"iridium": BlockID.oreIridium,
			"aluminum": BlockID.oreAluminum,
			"silver": BlockID.oreSilver,
			"platinum": BlockID.orePlatinum,
			"nickel": BlockID.oreNickel,
			"mithril": BlockID.oreMithril
		};
		for(ore in __configObj__["ThermalExpansion"]){
			if(ore != "enabled"){
				ores[ore] = __config__.getNumber("ThermalExpansion." + ore);
				oreIDs[ore] = TE_oreIDs[ore];
			}
		}
	}
});

ModAPI.addAPICallback("RedCore", function(api){ //RedPower
	if(__config__.getBool("RedPower.enabled")){
		let RP_oreIDs = {
			"copper": BlockID.oreCopper,
			"tin": BlockID.oreTin,
			"lead": BlockID.oreLead,
			"silver": BlockID.oreSilver,
			"nikolite": BlockID.oreNikolite,
			"tungsten": BlockID.oreTungsten,
			"ruby": BlockID.oreRuby,
			"sapphire": BlockID.oreSapphire,
			"greenSapphire": BlockID.oreGreenSapphire
		};
		for(ore in __configObj__["RedPower"]){
			if(ore != "enabled"){
				ores[ore] = __config__.getNumber("RedPower." + ore);
				oreIDs[ore] = RP_oreIDs[ore];
			}
		}
	}
});

ModAPI.addAPICallback("ETech", function(api){ //EnergyTech
	if(__config__.getBool("EnergyTech.enabled")){
		let ET_oreIDs = {
			"copper": BlockID.oreCopper,
			"uranium": BlockID.oreUranium,
			"tetrahedrite": BlockID.oreTetrahedrite,
			"cassiterite": BlockID.oreCassiterite,
			"galena": BlockID.oreGalena,
			"spodumene": BlockID.oreSpodumene,
			"graphite": BlockID.oreGraphite,
			"tungsten": BlockID.oreTungsten,
			"silver": BlockID.oreSilver,
			"bauxite": BlockID.oreBauxite,
			"salt": BlockID.oreSlat,
			"ruby": BlockID.oreRuby
		};
		for(ore in __configObj__["EnergyTech"]){
			if(ore != "enabled"){
				ores[ore] = __config__.getNumber("EnergyTech." + ore);
				oreIDs[ore] = ET_oreIDs[ore];
			}
		}
	}
});

//Player defined.
if(FileTools.isExists(__dir__ + "ores_config.json")){
	oresObj = FileTools.ReadJSON(__dir__ + "ores_config.json");
	for(o in oresObj){
		if(eval(oresObj[o]["id"])){
			ores[o] = oresObj[o]["weight"];
			oreIDs[o] = eval(oresObj[o]["id"]);
		}
	}
}
else{
	FileTools.WriteText(__dir__ + "ores_config.json", "{\n \n}");
}

var maxWeight = 0;
for(i in ores){
	maxWeight += ores[i] * 1; //I hate JavaScript, I hate weakly typed.
}

World.setBlockChangeCallbackEnabled(4, true);
Callback.addCallback("BlockChanged", function (coords, block1, block2, int1, int2) {
	if(block1.id == 10 && block2.id == 4){
		rand = Math.round(Math.random()*maxWeight);
		weight = 0, genBlock = 4;
		for (j in ores){
			weight += ores[j] * 1;
			if(rand <= weight){
				genBlock = oreIDs[j];
				break;
			}
		}
		
		if(genBlock != 4 && genBlock)
			World.setBlock(coords.x, coords.y, coords.z, genBlock, 0);
	}
});
