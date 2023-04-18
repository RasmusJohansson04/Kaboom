kaboom({
    width: 800,
    height: 600,
    background: [232,211,185],
})

loadSprite("player", "sprites/player.png")
loadSprite("playerLeanL", "sprites/playerLeanLeft.png")
loadSprite("playerLeanR", "sprites/playerLeanRight.png")
loadSprite("playerCrouch", "sprites/playerCrouch.png")
loadSprite("playerShoot", "sprites/playerShoot.png")
loadSprite("cover", "sprites/tempCover.png")


loadSprite("6", "sprites/mag6.png")
loadSprite("5", "sprites/mag5.png")
loadSprite("4", "sprites/mag4.png")
loadSprite("3", "sprites/mag3.png")
loadSprite("2", "sprites/mag2.png")
loadSprite("1", "sprites/mag1.png")
loadSprite("0", "sprites/mag0.png")

loadSprite("enemy", "sprites/enemyShoot.png")
loadSprite("bullet", "sprites/bullet.png")

loadSprite("x", "sprites/xBtn.png")
loadSprite("l", "sprites/lBtn.png")
loadSprite("r", "sprites/rBtn.png")

const moveAmount = 75
const bulletSpeed = 1500

const playerY = 500
const playerPos = vec2(width() / 2, playerY)
const playerPosL = vec2(width() / 2 - moveAmount, playerY)
const playerPosR = vec2(width() / 2 + moveAmount, playerY)
const playerPosC = vec2(width() / 2, playerY + moveAmount / 2)

const enemyY = 100
const enemyPos = vec2(width() / 2, enemyY)
const enemyPosL = vec2(width() / 2 - moveAmount, enemyY)
const enemyPosR = vec2(width() / 2 + moveAmount, enemyY)
const enemyPosC = vec2(width() / 2, enemyY - moveAmount / 2)

const reactionTime = .8

scene("battle", () => {

    let isStarted = false

    let cooldown = false
    let isReloading = false
    let enemyIsReloading = false
    let playerHealth = 3
    let enemyHealth = 5

    let playerIsCrouching = false
    let enemyIsCrouching = false

    let playerClip = 6
    let enemyClip = 6

    const healthBar = add([
        rect(width(), 10),
        pos(width() / 2, 0),
        color(250, 50, 50),
       origin("top"),
        fixed(),
        {
            max: enemyHealth,
            set(enemyHealth) {
                this.width = width() * enemyHealth / this.max
                this.flash = true
            }
        }
    ])

    const playerHealthBar = add([
        rect(width(), 10),
        pos(width() / 2, height() - 10),
        color(250, 50, 50),
       origin("top"),
        fixed(),
        {
            max: playerHealth,
            set(playerHealth) {
                this.width = width() * playerHealth / this.max
                this.flash = true
            }
        }
    ])

    const player = add([
        sprite("player"),
       origin("center"),
        pos(playerPos),
        scale(3, 3),
        area(),
        "PLAYER",
    ])

    const enemy = add([
        sprite("enemy"),
       origin("center"),
        pos(enemyPos),
        scale(3, 3),
        area(),
        "ENEMY",
    ])

    const clip = add([
        sprite("6"),
       origin("center"),
        pos(width() - 100, height() - 100),
        scale(3, 3),
    ])

    const drawText = add([
        pos(width() / 2, height() / 2),
       origin("center"),
        text("Press [SPACE].key to draw", {
            size: 64,
            width: width(),
            styles: {
                "key": {
                    color: rgb(255, 32, 64),
                },
            },
        })
    ])

    function addCover(position, offset) {
        add([
            sprite("cover"),
           origin("center"),
            pos(position.x, position.y + offset),
            scale(3, 3),
        ])
    }

    function playerLean(dir) {
        if (isStarted) {
            switch (dir) {
                case "left":
                    player.use(sprite("playerLeanL"))
                    playerIsCrouching = false
                    player.moveTo(playerPosL)
                    break
                case "right":
                    player.use(sprite("playerLeanR"))
                    playerIsCrouching = false
                    player.moveTo(playerPosR)
                    break/*
        case "down":
            player.use(sprite("playerCrouch"))
            console.log("Down")
            playerIsCrouching = true
            player.moveTo(playerPosC)
            break*/
                case "up":
                    player.use(sprite("playerShoot"))
                    playerIsCrouching = false
                    player.moveTo(playerPos)
                    break
            }
        }
    }

    loop(reactionTime, () => {
        if (isStarted && enemyHealth > 0) {
            enemyShoot()
            if (Math.floor(Math.random() * 4) == 1) {
                switch (player.pos.x) {
                    case playerPosL.x:
                        enemyLean(0)
                        break
                    case playerPos.x:
                        enemyLean(1)
                        break
                    case playerPosR.x:
                        enemyLean(2)
                        break
                }
            }
            else {
                enemyLean(Math.floor(Math.random() * 4))
            }
        }
    })

    function enemyShoot() {
        if (enemyClip > 0 && !enemyIsCrouching && isStarted) {
            enemyClip--
            if (enemyClip == 0 && !enemyIsReloading) {
                enemyReload()
            }
            shake(2)
            spawnEnemyBullet()
        }
    }

    function enemyLean(dir) {
        switch (dir) {
            case 0: //Left
                enemy.moveTo(enemyPosL)
                enemyIsCrouching = false
                break
            case 1: //Right
                enemy.moveTo(enemyPosR)
                enemyIsCrouching = false
                break/*
        case 2: //Down
            console.log("Down")
            enemy.moveTo(enemyPosC)
            enemyIsCrouching = true
            break*/
            case 2: //Stand
                enemy.moveTo(enemyPos)
                enemyIsCrouching = false
                break
        }
    }

    function startEnemy() {
        enemyLean(Math.floor(Math.random() * 2))
    }

    function spawnPlayerBullet() {
        add([
            sprite("bullet"),
            scale(3, 3),
            area(),
            pos(player.pos.x, player.pos.y - 50),
           origin("center"),
            move(UP, bulletSpeed),
            cleanup(),
            "P_BULLET",
        ])
    }

    function spawnEnemyBullet() {
        add([
            sprite("bullet"),
            scale(3, 3),
            area(),
            pos(enemy.pos.x, enemy.pos.y + 50),
           origin("center"),
            move(DOWN, bulletSpeed),
            cleanup(),
            "E_BULLET",
        ])
    }

    function takeDamage(target) {
        if (target == "ENEMY") {
            enemyHealth--
            healthBar.set(enemyHealth)
            if (enemyHealth <= 0) {
                destroy(enemy)
                shake(20)
                addKaboom(enemyPos.x, enemyPos.y)
                isStarted = false
                drawVictory("PLAYER")
                wait(2, () => {
                    go("battle")
                })
            }
        }
        else if (target == "PLAYER") {
            playerHealth--
            playerHealthBar.set(playerHealth)
            if (playerHealth <= 0) {
                destroy(player)
                shake(20)
                addKaboom(playerPos.x, playerPos.y)
                isStarted = false
                drawVictory("ENEMY")
                wait(2, () => {
                    go("battle")
                })
            }
        }
    }

    function drawVictory(who) {
        add([
            pos(width() / 2, height() / 2),
           origin("center"),
            text("[" + who + "].key HAS WON", {
                size: 64,
                width: width(),
                styles: {
                    "key": {
                        color: rgb(255, 32, 64),
                    },
                },
            })
        ])
    }

    function cylinder() {
        switch (playerClip) {
            case 0:
                clip.use(sprite("0"))
                break
            case 1:
                clip.use(sprite("1"))
                break
            case 2:
                clip.use(sprite("2"))
                break
            case 3:
                clip.use(sprite("3"))
                break
            case 4:
                clip.use(sprite("4"))
                break
            case 5:
                clip.use(sprite("5"))
                break
            case 6:
                clip.use(sprite("6"))
                break
        }
    }

    function playerShoot() {
        if (playerClip > 0 && !playerIsCrouching && isStarted && !cooldown) {
            playerClip--
            playerCooldown()
            if (playerClip == 0 && !isReloading) {
                playerReload()
            }
            cylinder()
            shake(2)
            spawnPlayerBullet()
        }
    }

    async function playerCooldown() {
        cooldown = true
        await wait(.5)
        cooldown = false
    }

    async function playerReload() {
        isReloading = true
        await wait(2)
        playerClip = 6
        clip.use(sprite("6"))
        isReloading = false
    }

    async function enemyReload() {
        enemyIsReloading = true
        await wait(2)
        enemyClip = 6
        enemyIsReloading = false
    }

    onCollide("P_BULLET", "ENEMY", (B) => {
        if (!enemyIsCrouching) {
            destroy(B),
                shake(1),
                takeDamage("ENEMY")
        }
    })

    onCollide("E_BULLET", "PLAYER", (B) => {
        if (!playerIsCrouching) {
            destroy(B),
                shake(1),
                takeDamage("PLAYER")
        }
    })

    onKeyPress("left", () => {
        playerLean("left")
    })
    onKeyPress("right", () => {
        playerLean("right")
    })
    onKeyPress("down", () => {
        playerLean("down")
    })
    onKeyRelease("left", () => {
        playerLean("up")
    })
    onKeyRelease("right", () => {
        playerLean("up")
    })
    onKeyRelease("down", () => {
        playerLean("up")
    })
    onKeyPress("x", () => {
        playerShoot()
    })
    onKeyPress("space", () => {
        if (!isStarted) {
            isStarted = true
            startEnemy()
            destroy(drawText)
        }
    })  
})

scene("intro", () => {
    const intro1 = add([
        pos(width() / 2, height() / 2),
       origin("center"),
        text("[RED].key", {
            size: 64,
            width: width(),
            styles: {
                "key": {
                    color: rgb(255, 32, 64),
                },
            },
        })
    ])
    wait(1, () => {
        destroy(intro1)
        const intro2 = add([
            pos(width() / 2, height() / 2),
           origin("center"),
            text("LEAD", {
                size: 64,
                width: width(),
                styles: {
                    "key": {
                        color: rgb(255, 32, 64),
                    },
                },
            })
        ])
        wait(1, () => {
            destroy(intro2)
        })
        wait(1, ()=> {
            go("battle")
        })
    })
})

go("intro")