import { relations } from "drizzle-orm/relations";
import { haydayProduct, haydayIngredient, haydayBuilding, haydayProducer, nasiGorengIngredient, nasiGorengIngredientRecipe, nasiGorengPlate, nasiGorengFriedRice, nasiGorengTool, nasiGorengIngredientTool, nasiGorengRelic, pizzaFrenzyTopping, pizzaFrenzyToppingUpgrade, nasiGorengFriedRiceLevel, nasiGorengFriedRiceLevelDetail, nasiGorengUpgrade, nasiGorengFriedRiceLevelRecipe, nasiGorengFriedRiceRecipe } from "./schema";

export const haydayIngredientRelations = relations(haydayIngredient, ({one}) => ({
	haydayProduct_ingredientId: one(haydayProduct, {
		fields: [haydayIngredient.ingredientId],
		references: [haydayProduct.id],
		relationName: "haydayIngredient_ingredientId_haydayProduct_id"
	}),
	haydayProduct_productId: one(haydayProduct, {
		fields: [haydayIngredient.productId],
		references: [haydayProduct.id],
		relationName: "haydayIngredient_productId_haydayProduct_id"
	}),
}));

export const haydayProductRelations = relations(haydayProduct, ({many}) => ({
	haydayIngredients_ingredientId: many(haydayIngredient, {
		relationName: "haydayIngredient_ingredientId_haydayProduct_id"
	}),
	haydayIngredients_productId: many(haydayIngredient, {
		relationName: "haydayIngredient_productId_haydayProduct_id"
	}),
	haydayProducers: many(haydayProducer),
}));

export const haydayProducerRelations = relations(haydayProducer, ({one}) => ({
	haydayBuilding: one(haydayBuilding, {
		fields: [haydayProducer.buildingId],
		references: [haydayBuilding.id]
	}),
	haydayProduct: one(haydayProduct, {
		fields: [haydayProducer.productId],
		references: [haydayProduct.id]
	}),
}));

export const haydayBuildingRelations = relations(haydayBuilding, ({many}) => ({
	haydayProducers: many(haydayProducer),
}));

export const nasiGorengIngredientRecipeRelations = relations(nasiGorengIngredientRecipe, ({one}) => ({
	nasiGorengIngredient_ingredientNeededId: one(nasiGorengIngredient, {
		fields: [nasiGorengIngredientRecipe.ingredientNeededId],
		references: [nasiGorengIngredient.id],
		relationName: "nasiGorengIngredientRecipe_ingredientNeededId_nasiGorengIngredient_id"
	}),
	nasiGorengIngredient_resultId: one(nasiGorengIngredient, {
		fields: [nasiGorengIngredientRecipe.resultId],
		references: [nasiGorengIngredient.id],
		relationName: "nasiGorengIngredientRecipe_resultId_nasiGorengIngredient_id"
	}),
}));

export const nasiGorengIngredientRelations = relations(nasiGorengIngredient, ({many}) => ({
	nasiGorengIngredientRecipes_ingredientNeededId: many(nasiGorengIngredientRecipe, {
		relationName: "nasiGorengIngredientRecipe_ingredientNeededId_nasiGorengIngredient_id"
	}),
	nasiGorengIngredientRecipes_resultId: many(nasiGorengIngredientRecipe, {
		relationName: "nasiGorengIngredientRecipe_resultId_nasiGorengIngredient_id"
	}),
	nasiGorengIngredientTools: many(nasiGorengIngredientTool),
	nasiGorengFriedRiceLevelRecipes: many(nasiGorengFriedRiceLevelRecipe),
	nasiGorengFriedRiceRecipes: many(nasiGorengFriedRiceRecipe),
}));

export const nasiGorengFriedRiceRelations = relations(nasiGorengFriedRice, ({one, many}) => ({
	nasiGorengPlate: one(nasiGorengPlate, {
		fields: [nasiGorengFriedRice.plateId],
		references: [nasiGorengPlate.id]
	}),
	nasiGorengTool: one(nasiGorengTool, {
		fields: [nasiGorengFriedRice.toolId],
		references: [nasiGorengTool.id]
	}),
	nasiGorengFriedRiceLevels: many(nasiGorengFriedRiceLevel),
	nasiGorengFriedRiceRecipes: many(nasiGorengFriedRiceRecipe),
}));

export const nasiGorengPlateRelations = relations(nasiGorengPlate, ({many}) => ({
	nasiGorengFriedRices: many(nasiGorengFriedRice),
}));

export const nasiGorengToolRelations = relations(nasiGorengTool, ({many}) => ({
	nasiGorengFriedRices: many(nasiGorengFriedRice),
	nasiGorengIngredientTools: many(nasiGorengIngredientTool),
	nasiGorengRelics: many(nasiGorengRelic),
}));

export const nasiGorengIngredientToolRelations = relations(nasiGorengIngredientTool, ({one}) => ({
	nasiGorengIngredient: one(nasiGorengIngredient, {
		fields: [nasiGorengIngredientTool.resultId],
		references: [nasiGorengIngredient.id]
	}),
	nasiGorengTool: one(nasiGorengTool, {
		fields: [nasiGorengIngredientTool.toolId],
		references: [nasiGorengTool.id]
	}),
}));

export const nasiGorengRelicRelations = relations(nasiGorengRelic, ({one}) => ({
	nasiGorengTool: one(nasiGorengTool, {
		fields: [nasiGorengRelic.toolId],
		references: [nasiGorengTool.id]
	}),
}));

export const pizzaFrenzyToppingUpgradeRelations = relations(pizzaFrenzyToppingUpgrade, ({one}) => ({
	pizzaFrenzyTopping: one(pizzaFrenzyTopping, {
		fields: [pizzaFrenzyToppingUpgrade.toppingId],
		references: [pizzaFrenzyTopping.id]
	}),
}));

export const pizzaFrenzyToppingRelations = relations(pizzaFrenzyTopping, ({many}) => ({
	pizzaFrenzyToppingUpgrades: many(pizzaFrenzyToppingUpgrade),
}));

export const nasiGorengFriedRiceLevelRelations = relations(nasiGorengFriedRiceLevel, ({one, many}) => ({
	nasiGorengFriedRice: one(nasiGorengFriedRice, {
		fields: [nasiGorengFriedRiceLevel.friedRiceId],
		references: [nasiGorengFriedRice.id]
	}),
	nasiGorengFriedRiceLevelDetails: many(nasiGorengFriedRiceLevelDetail),
	nasiGorengFriedRiceLevelRecipes: many(nasiGorengFriedRiceLevelRecipe),
}));

export const nasiGorengFriedRiceLevelDetailRelations = relations(nasiGorengFriedRiceLevelDetail, ({one}) => ({
	nasiGorengFriedRiceLevel: one(nasiGorengFriedRiceLevel, {
		fields: [nasiGorengFriedRiceLevelDetail.friedRiceLevelId],
		references: [nasiGorengFriedRiceLevel.id]
	}),
	nasiGorengUpgrade: one(nasiGorengUpgrade, {
		fields: [nasiGorengFriedRiceLevelDetail.upgradeId],
		references: [nasiGorengUpgrade.id]
	}),
}));

export const nasiGorengUpgradeRelations = relations(nasiGorengUpgrade, ({many}) => ({
	nasiGorengFriedRiceLevelDetails: many(nasiGorengFriedRiceLevelDetail),
}));

export const nasiGorengFriedRiceLevelRecipeRelations = relations(nasiGorengFriedRiceLevelRecipe, ({one}) => ({
	nasiGorengFriedRiceLevel: one(nasiGorengFriedRiceLevel, {
		fields: [nasiGorengFriedRiceLevelRecipe.friedRiceLevelId],
		references: [nasiGorengFriedRiceLevel.id]
	}),
	nasiGorengIngredient: one(nasiGorengIngredient, {
		fields: [nasiGorengFriedRiceLevelRecipe.ingredientId],
		references: [nasiGorengIngredient.id]
	}),
}));

export const nasiGorengFriedRiceRecipeRelations = relations(nasiGorengFriedRiceRecipe, ({one}) => ({
	nasiGorengFriedRice: one(nasiGorengFriedRice, {
		fields: [nasiGorengFriedRiceRecipe.friedRiceId],
		references: [nasiGorengFriedRice.id]
	}),
	nasiGorengIngredient: one(nasiGorengIngredient, {
		fields: [nasiGorengFriedRiceRecipe.ingredientId],
		references: [nasiGorengIngredient.id]
	}),
}));