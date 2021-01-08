enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy
}
scene.onHitTile(SpriteKindLegacy.Enemy, 15, function (sprite) {
    info.changeScoreBy(-5)
    sprite.destroy()
    controller.startLightPulse(0xff0000, 500)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (numberMissiles < 3) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . 1 . . . . . 
            . . 2 2 2 2 . . 
            . . 1 . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `, mySprite, 50, 0)
        music.magicWand.play()
        numberMissiles += 1
        pause(200)
    }
})
sprites.onOverlap(SpriteKindLegacy.Player, SpriteKindLegacy.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKindLegacy.Projectile, SpriteKindLegacy.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    numberMissiles += -1
    info.changeScoreBy(1)
})
scene.onHitTile(SpriteKindLegacy.Projectile, 15, function (sprite) {
    numberMissiles += -1
})
let mySprite4: Sprite = null
let asteroidType = 0
let projectile: Sprite = null
let numberMissiles = 0
let list: number[] = []
let mySprite: Sprite = null
info.setLife(3)
effects.starField.startScreenEffect()
scene.setTile(15, img`
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    `, true)
scene.setTile(13, img`
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    `, true)
scene.setTileMap(img`
    f . . . . . . . . f 
    f . . . . . . . . f 
    f . . . . . . . . f 
    f . . . . . . . . f 
    f . . . . . . . . f 
    f . . . . . . . . f 
    f . . . . . . . . f 
    f . . . . . . . . f 
    `)
mySprite = sprites.create(img`
    . . 1 1 1 . . . . . . . . . . . 
    . . 1 d d 1 . . . . . . . . . . 
    . . 1 d d d 1 . . . . . . . . . 
    . . 1 d 2 d d 1 . . . . . . . . 
    . . 1 d 2 2 d d 1 . . . . . . . 
    . . 1 d 2 2 2 d 1 1 1 . . . . . 
    . . 1 d 2 2 2 2 d d d 1 1 1 1 . 
    . . 1 d 2 2 2 2 2 2 d d d d d 1 
    . . 1 d 2 2 2 2 2 2 d d d d d 1 
    . . 1 d 2 2 2 2 d d d 1 1 1 1 . 
    . . 1 d 2 2 2 d 1 1 1 . . . . . 
    . . 1 d 2 2 d d 1 . . . . . . . 
    . . 1 d 2 d d 1 . . . . . . . . 
    . . 1 d d d 1 . . . . . . . . . 
    . . 1 d d 1 . . . . . . . . . . 
    . . 1 1 1 . . . . . . . . . . . 
    `, SpriteKindLegacy.Player)
let mySprite3 = list[randint(0, 2)]
mySprite.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(mySprite, 100, 100)
game.onUpdateInterval(randint(500, 1500), function () {
    asteroidType = randint(0, 4)
    if (asteroidType == 0) {
        mySprite4 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . c c c c . . 
            . c c c c c . c c c c c f c c . 
            c c a c c c c c 8 f f c f f c c 
            c a f a a c c a f f c a a f f c 
            c a 8 f a a c a c c c a a a a c 
            c b c f a a a a a c c c c c c c 
            c b b a a c f 8 a c c c 8 c c c 
            . c b b a b c f a a a 8 8 c c . 
            . . . . a a b b b a a 8 a c . . 
            . . . . c b c a a c c b . . . . 
            . . . . b b c c a b b a . . . . 
            . . . . b b a b a 6 a . . . . . 
            . . . . c b b b 6 6 c . . . . . 
            . . . . . c a 6 6 b c . . . . . 
            . . . . . . . c c c . . . . . . 
            `, SpriteKindLegacy.Enemy)
    } else if (asteroidType == 1) {
        mySprite4 = sprites.create(img`
            . . . . . . . . . c c 8 . . . . 
            . . . . . . 8 c c c f 8 c c . . 
            . . . c c 8 8 f c a f f f c c . 
            . . c c c f f f c a a f f c c c 
            8 c c c f f f f c c a a c 8 c c 
            c c c b f f f 8 a c c a a a c c 
            c a a b b 8 a b c c c c c c c c 
            a f c a a b b a c c c c c f f c 
            a 8 f c a a c c a c a c f f f c 
            c a 8 a a c c c c a a f f f 8 a 
            . a c a a c f f a a b 8 f f c a 
            . . c c b a f f f a b b c c 6 c 
            . . . c b b a f f 6 6 a b 6 c . 
            . . . c c b b b 6 6 a c c c c . 
            . . . . c c a b b c c c . . . . 
            . . . . . c c c c c c . . . . . 
            `, SpriteKindLegacy.Enemy)
    } else if (asteroidType == 2) {
        mySprite4 = sprites.create(img`
            . . . . . . c c c . . . . . . . 
            . . . . . a a a c c c . . . . . 
            . . . c a c f a a a a c . . . . 
            . . c a c f f f a f f a c . . . 
            . c c a c c f a a c f f a c . . 
            . a b a a c 6 a a c c f a c c c 
            . a b b b 6 a b b a a c a f f c 
            . . a b b a f f b b a a c f f c 
            c . a a a c c f c b a a c f a c 
            c c a a a c c a a a b b a c a c 
            a c a b b a a 6 a b b 6 b b c . 
            b a c b b b 6 b c . c c a c . . 
            b a c c a b b a c . . . . . . . 
            b b a c a b a a . . . . . . . . 
            a b 6 b b a c . . . . . . . . . 
            . a a b c . . . . . . . . . . . 
            `, SpriteKindLegacy.Enemy)
    } else {
        mySprite4 = sprites.create(img`
            . . . . . . . . c c c c . . . . 
            . . . . c c c c c c c c c . . . 
            . . . c f c c a a a a c a c . . 
            . . c c f f f f a a a c a a c . 
            . . c c a f f c a a f f f a a c 
            . . c c a a a a b c f f f a a c 
            . c c c c a c c b a f c a a c c 
            c a f f c c c a b b 6 b b b c c 
            c a f f f f c c c 6 b b b a a c 
            c a a c f f c a 6 6 b b b a a c 
            c c b a a a a b 6 b b a b b a . 
            . c c b b b b b b b a c c b a . 
            . . c c c b c c c b a a b c . . 
            . . . . c b a c c b b b c . . . 
            . . . . c b b a a 6 b c . . . . 
            . . . . . . b 6 6 c c . . . . . 
            `, SpriteKindLegacy.Enemy)
    }
    mySprite4.setPosition(135, randint(2, 120))
    mySprite4.setVelocity(randint(-25, -90), 0)
})
