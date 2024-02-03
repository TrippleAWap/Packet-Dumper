
// 8bit integer
type i8 = "native"
// unsigned 8bit integer
type u8 = "native"
// 16bit long int
type li16 = "native"
// 16bit long unsigned int
type lu16 = "native"
// 32bit int
type i32 = "native"
// 32bit long int
type li32 = "native"
// 32bit long unsigned int
type lu32 = "native"
// 32bit float
type lf32 = "native"
// 64bit long unsigned int
type lu64 = "native"
// 64bit long int
type li64 = "native"
type bool = boolean
type varint = "native"

type varint64 = "native"
type zigzag32 = "native"
type zigzag64 = "native"
type uuid = "native"
type byterot = "native"
type bitflags = "native"
type restBuffer = "native"
type encapsulated = "native"
type nbt = "native"
type lnbt = "native"
type nbtLoop = "native"
type enum_size_based_on_values_len = "native"
type MapInfo = "native"
export interface BehaviourPackInfos {li16:{
uuid: string
version: string
size: lu64
content_key: string
sub_pack_name: string
content_identity: string
has_scripts: bool
}[]}
export interface TexturePackInfos {li16:{
uuid: string
version: string
size: lu64
content_key: string
sub_pack_name: string
content_identity: string
has_scripts: bool
rtx_enabled: bool
}[]}
export interface ResourcePackIdVersions {varint:{
uuid: string
version: string
name: string
}[]}
export interface ResourcePackIds {li16:string[]}
export interface Experiment {
name: string
enabled: bool
}
export interface Experiments {li32:Experiment[]}
export interface GameMode {
  type: zigzag32,
  mappings: {
    "0": "survival",
    "1": "creative",
    "2": "adventure",
    "3": "survival_spectator",
    "4": "creative_spectator",
    "5": "fallback",
    "6": "spectator"
  }
}
export interface GameRule {
name: string
editable: bool
type: {
  type: varint,
  mappings: {
    "1": "bool",
    "2": "int",
    "3": "float"
  }
}
value: {
    "compareTo": "type",
    "fields": {
        "bool": "bool",
        "int": "zigzag32",
        "float": "lf32"
    },
    "default": "void"
}
}
export interface GameRules {varint:GameRule[]}
export interface Blob {
hash: lu64
payload: ByteArray
}
export interface BlockProperties {varint:{
name: string
state: nbt
}[]}
export interface Itemstates {varint:{
name: string
runtime_id: li16
component_based: bool
}[]}
export interface ItemExtraDataWithBlockingTick {
has_nbt: {
  type: lu16,
  mappings: {
    "0": "false",
    "65535": "true"
  }
}
nbt: {
    "compareTo": "has_nbt",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "version",
                    "type": "u8"
                },
                {
                    "name": "nbt",
                    "type": "lnbt"
                }
            ]
        ]
    },
    "default": "void"
}
can_place_on: {li32:ShortString[]}
can_destroy: {li32:ShortString[]}
blocking_tick: li64
}
export interface ItemExtraDataWithoutBlockingTick {
has_nbt: {
  type: lu16,
  mappings: {
    "0": "false",
    "65535": "true"
  }
}
nbt: {
    "compareTo": "has_nbt",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "version",
                    "type": "u8"
                },
                {
                    "name": "nbt",
                    "type": "lnbt"
                }
            ]
        ]
    },
    "default": "void"
}
can_place_on: {li32:ShortString[]}
can_destroy: {li32:ShortString[]}
}
export interface ItemLegacy {
network_id: zigzag32
undefined: {
    "compareTo": "network_id",
    "fields": {
        "0": "void"
    },
    "default": [
        "container",
        [
            {
                "name": "count",
                "type": "lu16"
            },
            {
                "name": "metadata",
                "type": "varint"
            },
            {
                "name": "block_runtime_id",
                "type": "zigzag32"
            },
            {
                "name": "extra",
                "type": [
                    "switch",
                    {
                        "compareTo": "network_id",
                        "fields": {
                            "/ShieldItemID": [
                                "encapsulated",
                                {
                                    "lengthType": "varint",
                                    "type": "ItemExtraDataWithBlockingTick"
                                }
                            ]
                        },
                        "default": [
                            "encapsulated",
                            {
                                "lengthType": "varint",
                                "type": "ItemExtraDataWithoutBlockingTick"
                            }
                        ]
                    }
                ]
            }
        ]
    ]
}
}
export interface Item {
network_id: zigzag32
undefined: {
    "compareTo": "network_id",
    "fields": {
        "0": "void"
    },
    "default": [
        "container",
        [
            {
                "name": "count",
                "type": "lu16"
            },
            {
                "name": "metadata",
                "type": "varint"
            },
            {
                "name": "has_stack_id",
                "type": "u8"
            },
            {
                "name": "stack_id",
                "type": [
                    "switch",
                    {
                        "compareTo": "has_stack_id",
                        "fields": {
                            "0": "void"
                        },
                        "default": "zigzag32"
                    }
                ]
            },
            {
                "name": "block_runtime_id",
                "type": "zigzag32"
            },
            {
                "name": "extra",
                "type": [
                    "switch",
                    {
                        "compareTo": "network_id",
                        "fields": {
                            "/ShieldItemID": [
                                "encapsulated",
                                {
                                    "lengthType": "varint",
                                    "type": "ItemExtraDataWithBlockingTick"
                                }
                            ]
                        },
                        "default": [
                            "encapsulated",
                            {
                                "lengthType": "varint",
                                "type": "ItemExtraDataWithoutBlockingTick"
                            }
                        ]
                    }
                ]
            }
        ]
    ]
}
}
export interface vec3i {
x: zigzag32
y: zigzag32
z: zigzag32
}
export interface vec3li {
x: li32
y: li32
z: li32
}
export interface vec3u {
x: varint
y: varint
z: varint
}
export interface vec3f {
x: lf32
y: lf32
z: lf32
}
export interface vec2f {
x: lf32
z: lf32
}
export interface Vec3fopts {
x: lf32
y: lf32
z: lf32
}
export interface Vec2fopts {
x: lf32
y: lf32
}
export interface MetadataDictionary {varint:{
key: {
  type: varint,
  mappings: {
    "0": "flags",
    "1": "health",
    "2": "variant",
    "3": "color",
    "4": "nametag",
    "5": "owner_eid",
    "6": "target_eid",
    "7": "air",
    "8": "potion_color",
    "9": "potion_ambient",
    "10": "jump_duration",
    "11": "hurt_time",
    "12": "hurt_direction",
    "13": "paddle_time_left",
    "14": "paddle_time_right",
    "15": "experience_value",
    "16": "minecart_display_block",
    "17": "minecart_display_offset",
    "18": "minecart_has_display",
    "20": "old_swell",
    "21": "swell_dir",
    "22": "charge_amount",
    "23": "enderman_held_runtime_id",
    "24": "entity_age",
    "26": "player_flags",
    "27": "player_index",
    "28": "player_bed_position",
    "29": "fireball_power_x",
    "30": "fireball_power_y",
    "31": "fireball_power_z",
    "32": "aux_power",
    "33": "fish_x",
    "34": "fish_z",
    "35": "fish_angle",
    "36": "potion_aux_value",
    "37": "lead_holder_eid",
    "38": "scale",
    "39": "interactive_tag",
    "40": "npc_skin_id",
    "41": "url_tag",
    "42": "max_airdata_max_air",
    "43": "mark_variant",
    "44": "container_type",
    "45": "container_base_size",
    "46": "container_extra_slots_per_strength",
    "47": "block_target",
    "48": "wither_invulnerable_ticks",
    "49": "wither_target_1",
    "50": "wither_target_2",
    "51": "wither_target_3",
    "52": "aerial_attack",
    "53": "boundingbox_width",
    "54": "boundingbox_height",
    "55": "fuse_length",
    "56": "rider_seat_position",
    "57": "rider_rotation_locked",
    "58": "rider_max_rotation",
    "59": "rider_min_rotation",
    "60": "rider_rotation_offset",
    "61": "area_effect_cloud_radius",
    "62": "area_effect_cloud_waiting",
    "63": "area_effect_cloud_particle_id",
    "64": "shulker_peek_id",
    "65": "shulker_attach_face",
    "66": "shulker_attached",
    "67": "shulker_attach_pos",
    "68": "trading_player_eid",
    "69": "trading_career",
    "70": "has_command_block",
    "71": "command_block_command",
    "72": "command_block_last_output",
    "73": "command_block_track_output",
    "74": "controlling_rider_seat_number",
    "75": "strength",
    "76": "max_strength",
    "77": "spell_casting_color",
    "78": "limited_life",
    "79": "armor_stand_pose_index",
    "80": "ender_crystal_time_offset",
    "81": "always_show_nametag",
    "82": "color_2",
    "83": "name_author",
    "84": "score_tag",
    "85": "balloon_attached_entity",
    "86": "pufferfish_size",
    "87": "bubble_time",
    "88": "agent",
    "89": "sitting_amount",
    "90": "sitting_amount_previous",
    "91": "eating_counter",
    "92": "flags_extended",
    "93": "laying_amount",
    "94": "laying_amount_previous",
    "95": "duration",
    "96": "spawn_time",
    "97": "change_rate",
    "98": "change_on_pickup",
    "99": "pickup_count",
    "100": "interact_text",
    "101": "trade_tier",
    "102": "max_trade_tier",
    "103": "trade_experience",
    "104": "skin_id",
    "105": "spawning_frames",
    "106": "command_block_tick_delay",
    "107": "command_block_execute_on_first_tick",
    "108": "ambient_sound_interval",
    "109": "ambient_sound_interval_range",
    "110": "ambient_sound_event_name",
    "111": "fall_damage_multiplier",
    "112": "name_raw_text",
    "113": "can_ride_target",
    "114": "low_tier_cured_discount",
    "115": "high_tier_cured_discount",
    "116": "nearby_cured_discount",
    "117": "nearby_cured_discount_timestamp",
    "118": "hitbox",
    "119": "is_buoyant",
    "120": "base_runtime_id",
    "121": "freezing_effect_strength",
    "122": "buoyancy_data",
    "123": "goat_horn_count",
    "124": "update_properties",
    "125": "movement_sound_distance_offset",
    "126": "heartbeat_interval_ticks",
    "127": "heartbeat_sound_event",
    "128": "player_last_death_position",
    "129": "player_last_death_dimension",
    "130": "player_has_died",
    "131": "collision_box"
  }
}
type: {
  type: varint,
  mappings: {
    "0": "byte",
    "1": "short",
    "2": "int",
    "3": "float",
    "4": "string",
    "5": "compound",
    "6": "vec3i",
    "7": "long",
    "8": "vec3f"
  }
}
value: {
    "compareTo": "key",
    "fields": {
        "flags": "MetadataFlags1",
        "flags_extended": "MetadataFlags2"
    },
    "default": [
        "switch",
        {
            "compareTo": "type",
            "fields": {
                "byte": "i8",
                "short": "li16",
                "int": "zigzag32",
                "float": "lf32",
                "string": "string",
                "compound": "nbt",
                "vec3i": "vec3i",
                "long": "zigzag64",
                "vec3f": "vec3f"
            },
            "default": "void"
        }
    ]
}
}[]}
export interface Link {
ridden_entity_id: zigzag64
rider_entity_id: zigzag64
type: u8
immediate: bool
rider_initiated: bool
}
export interface Links {varint:Link[]}
export interface EntityAttributes {varint:{
name: string
min: lf32
value: lf32
max: lf32
}[]}
export interface EntityProperties {
ints: {varint:{
index: varint
value: zigzag32
}[]}
floats: {varint:{
index: varint
value: lf32
}[]}
}
export interface Rotation {
yaw: byterot
pitch: byterot
head_yaw: byterot
}
export interface BlockCoordinates {
x: zigzag32
y: varint
z: zigzag32
}
export interface PlayerAttributes {varint:{
min: lf32
max: lf32
current: lf32
default: lf32
name: string
modifiers: {varint:{
id: string
name: string
amount: lf32
operation: li32
operand: li32
serializable: bool
}[]}
}[]}
export interface TransactionUseItem {
action_type: {
  type: varint,
  mappings: {
    "0": "click_block",
    "1": "click_air",
    "2": "break_block"
  }
}
block_position: BlockCoordinates
face: zigzag32
hotbar_slot: zigzag32
held_item: Item
player_pos: vec3f
click_pos: vec3f
block_runtime_id: varint
}
export interface TransactionActions {varint:{
source_type: {
  type: varint,
  mappings: {
    "0": "container",
    "1": "global",
    "2": "world_interaction",
    "3": "creative",
    "100": "craft_slot",
    "99999": "craft"
  }
}
undefined: {
    "compareTo": "source_type",
    "fields": {
        "container": [
            "container",
            [
                {
                    "name": "inventory_id",
                    "type": "WindowIDVarint"
                }
            ]
        ],
        "craft": [
            "container",
            [
                {
                    "name": "action",
                    "type": "varint"
                }
            ]
        ],
        "world_interaction": [
            "container",
            [
                {
                    "name": "flags",
                    "type": "varint"
                }
            ]
        ],
        "craft_slot": [
            "container",
            [
                {
                    "name": "action",
                    "type": "varint"
                }
            ]
        ]
    },
    "default": "void"
}
slot: varint
old_item: Item
new_item: Item
}[]}
export interface TransactionLegacy {
legacy_request_id: zigzag32
legacy_transactions: {
    "compareTo": "legacy_request_id",
    "fields": {
        "0": "void"
    },
    "default": [
        "array",
        {
            "countType": "varint",
            "type": [
                "container",
                [
                    {
                        "name": "container_id",
                        "type": "u8"
                    },
                    {
                        "name": "changed_slots",
                        "type": [
                            "array",
                            {
                                "countType": "varint",
                                "type": [
                                    "container",
                                    [
                                        {
                                            "name": "slot_id",
                                            "type": "u8"
                                        }
                                    ]
                                ]
                            }
                        ]
                    }
                ]
            ]
        }
    ]
}
}
export interface Transaction {
legacy: TransactionLegacy
transaction_type: {
  type: varint,
  mappings: {
    "0": "normal",
    "1": "inventory_mismatch",
    "2": "item_use",
    "3": "item_use_on_entity",
    "4": "item_release"
  }
}
actions: TransactionActions
transaction_data: {
    "compareTo": "transaction_type",
    "fields": {
        "normal": "void",
        "inventory_mismatch": "void",
        "item_use": "TransactionUseItem",
        "item_use_on_entity": [
            "container",
            [
                {
                    "name": "entity_runtime_id",
                    "type": "varint64"
                },
                {
                    "name": "action_type",
                    "type": [
                        "mapper",
                        {
                            "type": "varint",
                            "mappings": {
                                "0": "interact",
                                "1": "attack"
                            }
                        }
                    ]
                },
                {
                    "name": "hotbar_slot",
                    "type": "zigzag32"
                },
                {
                    "name": "held_item",
                    "type": "Item"
                },
                {
                    "name": "player_pos",
                    "type": "vec3f"
                },
                {
                    "name": "click_pos",
                    "type": "vec3f"
                }
            ]
        ],
        "item_release": [
            "container",
            [
                {
                    "name": "action_type",
                    "type": [
                        "mapper",
                        {
                            "type": "varint",
                            "mappings": {
                                "0": "release",
                                "1": "consume"
                            }
                        }
                    ]
                },
                {
                    "name": "hotbar_slot",
                    "type": "zigzag32"
                },
                {
                    "name": "held_item",
                    "type": "Item"
                },
                {
                    "name": "head_pos",
                    "type": "vec3f"
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface ItemStacks {varint:Item[]}
export interface RecipeIngredient {
type: {
  type: u8,
  mappings: {
    "0": "invalid",
    "1": "int_id_meta",
    "2": "molang",
    "3": "item_tag",
    "4": "string_id_meta",
    "5": "complex_alias"
  }
}
undefined: {
    "compareTo": "type",
    "fields": {
        "int_id_meta": [
            "container",
            [
                {
                    "name": "network_id",
                    "type": "li16"
                },
                {
                    "name": "metadata",
                    "type": [
                        "switch",
                        {
                            "compareTo": "network_id",
                            "fields": {
                                "0": "void"
                            },
                            "default": "li16"
                        }
                    ]
                }
            ]
        ],
        "molang": [
            "container",
            [
                {
                    "name": "expression",
                    "type": "string"
                },
                {
                    "name": "version",
                    "type": "u8"
                }
            ]
        ],
        "item_tag": [
            "container",
            [
                {
                    "name": "tag",
                    "type": "string"
                }
            ]
        ],
        "string_id_meta": [
            "container",
            [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "metadata",
                    "type": "li16"
                }
            ]
        ],
        "complex_alias": [
            "container",
            [
                {
                    "name": "name",
                    "type": "string"
                }
            ]
        ]
    },
    "default": "void"
}
count: zigzag32
}
export interface PotionTypeRecipes {varint:{
input_item_id: zigzag32
input_item_meta: zigzag32
ingredient_id: zigzag32
ingredient_meta: zigzag32
output_item_id: zigzag32
output_item_meta: zigzag32
}[]}
export interface PotionContainerChangeRecipes {varint:{
input_item_id: zigzag32
ingredient_id: zigzag32
output_item_id: zigzag32
}[]}
export interface Recipes {varint:{
type: {
  type: zigzag32,
  mappings: {
    "0": "shapeless",
    "1": "shaped",
    "2": "furnace",
    "3": "furnace_with_metadata",
    "4": "multi",
    "5": "shulker_box",
    "6": "shapeless_chemistry",
    "7": "shaped_chemistry",
    "8": "smithing_transform",
    "9": "smithing_trim"
  }
}
recipe: {
    "compareTo": "type",
    "fields": {
        "shapeless": [
            "container",
            [
                {
                    "name": "recipe_id",
                    "type": "LatinString"
                },
                {
                    "name": "input",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "RecipeIngredient"
                        }
                    ]
                },
                {
                    "name": "output",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "ItemLegacy"
                        }
                    ]
                },
                {
                    "name": "uuid",
                    "type": "uuid"
                },
                {
                    "name": "block",
                    "type": "string"
                },
                {
                    "name": "priority",
                    "type": "zigzag32"
                },
                {
                    "name": "network_id",
                    "type": "varint"
                }
            ]
        ],
        "shulker_box": [
            "container",
            [
                {
                    "name": "recipe_id",
                    "type": "LatinString"
                },
                {
                    "name": "input",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "RecipeIngredient"
                        }
                    ]
                },
                {
                    "name": "output",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "ItemLegacy"
                        }
                    ]
                },
                {
                    "name": "uuid",
                    "type": "uuid"
                },
                {
                    "name": "block",
                    "type": "string"
                },
                {
                    "name": "priority",
                    "type": "zigzag32"
                },
                {
                    "name": "network_id",
                    "type": "varint"
                }
            ]
        ],
        "shapeless_chemistry": [
            "container",
            [
                {
                    "name": "recipe_id",
                    "type": "LatinString"
                },
                {
                    "name": "input",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "RecipeIngredient"
                        }
                    ]
                },
                {
                    "name": "output",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "ItemLegacy"
                        }
                    ]
                },
                {
                    "name": "uuid",
                    "type": "uuid"
                },
                {
                    "name": "block",
                    "type": "string"
                },
                {
                    "name": "priority",
                    "type": "zigzag32"
                },
                {
                    "name": "network_id",
                    "type": "varint"
                }
            ]
        ],
        "shaped": [
            "container",
            [
                {
                    "name": "recipe_id",
                    "type": "LatinString"
                },
                {
                    "name": "width",
                    "type": "zigzag32"
                },
                {
                    "name": "height",
                    "type": "zigzag32"
                },
                {
                    "name": "input",
                    "type": [
                        "array",
                        {
                            "count": "width",
                            "type": [
                                "array",
                                {
                                    "count": "height",
                                    "type": "RecipeIngredient"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "output",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "ItemLegacy"
                        }
                    ]
                },
                {
                    "name": "uuid",
                    "type": "uuid"
                },
                {
                    "name": "block",
                    "type": "string"
                },
                {
                    "name": "priority",
                    "type": "zigzag32"
                },
                {
                    "name": "network_id",
                    "type": "varint"
                }
            ]
        ],
        "shaped_chemistry": [
            "container",
            [
                {
                    "name": "recipe_id",
                    "type": "LatinString"
                },
                {
                    "name": "width",
                    "type": "zigzag32"
                },
                {
                    "name": "height",
                    "type": "zigzag32"
                },
                {
                    "name": "input",
                    "type": [
                        "array",
                        {
                            "count": "width",
                            "type": [
                                "array",
                                {
                                    "count": "height",
                                    "type": "RecipeIngredient"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "output",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "ItemLegacy"
                        }
                    ]
                },
                {
                    "name": "uuid",
                    "type": "uuid"
                },
                {
                    "name": "block",
                    "type": "string"
                },
                {
                    "name": "priority",
                    "type": "zigzag32"
                },
                {
                    "name": "network_id",
                    "type": "varint"
                }
            ]
        ],
        "furnace": [
            "container",
            [
                {
                    "name": "input_id",
                    "type": "zigzag32"
                },
                {
                    "name": "output",
                    "type": "ItemLegacy"
                },
                {
                    "name": "block",
                    "type": "string"
                }
            ]
        ],
        "furnace_with_metadata": [
            "container",
            [
                {
                    "name": "input_id",
                    "type": "zigzag32"
                },
                {
                    "name": "input_meta",
                    "type": "zigzag32"
                },
                {
                    "name": "output",
                    "type": "ItemLegacy"
                },
                {
                    "name": "block",
                    "type": "string"
                }
            ]
        ],
        "multi": [
            "container",
            [
                {
                    "name": "uuid",
                    "type": "uuid"
                },
                {
                    "name": "network_id",
                    "type": "varint"
                }
            ]
        ],
        "smithing_transform": [
            "container",
            [
                {
                    "name": "recipe_id",
                    "type": "LatinString"
                },
                {
                    "name": "template",
                    "type": "RecipeIngredient"
                },
                {
                    "name": "base",
                    "type": "RecipeIngredient"
                },
                {
                    "name": "addition",
                    "type": "RecipeIngredient"
                },
                {
                    "name": "result",
                    "type": "ItemLegacy"
                },
                {
                    "name": "tag",
                    "type": "string"
                },
                {
                    "name": "network_id",
                    "type": "varint"
                }
            ]
        ],
        "smithing_trim": [
            "container",
            [
                {
                    "name": "recipe_id",
                    "type": "LatinString"
                },
                {
                    "name": "template",
                    "type": "RecipeIngredient"
                },
                {
                    "name": "input",
                    "type": "RecipeIngredient"
                },
                {
                    "name": "addition",
                    "type": "RecipeIngredient"
                },
                {
                    "name": "block",
                    "type": "string"
                },
                {
                    "name": "network_id",
                    "type": "varint"
                }
            ]
        ]
    },
    "default": "void"
}
}[]}
export interface SkinImage {
width: li32
height: li32
data: ByteArray
}
export interface Skin {
skin_id: string
play_fab_id: string
skin_resource_pack: string
skin_data: SkinImage
animations: {li32:{
skin_image: SkinImage
animation_type: li32
animation_frames: lf32
expression_type: lf32
}[]}
cape_data: SkinImage
geometry_data: string
geometry_data_version: string
animation_data: string
cape_id: string
full_skin_id: string
arm_size: string
skin_color: string
personal_pieces: {li32:{
piece_id: string
piece_type: string
pack_id: string
is_default_piece: bool
product_id: string
}[]}
piece_tint_colors: {li32:{
piece_type: string
colors: {li32:string[]}
}[]}
premium: bool
persona: bool
cape_on_classic: bool
primary_user: bool
overriding_player_appearance: bool
}
export interface PlayerRecords {
type: {
  type: u8,
  mappings: {
    "0": "add",
    "1": "remove"
  }
}
records_count: varint
records: {undefined:{
    "compareTo": "type",
    "fields": {
        "add": [
            "container",
            [
                {
                    "name": "uuid",
                    "type": "uuid"
                },
                {
                    "name": "entity_unique_id",
                    "type": "zigzag64"
                },
                {
                    "name": "username",
                    "type": "string"
                },
                {
                    "name": "xbox_user_id",
                    "type": "string"
                },
                {
                    "name": "platform_chat_id",
                    "type": "string"
                },
                {
                    "name": "build_platform",
                    "type": "li32"
                },
                {
                    "name": "skin_data",
                    "type": "Skin"
                },
                {
                    "name": "is_teacher",
                    "type": "bool"
                },
                {
                    "name": "is_host",
                    "type": "bool"
                }
            ]
        ],
        "remove": [
            "container",
            [
                {
                    "name": "uuid",
                    "type": "uuid"
                }
            ]
        ]
    },
    "default": "void"
}[]}
verified: {
    "compareTo": "type",
    "fields": {
        "add": [
            "array",
            {
                "count": "records_count",
                "type": "bool"
            }
        ]
    },
    "default": "void"
}
}
export interface Enchant {
id: u8
level: u8
}
export interface EnchantOption {
cost: varint
slot_flags: li32
equip_enchants: {varint:Enchant[]}
held_enchants: {varint:Enchant[]}
self_enchants: {varint:Enchant[]}
name: string
option_id: zigzag32
}
export interface Action {
  type: zigzag32,
  mappings: {
    "0": "start_break",
    "1": "abort_break",
    "2": "stop_break",
    "3": "get_updated_block",
    "4": "drop_item",
    "5": "start_sleeping",
    "6": "stop_sleeping",
    "7": "respawn",
    "8": "jump",
    "9": "start_sprint",
    "10": "stop_sprint",
    "11": "start_sneak",
    "12": "stop_sneak",
    "13": "creative_player_destroy_block",
    "14": "dimension_change_ack",
    "15": "start_glide",
    "16": "stop_glide",
    "17": "build_denied",
    "18": "crack_break",
    "19": "change_skin",
    "20": "set_enchatnment_seed",
    "21": "swimming",
    "22": "stop_swimming",
    "23": "start_spin_attack",
    "24": "stop_spin_attack",
    "25": "interact_block",
    "26": "predict_break",
    "27": "continue_break",
    "28": "start_item_use_on",
    "29": "stop_item_use_on",
    "30": "handled_teleport",
    "31": "missed_swing",
    "32": "start_crawling",
    "33": "stop_crawling",
    "34": "start_flying",
    "35": "stop_flying",
    "36": "received_server_data"
  }
}
export interface StackRequestSlotInfo {
slot_type: ContainerSlotType
slot: u8
stack_id: zigzag32
}
export interface ItemStackRequest {
request_id: zigzag32
actions: {varint:{
type_id: {
  type: u8,
  mappings: {
    "0": "take",
    "1": "place",
    "2": "swap",
    "3": "drop",
    "4": "destroy",
    "5": "consume",
    "6": "create",
    "7": "place_in_container",
    "8": "take_out_container",
    "9": "lab_table_combine",
    "10": "beacon_payment",
    "11": "mine_block",
    "12": "craft_recipe",
    "13": "craft_recipe_auto",
    "14": "craft_creative",
    "15": "optional",
    "16": "craft_grindstone_request",
    "17": "craft_loom_request",
    "18": "non_implemented",
    "19": "results_deprecated"
  }
}
undefined: {
    "compareTo": "type_id",
    "fields": {
        "take": [
            "container",
            [
                {
                    "name": "count",
                    "type": "u8"
                },
                {
                    "name": "source",
                    "type": "StackRequestSlotInfo"
                },
                {
                    "name": "destination",
                    "type": "StackRequestSlotInfo"
                }
            ]
        ],
        "place": [
            "container",
            [
                {
                    "name": "count",
                    "type": "u8"
                },
                {
                    "name": "source",
                    "type": "StackRequestSlotInfo"
                },
                {
                    "name": "destination",
                    "type": "StackRequestSlotInfo"
                }
            ]
        ],
        "swap": [
            "container",
            [
                {
                    "name": "source",
                    "type": "StackRequestSlotInfo"
                },
                {
                    "name": "destination",
                    "type": "StackRequestSlotInfo"
                }
            ]
        ],
        "drop": [
            "container",
            [
                {
                    "name": "count",
                    "type": "u8"
                },
                {
                    "name": "source",
                    "type": "StackRequestSlotInfo"
                },
                {
                    "name": "randomly",
                    "type": "bool"
                }
            ]
        ],
        "destroy": [
            "container",
            [
                {
                    "name": "count",
                    "type": "u8"
                },
                {
                    "name": "source",
                    "type": "StackRequestSlotInfo"
                }
            ]
        ],
        "consume": [
            "container",
            [
                {
                    "name": "count",
                    "type": "u8"
                },
                {
                    "name": "source",
                    "type": "StackRequestSlotInfo"
                }
            ]
        ],
        "create": [
            "container",
            [
                {
                    "name": "result_slot_id",
                    "type": "u8"
                }
            ]
        ],
        "beacon_payment": [
            "container",
            [
                {
                    "name": "primary_effect",
                    "type": "zigzag32"
                },
                {
                    "name": "secondary_effect",
                    "type": "zigzag32"
                }
            ]
        ],
        "mine_block": [
            "container",
            [
                {
                    "name": "unknown1",
                    "type": "zigzag32"
                },
                {
                    "name": "predicted_durability",
                    "type": "zigzag32"
                },
                {
                    "name": "network_id",
                    "type": "zigzag32"
                }
            ]
        ],
        "craft_recipe": [
            "container",
            [
                {
                    "name": "recipe_network_id",
                    "type": "varint"
                }
            ]
        ],
        "craft_recipe_auto": [
            "container",
            [
                {
                    "name": "recipe_network_id",
                    "type": "varint"
                }
            ]
        ],
        "craft_creative": [
            "container",
            [
                {
                    "name": "item_id",
                    "type": "varint"
                }
            ]
        ],
        "optional": [
            "container",
            [
                {
                    "name": "recipe_network_id",
                    "type": "varint"
                },
                {
                    "name": "filtered_string_index",
                    "type": "li32"
                }
            ]
        ],
        "craft_grindstone_request": [
            "container",
            [
                {
                    "name": "recipe_network_id",
                    "type": "varint"
                },
                {
                    "name": "cost",
                    "type": "varint"
                }
            ]
        ],
        "craft_loom_request": [
            "container",
            [
                {
                    "name": "pattern",
                    "type": "string"
                }
            ]
        ],
        "non_implemented": "void",
        "results_deprecated": [
            "container",
            [
                {
                    "name": "result_items",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "ItemLegacy"
                        }
                    ]
                },
                {
                    "name": "times_crafted",
                    "type": "u8"
                }
            ]
        ]
    },
    "default": "void"
}
}[]}
custom_names: {varint:string[]}
cause: {
  type: li32,
  mappings: {
    "0": "chat_public",
    "1": "chat_whisper",
    "2": "sign_text",
    "3": "anvil_text",
    "4": "book_and_quill_text",
    "5": "command_block_text",
    "6": "block_actor_data_text",
    "7": "join_event_text",
    "8": "leave_event_text",
    "9": "slash_command_chat",
    "10": "cartography_text",
    "11": "kick_command",
    "12": "title_command",
    "13": "summon_command"
  }
}
}
export interface ItemStackResponses {varint:{
status: {
  type: u8,
  mappings: {
    "0": "ok",
    "1": "error"
  }
}
request_id: zigzag32
undefined: {
    "compareTo": "status",
    "fields": {
        "ok": [
            "container",
            [
                {
                    "name": "containers",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": [
                                "container",
                                [
                                    {
                                        "name": "slot_type",
                                        "type": "ContainerSlotType"
                                    },
                                    {
                                        "name": "slots",
                                        "type": [
                                            "array",
                                            {
                                                "countType": "varint",
                                                "type": [
                                                    "container",
                                                    [
                                                        {
                                                            "name": "slot",
                                                            "type": "u8"
                                                        },
                                                        {
                                                            "name": "hotbar_slot",
                                                            "type": "u8"
                                                        },
                                                        {
                                                            "name": "count",
                                                            "type": "u8"
                                                        },
                                                        {
                                                            "name": "item_stack_id",
                                                            "type": "zigzag32"
                                                        },
                                                        {
                                                            "name": "custom_name",
                                                            "type": "string"
                                                        },
                                                        {
                                                            "name": "durability_correction",
                                                            "type": "zigzag32"
                                                        }
                                                    ]
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            ]
                        }
                    ]
                }
            ]
        ]
    },
    "default": "void"
}
}[]}
export interface ItemComponentList {varint:{
name: string
nbt: nbt
}[]}
export interface CommandOrigin {
type: {
  type: varint,
  mappings: {
    "0": "player",
    "1": "block",
    "2": "minecart_block",
    "3": "dev_console",
    "4": "test",
    "5": "automation_player",
    "6": "client_automation",
    "7": "dedicated_server",
    "8": "entity",
    "9": "virtual",
    "10": "game_argument",
    "11": "entity_server",
    "12": "precompiled",
    "13": "game_director_entity_server",
    "14": "script",
    "15": "executor"
  }
}
uuid: uuid
request_id: string
player_entity_id: {
    "compareTo": "type",
    "fields": {
        "dev_console": [
            "container",
            [
                {
                    "name": "player_entity_id",
                    "type": "zigzag64"
                }
            ]
        ],
        "test": [
            "container",
            [
                {
                    "name": "player_entity_id",
                    "type": "zigzag64"
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface TrackedObject {
type: {
  type: li32,
  mappings: {
    "0": "entity",
    "1": "block"
  }
}
entity_unique_id: {
    "compareTo": "type",
    "fields": {
        "entity": "zigzag64"
    },
    "default": "void"
}
block_position: {
    "compareTo": "type",
    "fields": {
        "block": "BlockCoordinates"
    },
    "default": "void"
}
}
export interface MapDecoration {
type: {
  type: u8,
  mappings: {
    "0": "marker_white",
    "1": "marker_green",
    "2": "marker_red",
    "3": "marker_blue",
    "4": "cross_white",
    "5": "triangle_red",
    "6": "square_white",
    "7": "marker_sign",
    "8": "marker_pink",
    "9": "marker_orange",
    "10": "marker_yellow",
    "11": "marker_teal",
    "12": "triangle_green",
    "13": "small_square_white",
    "14": "mansion",
    "15": "monument",
    "16": "no_draw",
    "17": "village_desert",
    "18": "village_plains",
    "19": "village_savanna",
    "20": "village_snowy",
    "21": "village_taiga",
    "22": "jungle_temple",
    "23": "witch_hut =>",
    "24": "marker_white",
    "25": "marker_green",
    "26": "marker_red",
    "27": "marker_blue",
    "28": "cross_white",
    "29": "triangle_red",
    "30": "square_white",
    "31": "marker_sign",
    "32": "marker_pink",
    "33": "marker_orange",
    "34": "marker_yellow",
    "35": "marker_teal",
    "36": "triangle_green",
    "37": "small_square_white",
    "38": "mansion",
    "39": "monument",
    "40": "no_draw",
    "41": "village_desert",
    "42": "village_plains",
    "43": "village_savanna",
    "44": "village_snowy",
    "45": "village_taiga",
    "46": "jungle_temple",
    "47": "witch_hut"
  }
}
rotation: u8
x: u8
y: u8
label: string
color_abgr: varint
}
export interface StructureBlockSettings {
palette_name: string
ignore_entities: bool
ignore_blocks: bool
non_ticking_players_and_ticking_areas: bool
size: BlockCoordinates
structure_offset: BlockCoordinates
last_editing_player_unique_id: zigzag64
rotation: {
  type: u8,
  mappings: {
    "0": "none",
    "1": "90_deg",
    "2": "180_deg",
    "3": "270_deg"
  }
}
mirror: {
  type: u8,
  mappings: {
    "0": "none",
    "1": "x_axis",
    "2": "z_axis",
    "3": "both_axes"
  }
}
animation_mode: {
  type: u8,
  mappings: {
    "0": "none",
    "1": "layers",
    "2": "blocks"
  }
}
animation_duration: lf32
integrity: lf32
seed: lu32
pivot: vec3f
}
export interface EducationSharedResourceURI {
button_name: string
link_uri: string
}
export interface EducationExternalLinkSettings {
url: string
display_name: string
}
export interface BlockUpdate {
position: BlockCoordinates
runtime_id: varint
flags: varint
entity_unique_id: zigzag64
transition_type: {
  type: varint,
  mappings: {
    "0": "entity",
    "1": "create",
    "2": "destroy"
  }
}
}
export interface MaterialReducer {
mix: zigzag32
items: {
network_id: zigzag32
count: zigzag32
}
}
export interface PermissionLevel {
  type: u8,
  mappings: {
    "0": "visitor",
    "1": "member",
    "2": "operator",
    "3": "custom"
  }
}
export interface CommandPermissionLevel {
  type: u8,
  mappings: {
    "0": "normal",
    "1": "operator",
    "2": "automation",
    "3": "host",
    "4": "owner",
    "5": "internal"
  }
}
export interface CommandPermissionLevelVarint {
  type: u8,
  mappings: {
    "0": "normal",
    "1": "operator",
    "2": "automation",
    "3": "host",
    "4": "owner",
    "5": "internal"
  }
}
export interface WindowID {
  type: i8,
  mappings: {
    "0": "inventory",
    "1": "first",
    "100": "last",
    "119": "offhand",
    "120": "armor",
    "121": "creative",
    "122": "hotbar",
    "123": "fixed_inventory",
    "124": "ui",
    "-100": "drop_contents",
    "-24": "beacon",
    "-23": "trading_output",
    "-22": "trading_use_inputs",
    "-21": "trading_input_2",
    "-20": "trading_input_1",
    "-17": "enchant_output",
    "-16": "enchant_material",
    "-15": "enchant_input",
    "-13": "anvil_output",
    "-12": "anvil_result",
    "-11": "anvil_material",
    "-10": "container_input",
    "-5": "crafting_use_ingredient",
    "-4": "crafting_result",
    "-3": "crafting_remove_ingredient",
    "-2": "crafting_add_ingredient",
    "-1": "none"
  }
}
export interface WindowIDVarint {
  type: varint,
  mappings: {
    "0": "inventory",
    "1": "first",
    "100": "last",
    "119": "offhand",
    "120": "armor",
    "121": "creative",
    "122": "hotbar",
    "123": "fixed_inventory",
    "124": "ui",
    "-100": "drop_contents",
    "-24": "beacon",
    "-23": "trading_output",
    "-22": "trading_use_inputs",
    "-21": "trading_input_2",
    "-20": "trading_input_1",
    "-17": "enchant_output",
    "-16": "enchant_material",
    "-15": "enchant_input",
    "-13": "anvil_output",
    "-12": "anvil_result",
    "-11": "anvil_material",
    "-10": "container_input",
    "-5": "crafting_use_ingredient",
    "-4": "crafting_result",
    "-3": "crafting_remove_ingredient",
    "-2": "crafting_add_ingredient",
    "-1": "none"
  }
}
export interface WindowType {
  type: i8,
  mappings: {
    "0": "container",
    "1": "workbench",
    "2": "furnace",
    "3": "enchantment",
    "4": "brewing_stand",
    "5": "anvil",
    "6": "dispenser",
    "7": "dropper",
    "8": "hopper",
    "9": "cauldron",
    "10": "minecart_chest",
    "11": "minecart_hopper",
    "12": "horse",
    "13": "beacon",
    "14": "structure_editor",
    "15": "trading",
    "16": "command_block",
    "17": "jukebox",
    "18": "armor",
    "19": "hand",
    "20": "compound_creator",
    "21": "element_constructor",
    "22": "material_reducer",
    "23": "lab_table",
    "24": "loom",
    "25": "lectern",
    "26": "grindstone",
    "27": "blast_furnace",
    "28": "smoker",
    "29": "stonecutter",
    "30": "cartography",
    "31": "hud",
    "32": "jigsaw_editor",
    "33": "smithing_table",
    "34": "chest_boat",
    "35": "decorated_pot",
    "36": "crafter",
    "-9": "none",
    "-1": "inventory"
  }
}
export interface ContainerSlotType {
  type: u8,
  mappings: {
    "0": "anvil_input",
    "1": "anvil_material",
    "2": "anvil_result",
    "3": "smithing_table_input",
    "4": "smithing_table_material",
    "5": "smithing_table_result",
    "6": "armor",
    "7": "container",
    "8": "beacon_payment",
    "9": "brewing_input",
    "10": "brewing_result",
    "11": "brewing_fuel",
    "12": "hotbar_and_inventory",
    "13": "crafting_input",
    "14": "crafting_output",
    "15": "recipe_construction",
    "16": "recipe_nature",
    "17": "recipe_items",
    "18": "recipe_search",
    "19": "recipe_search_bar",
    "20": "recipe_equipment",
    "21": "recipe_book",
    "22": "enchanting_input",
    "23": "enchanting_lapis",
    "24": "furnace_fuel",
    "25": "furnace_ingredient",
    "26": "furnace_output",
    "27": "horse_equip",
    "28": "hotbar",
    "29": "inventory",
    "30": "shulker",
    "31": "trade_ingredient1",
    "32": "trade_ingredient2",
    "33": "trade_result",
    "34": "offhand",
    "35": "compcreate_input",
    "36": "compcreate_output",
    "37": "elemconstruct_output",
    "38": "matreduce_input",
    "39": "matreduce_output",
    "40": "labtable_input",
    "41": "loom_input",
    "42": "loom_dye",
    "43": "loom_material",
    "44": "loom_result",
    "45": "blast_furnace_ingredient",
    "46": "smoker_ingredient",
    "47": "trade2_ingredient1",
    "48": "trade2_ingredient2",
    "49": "trade2_result",
    "50": "grindstone_input",
    "51": "grindstone_additional",
    "52": "grindstone_result",
    "53": "stonecutter_input",
    "54": "stonecutter_result",
    "55": "cartography_input",
    "56": "cartography_additional",
    "57": "cartography_result",
    "58": "barrel",
    "59": "cursor",
    "60": "creative_output",
    "61": "smithing_table_template",
    "62": "crafter"
  }
}
export interface SoundType {
  type: varint,
  mappings: {
    "0": "ItemUseOn",
    "1": "Hit",
    "2": "Step",
    "3": "Fly",
    "4": "Jump",
    "5": "Break",
    "6": "Place",
    "7": "HeavyStep",
    "8": "Gallop",
    "9": "Fall",
    "10": "Ambient",
    "11": "AmbientBaby",
    "12": "AmbientInWater",
    "13": "Breathe",
    "14": "Death",
    "15": "DeathInWater",
    "16": "DeathToZombie",
    "17": "Hurt",
    "18": "HurtInWater",
    "19": "Mad",
    "20": "Boost",
    "21": "Bow",
    "22": "SquishBig",
    "23": "SquishSmall",
    "24": "FallBig",
    "25": "FallSmall",
    "26": "Splash",
    "27": "Fizz",
    "28": "Flap",
    "29": "Swim",
    "30": "Drink",
    "31": "Eat",
    "32": "Takeoff",
    "33": "Shake",
    "34": "Plop",
    "35": "Land",
    "36": "Saddle",
    "37": "Armor",
    "38": "MobArmorStandPlace",
    "39": "AddChest",
    "40": "Throw",
    "41": "Attack",
    "42": "AttackNoDamage",
    "43": "AttackStrong",
    "44": "Warn",
    "45": "Shear",
    "46": "Milk",
    "47": "Thunder",
    "48": "Explode",
    "49": "Fire",
    "50": "Ignite",
    "51": "Fuse",
    "52": "Stare",
    "53": "Spawn",
    "54": "Shoot",
    "55": "BreakBlock",
    "56": "Launch",
    "57": "Blast",
    "58": "LargeBlast",
    "59": "Twinkle",
    "60": "Remedy",
    "61": "Infect",
    "62": "LevelUp",
    "63": "BowHit",
    "64": "BulletHit",
    "65": "ExtinguishFire",
    "66": "ItemFizz",
    "67": "ChestOpen",
    "68": "ChestClosed",
    "69": "ShulkerBoxOpen",
    "70": "ShulkerBoxClosed",
    "71": "EnderChestOpen",
    "72": "EnderChestClosed",
    "73": "PowerOn",
    "74": "PowerOff",
    "75": "Attach",
    "76": "Detach",
    "77": "Deny",
    "78": "Tripod",
    "79": "Pop",
    "80": "DropSlot",
    "81": "Note",
    "82": "Thorns",
    "83": "PistonIn",
    "84": "PistonOut",
    "85": "Portal",
    "86": "Water",
    "87": "LavaPop",
    "88": "Lava",
    "89": "Burp",
    "90": "BucketFillWater",
    "91": "BucketFillLava",
    "92": "BucketEmptyWater",
    "93": "BucketEmptyLava",
    "94": "ArmorEquipChain",
    "95": "ArmorEquipDiamond",
    "96": "ArmorEquipGeneric",
    "97": "ArmorEquipGold",
    "98": "ArmorEquipIron",
    "99": "ArmorEquipLeather",
    "100": "ArmorEquipElytra",
    "101": "Record13",
    "102": "RecordCat",
    "103": "RecordBlocks",
    "104": "RecordChirp",
    "105": "RecordFar",
    "106": "RecordMall",
    "107": "RecordMellohi",
    "108": "RecordStal",
    "109": "RecordStrad",
    "110": "RecordWard",
    "111": "Record11",
    "112": "RecordWait",
    "113": "StopRecord",
    "114": "Flop",
    "115": "GuardianCurse",
    "116": "MobWarning",
    "117": "MobWarningBaby",
    "118": "Teleport",
    "119": "ShulkerOpen",
    "120": "ShulkerClose",
    "121": "Haggle",
    "122": "HaggleYes",
    "123": "HaggleNo",
    "124": "HaggleIdle",
    "125": "ChorusGrow",
    "126": "ChorusDeath",
    "127": "Glass",
    "128": "PotionBrewed",
    "129": "CastSpell",
    "130": "PrepareAttackSpell",
    "131": "PrepareSummon",
    "132": "PrepareWololo",
    "133": "Fang",
    "134": "Charge",
    "135": "CameraTakePicture",
    "136": "LeashKnotPlace",
    "137": "LeashKnotBreak",
    "138": "AmbientGrowl",
    "139": "AmbientWhine",
    "140": "AmbientPant",
    "141": "AmbientPurr",
    "142": "AmbientPurreow",
    "143": "DeathMinVolume",
    "144": "DeathMidVolume",
    "145": "ImitateBlaze",
    "146": "ImitateCaveSpider",
    "147": "ImitateCreeper",
    "148": "ImitateElderGuardian",
    "149": "ImitateEnderDragon",
    "150": "ImitateEnderman",
    "151": "ImitateEndermite",
    "152": "ImitateEvocationIllager",
    "153": "ImitateGhast",
    "154": "ImitateHusk",
    "155": "ImitateIllusionIllager",
    "156": "ImitateMagmaCube",
    "157": "ImitatePolarBear",
    "158": "ImitateShulker",
    "159": "ImitateSilverfish",
    "160": "ImitateSkeleton",
    "161": "ImitateSlime",
    "162": "ImitateSpider",
    "163": "ImitateStray",
    "164": "ImitateVex",
    "165": "ImitateVindicationIllager",
    "166": "ImitateWitch",
    "167": "ImitateWither",
    "168": "ImitateWitherSkeleton",
    "169": "ImitateWolf",
    "170": "ImitateZombie",
    "171": "ImitateZombiePigman",
    "172": "ImitateZombieVillager",
    "173": "EnderEyePlaced",
    "174": "EndPortalCreated",
    "175": "AnvilUse",
    "176": "BottleDragonBreath",
    "177": "PortalTravel",
    "178": "TridentHit",
    "179": "TridentReturn",
    "180": "TridentRiptide1",
    "181": "TridentRiptide2",
    "182": "TridentRiptide3",
    "183": "TridentThrow",
    "184": "TridentThunder",
    "185": "TridentHitGround",
    "186": "Default",
    "187": "FletchingTableUse",
    "188": "ElemConstructOpen",
    "189": "IceBombHit",
    "190": "BalloonPop",
    "191": "LtReactionIceBomb",
    "192": "LtReactionBleach",
    "193": "LtReactionElephantToothpaste",
    "194": "LtReactionElephantToothpaste2",
    "195": "LtReactionGlowStick",
    "196": "LtReactionGlowStick2",
    "197": "LtReactionLuminol",
    "198": "LtReactionSalt",
    "199": "LtReactionFertilizer",
    "200": "LtReactionFireball",
    "201": "LtReactionMagnesiumSalt",
    "202": "LtReactionMiscFire",
    "203": "LtReactionFire",
    "204": "LtReactionMiscExplosion",
    "205": "LtReactionMiscMystical",
    "206": "LtReactionMiscMystical2",
    "207": "LtReactionProduct",
    "208": "SparklerUse",
    "209": "GlowStickUse",
    "210": "SparklerActive",
    "211": "ConvertToDrowned",
    "212": "BucketFillFish",
    "213": "BucketEmptyFish",
    "214": "BubbleColumnUpwards",
    "215": "BubbleColumnDownwards",
    "216": "BubblePop",
    "217": "BubbleUpInside",
    "218": "BubbleDownInside",
    "219": "HurtBaby",
    "220": "DeathBaby",
    "221": "StepBaby",
    "222": "SpawnBaby",
    "223": "Born",
    "224": "TurtleEggBreak",
    "225": "TurtleEggCrack",
    "226": "TurtleEggHatched",
    "227": "LayEgg",
    "228": "TurtleEggAttacked",
    "229": "BeaconActivate",
    "230": "BeaconAmbient",
    "231": "BeaconDeactivate",
    "232": "BeaconPower",
    "233": "ConduitActivate",
    "234": "ConduitAmbient",
    "235": "ConduitAttack",
    "236": "ConduitDeactivate",
    "237": "ConduitShort",
    "238": "Swoop",
    "239": "BambooSaplingPlace",
    "240": "PreSneeze",
    "241": "Sneeze",
    "242": "AmbientTame",
    "243": "Scared",
    "244": "ScaffoldingClimb",
    "245": "CrossbowLoadingStart",
    "246": "CrossbowLoadingMiddle",
    "247": "CrossbowLoadingEnd",
    "248": "CrossbowShoot",
    "249": "CrossbowQuickChargeStart",
    "250": "CrossbowQuickChargeMiddle",
    "251": "CrossbowQuickChargeEnd",
    "252": "AmbientAggressive",
    "253": "AmbientWorried",
    "254": "CantBreed",
    "255": "ShieldBlock",
    "256": "LecternBookPlace",
    "257": "GrindstoneUse",
    "258": "Bell",
    "259": "CampfireCrackle",
    "260": "Roar",
    "261": "Stun",
    "262": "SweetBerryBushHurt",
    "263": "SweetBerryBushPick",
    "264": "CartographyTableUse",
    "265": "StonecutterUse",
    "266": "ComposterEmpty",
    "267": "ComposterFill",
    "268": "ComposterFillLayer",
    "269": "ComposterReady",
    "270": "BarrelOpen",
    "271": "BarrelClose",
    "272": "RaidHorn",
    "273": "LoomUse",
    "274": "AmbientInRaid",
    "275": "UicartographyTableUse",
    "276": "UistonecutterUse",
    "277": "UiloomUse",
    "278": "SmokerUse",
    "279": "BlastFurnaceUse",
    "280": "SmithingTableUse",
    "281": "Screech",
    "282": "Sleep",
    "283": "FurnaceUse",
    "284": "MooshroomConvert",
    "285": "MilkSuspiciously",
    "286": "Celebrate",
    "287": "JumpPrevent",
    "288": "AmbientPollinate",
    "289": "BeehiveDrip",
    "290": "BeehiveEnter",
    "291": "BeehiveExit",
    "292": "BeehiveWork",
    "293": "BeehiveShear",
    "294": "HoneybottleDrink",
    "295": "AmbientCave",
    "296": "Retreat",
    "297": "ConvertToZombified",
    "298": "Admire",
    "299": "StepLava",
    "300": "Tempt",
    "301": "Panic",
    "302": "Angry",
    "303": "AmbientMoodWarpedForest",
    "304": "AmbientMoodSoulsandValley",
    "305": "AmbientMoodNetherWastes",
    "306": "AmbientMoodBasaltDeltas",
    "307": "AmbientMoodCrimsonForest",
    "308": "RespawnAnchorCharge",
    "309": "RespawnAnchorDeplete",
    "310": "RespawnAnchorSetSpawn",
    "311": "RespawnAnchorAmbient",
    "312": "SoulEscapeQuiet",
    "313": "SoulEscapeLoud",
    "314": "RecordPigstep",
    "315": "LinkCompassToLodestone",
    "316": "UseSmithingTable",
    "317": "EquipNetherite",
    "318": "AmbientLoopWarpedForest",
    "319": "AmbientLoopSoulsandValley",
    "320": "AmbientLoopNetherWastes",
    "321": "AmbientLoopBasaltDeltas",
    "322": "AmbientLoopCrimsonForest",
    "323": "AmbientAdditionWarpedForest",
    "324": "AmbientAdditionSoulsandValley",
    "325": "AmbientAdditionNetherWastes",
    "326": "AmbientAdditionBasaltDeltas",
    "327": "AmbientAdditionCrimsonForest",
    "328": "SculkSensorPowerOn",
    "329": "SculkSensorPowerOff",
    "330": "BucketFillPowderSnow",
    "331": "BucketEmptyPowderSnow",
    "332": "PointedDripstoneCauldronDripWater",
    "333": "PointedDripstoneCauldronDripLava",
    "334": "PointedDripstoneDripWater",
    "335": "PointedDripstoneDripLava",
    "336": "CaveVinesPickBerries",
    "337": "BigDripleafTiltDown",
    "338": "BigDripleafTiltUp",
    "339": "CopperWaxOn",
    "340": "CopperWaxOff",
    "341": "Scrape",
    "342": "PlayerHurtDrown",
    "343": "PlayerHurtOnFire",
    "344": "PlayerHurtFreeze",
    "345": "UseSpyglass",
    "346": "StopUsingSpyglass",
    "347": "AmethystBlockChime",
    "348": "AmbientScreamer",
    "349": "HurtScreamer",
    "350": "DeathScreamer",
    "351": "MilkScreamer",
    "352": "JumpToBlock",
    "353": "PreRam",
    "354": "PreRamScreamer",
    "355": "RamImpact",
    "356": "RamImpactScreamer",
    "357": "SquidInkSquirt",
    "358": "GlowSquidInkSquirt",
    "359": "ConvertToStray",
    "360": "CakeAddCandle",
    "361": "ExtinguishCandle",
    "362": "AmbientCandle",
    "363": "BlockClick",
    "364": "BlockClickFail",
    "365": "SculkCatalystBloom",
    "366": "SculkShriekerShriek",
    "367": "WardenNearbyClose",
    "368": "WardenNearbyCloser",
    "369": "WardenNearbyClosest",
    "370": "WardenSlightlyAngry",
    "371": "RecordOtherside",
    "372": "Tongue",
    "373": "CrackIronGolem",
    "374": "RepairIronGolem",
    "375": "Listening",
    "376": "Heartbeat",
    "377": "HornBreak",
    "378": "SculkPlace",
    "379": "SculkSpread",
    "380": "SculkCharge",
    "381": "SculkSensorPlace",
    "382": "SculkShriekerPlace",
    "383": "goat_call_0",
    "384": "goat_call_1",
    "385": "goat_call_2",
    "386": "goat_call_3",
    "387": "goat_call_4",
    "388": "goat_call_5",
    "389": "goat_call_6",
    "390": "goat_call_7",
    "391": "goat_call_8",
    "392": "goat_call_9",
    "393": "goat_harmony_0",
    "394": "goat_harmony_1",
    "395": "goat_harmony_2",
    "396": "goat_harmony_3",
    "397": "goat_harmony_4",
    "398": "goat_harmony_5",
    "399": "goat_harmony_6",
    "400": "goat_harmony_7",
    "401": "goat_harmony_8",
    "402": "goat_harmony_9",
    "403": "goat_melody_0",
    "404": "goat_melody_1",
    "405": "goat_melody_2",
    "406": "goat_melody_3",
    "407": "goat_melody_4",
    "408": "goat_melody_5",
    "409": "goat_melody_6",
    "410": "goat_melody_7",
    "411": "goat_melody_8",
    "412": "goat_melody_9",
    "413": "goat_bass_0",
    "414": "goat_bass_1",
    "415": "goat_bass_2",
    "416": "goat_bass_3",
    "417": "goat_bass_4",
    "418": "goat_bass_5",
    "419": "goat_bass_6",
    "420": "goat_bass_7",
    "421": "goat_bass_8",
    "422": "goat_bass_9",
    "423": "_",
    "424": "_",
    "425": "_",
    "426": "ImitateWarden",
    "427": "ListeningAngry",
    "428": "ItemGiven",
    "429": "ItemTaken",
    "430": "Disappeared",
    "431": "Reappeared",
    "432": "DrinkMilk",
    "433": "FrogspawnHatched",
    "434": "LaySpawn",
    "435": "FrogspawnBreak",
    "436": "SonicBoom",
    "437": "SonicCharge",
    "438": "SoundeventItemThrown",
    "439": "Record5",
    "440": "ConvertToFrog",
    "441": "RecordPlaying",
    "442": "DrinkMilk",
    "443": "RecordPlaying",
    "444": "EnchantingTableUse",
    "445": "StepSand",
    "446": "DashReady",
    "447": "BundleDropContents",
    "448": "BundleInsert",
    "449": "BundleRemoveOne",
    "450": "PressurePlateClickOff",
    "451": "PressurePlateClickOn",
    "452": "ButtonClickOff",
    "453": "ButtonClickOn",
    "454": "DoorOpen",
    "455": "DoorClose",
    "456": "TrapdoorOpen",
    "457": "TrapdoorClose",
    "458": "FenceGateOpen",
    "459": "FenceGateClose",
    "460": "Insert",
    "461": "Pickup",
    "462": "InsertEnchanted",
    "463": "PickupEnchanted",
    "464": "Brush",
    "465": "BrushCompleted",
    "466": "ShatterDecoratedPot",
    "467": "BreakDecoratedPot",
    "468": "SnifferEggCrack",
    "469": "SnifferEggHatched",
    "470": "WaxedSignInteractFail",
    "471": "RecordRelic",
    "472": "Bump",
    "473": "PumpkinCarve",
    "474": "ConvertHuskToZombie",
    "475": "PigDeath",
    "476": "HoglinZombified",
    "477": "AmbientUnderwaterEnter",
    "478": "AmbientUnderwaterExit",
    "479": "bottle_fill",
    "480": "bottle_empty",
    "481": "crafter_craft",
    "482": "crafter_fail",
    "483": "block_decorated_pot_insert",
    "484": "block_decorated_pot_insert_fail",
    "485": "crafter_disable_slot",
    "486": "block_copper_bulb_turn_on",
    "487": "block_copper_bulb_turn_off"
  }
}
export interface LegacyEntityType {
  type: li32,
  mappings: {
    "10": "chicken",
    "11": "cow",
    "12": "pig",
    "13": "sheep",
    "14": "wolf",
    "15": "villager",
    "16": "mooshroom",
    "17": "squid",
    "18": "rabbit",
    "19": "bat",
    "20": "iron_golem",
    "21": "snow_golem",
    "22": "ocelot",
    "23": "horse",
    "24": "donkey",
    "25": "mule",
    "26": "skeleton_horse",
    "27": "zombie_horse",
    "28": "polar_bear",
    "29": "llama",
    "30": "parrot",
    "31": "dolphin",
    "32": "zombie",
    "33": "creeper",
    "34": "skeleton",
    "35": "spider",
    "36": "zombie_pigman",
    "37": "slime",
    "38": "enderman",
    "39": "silverfish",
    "40": "cave_spider",
    "41": "ghast",
    "42": "magma_cube",
    "43": "blaze",
    "44": "zombie_villager",
    "45": "witch",
    "46": "stray",
    "47": "husk",
    "48": "wither_skeleton",
    "49": "guardian",
    "50": "elder_guardian",
    "51": "npc",
    "52": "wither",
    "53": "ender_dragon",
    "54": "shulker",
    "55": "endermite",
    "56": "agent",
    "57": "vindicator",
    "58": "phantom",
    "61": "armor_stand",
    "62": "tripod_camera",
    "63": "player",
    "64": "item",
    "65": "tnt",
    "66": "falling_block",
    "67": "moving_block",
    "68": "xp_bottle",
    "69": "xp_orb",
    "70": "eye_of_ender_signal",
    "71": "ender_crystal",
    "72": "fireworks_rocket",
    "73": "thrown_trident",
    "74": "turtle",
    "75": "cat",
    "76": "shulker_bullet",
    "77": "fishing_hook",
    "78": "chalkboard",
    "79": "dragon_fireball",
    "80": "arrow",
    "81": "snowball",
    "82": "egg",
    "83": "painting",
    "84": "minecart",
    "85": "fireball",
    "86": "splash_potion",
    "87": "ender_pearl",
    "88": "leash_knot",
    "89": "wither_skull",
    "90": "boat",
    "91": "wither_skull_dangerous",
    "93": "lightning_bolt",
    "94": "small_fireball",
    "95": "area_effect_cloud",
    "96": "hopper_minecart",
    "97": "tnt_minecart",
    "98": "chest_minecart",
    "100": "command_block_minecart",
    "101": "lingering_potion",
    "102": "llama_spit",
    "103": "evocation_fang",
    "104": "evocation_illager",
    "105": "vex",
    "106": "ice_bomb",
    "107": "balloon",
    "108": "pufferfish",
    "109": "salmon",
    "110": "drowned",
    "111": "tropicalfish",
    "112": "cod",
    "113": "panda"
  }
}
export interface DeviceOS {
  type: li32,
  mappings: {
    "0": "Undefined",
    "1": "Android",
    "2": "IOS",
    "3": "OSX",
    "4": "FireOS",
    "5": "GearVR",
    "6": "Hololens",
    "7": "Win10",
    "8": "Win32",
    "9": "Dedicated",
    "10": "TVOS",
    "11": "Orbis",
    "12": "NintendoSwitch",
    "13": "Xbox",
    "14": "WindowsPhone",
    "15": "Linux"
  }
}
export interface AbilityLayers {
type: {
  type: lu16,
  mappings: {
    "0": "cache",
    "1": "base",
    "2": "spectator",
    "3": "commands",
    "4": "editor"
  }
}
allowed: AbilitySet
enabled: AbilitySet
fly_speed: lf32
walk_speed: lf32
}
export interface CameraPresets {
name: string
parent: string
position: Vec3fopts
rotation: Vec2fopts
audio_listener: u8
player_effects: bool
}
export interface DisconnectFailReason {
  type: zigzag32,
  mappings: {
    "0": "unknown",
    "1": "cant_connect_no_internet",
    "2": "no_permissions",
    "3": "unrecoverable_error",
    "4": "third_party_blocked",
    "5": "third_party_no_internet",
    "6": "third_party_bad_ip",
    "7": "third_party_no_server_or_server_locked",
    "8": "version_mismatch",
    "9": "skin_issue",
    "10": "invite_session_not_found",
    "11": "edu_level_settings_missing",
    "12": "local_server_not_found",
    "13": "legacy_disconnect",
    "14": "user_leave_game_attempted",
    "15": "platform_locked_skins_error",
    "16": "realms_world_unassigned",
    "17": "realms_server_cant_connect",
    "18": "realms_server_hidden",
    "19": "realms_server_disabled_beta",
    "20": "realms_server_disabled",
    "21": "cross_platform_disallowed",
    "22": "cant_connect",
    "23": "session_not_found",
    "24": "client_settings_incompatible_with_server",
    "25": "server_full",
    "26": "invalid_platform_skin",
    "27": "edition_version_mismatch",
    "28": "edition_mismatch",
    "29": "level_newer_than_exe_version",
    "30": "no_fail_occurred",
    "31": "banned_skin",
    "32": "timeout",
    "33": "server_not_found",
    "34": "outdated_server",
    "35": "outdated_client",
    "36": "no_premium_platform",
    "37": "multiplayer_disabled",
    "38": "no_wifi",
    "39": "world_corruption",
    "40": "no_reason",
    "41": "disconnected",
    "42": "invalid_player",
    "43": "logged_in_other_location",
    "44": "server_id_conflict",
    "45": "not_allowed",
    "46": "not_authenticated",
    "47": "invalid_tenant",
    "48": "unknown_packet",
    "49": "unexpected_packet",
    "50": "invalid_command_request_packet",
    "51": "host_suspended",
    "52": "login_packet_no_request",
    "53": "login_packet_no_cert",
    "54": "missing_client",
    "55": "kicked",
    "56": "kicked_for_exploit",
    "57": "kicked_for_idle",
    "58": "resource_pack_problem",
    "59": "incompatible_pack",
    "60": "out_of_storage",
    "61": "invalid_level",
    "62": "disconnect_packet_deprecated",
    "63": "block_mismatch",
    "64": "invalid_heights",
    "65": "invalid_widths",
    "66": "connection_lost",
    "67": "zombie_connection",
    "68": "shutdown",
    "69": "reason_not_set",
    "70": "loading_state_timeout",
    "71": "resource_pack_loading_failed",
    "72": "searching_for_session_loading_screen_failed",
    "73": "conn_protocol_version",
    "74": "subsystem_status_error",
    "75": "empty_auth_from_discovery",
    "76": "empty_url_from_discovery",
    "77": "expired_auth_from_discovery",
    "78": "unknown_signal_service_sign_in_failure",
    "79": "xbl_join_lobby_failure",
    "80": "unspecified_client_instance_disconnection",
    "81": "conn_session_not_found",
    "82": "conn_create_peer_connection",
    "83": "conn_ice",
    "84": "conn_connect_request",
    "85": "conn_connect_response",
    "86": "conn_negotiation_timeout",
    "87": "conn_inactivity_timeout",
    "88": "stale_connection_being_replaced",
    "89": "realms_session_not_found",
    "90": "bad_packet"
  }
}
export interface mcpe_packet {
name: {
  type: varint,
  mappings: {
    "1": "login",
    "2": "play_status",
    "3": "server_to_client_handshake",
    "4": "client_to_server_handshake",
    "5": "disconnect",
    "6": "resource_packs_info",
    "7": "resource_pack_stack",
    "8": "resource_pack_client_response",
    "9": "text",
    "10": "set_time",
    "11": "start_game",
    "12": "add_player",
    "13": "add_entity",
    "14": "remove_entity",
    "15": "add_item_entity",
    "16": "server_post_move",
    "17": "take_item_entity",
    "18": "move_entity",
    "19": "move_player",
    "20": "rider_jump",
    "21": "update_block",
    "22": "add_painting",
    "23": "tick_sync",
    "24": "level_sound_event_old",
    "25": "level_event",
    "26": "block_event",
    "27": "entity_event",
    "28": "mob_effect",
    "29": "update_attributes",
    "30": "inventory_transaction",
    "31": "mob_equipment",
    "32": "mob_armor_equipment",
    "33": "interact",
    "34": "block_pick_request",
    "35": "entity_pick_request",
    "36": "player_action",
    "38": "hurt_armor",
    "39": "set_entity_data",
    "40": "set_entity_motion",
    "41": "set_entity_link",
    "42": "set_health",
    "43": "set_spawn_position",
    "44": "animate",
    "45": "respawn",
    "46": "container_open",
    "47": "container_close",
    "48": "player_hotbar",
    "49": "inventory_content",
    "50": "inventory_slot",
    "51": "container_set_data",
    "52": "crafting_data",
    "53": "crafting_event",
    "54": "gui_data_pick_item",
    "55": "adventure_settings",
    "56": "block_entity_data",
    "57": "player_input",
    "58": "level_chunk",
    "59": "set_commands_enabled",
    "60": "set_difficulty",
    "61": "change_dimension",
    "62": "set_player_game_type",
    "63": "player_list",
    "64": "simple_event",
    "65": "event",
    "66": "spawn_experience_orb",
    "67": "clientbound_map_item_data",
    "68": "map_info_request",
    "69": "request_chunk_radius",
    "70": "chunk_radius_update",
    "71": "item_frame_drop_item",
    "72": "game_rules_changed",
    "73": "camera",
    "74": "boss_event",
    "75": "show_credits",
    "76": "available_commands",
    "77": "command_request",
    "78": "command_block_update",
    "79": "command_output",
    "80": "update_trade",
    "81": "update_equipment",
    "82": "resource_pack_data_info",
    "83": "resource_pack_chunk_data",
    "84": "resource_pack_chunk_request",
    "85": "transfer",
    "86": "play_sound",
    "87": "stop_sound",
    "88": "set_title",
    "89": "add_behavior_tree",
    "90": "structure_block_update",
    "91": "show_store_offer",
    "92": "purchase_receipt",
    "93": "player_skin",
    "94": "sub_client_login",
    "95": "initiate_web_socket_connection",
    "96": "set_last_hurt_by",
    "97": "book_edit",
    "98": "npc_request",
    "99": "photo_transfer",
    "100": "modal_form_request",
    "101": "modal_form_response",
    "102": "server_settings_request",
    "103": "server_settings_response",
    "104": "show_profile",
    "105": "set_default_game_type",
    "106": "remove_objective",
    "107": "set_display_objective",
    "108": "set_score",
    "109": "lab_table",
    "110": "update_block_synced",
    "111": "move_entity_delta",
    "112": "set_scoreboard_identity",
    "113": "set_local_player_as_initialized",
    "114": "update_soft_enum",
    "115": "network_stack_latency",
    "117": "script_custom_event",
    "118": "spawn_particle_effect",
    "119": "available_entity_identifiers",
    "120": "level_sound_event_v2",
    "121": "network_chunk_publisher_update",
    "122": "biome_definition_list",
    "123": "level_sound_event",
    "124": "level_event_generic",
    "125": "lectern_update",
    "126": "video_stream_connect",
    "127": "add_ecs_entity",
    "128": "remove_ecs_entity",
    "129": "client_cache_status",
    "130": "on_screen_texture_animation",
    "131": "map_create_locked_copy",
    "132": "structure_template_data_export_request",
    "133": "structure_template_data_export_response",
    "134": "update_block_properties",
    "135": "client_cache_blob_status",
    "136": "client_cache_miss_response",
    "137": "education_settings",
    "138": "emote",
    "139": "multiplayer_settings",
    "140": "settings_command",
    "141": "anvil_damage",
    "142": "completed_using_item",
    "143": "network_settings",
    "144": "player_auth_input",
    "145": "creative_content",
    "146": "player_enchant_options",
    "147": "item_stack_request",
    "148": "item_stack_response",
    "149": "player_armor_damage",
    "151": "update_player_game_type",
    "152": "emote_list",
    "153": "position_tracking_db_broadcast",
    "154": "position_tracking_db_request",
    "156": "packet_violation_warning",
    "157": "motion_prediction_hints",
    "158": "animate_entity",
    "159": "camera_shake",
    "160": "player_fog",
    "161": "correct_player_move_prediction",
    "162": "item_component",
    "163": "filter_text_packet",
    "164": "debug_renderer",
    "165": "sync_entity_property",
    "166": "add_volume_entity",
    "167": "remove_volume_entity",
    "168": "simulation_type",
    "169": "npc_dialogue",
    "170": "edu_uri_resource_packet",
    "171": "create_photo",
    "172": "update_subchunk_blocks",
    "173": "photo_info_request",
    "174": "subchunk",
    "175": "subchunk_request",
    "176": "client_start_item_cooldown",
    "177": "script_message",
    "178": "code_builder_source",
    "179": "ticking_areas_load_status",
    "180": "dimension_data",
    "181": "agent_action",
    "182": "change_mob_property",
    "183": "lesson_progress",
    "184": "request_ability",
    "185": "request_permissions",
    "186": "toast_request",
    "187": "update_abilities",
    "188": "update_adventure_settings",
    "189": "death_info",
    "190": "editor_network",
    "191": "feature_registry",
    "192": "server_stats",
    "193": "request_network_settings",
    "194": "game_test_request",
    "195": "game_test_results",
    "196": "update_client_input_locks",
    "197": "client_cheat_ability",
    "198": "camera_presets",
    "199": "unlocked_recipes",
    "300": "camera_instruction",
    "301": "compressed_biome_definitions",
    "302": "trim_data",
    "303": "open_sign",
    "304": "agent_animation",
    "305": "refresh_entitlements",
    "306": "toggle_crafter_slot_request",
    "307": "set_player_inventory_options"
  }
}
params: {
login:packet_login,
play_status:packet_play_status,
server_to_client_handshake:packet_server_to_client_handshake,
client_to_server_handshake:packet_client_to_server_handshake,
disconnect:packet_disconnect,
resource_packs_info:packet_resource_packs_info,
resource_pack_stack:packet_resource_pack_stack,
resource_pack_client_response:packet_resource_pack_client_response,
text:packet_text,
set_time:packet_set_time,
start_game:packet_start_game,
add_player:packet_add_player,
add_entity:packet_add_entity,
remove_entity:packet_remove_entity,
add_item_entity:packet_add_item_entity,
take_item_entity:packet_take_item_entity,
move_entity:packet_move_entity,
move_player:packet_move_player,
rider_jump:packet_rider_jump,
update_block:packet_update_block,
add_painting:packet_add_painting,
tick_sync:packet_tick_sync,
level_sound_event_old:packet_level_sound_event_old,
level_event:packet_level_event,
block_event:packet_block_event,
entity_event:packet_entity_event,
mob_effect:packet_mob_effect,
update_attributes:packet_update_attributes,
inventory_transaction:packet_inventory_transaction,
mob_equipment:packet_mob_equipment,
mob_armor_equipment:packet_mob_armor_equipment,
interact:packet_interact,
block_pick_request:packet_block_pick_request,
entity_pick_request:packet_entity_pick_request,
player_action:packet_player_action,
hurt_armor:packet_hurt_armor,
set_entity_data:packet_set_entity_data,
set_entity_motion:packet_set_entity_motion,
set_entity_link:packet_set_entity_link,
set_health:packet_set_health,
set_spawn_position:packet_set_spawn_position,
animate:packet_animate,
respawn:packet_respawn,
container_open:packet_container_open,
container_close:packet_container_close,
player_hotbar:packet_player_hotbar,
inventory_content:packet_inventory_content,
inventory_slot:packet_inventory_slot,
container_set_data:packet_container_set_data,
crafting_data:packet_crafting_data,
crafting_event:packet_crafting_event,
gui_data_pick_item:packet_gui_data_pick_item,
adventure_settings:packet_adventure_settings,
block_entity_data:packet_block_entity_data,
player_input:packet_player_input,
level_chunk:packet_level_chunk,
set_commands_enabled:packet_set_commands_enabled,
set_difficulty:packet_set_difficulty,
change_dimension:packet_change_dimension,
set_player_game_type:packet_set_player_game_type,
player_list:packet_player_list,
simple_event:packet_simple_event,
event:packet_event,
spawn_experience_orb:packet_spawn_experience_orb,
clientbound_map_item_data:packet_clientbound_map_item_data,
map_info_request:packet_map_info_request,
request_chunk_radius:packet_request_chunk_radius,
chunk_radius_update:packet_chunk_radius_update,
item_frame_drop_item:packet_item_frame_drop_item,
game_rules_changed:packet_game_rules_changed,
camera:packet_camera,
boss_event:packet_boss_event,
show_credits:packet_show_credits,
available_commands:packet_available_commands,
command_request:packet_command_request,
command_block_update:packet_command_block_update,
command_output:packet_command_output,
update_trade:packet_update_trade,
update_equipment:packet_update_equipment,
resource_pack_data_info:packet_resource_pack_data_info,
resource_pack_chunk_data:packet_resource_pack_chunk_data,
resource_pack_chunk_request:packet_resource_pack_chunk_request,
transfer:packet_transfer,
play_sound:packet_play_sound,
stop_sound:packet_stop_sound,
set_title:packet_set_title,
add_behavior_tree:packet_add_behavior_tree,
structure_block_update:packet_structure_block_update,
show_store_offer:packet_show_store_offer,
purchase_receipt:packet_purchase_receipt,
player_skin:packet_player_skin,
sub_client_login:packet_sub_client_login,
initiate_web_socket_connection:packet_initiate_web_socket_connection,
set_last_hurt_by:packet_set_last_hurt_by,
book_edit:packet_book_edit,
npc_request:packet_npc_request,
photo_transfer:packet_photo_transfer,
modal_form_request:packet_modal_form_request,
modal_form_response:packet_modal_form_response,
server_settings_request:packet_server_settings_request,
server_settings_response:packet_server_settings_response,
show_profile:packet_show_profile,
set_default_game_type:packet_set_default_game_type,
remove_objective:packet_remove_objective,
set_display_objective:packet_set_display_objective,
set_score:packet_set_score,
lab_table:packet_lab_table,
update_block_synced:packet_update_block_synced,
move_entity_delta:packet_move_entity_delta,
set_scoreboard_identity:packet_set_scoreboard_identity,
set_local_player_as_initialized:packet_set_local_player_as_initialized,
update_soft_enum:packet_update_soft_enum,
network_stack_latency:packet_network_stack_latency,
script_custom_event:packet_script_custom_event,
spawn_particle_effect:packet_spawn_particle_effect,
available_entity_identifiers:packet_available_entity_identifiers,
level_sound_event_v2:packet_level_sound_event_v2,
network_chunk_publisher_update:packet_network_chunk_publisher_update,
biome_definition_list:packet_biome_definition_list,
level_sound_event:packet_level_sound_event,
level_event_generic:packet_level_event_generic,
lectern_update:packet_lectern_update,
video_stream_connect:packet_video_stream_connect,
add_ecs_entity:packet_add_ecs_entity,
remove_ecs_entity:packet_remove_ecs_entity,
client_cache_status:packet_client_cache_status,
on_screen_texture_animation:packet_on_screen_texture_animation,
map_create_locked_copy:packet_map_create_locked_copy,
structure_template_data_export_request:packet_structure_template_data_export_request,
structure_template_data_export_response:packet_structure_template_data_export_response,
update_block_properties:packet_update_block_properties,
client_cache_blob_status:packet_client_cache_blob_status,
client_cache_miss_response:packet_client_cache_miss_response,
education_settings:packet_education_settings,
emote:packet_emote,
multiplayer_settings:packet_multiplayer_settings,
settings_command:packet_settings_command,
anvil_damage:packet_anvil_damage,
completed_using_item:packet_completed_using_item,
network_settings:packet_network_settings,
player_auth_input:packet_player_auth_input,
creative_content:packet_creative_content,
player_enchant_options:packet_player_enchant_options,
item_stack_request:packet_item_stack_request,
item_stack_response:packet_item_stack_response,
player_armor_damage:packet_player_armor_damage,
update_player_game_type:packet_update_player_game_type,
emote_list:packet_emote_list,
position_tracking_db_request:packet_position_tracking_db_request,
position_tracking_db_broadcast:packet_position_tracking_db_broadcast,
packet_violation_warning:packet_packet_violation_warning,
motion_prediction_hints:packet_motion_prediction_hints,
animate_entity:packet_animate_entity,
camera_shake:packet_camera_shake,
player_fog:packet_player_fog,
correct_player_move_prediction:packet_correct_player_move_prediction,
item_component:packet_item_component,
filter_text_packet:packet_filter_text_packet,
debug_renderer:packet_debug_renderer,
sync_entity_property:packet_sync_entity_property,
add_volume_entity:packet_add_volume_entity,
remove_volume_entity:packet_remove_volume_entity,
simulation_type:packet_simulation_type,
npc_dialogue:packet_npc_dialogue,
edu_uri_resource_packet:packet_edu_uri_resource_packet,
create_photo:packet_create_photo,
update_subchunk_blocks:packet_update_subchunk_blocks,
photo_info_request:packet_photo_info_request,
subchunk:packet_subchunk,
subchunk_request:packet_subchunk_request,
client_start_item_cooldown:packet_client_start_item_cooldown,
script_message:packet_script_message,
code_builder_source:packet_code_builder_source,
ticking_areas_load_status:packet_ticking_areas_load_status,
dimension_data:packet_dimension_data,
agent_action:packet_agent_action,
change_mob_property:packet_change_mob_property,
lesson_progress:packet_lesson_progress,
request_ability:packet_request_ability,
request_permissions:packet_request_permissions,
toast_request:packet_toast_request,
update_abilities:packet_update_abilities,
update_adventure_settings:packet_update_adventure_settings,
death_info:packet_death_info,
editor_network:packet_editor_network,
feature_registry:packet_feature_registry,
server_stats:packet_server_stats,
request_network_settings:packet_request_network_settings,
game_test_request:packet_game_test_request,
game_test_results:packet_game_test_results,
update_client_input_locks:packet_update_client_input_locks,
client_cheat_ability:packet_client_cheat_ability,
camera_presets:packet_camera_presets,
unlocked_recipes:packet_unlocked_recipes,
camera_instruction:packet_camera_instruction,
compressed_biome_definitions:packet_compressed_biome_definitions,
trim_data:packet_trim_data,
open_sign:packet_open_sign,
agent_animation:packet_agent_animation,
refresh_entitlements:packet_refresh_entitlements,
toggle_crafter_slot_request:packet_toggle_crafter_slot_request,
set_player_inventory_options:packet_set_player_inventory_options,
server_post_move:packet_server_post_move
}
}
export interface packet_login {
protocol_version: i32
tokens: {
    "lengthType": "varint",
    "type": "LoginTokens"
}
}
export interface LoginTokens {
identity: LittleString
client: LittleString
}
export interface packet_play_status {
status: {
  type: i32,
  mappings: {
    "0": "login_success",
    "1": "failed_client",
    "2": "failed_spawn",
    "3": "player_spawn",
    "4": "failed_invalid_tenant",
    "5": "failed_vanilla_edu",
    "6": "failed_edu_vanilla",
    "7": "failed_server_full",
    "8": "failed_editor_vanilla_mismatch",
    "9": "failed_vanilla_editor_mismatch"
  }
}
}
export interface packet_server_to_client_handshake {
token: string
}
export interface packet_client_to_server_handshake {

}
export interface packet_disconnect {
reason: DisconnectFailReason
hide_disconnect_reason: bool
message: string
}
export interface packet_resource_packs_info {
must_accept: bool
has_scripts: bool
force_server_packs: bool
behaviour_packs: BehaviourPackInfos
texture_packs: TexturePackInfos
resource_pack_links: {varint:{
id: string
url: string
}[]}
}
export interface packet_resource_pack_stack {
must_accept: bool
behavior_packs: ResourcePackIdVersions
resource_packs: ResourcePackIdVersions
game_version: string
experiments: Experiments
experiments_previously_used: bool
}
export interface packet_resource_pack_client_response {
response_status: {
  type: u8,
  mappings: {
    "0": "none",
    "1": "refused",
    "2": "send_packs",
    "3": "have_all_packs",
    "4": "completed"
  }
}
resourcepackids: ResourcePackIds
}
export interface packet_text {
type: {
  type: u8,
  mappings: {
    "0": "raw",
    "1": "chat",
    "2": "translation",
    "3": "popup",
    "4": "jukebox_popup",
    "5": "tip",
    "6": "system",
    "7": "whisper",
    "8": "announcement",
    "9": "json_whisper",
    "10": "json",
    "11": "json_announcement"
  }
}
needs_translation: bool
undefined: {
    "compareTo": "type",
    "fields": {
        "chat": [
            "container",
            [
                {
                    "name": "source_name",
                    "type": "string"
                },
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "whisper": [
            "container",
            [
                {
                    "name": "source_name",
                    "type": "string"
                },
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "announcement": [
            "container",
            [
                {
                    "name": "source_name",
                    "type": "string"
                },
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "raw": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "tip": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "system": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "json_whisper": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "json": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "json_announcement": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        ],
        "translation": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                },
                {
                    "name": "parameters",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "string"
                        }
                    ]
                }
            ]
        ],
        "popup": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                },
                {
                    "name": "parameters",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "string"
                        }
                    ]
                }
            ]
        ],
        "jukebox_popup": [
            "container",
            [
                {
                    "name": "message",
                    "type": "string"
                },
                {
                    "name": "parameters",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "string"
                        }
                    ]
                }
            ]
        ]
    },
    "default": "void"
}
xuid: string
platform_chat_id: string
}
export interface packet_set_time {
time: zigzag32
}
export interface packet_start_game {
entity_id: zigzag64
runtime_entity_id: varint64
player_gamemode: GameMode
player_position: vec3f
rotation: vec2f
seed: lu64
biome_type: li16
biome_name: string
dimension: {
  type: zigzag32,
  mappings: {
    "0": "overworld",
    "1": "nether",
    "2": "end"
  }
}
generator: zigzag32
world_gamemode: GameMode
difficulty: zigzag32
spawn_position: BlockCoordinates
achievements_disabled: bool
editor_world_type: {
  type: zigzag32,
  mappings: {
    "0": "not_editor",
    "1": "project",
    "2": "test_level"
  }
}
created_in_editor: bool
exported_from_editor: bool
day_cycle_stop_time: zigzag32
edu_offer: zigzag32
edu_features_enabled: bool
edu_product_uuid: string
rain_level: lf32
lightning_level: lf32
has_confirmed_platform_locked_content: bool
is_multiplayer: bool
broadcast_to_lan: bool
xbox_live_broadcast_mode: varint
platform_broadcast_mode: varint
enable_commands: bool
is_texturepacks_required: bool
gamerules: GameRules
experiments: Experiments
experiments_previously_used: bool
bonus_chest: bool
map_enabled: bool
permission_level: PermissionLevel
server_chunk_tick_range: li32
has_locked_behavior_pack: bool
has_locked_resource_pack: bool
is_from_locked_world_template: bool
msa_gamertags_only: bool
is_from_world_template: bool
is_world_template_option_locked: bool
only_spawn_v1_villagers: bool
persona_disabled: bool
custom_skins_disabled: bool
emote_chat_muted: bool
game_version: string
limited_world_width: li32
limited_world_length: li32
is_new_nether: bool
edu_resource_uri: EducationSharedResourceURI
experimental_gameplay_override: bool
chat_restriction_level: {
  type: u8,
  mappings: {
    "0": "none",
    "1": "dropped",
    "2": "disabled"
  }
}
disable_player_interactions: bool
level_id: string
world_name: string
premium_world_template_id: string
is_trial: bool
movement_authority: {
  type: zigzag32,
  mappings: {
    "0": "client",
    "1": "server",
    "2": "server_with_rewind"
  }
}
rewind_history_size: zigzag32
server_authoritative_block_breaking: bool
current_tick: li64
enchantment_seed: zigzag32
block_properties: BlockProperties
itemstates: Itemstates
multiplayer_correlation_id: string
server_authoritative_inventory: bool
engine: string
property_data: nbt
block_pallette_checksum: lu64
world_template_id: uuid
client_side_generation: bool
block_network_ids_are_hashes: bool
server_controlled_sound: bool
}
export interface packet_add_player {
uuid: uuid
username: string
runtime_id: varint64
platform_chat_id: string
position: vec3f
velocity: vec3f
pitch: lf32
yaw: lf32
head_yaw: lf32
held_item: Item
gamemode: GameMode
metadata: MetadataDictionary
properties: EntityProperties
unique_id: li64
permission_level: PermissionLevel
command_permission: CommandPermissionLevel
abilities: {u8:AbilityLayers[]}
links: Links
device_id: string
device_os: DeviceOS
}
export interface packet_add_entity {
unique_id: zigzag64
runtime_id: varint64
entity_type: string
position: vec3f
velocity: vec3f
pitch: lf32
yaw: lf32
head_yaw: lf32
body_yaw: lf32
attributes: EntityAttributes
metadata: MetadataDictionary
properties: EntityProperties
links: Links
}
export interface packet_remove_entity {
entity_id_self: zigzag64
}
export interface packet_add_item_entity {
entity_id_self: zigzag64
runtime_entity_id: varint64
item: Item
position: vec3f
velocity: vec3f
metadata: MetadataDictionary
is_from_fishing: bool
}
export interface packet_take_item_entity {
runtime_entity_id: varint64
target: varint
}
export interface packet_move_entity {
runtime_entity_id: varint64
flags: u8
position: vec3f
rotation: Rotation
}
export interface packet_move_player {
runtime_id: varint
position: vec3f
pitch: lf32
yaw: lf32
head_yaw: lf32
mode: {
  type: u8,
  mappings: {
    "0": "normal",
    "1": "reset",
    "2": "teleport",
    "3": "rotation"
  }
}
on_ground: bool
ridden_runtime_id: varint
teleport: {
    "compareTo": "mode",
    "fields": {
        "teleport": [
            "container",
            [
                {
                    "name": "cause",
                    "type": [
                        "mapper",
                        {
                            "type": "li32",
                            "mappings": {
                                "0": "unknown",
                                "1": "projectile",
                                "2": "chorus_fruit",
                                "3": "command",
                                "4": "behavior"
                            }
                        }
                    ]
                },
                {
                    "name": "source_entity_type",
                    "type": "LegacyEntityType"
                }
            ]
        ]
    },
    "default": "void"
}
tick: varint64
}
export interface packet_rider_jump {
jump_strength: zigzag32
}
export interface packet_update_block {
position: BlockCoordinates
block_runtime_id: varint
flags: UpdateBlockFlags
layer: varint
}
export interface packet_add_painting {
entity_id_self: zigzag64
runtime_entity_id: varint64
coordinates: vec3f
direction: zigzag32
title: string
}
export interface packet_tick_sync {
request_time: li64
response_time: li64
}
export interface packet_level_sound_event_old {
sound_id: u8
position: vec3f
block_id: zigzag32
entity_type: zigzag32
is_baby_mob: bool
is_global: bool
}
export interface packet_level_event {
event: {
  type: zigzag32,
  mappings: {
    "1000": "sound_click",
    "1001": "sound_click_fail",
    "1002": "sound_shoot",
    "1003": "sound_door",
    "1004": "sound_fizz",
    "1005": "sound_ignite",
    "1007": "sound_ghast",
    "1008": "sound_ghast_shoot",
    "1009": "sound_blaze_shoot",
    "1010": "sound_door_bump",
    "1012": "sound_door_crash",
    "1018": "sound_enderman_teleport",
    "1020": "sound_anvil_break",
    "1021": "sound_anvil_use",
    "1022": "sound_anvil_fall",
    "1030": "sound_pop",
    "1032": "sound_portal",
    "1040": "sound_itemframe_add_item",
    "1041": "sound_itemframe_remove",
    "1042": "sound_itemframe_place",
    "1043": "sound_itemframe_remove_item",
    "1044": "sound_itemframe_rotate_item",
    "1050": "sound_camera",
    "1051": "sound_orb",
    "1052": "sound_totem",
    "1060": "sound_armor_stand_break",
    "1061": "sound_armor_stand_hit",
    "1062": "sound_armor_stand_fall",
    "1063": "sound_armor_stand_place",
    "1064": "pointed_dripstone_land",
    "1065": "dye_used",
    "1066": "ink_sack_used",
    "2000": "particle_shoot",
    "2001": "particle_destroy",
    "2002": "particle_splash",
    "2003": "particle_eye_despawn",
    "2004": "particle_spawn",
    "2005": "particle_crop_growth",
    "2006": "particle_guardian_curse",
    "2007": "particle_death_smoke",
    "2008": "particle_block_force_field",
    "2009": "particle_projectile_hit",
    "2010": "particle_dragon_egg_teleport",
    "2011": "particle_crop_eaten",
    "2012": "particle_critical",
    "2013": "particle_enderman_teleport",
    "2014": "particle_punch_block",
    "2015": "particle_bubble",
    "2016": "particle_evaporate",
    "2017": "particle_destroy_armor_stand",
    "2018": "particle_breaking_egg",
    "2019": "particle_destroy_egg",
    "2020": "particle_evaporate_water",
    "2021": "particle_destroy_block_no_sound",
    "2022": "particle_knockback_roar",
    "2023": "particle_teleport_trail",
    "2024": "particle_point_cloud",
    "2025": "particle_explosion",
    "2026": "particle_block_explosion",
    "2027": "particle_vibration_signal",
    "2028": "particle_dripstone_drip",
    "2029": "particle_fizz_effect",
    "2030": "particle_wax_on",
    "2031": "particle_wax_off",
    "2032": "particle_scrape",
    "2033": "particle_electric_spark",
    "2034": "particle_turtle_egg",
    "2035": "particle_sculk_shriek",
    "2036": "sculk_catalyst_bloom",
    "2037": "sculk_charge",
    "2038": "sculk_charge_pop",
    "2039": "sonic_explosion",
    "2040": "dust_plume",
    "3001": "start_rain",
    "3002": "start_thunder",
    "3003": "stop_rain",
    "3004": "stop_thunder",
    "3005": "pause_game",
    "3006": "pause_game_no_screen",
    "3007": "set_game_speed",
    "3500": "redstone_trigger",
    "3501": "cauldron_explode",
    "3502": "cauldron_dye_armor",
    "3503": "cauldron_clean_armor",
    "3504": "cauldron_fill_potion",
    "3505": "cauldron_take_potion",
    "3506": "cauldron_fill_water",
    "3507": "cauldron_take_water",
    "3508": "cauldron_add_dye",
    "3509": "cauldron_clean_banner",
    "3600": "block_start_break",
    "3601": "block_stop_break",
    "3602": "block_break_speed",
    "3603": "particle_punch_block_down",
    "3604": "particle_punch_block_up",
    "3605": "particle_punch_block_north",
    "3606": "particle_punch_block_south",
    "3607": "particle_punch_block_west",
    "3608": "particle_punch_block_east",
    "3609": "particle_shoot_white_smoke",
    "4000": "set_data",
    "9800": "players_sleeping",
    "9801": "sleeping_players",
    "16384": "add_particle_mask",
    "16385": "add_particle_bubble",
    "16386": "add_particle_bubble_manual",
    "16387": "add_particle_critical",
    "16388": "add_particle_block_force_field",
    "16389": "add_particle_smoke",
    "16390": "add_particle_explode",
    "16391": "add_particle_evaporation",
    "16392": "add_particle_flame",
    "16393": "add_particle_candle_flame",
    "16394": "add_particle_lava",
    "16395": "add_particle_large_smoke",
    "16396": "add_particle_redstone",
    "16397": "add_particle_rising_red_dust",
    "16398": "add_particle_item_break",
    "16399": "add_particle_snowball_poof",
    "16400": "add_particle_huge_explode",
    "16401": "add_particle_huge_explode_seed",
    "16402": "add_particle_mob_flame",
    "16403": "add_particle_heart",
    "16404": "add_particle_terrain",
    "16405": "add_particle_town_aura",
    "16406": "add_particle_portal",
    "16408": "add_particle_water_splash",
    "16409": "add_particle_water_splash_manual",
    "16410": "add_particle_water_wake",
    "16411": "add_particle_drip_water",
    "16412": "add_particle_drip_lava",
    "16413": "add_particle_drip_honey",
    "16414": "add_particle_stalactite_drip_water",
    "16415": "add_particle_stalactite_drip_lava",
    "16416": "add_particle_falling_dust",
    "16417": "add_particle_mob_spell",
    "16418": "add_particle_mob_spell_ambient",
    "16419": "add_particle_mob_spell_instantaneous",
    "16420": "add_particle_ink",
    "16421": "add_particle_slime",
    "16422": "add_particle_rain_splash",
    "16423": "add_particle_villager_angry",
    "16424": "add_particle_villager_happy",
    "16425": "add_particle_enchantment_table",
    "16426": "add_particle_tracking_emitter",
    "16427": "add_particle_note",
    "16428": "add_particle_witch_spell",
    "16429": "add_particle_carrot",
    "16430": "add_particle_mob_appearance",
    "16431": "add_particle_end_rod",
    "16432": "add_particle_dragons_breath",
    "16433": "add_particle_spit",
    "16434": "add_particle_totem",
    "16435": "add_particle_food",
    "16436": "add_particle_fireworks_starter",
    "16437": "add_particle_fireworks_spark",
    "16438": "add_particle_fireworks_overlay",
    "16439": "add_particle_balloon_gas",
    "16440": "add_particle_colored_flame",
    "16441": "add_particle_sparkler",
    "16442": "add_particle_conduit",
    "16443": "add_particle_bubble_column_up",
    "16444": "add_particle_bubble_column_down",
    "16445": "add_particle_sneeze",
    "16446": "add_particle_shulker_bullet",
    "16447": "add_particle_bleach",
    "16448": "add_particle_dragon_destroy_block",
    "16449": "add_particle_mycelium_dust",
    "16450": "add_particle_falling_red_dust",
    "16451": "add_particle_campfire_smoke",
    "16452": "add_particle_tall_campfire_smoke",
    "16453": "add_particle_dragon_breath_fire",
    "16454": "add_particle_dragon_breath_trail",
    "16455": "add_particle_blue_flame",
    "16456": "add_particle_soul",
    "16457": "add_particle_obsidian_tear",
    "16458": "add_particle_portal_reverse",
    "16459": "add_particle_snowflake",
    "16460": "add_particle_vibration_signal",
    "16461": "add_particle_sculk_sensor_redstone",
    "16462": "add_particle_spore_blossom_shower",
    "16463": "add_particle_spore_blossom_ambient",
    "16464": "add_particle_wax",
    "16465": "add_particle_electric_spark"
  }
}
position: vec3f
data: zigzag32
}
export interface packet_block_event {
position: BlockCoordinates
type: {
  type: zigzag32,
  mappings: {
    "0": "sound",
    "1": "change_state"
  }
}
data: zigzag32
}
export interface packet_entity_event {
runtime_entity_id: varint64
event_id: {
  type: u8,
  mappings: {
    "1": "jump",
    "2": "hurt_animation",
    "3": "death_animation",
    "4": "arm_swing",
    "5": "stop_attack",
    "6": "tame_fail",
    "7": "tame_success",
    "8": "shake_wet",
    "9": "use_item",
    "10": "eat_grass_animation",
    "11": "fish_hook_bubble",
    "12": "fish_hook_position",
    "13": "fish_hook_hook",
    "14": "fish_hook_tease",
    "15": "squid_ink_cloud",
    "16": "zombie_villager_cure",
    "18": "respawn",
    "19": "iron_golem_offer_flower",
    "20": "iron_golem_withdraw_flower",
    "21": "love_particles",
    "22": "villager_angry",
    "23": "villager_happy",
    "24": "witch_spell_particles",
    "25": "firework_particles",
    "26": "in_love_particles",
    "27": "silverfish_spawn_animation",
    "28": "guardian_attack",
    "29": "witch_drink_potion",
    "30": "witch_throw_potion",
    "31": "minecart_tnt_prime_fuse",
    "32": "creeper_prime_fuse",
    "33": "air_supply_expired",
    "34": "player_add_xp_levels",
    "35": "elder_guardian_curse",
    "36": "agent_arm_swing",
    "37": "ender_dragon_death",
    "38": "dust_particles",
    "39": "arrow_shake",
    "57": "eating_item",
    "60": "baby_animal_feed",
    "61": "death_smoke_cloud",
    "62": "complete_trade",
    "63": "remove_leash",
    "64": "caravan",
    "65": "consume_totem",
    "66": "player_check_treasure_hunter_achievement",
    "67": "entity_spawn",
    "68": "dragon_puke",
    "69": "item_entity_merge",
    "70": "start_swim",
    "71": "balloon_pop",
    "72": "treasure_hunt",
    "73": "agent_summon",
    "74": "charged_item",
    "75": "fall",
    "76": "grow_up",
    "77": "vibration_detected",
    "78": "drink_milk"
  }
}
data: zigzag32
}
export interface packet_mob_effect {
runtime_entity_id: varint64
event_id: {
  type: u8,
  mappings: {
    "1": "add",
    "2": "update",
    "3": "remove"
  }
}
effect_id: zigzag32
amplifier: zigzag32
particles: bool
duration: zigzag32
}
export interface packet_update_attributes {
runtime_entity_id: varint64
attributes: PlayerAttributes
tick: varint64
}
export interface packet_inventory_transaction {
transaction: Transaction
}
export interface packet_mob_equipment {
runtime_entity_id: varint64
item: Item
slot: u8
selected_slot: u8
window_id: WindowID
}
export interface packet_mob_armor_equipment {
runtime_entity_id: varint64
helmet: Item
chestplate: Item
leggings: Item
boots: Item
}
export interface packet_interact {
action_id: {
  type: u8,
  mappings: {
    "3": "leave_vehicle",
    "4": "mouse_over_entity",
    "5": "npc_open",
    "6": "open_inventory"
  }
}
target_entity_id: varint64
position: {
    "compareTo": "action_id",
    "fields": {
        "mouse_over_entity": "vec3f",
        "leave_vehicle": "vec3f"
    },
    "default": "void"
}
}
export interface packet_block_pick_request {
x: zigzag32
y: zigzag32
z: zigzag32
add_user_data: bool
selected_slot: u8
}
export interface packet_entity_pick_request {
runtime_entity_id: lu64
selected_slot: u8
with_data: bool
}
export interface packet_player_action {
runtime_entity_id: varint64
action: Action
position: BlockCoordinates
result_position: BlockCoordinates
face: zigzag32
}
export interface packet_hurt_armor {
cause: zigzag32
damage: zigzag32
armor_slots: zigzag64
}
export interface packet_set_entity_data {
runtime_entity_id: varint64
metadata: MetadataDictionary
properties: EntityProperties
tick: varint64
}
export interface packet_set_entity_motion {
runtime_entity_id: varint64
velocity: vec3f
}
export interface packet_set_entity_link {
link: Link
}
export interface packet_set_health {
health: zigzag32
}
export interface packet_set_spawn_position {
spawn_type: {
  type: zigzag32,
  mappings: {
    "0": "player",
    "1": "world"
  }
}
player_position: BlockCoordinates
dimension: zigzag32
world_position: BlockCoordinates
}
export interface packet_animate {
action_id: {
  type: zigzag32,
  mappings: {
    "0": "none",
    "1": "swing_arm",
    "2": "unknown",
    "3": "wake_up",
    "4": "critical_hit",
    "5": "magic_critical_hit",
    "128": "row_right",
    "129": "row_left"
  }
}
runtime_entity_id: varint64
undefined: {
    "compareTo": "action_id",
    "fields": {
        "row_right": [
            "container",
            [
                {
                    "name": "boat_rowing_time",
                    "type": "lf32"
                }
            ]
        ],
        "row_left": [
            "container",
            [
                {
                    "name": "boat_rowing_time",
                    "type": "lf32"
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface packet_respawn {
position: vec3f
state: u8
runtime_entity_id: varint64
}
export interface packet_container_open {
window_id: WindowID
window_type: WindowType
coordinates: BlockCoordinates
runtime_entity_id: zigzag64
}
export interface packet_container_close {
window_id: WindowID
server: bool
}
export interface packet_player_hotbar {
selected_slot: varint
window_id: WindowID
select_slot: bool
}
export interface packet_inventory_content {
window_id: WindowIDVarint
input: ItemStacks
}
export interface packet_inventory_slot {
window_id: WindowIDVarint
slot: varint
item: Item
}
export interface packet_container_set_data {
window_id: WindowID
property: zigzag32
value: zigzag32
}
export interface packet_crafting_data {
recipes: Recipes
potion_type_recipes: PotionTypeRecipes
potion_container_recipes: PotionContainerChangeRecipes
material_reducers: {varint:MaterialReducer[]}
clear_recipes: bool
}
export interface packet_crafting_event {
window_id: WindowID
recipe_type: {
  type: zigzag32,
  mappings: {
    "0": "inventory",
    "1": "crafting",
    "2": "workbench"
  }
}
recipe_id: uuid
input: {varint:Item[]}
result: {varint:Item[]}
}
export interface packet_gui_data_pick_item {
item_name: string
item_effects: string
hotbar_slot: li32
}
export interface packet_adventure_settings {
flags: AdventureFlags
command_permission: CommandPermissionLevelVarint
action_permissions: ActionPermissions
permission_level: PermissionLevel
custom_stored_permissions: varint
user_id: li64
}
export interface packet_block_entity_data {
position: BlockCoordinates
nbt: nbt
}
export interface packet_player_input {
motion_x: lf32
motion_z: lf32
jumping: bool
sneaking: bool
}
export interface packet_level_chunk {
x: zigzag32
z: zigzag32
sub_chunk_count: varint
highest_subchunk_count: {
    "compareTo": "sub_chunk_count",
    "fields": {
        "-2": "lu16"
    },
    "default": "void"
}
cache_enabled: bool
blobs: {
    "compareTo": "cache_enabled",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "hashes",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "lu64"
                        }
                    ]
                }
            ]
        ]
    },
    "default": "void"
}
payload: ByteArray
}
export interface packet_set_commands_enabled {
enabled: bool
}
export interface packet_set_difficulty {
difficulty: varint
}
export interface packet_change_dimension {
dimension: zigzag32
position: vec3f
respawn: bool
}
export interface packet_set_player_game_type {
gamemode: GameMode
}
export interface packet_player_list {
records: PlayerRecords
}
export interface packet_simple_event {
event_type: {
  type: lu16,
  mappings: {
    "0": "uninitialized_subtype",
    "1": "enable_commands",
    "2": "disable_commands",
    "3": "unlock_world_template_settings"
  }
}
}
export interface packet_event {
runtime_id: varint64
event_type: {
  type: zigzag32,
  mappings: {
    "0": "achievement_awarded",
    "1": "entity_interact",
    "2": "portal_built",
    "3": "portal_used",
    "4": "mob_killed",
    "5": "cauldron_used",
    "6": "player_death",
    "7": "boss_killed",
    "8": "agent_command",
    "9": "agent_created",
    "10": "banner_pattern_removed",
    "11": "commaned_executed",
    "12": "fish_bucketed",
    "13": "mob_born",
    "14": "pet_died",
    "15": "cauldron_block_used",
    "16": "composter_block_used",
    "17": "bell_block_used",
    "18": "actor_definition",
    "19": "raid_update",
    "20": "player_movement_anomaly",
    "21": "player_moement_corrected",
    "22": "honey_harvested",
    "23": "target_block_hit",
    "24": "piglin_barter",
    "25": "waxed_or_unwaxed_copper",
    "26": "code_builder_runtime_action",
    "27": "code_builder_scoreboard",
    "28": "strider_ridden_in_lava_in_overworld",
    "29": "sneak_close_to_sculk_sensor",
    "30": "careful_restoration"
  }
}
use_player_id: u8
event_data: restBuffer
}
export interface packet_spawn_experience_orb {
position: vec3f
count: zigzag32
}
export interface packet_clientbound_map_item_data {
map_id: zigzag64
update_flags: UpdateMapFlags
dimension: u8
locked: bool
origin: vec3i
included_in: {
    "compareTo": "update_flags.initialisation",
    "fields": {
        "true": [
            "array",
            {
                "countType": "varint",
                "type": "zigzag64"
            }
        ]
    },
    "default": "void"
}
scale: {
    "compareTo": "update_flags.initialisation || update_flags.decoration || update_flags.texture",
    "fields": {
        "true": "u8"
    },
    "default": "void"
}
tracked: {
    "compareTo": "update_flags.decoration",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "objects",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "TrackedObject"
                        }
                    ]
                },
                {
                    "name": "decorations",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "MapDecoration"
                        }
                    ]
                }
            ]
        ]
    },
    "default": "void"
}
texture: {
    "compareTo": "update_flags.texture",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "width",
                    "type": "zigzag32"
                },
                {
                    "name": "height",
                    "type": "zigzag32"
                },
                {
                    "name": "x_offset",
                    "type": "zigzag32"
                },
                {
                    "name": "y_offset",
                    "type": "zigzag32"
                },
                {
                    "name": "pixels",
                    "type": [
                        "array",
                        {
                            "countType": "varint",
                            "type": "varint"
                        }
                    ]
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface packet_map_info_request {
map_id: zigzag64
client_pixels: {lu32:{
rgba: li32
index: lu16
}[]}
}
export interface packet_request_chunk_radius {
chunk_radius: zigzag32
max_radius: u8
}
export interface packet_chunk_radius_update {
chunk_radius: zigzag32
}
export interface packet_item_frame_drop_item {
coordinates: BlockCoordinates
}
export interface packet_game_rules_changed {
rules: GameRules
}
export interface packet_camera {
camera_entity_unique_id: zigzag64
target_player_unique_id: zigzag64
}
export interface packet_boss_event {
boss_entity_id: zigzag64
type: {
  type: varint,
  mappings: {
    "0": "show_bar",
    "1": "register_player",
    "2": "hide_bar",
    "3": "unregister_player",
    "4": "set_bar_progress",
    "5": "set_bar_title",
    "6": "update_properties",
    "7": "texture",
    "8": "query"
  }
}
undefined: {
    "compareTo": "type",
    "fields": {
        "show_bar": [
            "container",
            [
                {
                    "name": "title",
                    "type": "string"
                },
                {
                    "name": "progress",
                    "type": "lf32"
                },
                {
                    "name": "screen_darkening",
                    "type": "li16"
                },
                {
                    "name": "color",
                    "type": "varint"
                },
                {
                    "name": "overlay",
                    "type": "varint"
                }
            ]
        ],
        "register_player": [
            "container",
            [
                {
                    "name": "player_id",
                    "type": "zigzag64"
                }
            ]
        ],
        "unregister_player": [
            "container",
            [
                {
                    "name": "player_id",
                    "type": "zigzag64"
                }
            ]
        ],
        "query": [
            "container",
            [
                {
                    "name": "player_id",
                    "type": "zigzag64"
                }
            ]
        ],
        "set_bar_progress": [
            "container",
            [
                {
                    "name": "progress",
                    "type": "lf32"
                }
            ]
        ],
        "set_bar_title": [
            "container",
            [
                {
                    "name": "title",
                    "type": "string"
                }
            ]
        ],
        "update_properties": [
            "container",
            [
                {
                    "name": "screen_darkening",
                    "type": "li16"
                },
                {
                    "name": "color",
                    "type": "varint"
                },
                {
                    "name": "overlay",
                    "type": "varint"
                }
            ]
        ],
        "texture": [
            "container",
            [
                {
                    "name": "color",
                    "type": "varint"
                },
                {
                    "name": "overlay",
                    "type": "varint"
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface packet_show_credits {
runtime_entity_id: varint64
status: zigzag32
}
export interface packet_available_commands {
values_len: varint
_enum_type: undefined
enum_values: {undefined:string[]}
chained_subcommand_values: {varint:string[]}
suffixes: {varint:string[]}
enums: {varint:{
name: string
values: {varint:{
    "compareTo": "../_enum_type",
    "fields": {
        "byte": "u8",
        "short": "lu16",
        "int": "lu32"
    },
    "default": "void"
}[]}
}[]}
chained_subcommands: {varint:{
name: string
values: {varint:{
index: lu16
value: lu16
}[]}
}[]}
command_data: {varint:{
name: string
description: string
flags: lu16
permission_level: u8
alias: li32
chained_subcommand_offsets: {varint:lu16[]}
overloads: {varint:{
chaining: bool
parameters: {varint:{
parameter_name: string
value_type: {
  type: lu16,
  mappings: {
    "1": "int",
    "3": "float",
    "4": "value",
    "5": "wildcard_int",
    "6": "operator",
    "7": "command_operator",
    "8": "target",
    "10": "wildcard_target",
    "17": "file_path",
    "23": "integer_range",
    "43": "equipment_slots",
    "44": "string",
    "52": "block_position",
    "53": "position",
    "55": "message",
    "58": "raw_text",
    "62": "json",
    "71": "block_states",
    "74": "command"
  }
}
enum_type: {
  type: lu16,
  mappings: {
    "16": "valid",
    "48": "enum",
    "256": "suffixed",
    "1040": "soft_enum"
  }
}
optional: bool
options: CommandFlags
}[]}
}[]}
}[]}
dynamic_enums: {varint:{
name: string
values: {varint:string[]}
}[]}
enum_constraints: {varint:{
value_index: li32
enum_index: li32
constraints: {varint:{
constraint: {
  type: u8,
  mappings: {
    "0": "cheats_enabled",
    "1": "operator_permissions",
    "2": "host_permissions"
  }
}
}[]}
}[]}
}
export interface packet_command_request {
command: string
origin: CommandOrigin
internal: bool
version: varint
}
export interface packet_command_block_update {
is_block: bool
undefined: {
    "compareTo": "is_block",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "position",
                    "type": "BlockCoordinates"
                },
                {
                    "name": "mode",
                    "type": [
                        "mapper",
                        {
                            "type": "varint",
                            "mappings": {
                                "0": "impulse",
                                "1": "repeat",
                                "2": "chain"
                            }
                        }
                    ]
                },
                {
                    "name": "needs_redstone",
                    "type": "bool"
                },
                {
                    "name": "conditional",
                    "type": "bool"
                }
            ]
        ],
        "false": [
            "container",
            [
                {
                    "name": "minecart_entity_runtime_id",
                    "type": "varint64"
                }
            ]
        ]
    },
    "default": "void"
}
command: string
last_output: string
name: string
should_track_output: bool
tick_delay: li32
execute_on_first_tick: bool
}
export interface packet_command_output {
origin: CommandOrigin
output_type: {
  type: i8,
  mappings: {
    "1": "last",
    "2": "silent",
    "3": "all",
    "4": "data_set"
  }
}
success_count: varint
output: {varint:{
success: bool
message_id: string
parameters: {varint:string[]}
}[]}
data_set: {
    "compareTo": "output_type",
    "fields": {
        "data_set": "string"
    },
    "default": "void"
}
}
export interface packet_update_trade {
window_id: WindowID
window_type: WindowType
size: varint
trade_tier: varint
villager_unique_id: varint64
entity_unique_id: varint64
display_name: string
new_trading_ui: bool
economic_trades: bool
offers: nbt
}
export interface packet_update_equipment {
window_id: WindowID
window_type: WindowType
size: u8
entity_id: zigzag64
inventory: nbt
}
export interface packet_resource_pack_data_info {
pack_id: string
max_chunk_size: lu32
chunk_count: lu32
size: lu64
hash: ByteArray
is_premium: bool
pack_type: {
  type: u8,
  mappings: {
    "1": "addon",
    "2": "cached",
    "3": "copy_protected",
    "4": "behavior",
    "5": "persona_piece",
    "6": "resources",
    "7": "skins",
    "8": "world_template"
  }
}
}
export interface packet_resource_pack_chunk_data {
pack_id: string
chunk_index: lu32
progress: lu64
payload: ByteArray
}
export interface packet_resource_pack_chunk_request {
pack_id: string
chunk_index: lu32
}
export interface packet_transfer {
server_address: string
port: lu16
}
export interface packet_play_sound {
name: string
coordinates: BlockCoordinates
volume: lf32
pitch: lf32
}
export interface packet_stop_sound {
name: string
stop_all: bool
}
export interface packet_set_title {
type: {
  type: zigzag32,
  mappings: {
    "0": "clear",
    "1": "reset",
    "2": "set_title",
    "3": "set_subtitle",
    "4": "action_bar_message",
    "5": "set_durations",
    "6": "set_title_json",
    "7": "set_subtitle_json",
    "8": "action_bar_message_json"
  }
}
text: string
fade_in_time: zigzag32
stay_time: zigzag32
fade_out_time: zigzag32
xuid: string
platform_online_id: string
}
export interface packet_add_behavior_tree {
behaviortree: string
}
export interface packet_structure_block_update {
position: BlockCoordinates
structure_name: string
data_field: string
include_players: bool
show_bounding_box: bool
structure_block_type: zigzag32
settings: StructureBlockSettings
redstone_save_mode: zigzag32
should_trigger: bool
water_logged: bool
}
export interface packet_show_store_offer {
offer_id: string
redirect_type: {
  type: u8,
  mappings: {
    "0": "marketplace",
    "1": "dressing_room",
    "2": "third_party_server_page"
  }
}
}
export interface packet_purchase_receipt {
receipts: {varint:string[]}
}
export interface packet_player_skin {
uuid: uuid
skin: Skin
skin_name: string
old_skin_name: string
is_verified: bool
}
export interface packet_sub_client_login {
tokens: {
    "lengthType": "varint",
    "type": "LoginTokens"
}
}
export interface packet_initiate_web_socket_connection {
server: string
}
export interface packet_set_last_hurt_by {
entity_type: varint
}
export interface packet_book_edit {
type: {
  type: u8,
  mappings: {
    "0": "replace_page",
    "1": "add_page",
    "2": "delete_page",
    "3": "swap_pages",
    "4": "sign"
  }
}
slot: u8
undefined: {
    "compareTo": "type",
    "fields": {
        "replace_page": [
            "container",
            [
                {
                    "name": "page_number",
                    "type": "u8"
                },
                {
                    "name": "text",
                    "type": "string"
                },
                {
                    "name": "photo_name",
                    "type": "string"
                }
            ]
        ],
        "add_page": [
            "container",
            [
                {
                    "name": "page_number",
                    "type": "u8"
                },
                {
                    "name": "text",
                    "type": "string"
                },
                {
                    "name": "photo_name",
                    "type": "string"
                }
            ]
        ],
        "delete_page": [
            "container",
            [
                {
                    "name": "page_number",
                    "type": "u8"
                }
            ]
        ],
        "swap_pages": [
            "container",
            [
                {
                    "name": "page1",
                    "type": "u8"
                },
                {
                    "name": "page2",
                    "type": "u8"
                }
            ]
        ],
        "sign": [
            "container",
            [
                {
                    "name": "title",
                    "type": "string"
                },
                {
                    "name": "author",
                    "type": "string"
                },
                {
                    "name": "xuid",
                    "type": "string"
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface packet_npc_request {
runtime_entity_id: varint64
request_type: {
  type: u8,
  mappings: {
    "0": "set_actions",
    "1": "execute_action",
    "2": "execute_closing_commands",
    "3": "set_name",
    "4": "set_skin",
    "5": "set_interaction_text",
    "6": "execute_opening_commands"
  }
}
command: string
action_type: {
  type: u8,
  mappings: {
    "0": "set_actions",
    "1": "execute_action",
    "2": "execute_closing_commands",
    "3": "set_name",
    "4": "set_skin",
    "5": "set_interact_text",
    "6": "execute_opening_commands"
  }
}
scene_name: string
}
export interface packet_photo_transfer {
image_name: string
image_data: string
book_id: string
photo_type: u8
source_type: u8
owner_entity_unique_id: li64
new_photo_name: string
}
export interface packet_modal_form_request {
form_id: varint
data: string
}
export interface packet_modal_form_response {
form_id: varint
has_response_data: bool
data: {
    "compareTo": "has_response_data",
    "fields": {
        "true": "string"
    },
    "default": "void"
}
has_cancel_reason: bool
undefined: {
    "compareTo": "has_cancel_reason",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "cancel_reason",
                    "type": [
                        "mapper",
                        {
                            "type": "u8",
                            "mappings": {
                                "0": "closed",
                                "1": "busy"
                            }
                        }
                    ]
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface packet_server_settings_request {

}
export interface packet_server_settings_response {
form_id: varint
data: string
}
export interface packet_show_profile {
xuid: string
}
export interface packet_set_default_game_type {
gamemode: GameMode
}
export interface packet_remove_objective {
objective_name: string
}
export interface packet_set_display_objective {
display_slot: string
objective_name: string
display_name: string
criteria_name: string
sort_order: zigzag32
}
export interface packet_set_score {
action: {
  type: u8,
  mappings: {
    "0": "change",
    "1": "remove"
  }
}
entries: {varint:{
scoreboard_id: zigzag64
objective_name: string
score: li32
undefined: {
    "compareTo": "../action",
    "fields": {
        "change": [
            "container",
            [
                {
                    "name": "entry_type",
                    "type": [
                        "mapper",
                        {
                            "type": "i8",
                            "mappings": {
                                "1": "player",
                                "2": "entity",
                                "3": "fake_player"
                            }
                        }
                    ]
                },
                {
                    "name": "entity_unique_id",
                    "type": [
                        "switch",
                        {
                            "compareTo": "entry_type",
                            "fields": {
                                "player": "zigzag64",
                                "entity": "zigzag64"
                            },
                            "default": "void"
                        }
                    ]
                },
                {
                    "name": "custom_name",
                    "type": [
                        "switch",
                        {
                            "compareTo": "entry_type",
                            "fields": {
                                "fake_player": "string"
                            },
                            "default": "void"
                        }
                    ]
                }
            ]
        ]
    },
    "default": "void"
}
}[]}
}
export interface packet_lab_table {
action_type: {
  type: u8,
  mappings: {
    "0": "combine",
    "1": "react",
    "2": "reset"
  }
}
position: vec3i
reaction_type: u8
}
export interface packet_update_block_synced {
position: BlockCoordinates
block_runtime_id: varint
flags: UpdateBlockFlags
layer: varint
entity_unique_id: zigzag64
transition_type: {
  type: varint,
  mappings: {
    "0": "entity",
    "1": "create",
    "2": "destroy"
  }
}
}
export interface packet_move_entity_delta {
runtime_entity_id: varint64
flags: DeltaMoveFlags
x: {
    "compareTo": "flags.has_x",
    "fields": {
        "true": "lf32"
    },
    "default": "void"
}
y: {
    "compareTo": "flags.has_y",
    "fields": {
        "true": "lf32"
    },
    "default": "void"
}
z: {
    "compareTo": "flags.has_z",
    "fields": {
        "true": "lf32"
    },
    "default": "void"
}
rot_x: {
    "compareTo": "flags.has_rot_x",
    "fields": {
        "true": "u8"
    },
    "default": "void"
}
rot_y: {
    "compareTo": "flags.has_rot_y",
    "fields": {
        "true": "u8"
    },
    "default": "void"
}
rot_z: {
    "compareTo": "flags.has_rot_z",
    "fields": {
        "true": "u8"
    },
    "default": "void"
}
}
export interface packet_set_scoreboard_identity {
action: {
  type: i8,
  mappings: {
    "0": "register_identity",
    "1": "clear_identity"
  }
}
entries: {varint:{
scoreboard_id: zigzag64
entity_unique_id: {
    "compareTo": "../action",
    "fields": {
        "register_identity": "zigzag64"
    },
    "default": "void"
}
}[]}
}
export interface packet_set_local_player_as_initialized {
runtime_entity_id: varint64
}
export interface packet_update_soft_enum {
enum_type: string
options: {varint:string[]}
action_type: {
  type: u8,
  mappings: {
    "0": "add",
    "1": "remove",
    "2": "update"
  }
}
}
export interface packet_network_stack_latency {
timestamp: lu64
needs_response: u8
}
export interface packet_script_custom_event {
event_name: string
event_data: string
}
export interface packet_spawn_particle_effect {
dimension: u8
entity_id: zigzag64
position: vec3f
particle_name: string
molang_variables: ByteArray
}
export interface packet_available_entity_identifiers {
nbt: nbt
}
export interface packet_level_sound_event_v2 {
sound_id: u8
position: vec3f
block_id: zigzag32
entity_type: string
is_baby_mob: bool
is_global: bool
}
export interface packet_network_chunk_publisher_update {
coordinates: BlockCoordinates
radius: varint
saved_chunks: {lu32:{
x: zigzag32
z: zigzag32
}[]}
}
export interface packet_biome_definition_list {
nbt: nbt
}
export interface packet_level_sound_event {
sound_id: SoundType
position: vec3f
extra_data: zigzag32
entity_type: string
is_baby_mob: bool
is_global: bool
}
export interface packet_level_event_generic {
event_id: varint
nbt: nbtLoop
}
export interface packet_lectern_update {
page: u8
page_count: u8
position: vec3i
drop_book: bool
}
export interface packet_video_stream_connect {
server_uri: string
frame_send_frequency: lf32
action: {
  type: u8,
  mappings: {
    "1": "none",
    "2": "close"
  }
}
resolution_x: li32
resolution_y: li32
}
export interface packet_add_ecs_entity {
network_id: varint64
}
export interface packet_remove_ecs_entity {
network_id: varint64
}
export interface packet_client_cache_status {
enabled: bool
}
export interface packet_on_screen_texture_animation {
animation_type: lu32
}
export interface packet_map_create_locked_copy {
original_map_id: zigzag64
new_map_id: zigzag64
}
export interface packet_structure_template_data_export_request {
name: string
position: BlockCoordinates
settings: StructureBlockSettings
request_type: {
  type: u8,
  mappings: {
    "1": "export_from_save",
    "2": "export_from_load",
    "3": "query_saved_structure",
    "4": "import_from_save"
  }
}
}
export interface packet_structure_template_data_export_response {
name: string
success: bool
nbt: {
    "compareTo": "success",
    "fields": {
        "true": "nbt"
    },
    "default": "void"
}
response_type: {
  type: u8,
  mappings: {
    "1": "export",
    "2": "query",
    "3": "import"
  }
}
}
export interface packet_update_block_properties {
nbt: nbt
}
export interface packet_client_cache_blob_status {
misses: varint
haves: varint
missing: {undefined:lu64[]}
have: {undefined:lu64[]}
}
export interface packet_client_cache_miss_response {
blobs: {varint:Blob[]}
}
export interface packet_education_settings {
CodeBuilderDefaultURI: string
CodeBuilderTitle: string
CanResizeCodeBuilder: bool
disable_legacy_title_bar: bool
post_process_filter: string
screenshot_border_path: string
has_agent_capabilities: bool
agent_capabilities: {
    "compareTo": "has_agent_capabilities",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "has",
                    "type": "bool"
                },
                {
                    "name": "can_modify_blocks",
                    "type": "bool"
                }
            ]
        ]
    },
    "default": "void"
}
HasOverrideURI: bool
OverrideURI: {
    "compareTo": "HasOverrideURI",
    "fields": {
        "true": "string"
    },
    "default": "void"
}
HasQuiz: bool
has_external_link_settings: bool
external_link_settings: {
    "compareTo": "has_external_link_settings",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "has",
                    "type": "bool"
                },
                {
                    "name": "url",
                    "type": "string"
                },
                {
                    "name": "display_name",
                    "type": "string"
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface packet_emote {
entity_id: varint64
emote_id: string
xuid: string
platform_id: string
flags: {
  type: u8,
  mappings: {
    "1": "server_side",
    "2": "mute_chat"
  }
}
}
export interface packet_multiplayer_settings {
action_type: {
  type: zigzag32,
  mappings: {
    "0": "enable_multiplayer",
    "1": "disable_multiplayer",
    "2": "refresh_join_code"
  }
}
}
export interface packet_settings_command {
command_line: string
suppress_output: bool
}
export interface packet_anvil_damage {
damage: u8
position: BlockCoordinates
}
export interface packet_completed_using_item {
used_item_id: li16
use_method: {
  type: li32,
  mappings: {
    "0": "equip_armor",
    "1": "eat",
    "2": "attack",
    "3": "consume",
    "4": "throw",
    "5": "shoot",
    "6": "place",
    "7": "fill_bottle",
    "8": "fill_bucket",
    "9": "pour_bucket",
    "10": "use_tool",
    "11": "interact",
    "12": "retrieved",
    "13": "dyed",
    "14": "traded",
    "15": "brushing_completed"
  }
}
}
export interface packet_network_settings {
compression_threshold: lu16
compression_algorithm: {
  type: lu16,
  mappings: {
    "0": "deflate",
    "1": "snappy"
  }
}
client_throttle: bool
client_throttle_threshold: u8
client_throttle_scalar: lf32
}
export interface packet_player_auth_input {
pitch: lf32
yaw: lf32
position: vec3f
move_vector: vec2f
head_yaw: lf32
input_data: InputFlag
input_mode: {
  type: varint,
  mappings: {
    "0": "unknown",
    "1": "mouse",
    "2": "touch",
    "3": "game_pad",
    "4": "motion_controller"
  }
}
play_mode: {
  type: varint,
  mappings: {
    "0": "normal",
    "1": "teaser",
    "2": "screen",
    "3": "viewer",
    "4": "reality",
    "5": "placement",
    "6": "living_room",
    "7": "exit_level",
    "8": "exit_level_living_room",
    "9": "num_modes"
  }
}
interaction_model: {
  type: zigzag32,
  mappings: {
    "0": "touch",
    "1": "crosshair",
    "2": "classic"
  }
}
gaze_direction: {
    "compareTo": "play_mode",
    "fields": {
        "reality": "vec3f"
    },
    "default": "void"
}
tick: varint64
delta: vec3f
transaction: {
    "compareTo": "input_data.item_interact",
    "fields": {
        "true": [
            "container",
            [
                {
                    "name": "legacy",
                    "type": "TransactionLegacy"
                },
                {
                    "name": "actions",
                    "type": "TransactionActions"
                },
                {
                    "name": "data",
                    "type": "TransactionUseItem"
                }
            ]
        ]
    },
    "default": "void"
}
item_stack_request: {
    "compareTo": "input_data.item_stack_request",
    "fields": {
        "true": "ItemStackRequest"
    },
    "default": "void"
}
block_action: {
    "compareTo": "input_data.block_action",
    "fields": {
        "true": [
            "array",
            {
                "countType": "zigzag32",
                "type": [
                    "container",
                    [
                        {
                            "name": "action",
                            "type": "Action"
                        },
                        {
                            "anon": true,
                            "type": [
                                "switch",
                                {
                                    "compareTo": "action",
                                    "fields": {
                                        "start_break": [
                                            "container",
                                            [
                                                {
                                                    "name": "position",
                                                    "type": "vec3i"
                                                },
                                                {
                                                    "name": "face",
                                                    "type": "zigzag32"
                                                }
                                            ]
                                        ],
                                        "abort_break": [
                                            "container",
                                            [
                                                {
                                                    "name": "position",
                                                    "type": "vec3i"
                                                },
                                                {
                                                    "name": "face",
                                                    "type": "zigzag32"
                                                }
                                            ]
                                        ],
                                        "crack_break": [
                                            "container",
                                            [
                                                {
                                                    "name": "position",
                                                    "type": "vec3i"
                                                },
                                                {
                                                    "name": "face",
                                                    "type": "zigzag32"
                                                }
                                            ]
                                        ],
                                        "predict_break": [
                                            "container",
                                            [
                                                {
                                                    "name": "position",
                                                    "type": "vec3i"
                                                },
                                                {
                                                    "name": "face",
                                                    "type": "zigzag32"
                                                }
                                            ]
                                        ],
                                        "continue_break": [
                                            "container",
                                            [
                                                {
                                                    "name": "position",
                                                    "type": "vec3i"
                                                },
                                                {
                                                    "name": "face",
                                                    "type": "zigzag32"
                                                }
                                            ]
                                        ]
                                    },
                                    "default": "void"
                                }
                            ]
                        }
                    ]
                ]
            }
        ]
    },
    "default": "void"
}
analogue_move_vector: vec2f
}
export interface packet_creative_content {
items: {varint:{
entry_id: varint
item: ItemLegacy
}[]}
}
export interface packet_player_enchant_options {
options: {varint:EnchantOption[]}
}
export interface packet_item_stack_request {
requests: {varint:ItemStackRequest[]}
}
export interface packet_item_stack_response {
responses: ItemStackResponses
}
export interface packet_player_armor_damage {
type: ArmorDamageType
helmet_damage: {
    "compareTo": "type.head",
    "fields": {
        "true": "zigzag32"
    },
    "default": "void"
}
chestplate_damage: {
    "compareTo": "type.chest",
    "fields": {
        "true": "zigzag32"
    },
    "default": "void"
}
leggings_damage: {
    "compareTo": "type.legs",
    "fields": {
        "true": "zigzag32"
    },
    "default": "void"
}
boots_damage: {
    "compareTo": "type.feet",
    "fields": {
        "true": "zigzag32"
    },
    "default": "void"
}
}
export interface packet_update_player_game_type {
gamemode: GameMode
player_unique_id: zigzag64
}
export interface packet_emote_list {
player_id: varint64
emote_pieces: {varint:uuid[]}
}
export interface packet_position_tracking_db_request {
action: {
  type: u8,
  mappings: {
    "0": "query"
  }
}
tracking_id: zigzag32
}
export interface packet_position_tracking_db_broadcast {
broadcast_action: {
  type: u8,
  mappings: {
    "0": "update",
    "1": "destory",
    "2": "not_found"
  }
}
tracking_id: zigzag32
nbt: nbt
}
export interface packet_packet_violation_warning {
violation_type: {
  type: zigzag32,
  mappings: {
    "0": "malformed"
  }
}
severity: {
  type: zigzag32,
  mappings: {
    "0": "warning",
    "1": "final_warning",
    "2": "terminating"
  }
}
packet_id: zigzag32
reason: string
}
export interface packet_motion_prediction_hints {
entity_runtime_id: varint64
velocity: vec3f
on_ground: bool
}
export interface packet_animate_entity {
animation: string
next_state: string
stop_condition: string
stop_condition_version: li32
controller: string
blend_out_time: lf32
runtime_entity_ids: {varint:varint64[]}
}
export interface packet_camera_shake {
intensity: lf32
duration: lf32
type: u8
action: {
  type: u8,
  mappings: {
    "0": "add",
    "1": "stop"
  }
}
}
export interface packet_player_fog {
stack: {varint:string[]}
}
export interface packet_correct_player_move_prediction {
position: vec3f
delta: vec3f
on_ground: bool
tick: varint64
}
export interface packet_item_component {
entries: ItemComponentList
}
export interface packet_filter_text_packet {
text: string
from_server: bool
}
export interface packet_debug_renderer {
type: {
  type: li32,
  mappings: {
    "1": "clear",
    "2": "add_cube"
  }
}
undefined: {
    "compareTo": "type",
    "fields": {
        "clear": "void",
        "add_cube": [
            "container",
            [
                {
                    "name": "text",
                    "type": "string"
                },
                {
                    "name": "position",
                    "type": "vec3f"
                },
                {
                    "name": "red",
                    "type": "lf32"
                },
                {
                    "name": "green",
                    "type": "lf32"
                },
                {
                    "name": "blue",
                    "type": "lf32"
                },
                {
                    "name": "alpha",
                    "type": "lf32"
                },
                {
                    "name": "duration",
                    "type": "li64"
                }
            ]
        ]
    },
    "default": "void"
}
}
export interface packet_sync_entity_property {
nbt: nbt
}
export interface packet_add_volume_entity {
runtime_id: varint64
nbt: nbt
encoding_identifier: string
instance_name: string
bounds: {
min: BlockCoordinates
max: BlockCoordinates
}
dimension: zigzag32
engine_version: string
}
export interface packet_remove_volume_entity {
entity_id: varint64
}
export interface packet_simulation_type {
type: {
  type: u8,
  mappings: {
    "0": "game",
    "1": "editor",
    "2": "test",
    "3": "invalid"
  }
}
}
export interface packet_npc_dialogue {
entity_id: lu64
action_type: {
  type: varint,
  mappings: {
    "0": "open",
    "1": "close"
  }
}
dialogue: string
screen_name: string
npc_name: string
action_json: string
}
export interface packet_edu_uri_resource_packet {
resource: EducationSharedResourceURI
}
export interface packet_create_photo {
entity_unique_id: li64
photo_name: string
item_name: string
}
export interface packet_update_subchunk_blocks {
x: zigzag32
y: zigzag32
z: zigzag32
blocks: {varint:BlockUpdate[]}
extra: {varint:BlockUpdate[]}
}
export interface packet_photo_info_request {
photo_id: zigzag64
}
export interface SubChunkEntryWithoutCaching {lu32:{
dx: i8
dy: i8
dz: i8
result: {
  type: u8,
  mappings: {
    "0": "undefined",
    "1": "success",
    "2": "chunk_not_found",
    "3": "invalid_dimension",
    "4": "player_not_found",
    "5": "y_index_out_of_bounds",
    "6": "success_all_air"
  }
}
payload: ByteArray
heightmap_type: {
  type: u8,
  mappings: {
    "0": "no_data",
    "1": "has_data",
    "2": "too_high",
    "3": "too_low"
  }
}
heightmap: {
    "compareTo": "heightmap_type",
    "fields": {
        "has_data": [
            "buffer",
            {
                "count": 256
            }
        ]
    },
    "default": "void"
}
}[]}
export interface SubChunkEntryWithCaching {lu32:{
dx: i8
dy: i8
dz: i8
result: {
  type: u8,
  mappings: {
    "0": "undefined",
    "1": "success",
    "2": "chunk_not_found",
    "3": "invalid_dimension",
    "4": "player_not_found",
    "5": "y_index_out_of_bounds",
    "6": "success_all_air"
  }
}
payload: {
    "compareTo": "result",
    "fields": {
        "success_all_air": "void"
    },
    "default": "ByteArray"
}
heightmap_type: {
  type: u8,
  mappings: {
    "0": "no_data",
    "1": "has_data",
    "2": "too_high",
    "3": "too_low"
  }
}
heightmap: {
    "compareTo": "heightmap_type",
    "fields": {
        "has_data": [
            "buffer",
            {
                "count": 256
            }
        ]
    },
    "default": "void"
}
blob_id: lu64
}[]}
export interface packet_subchunk {
cache_enabled: bool
dimension: zigzag32
origin: vec3i
entries: {
    "compareTo": "cache_enabled",
    "fields": {
        "true": "SubChunkEntryWithCaching",
        "false": "SubChunkEntryWithoutCaching"
    },
    "default": "void"
}
}
export interface packet_subchunk_request {
dimension: zigzag32
origin: vec3i
requests: {lu32:{
dx: i8
dy: i8
dz: i8
}[]}
}
export interface packet_client_start_item_cooldown {
category: string
duration: zigzag32
}
export interface packet_script_message {
message_id: string
data: string
}
export interface packet_code_builder_source {
operation: {
  type: u8,
  mappings: {
    "0": "none",
    "1": "get",
    "2": "set",
    "3": "reset"
  }
}
category: {
  type: u8,
  mappings: {
    "0": "none",
    "1": "code_status",
    "2": "instantiation"
  }
}
value: string
}
export interface packet_ticking_areas_load_status {
preload: bool
}
export interface packet_dimension_data {
definitions: {varint:{
id: string
max_height: zigzag32
min_height: zigzag32
generator: {
  type: zigzag32,
  mappings: {
    "0": "legacy",
    "1": "overworld",
    "2": "flat",
    "3": "nether",
    "4": "end",
    "5": "void"
  }
}
}[]}
}
export interface packet_agent_action {
request_id: string
action_type: {
  type: zigzag32,
  mappings: {
    "0": "none",
    "1": "attack",
    "2": "collect",
    "3": "destroy",
    "4": "detect_redstone",
    "5": "detect_obstacle",
    "6": "drop",
    "7": "drop_all",
    "8": "inspect",
    "9": "inspect_data",
    "10": "inspect_item_count",
    "11": "inspect_item_detail",
    "12": "inspect_item_space",
    "13": "interact",
    "14": "move",
    "15": "place_block",
    "16": "till",
    "17": "transfer_item_to",
    "18": "turn"
  }
}
body: string
}
export interface packet_change_mob_property {
entity_unique_id: zigzag64
property: string
bool_value: bool
string_value: string
int_value: zigzag32
float_value: lf32
}
export interface packet_lesson_progress {
action: u8
score: zigzag32
identifier: string
}
export interface packet_request_ability {
ability: {
  type: zigzag32,
  mappings: {
    "0": "build",
    "1": "mine",
    "2": "doors_and_switches",
    "3": "open_containers",
    "4": "attack_players",
    "5": "attack_mobs",
    "6": "operator_commands",
    "7": "teleport",
    "8": "invulnerable",
    "9": "flying",
    "10": "may_fly",
    "11": "instant_build",
    "12": "lightning",
    "13": "fly_speed",
    "14": "walk_speed",
    "15": "muted",
    "16": "world_builder",
    "17": "no_clip",
    "18": "ability_count"
  }
}
value_type: {
  type: u8,
  mappings: {
    "1": "bool",
    "2": "float"
  }
}
bool_value: bool
float_val: lf32
}
export interface packet_request_permissions {
entity_unique_id: li64
permission_level: PermissionLevel
requested_permissions: RequestPermissions
}
export interface packet_toast_request {
title: string
message: string
}
export interface packet_update_abilities {
entity_unique_id: li64
permission_level: PermissionLevel
command_permission: CommandPermissionLevel
abilities: {u8:AbilityLayers[]}
}
export interface packet_update_adventure_settings {
no_pvm: bool
no_mvp: bool
immutable_world: bool
show_name_tags: bool
auto_jump: bool
}
export interface packet_death_info {
cause: string
messages: {varint:string[]}
}
export interface packet_editor_network {
payload: nbt
}
export interface packet_feature_registry {
features: {varint:{
name: string
options: string
}[]}
}
export interface packet_server_stats {
server_time: lf32
network_time: lf32
}
export interface packet_request_network_settings {
client_protocol: i32
}
export interface packet_game_test_request {
max_tests_per_batch: varint
repetitions: varint
rotation: {
  type: u8,
  mappings: {
    "0": "0deg",
    "1": "90deg",
    "2": "180deg",
    "3": "270deg",
    "4": "360deg"
  }
}
stop_on_error: bool
position: BlockCoordinates
tests_per_row: varint
name: string
}
export interface packet_game_test_results {
succeeded: bool
error: string
name: string
}
export interface packet_update_client_input_locks {
locks: InputLockFlags
position: vec3f
}
export interface packet_client_cheat_ability {
entity_unique_id: li64
permission_level: PermissionLevel
command_permission: CommandPermissionLevel
abilities: {u8:AbilityLayers[]}
}
export interface packet_camera_presets {
presets: {varint:CameraPresets[]}
}
export interface packet_unlocked_recipes {
unlock_type: {
  type: lu32,
  mappings: {
    "0": "empty",
    "1": "initially_unlocked",
    "2": "newly_unlocked",
    "3": "remove_unlocked",
    "4": "remove_all_unlocked"
  }
}
recipes: {varint:string[]}
}
export interface packet_camera_instruction {
instruction_set: [
    "container",
    [
        {
            "name": "runtime_id",
            "type": "li32"
        },
        {
            "name": "ease_data",
            "type": [
                "option",
                [
                    "container",
                    [
                        {
                            "name": "type",
                            "type": [
                                "mapper",
                                {
                                    "type": "u8",
                                    "mappings": {
                                        "0": "Linear",
                                        "1": "Spring",
                                        "2": "InQuad",
                                        "3": "OutQuad",
                                        "4": "InOutQuad",
                                        "5": "InCubic",
                                        "6": "OutCubic",
                                        "7": "InOutCubic",
                                        "8": "InQuart",
                                        "9": "OutQuart",
                                        "10": "InOutQuart",
                                        "11": "InQuint",
                                        "12": "OutQuint",
                                        "13": "InOutQuint",
                                        "14": "InSine",
                                        "15": "OutSine",
                                        "16": "InOutSine",
                                        "17": "InExpo",
                                        "18": "OutExpo",
                                        "19": "InOutExpo",
                                        "20": "InCirc",
                                        "21": "OutCirc",
                                        "22": "InOutCirc",
                                        "23": "InBounce",
                                        "24": "OutBounce",
                                        "25": "InOutBounce",
                                        "26": "InBack",
                                        "27": "OutBack",
                                        "28": "InOutBack",
                                        "29": "InElastic",
                                        "30": "OutElastic",
                                        "31": "InOutElastic"
                                    }
                                }
                            ]
                        },
                        {
                            "name": "duration",
                            "type": "lf32"
                        }
                    ]
                ]
            ]
        },
        {
            "name": "position",
            "type": [
                "option",
                "vec3f"
            ]
        },
        {
            "name": "rotation",
            "type": [
                "option",
                "vec2f"
            ]
        },
        {
            "name": "facing",
            "type": [
                "option",
                "vec3f"
            ]
        },
        {
            "name": "default",
            "type": [
                "option",
                "bool"
            ]
        }
    ]
]
clear: bool
fade: [
    "container",
    [
        {
            "name": "fade_in_duration",
            "type": "lf32"
        },
        {
            "name": "wait_duration",
            "type": "lf32"
        },
        {
            "name": "fade_out_duration",
            "type": "lf32"
        },
        {
            "name": "color_rgb",
            "type": "vec3f"
        }
    ]
]
}
export interface packet_compressed_biome_definitions {
raw_payload: string
}
export interface packet_trim_data {
patterns: {varint:{
item_name: string
pattern: string
}[]}
materials: {varint:{
material: string
color: string
item_name: string
}[]}
}
export interface packet_open_sign {
position: BlockCoordinates
is_front: bool
}
export interface packet_agent_animation {
animation: {
  type: u8,
  mappings: {
    "0": "arm_swing",
    "1": "shrug"
  }
}
entity_runtime_id: varint64
}
export interface packet_refresh_entitlements {

}
export interface packet_toggle_crafter_slot_request {
position: vec3li
slot: u8
disabled: bool
}
export interface packet_set_player_inventory_options {
left_tab: {
  type: zigzag32,
  mappings: {
    "0": "none",
    "1": "construction",
    "2": "equipment",
    "3": "items",
    "4": "nature",
    "5": "search",
    "6": "survival"
  }
}
right_tab: {
  type: zigzag32,
  mappings: {
    "0": "none",
    "1": "fullscreen",
    "2": "crafting",
    "3": "armor"
  }
}
filtering: bool
layout: {
  type: zigzag32,
  mappings: {
    "0": "none",
    "1": "survival",
    "2": "recipe_book",
    "3": "creative"
  }
}
crafting_layout: {
  type: zigzag32,
  mappings: {
    "0": "none",
    "1": "survival",
    "2": "recipe_book",
    "3": "creative"
  }
}
}
export interface packet_server_post_move {
position: vec3f
}
export interface ByteArray {
    "countType": "varint"
}
export interface SignedByteArray {
    "countType": "zigzag32"
}
export interface LittleString {
    "countType": "li32"
}
export interface LatinString {
    "countType": "varint",
    "encoding": "latin1"
}
export interface ShortArray {
    "countType": "li16"
}
export interface ShortString {
    "countType": "li16"
}
export interface MetadataFlags1 {
    "type": "zigzag64",
    "big": true,
    "flags": [
        "onfire",
        "sneaking",
        "riding",
        "sprinting",
        "action",
        "invisible",
        "tempted",
        "inlove",
        "saddled",
        "powered",
        "ignited",
        "baby",
        "converting",
        "critical",
        "can_show_nametag",
        "always_show_nametag",
        "no_ai",
        "silent",
        "wallclimbing",
        "can_climb",
        "swimmer",
        "can_fly",
        "walker",
        "resting",
        "sitting",
        "angry",
        "interested",
        "charged",
        "tamed",
        "orphaned",
        "leashed",
        "sheared",
        "gliding",
        "elder",
        "moving",
        "breathing",
        "chested",
        "stackable",
        "showbase",
        "rearing",
        "vibrating",
        "idling",
        "evoker_spell",
        "charge_attack",
        "wasd_controlled",
        "can_power_jump",
        "can_dash",
        "linger",
        "has_collision",
        "affected_by_gravity",
        "fire_immune",
        "dancing",
        "enchanted",
        "show_trident_rope",
        "container_private",
        "transforming",
        "spin_attack",
        "swimming",
        "bribed",
        "pregnant",
        "laying_egg",
        "rider_can_pick",
        "transition_sitting",
        "eating",
        "laying_down"
    ]
}
export interface MetadataFlags2 {
    "type": "zigzag64",
    "big": true,
    "flags": [
        "sneezing",
        "trusting",
        "rolling",
        "scared",
        "in_scaffolding",
        "over_scaffolding",
        "fall_through_scaffolding",
        "blocking",
        "transition_blocking",
        "blocked_using_shield",
        "blocked_using_damaged_shield",
        "sleeping",
        "wants_to_wake",
        "trade_interest",
        "door_breaker",
        "breaking_obstruction",
        "door_opener",
        "illager_captain",
        "stunned",
        "roaring",
        "delayed_attacking",
        "avoiding_mobs",
        "avoiding_block",
        "facing_target_to_range_attack",
        "hidden_when_invisible",
        "is_in_ui",
        "stalking",
        "emoting",
        "celebrating",
        "admiring",
        "celebrating_special",
        "unknown95",
        "ram_attack",
        "playing_dead",
        "in_ascendable_block",
        "over_descendable_block",
        "croaking",
        "eat_mob",
        "jump_goal_jump",
        "emerging",
        "sniffing",
        "digging",
        "sonic_boom",
        "has_dash_cooldown",
        "push_towards_closest_space",
        "scenting",
        "rising",
        "feeling_happy",
        "searching",
        "crawling",
        "timer_flag_1",
        "timer_flag_2",
        "timer_flag_3"
    ]
}
export interface AbilitySet {
    "type": "lu32",
    "flags": [
        "build",
        "mine",
        "doors_and_switches",
        "open_containers",
        "attack_players",
        "attack_mobs",
        "operator_commands",
        "teleport",
        "invulnerable",
        "flying",
        "may_fly",
        "instant_build",
        "lightning",
        "fly_speed",
        "walk_speed",
        "muted",
        "world_builder",
        "no_clip",
        "privileged_builder",
        "count"
    ]
}
export interface UpdateBlockFlags {
    "type": "varint",
    "flags": {
        "neighbors": 1,
        "network": 2,
        "no_graphic": 4,
        "unused": 8,
        "priority": 16
    }
}
export interface AdventureFlags {
    "type": "varint",
    "flags": {
        "world_immutable": 1,
        "no_pvp": 2,
        "auto_jump": 32,
        "allow_flight": 64,
        "no_clip": 128,
        "world_builder": 256,
        "flying": 512,
        "muted": 1024
    }
}
export interface ActionPermissions {
    "type": "varint",
    "flags": {
        "mine": 65537,
        "doors_and_switches": 65538,
        "open_containers": 65540,
        "attack_players": 65544,
        "attack_mobs": 65552,
        "operator": 65568,
        "teleport": 65664,
        "build": 65792,
        "default": 66048
    }
}
export interface UpdateMapFlags {
    "type": "varint",
    "flags": [
        "void",
        "texture",
        "decoration",
        "initialisation"
    ]
}
export interface CommandFlags {
unused: {
size:1
signed:false
},collapse_enum: {
size:1
signed:false
},has_semantic_constraint: {
size:1
signed:false
},as_chained_command: {
size:1
signed:false
},unknown2: {
size:4
signed:false
}
}
export interface DeltaMoveFlags {
    "type": "lu16",
    "flags": {
        "has_x": 1,
        "has_y": 2,
        "has_z": 4,
        "has_rot_x": 8,
        "has_rot_y": 16,
        "has_rot_z": 32,
        "on_ground": 64,
        "teleport": 128,
        "force_move": 256
    }
}
export interface InputFlag {
    "type": "varint64",
    "big": true,
    "flags": [
        "ascend",
        "descend",
        "north_jump",
        "jump_down",
        "sprint_down",
        "change_height",
        "jumping",
        "auto_jumping_in_water",
        "sneaking",
        "sneak_down",
        "up",
        "down",
        "left",
        "right",
        "up_left",
        "up_right",
        "want_up",
        "want_down",
        "want_down_slow",
        "want_up_slow",
        "sprinting",
        "ascend_block",
        "descend_block",
        "sneak_toggle_down",
        "persist_sneak",
        "start_sprinting",
        "stop_sprinting",
        "start_sneaking",
        "stop_sneaking",
        "start_swimming",
        "stop_swimming",
        "start_jumping",
        "start_gliding",
        "stop_gliding",
        "item_interact",
        "block_action",
        "item_stack_request",
        "handled_teleport",
        "emoting",
        "missed_swing",
        "start_crawling",
        "stop_crawling",
        "start_flying",
        "stop_flying",
        "received_server_data"
    ]
}
export interface ArmorDamageType {
    "type": "u8",
    "flags": {
        "head": 1,
        "chest": 2,
        "legs": 4,
        "feet": 8
    }
}
export interface RequestPermissions {
    "type": "lu16",
    "flags": {
        "build": 1,
        "mine": 2,
        "doors_and_switches": 4,
        "open_containers": 8,
        "attack_players": 16,
        "attack_mobs": 32,
        "operator": 64,
        "teleport": 128
    }
}
export interface InputLockFlags {
    "type": "varint",
    "flags": {
        "move": 2,
        "jump": 4,
        "sneak": 8,
        "mount": 16,
        "dismount": 32,
        "rotation": 64
    }
}