kaboom({
    width: 800,
    height: 600,
    background: [51, 151, 255],
})

loadSprite("player", "/sprites/player.png")
loadSprite("enemy", "/sprites/enemy.png")
loadSprite("bullet", "/sprites/bullet.png")

let isStarted = false

const playerPos = vec2(width()/2, 500)
const enemyPos = vec2(width()/2, 100)

let isReloading = false
let playerHealth = 1
let enemyHealth = 5

let playerIsCrouching = false
let enemyIsCrouching = false

let playerClip = 6
let enemyClip = 6

const moveAmount = 5000
const bulletSpeed = 1500

const player = add([
    sprite("player"),
    origin("center"),
    pos(playerPos),
    scale(3,3),
    area(),
    "PLAYER",
])

const enemy = add([
    sprite("enemy"),
    origin("center"),
    pos(enemyPos),
    scale(3,3),
    area(),
    "ENEMY",
])

const drawText = add([
    pos(width() / 2, height() / 2),
    origin("center"),
    text("Press [SPACE].key to draw" ,{
        size: 64,
        width: width(),
        styles: {
			"key": {
				color: rgb(255, 32, 64),
			},
		},
    })
])

function playerLean(dir)
{
    switch(dir) 
    {
        case "left":
            console.log("Left")
            playerIsCrouching = false
            player.move(-moveAmount, 0)
            break
        case "right":
            console.log("Right")
            playerIsCrouching = false
            player.move(moveAmount, 0)
            break
        case "down":
            console.log("Down")
            playerIsCrouching = true
            break
        case "up":
            console.log("Stand")
            playerIsCrouching = false
            player.moveTo(playerPos)
            break
    }
}

function enemyLean(dir)
{
    switch(dir) 
    {
        case 0: //Left
            console.log("Left")
            enemy.move(-moveAmount, 0)
            break
        case 1: //Right
            console.log("Right")
            enemy.move(moveAmount, 0)
            break
        case 2: //Down
            console.log("Down")
            break
        case 3: //Stand
            console.log("Stand")
            enemy.moveTo(enemyPos)
            break
    }
}

function startEnemy()
{
    enemyLean(Math.floor(Math.random() * 4))
}

function spawnPlayerBullet()
{
    add([
        sprite("bullet"),
        scale(3,3),
        area(),
        pos(player.pos.x, player.pos.y-50),
        origin("center"),
        move(UP, bulletSpeed),
        cleanup(),
        "P_BULLET",
    ])
}

function takeDamage(target)
{
    if(target == "ENEMY")
    {
        enemyHealth--
        if(enemyHealth <= 0)
        {
            destroy(enemy)
            shake(2)
            addKaboom(enemy.pos.x, enemy.pos.y)
        }
    }
    else if(target == "PLAYER")
    {
        playerHealth--
        if(playerHealth <= 0)
        {
            destroy(player)
            shake(2)
            addKaboom(player.pos.x, player.pos.y)
        }
    }
}

function playerShoot()
{
    if(playerClip > 0 && !playerIsCrouching)
    {
        playerClip--
        shake(2)
        spawnPlayerBullet()
    }
    else {
        if(!isReloading)
        {
            playerReload()
        }
    }
}

async function playerReload()
{
    isReloading = true
    await wait(2)
    playerClip = 6
    isReloading = false
}

onCollide("P_BULLET", "ENEMY", (B, E) => {
    destroy(B),
    shake(1),
    takeDamage("ENEMY")
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
    console.log("Bang")
    playerShoot()
})

onKeyPress("space", () => {
    if(!isStarted)
    {
        isStarted = true
        startEnemy()
        destroy(drawText)
    }
})