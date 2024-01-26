interface MCPacket {
    packetName: string,
    packetParams: object
}

interface LevelSoundEvent extends MCPacket {
    packetName: "level_sound_event",
    packetParams: {
        position: {
            x: number,
            y: number,
            z: number
        },
        extra_data: number,
        sound_id: string,
        entity_type: string,
        is_global: boolean;
    }
}

interface CommandRequest extends MCPacket {
    packetName: "command_request",
    packetParams: {
        command: string,
        origin: {
            type: 0 | 5,
            uuid: string | "",
            request_id: string | ""
        },
        internal: boolean,
        version: number | 66
    }
}


interface Disconnect extends MCPacket {
    packetName: "disconnect",
    packetParams: {
        hide_disconnect_screen: boolean,
        message: string
    }
}

interface SetTime extends MCPacket {
    packetName: "set_time",
    packetParams: {
        time: number
    }
}

interface SetSpawnPosition extends MCPacket {
    packetName: "set_spawn_position",
    packetParams: {
        spawn_type: number,
        position: {
            x: number,
            y: number,
            z: number
        }
    }
}
//             const [serverType, description, numberA, version, currentPlayers, maxPlayers, numberB, motd, gameMode] = stream.extra.split(";")

export enum GameMode {
    "Survival" = 0,
    "Creative" = 1,
    "Adventure" = 2,
    "SurvivalSpectator" = 3,
    "CreativeSpectator" = 4,
    "Default" = 5
}


interface ServerAdvertisement extends MCPacket {
    packetName: "server_advertisement",
    packetParams: {
        server_type: string,
        description: string,
        protocol_version: number,
        version: string,
        current_players: number,
        max_players: number,
        server_guid: number,
        motd: string,
        gamemode: GameMode
    }
}

interface MobEffect extends MCPacket {
    packetName: "mob_effect",
    packetParams: {
        entity_id: bigint,
        event_id: number,
        effect_id: number,
        amplifier: number,
        particles: boolean,
        duration: number
    }
}

interface Text extends MCPacket {
    packetName: "text",
    packetParams: {
        type: number | "rawtext" | "chat" | "translation" | "popup" | "jukeboxpopup" | "tippopup" | "system" | "whisper" | "announcement",
        /** Used for rawtext */
        needs_translation: boolean,
        source_name: string,
        message: string,
        parameters: string[],
        xuid: string,
        platform_chat_id: string
    }
}

interface SetScore extends MCPacket {
    packetName: "set_score",
    packetParams: {
        entries: {
            name: string,
            objective: string,
            score: number,
            scoreboard_id: string
        }[]
    }
}

interface SetHealth extends MCPacket {
    packetName: "set_health",
    packetParams: {
        health: number
    }
}

interface SetTitle extends MCPacket {
    packetName: "set_title",
    packetParams: {
        type: number,
        text: string,
        fadeInTime: number,
        stayTime: number,
        fadeOutTime: number
    }
}

interface SetPlayerGameType extends MCPacket {
    packetName: "set_player_game_type",
    packetParams: {
        gamemode: number
    }
}

interface SetDisplayObjective extends MCPacket {
    packetName: "set_display_objective",
    packetParams: {
        display_slot: string,
        objective_name: string
    }
}

interface MoveActorAbsolute extends MCPacket {
    packetName: "move_actor_absolute",
    packetParams: {
        runtime_entity_id: bigint,
        flags: number,
        position: {
            x: number,
            y: number,
            z: number
        },
        pitch: number,
        yaw: number,
        head_yaw: number,
        riding_runtime_entity_id: bigint,
        teleport: boolean,
        on_ground: boolean
    }
}

interface SetActorMotion extends MCPacket {
    packetName: "set_actor_motion",
    packetParams: {
        runtime_entity_id: bigint,
        motion: {
            x: number,
            y: number,
            z: number
        }
    }
}

interface SetActorData extends MCPacket {
    packetName: "set_actor_data",
    packetParams: {
        runtime_entity_id: bigint,
        metadata: {
            flags: number,
            type: number,
            value: any
        }[]
    }
}

interface Login extends MCPacket {
    packetName: "login",
    packetParams: {
        chains: unknown,
    }
}


interface SubClientLogin extends MCPacket {
    packetName: "sub_client_login",
    packetParams: Login["packetParams"]
}

interface PlayStatus extends MCPacket {
    packetName: "play_status",
    packetParams: {
        status: number
    }
}

interface PlayerAuthInput extends MCPacket {
    position: {
        x: number,
        y: number,
        z: number
    },
    move_vector: {
        x: number,
        z: number
    },
    head_yaw: number,
    yaw: number,
    pitch: number,
    input_data: {
        _value: 0n,
        ascend: boolean,
        descend: boolean,
        north_jump: boolean,
        jump_down: boolean,
        sprint_down: boolean,
        change_height: boolean,
        jumping: boolean,
        auto_jumping_in_water: boolean,
        sneaking: boolean,
        sneak_down: boolean,
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean,
        up_left: boolean,
        up_right: boolean,
        want_up: boolean,
        want_down: boolean,
        want_down_slow: boolean,
        want_up_slow: boolean,
        sprinting: boolean,
        ascend_block: boolean,
        descend_block: boolean,
        sneak_toggle_down: boolean,
        persist_sneak: boolean,
        start_sprinting: boolean,
        stop_sprinting: boolean,
        start_sneaking: boolean,
        stop_sneaking: boolean,
        start_swimming: boolean,
        stop_swimming: boolean,
        start_jumping: boolean,
        start_gliding: boolean,
        stop_gliding: boolean,
        item_interact: boolean,
        block_action: boolean,
        item_stack_request: boolean
    },
    input_mode: number,
    play_mode: number,
    interaction_model: 'touch',
    tick: bigint,
    delta: {
        x: number,
        y: number,
        z: number
    },
    analogue_move_vector: {
        x: number,
        z: number
    }
}

interface PlayerAction extends MCPacket {
    packetName: "player_action",
    packetParams: {
        runtime_entity_id: bigint,
        action_type: number,
        block_position: {
            x: number,
            y: number,
            z: number
        },
        result_position: {
            x: number,
            y: number,
            z: number
        },
        block_face: number
    }
}
interface ResourcePackClientResponse extends MCPacket {
    packetName: "resource_pack_client_response",
    packetParams: {
        status: number
    }
}

interface ChunkRadiusUpdated extends MCPacket {
    packetName: "chunk_radius_updated",
    packetParams: {
        chunk_radius: number
    }
}

interface Emote extends MCPacket {
    packetName: "emote",
    packetParams: {
        runtime_entity_id: bigint,
        emote_id: string,
        xuid: string,
        platform_id: string,
        flags: number
    }
}

interface SetLocalPlayerAsInitialized extends MCPacket {
    packetName: "set_local_player_as_initialized",
    packetParams: {}
}

interface ContainerOpen extends MCPacket {
    packetName: "container_open",
    packetParams: {
        window_id: number,
        type: string,
        coordinates: {
            x: number,
            y: number,
            z: number
        },
        entity_id: bigint
    }
}

interface ContainerClose extends MCPacket {
    packetName: "container_close",
    packetParams: {
        window_id: number,
        server_side: boolean
    }
}

interface UpdateBlock extends MCPacket {
    packetName: "update_block",
    packetParams: {
        block_position: {
            x: number,
            y: number,
            z: number
        },
        block_runtime_id: number,
        flags: number
    }
}


interface PlayerList extends MCPacket {
    packetName: "player_list",
    packetParams: {
        type: number,
        entries: {
            uuid: string,
            username: string,
            entity_id: bigint,
            skin_id: string,
            skin_data: string,
            cape_data: string,
            is_teacher: boolean,
            is_host: boolean,
            is_muted: boolean,
            is_valid: boolean
        }[]
    }
}

interface InventoryTransaction extends MCPacket {
    packetName: "inventory_transaction",
    packetParams: {
        actions: {
            source: number,
            source_type: number,
            old_item: {
                block_id: number,
                item_id: number,
                item_aux_value: number,
                stack_id: number,
                amount: number,
                data: Buffer
            },
            new_item: {
                block_id: number,
                item_id: number,
                item_aux_value: number,
                stack_id: number,
                amount: number,
                data: Buffer
            }
        }[],
        transaction_type: number,
        transaction_id: number,
        unknown: boolean
    }
}

export type PacketList = {
    level_sound_event: LevelSoundEvent,
    command_request: CommandRequest,
    disconnect: Disconnect,
    set_time: SetTime,
    set_spawn_position: SetSpawnPosition,
    server_advertisement: ServerAdvertisement,
    mob_effect: MobEffect,
    text: Text,
    set_score: SetScore,
    error: { packetName: "error", packetParams: Error },
    set_health: SetHealth,
    set_title: SetTitle,
    set_player_game_type: SetPlayerGameType,
    set_display_objective: SetDisplayObjective,
    move_actor_absolute: MoveActorAbsolute,
    set_actor_motion: SetActorMotion,
    set_actor_data: SetActorData,
    login: Login,
    sub_client_login: SubClientLogin,
    play_status: PlayStatus,
    resource_pack_client_response: ResourcePackClientResponse,
    chunk_radius_updated: ChunkRadiusUpdated,
    emote: Emote,
    set_local_player_as_initialized: SetLocalPlayerAsInitialized,
    container_open: ContainerOpen,
    container_close: ContainerClose,
    update_block: UpdateBlock,
    player_list: PlayerList,
    inventory_transaction: InventoryTransaction,
    ["client.server_handshake"]: { packetName: "client.server_handshake", packetParams: {} },
    ["server.client_handshake"]: { packetName: "server.client_handshake", packetParams: {} },
}
