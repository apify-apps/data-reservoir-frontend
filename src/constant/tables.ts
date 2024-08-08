export type CategoryType = 
  "the_sims" | "transjakarta" | "hayday" | "nasi_goreng" | "farm_frenzy" | "pizza_frenzy"

export type TheSimsTableType =
  "the_sims_castaway_product" |
  "the_sims_bustin_out_career" |
  "the_sims_two_console_career" |
  "the_sims_two_pets_console_career" |
  "the_sims_four_pc_harvestable" |
  "the_sims_two_pets_console_product";

export const TheSimsTableLabel: {[key in TheSimsTableType]: string } = {
  "the_sims_castaway_product": "Castaway Product",
  "the_sims_bustin_out_career": "Bustin Out Career",
  "the_sims_two_console_career": "Two Console Career",
  "the_sims_two_pets_console_career": "Pets Console Career",
  "the_sims_four_pc_harvestable": "Four PC Harvestable",
  "the_sims_two_pets_console_product": "Two Pets Console Product"
}