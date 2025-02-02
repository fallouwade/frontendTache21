import {
  FaBolt,
  FaBus,
  FaUtensils,
  FaBriefcase,
  FaPaintRoller,
} from "react-icons/fa"


import{ 
   GiGardeningShears,
} from "react-icons/gi" 

import {
  MdCarpenter,
  MdOutlineCleaningServices,
}  from   "react-icons/md"


export const categories = [
  { id: "jardinage", name: "Jardinage", icon: GiGardeningShears },
  { id: "menuiserie", name: "Menuiserie", icon:  MdCarpenter },
  { id: "electricite", name: "Électricité", icon: FaBolt },
  { id: "peinture", name: "Peinture", icon: FaPaintRoller },
  { id: "netoyage", name: "Netoyage", icon: MdOutlineCleaningServices },
  { id: "demenagement", name: "Déménagement", icon: FaBus },
  { id: "cuisine", name: "Cuisine", icon: FaUtensils },
  { id: "autres", name: "Autres services", icon: FaBriefcase },
]

export const region = [
  "Dakar",
  "Diourbel",
  "Fatick",
  "Kaffrine",
  "Kaolack",
  "Kédougou",
  "Kolda",
  "Louga",
  "Matam",
  "Saint-louis",
  "Sédhiou",
  "Tambacounda",
  "Thiés",
  "Ziguinchor",
]

