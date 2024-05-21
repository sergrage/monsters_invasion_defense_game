# Игровой движок <!-- omit in toc -->

- [Базовые классы](#базовые-классы)
  - [GamePage](#gamepage)
  - [MapGenerator](#mapgenerator)
  - [EnemiesGenerator](#enemiesgenerator)
  - [PlacementTile](#placementtile)
  - [TilesGenerator](#tilesgenerator)
  - [EventSubject](#eventsubject)
  - [TowersSelector](#towersselector)
  - [TowerMenu](#towermenu)
  - [Game](#game)
  - [Методы игры](#методы-игры)

## Базовые классы

### GamePage

Основной класс, здесь запускается игровой цикл, здесь запускается инициализация всех игровых объектов. А также содержатся вспомогательные методы по работе с различной логикой игры.


|          Имя           | Описание                                          |
|:----------------------:|:--------------------------------------------------|
|       **coins**        | параметр начального количества монет              |
|       **hearts**       | параметрначального количества жизней              |
|       **level**        | параметр уровень игры с конфигурационными данными |
|     **canvasRef**      | параметр ссылка на HTML элемент холста            |
|      **mapImage**      | параметр изображения карты для игры               |
|     **waypoints**      | параметр путь движения врагов                     |
| **placementTilesData** | параметр данных для размещения плиток             |
|  **eventSubject**      | параметр экземпляр класса для обработки событий   |

Пример инициализации и запуска игрового движка

```javascript
if (!canvasRef.current) return;
// Create instances of dependencies
const mapGenerator = new MapGenerator(
  1280,
  768,
  canvasRef.current,
  myImage,
);
const enemiesGenerator = new EnemiesGenerator(mapGenerator.ctx, waypoints);
const tilesGenerator = new TilesGenerator(
  mapGenerator.ctx,
  placementTilesData,
  PlacementTile,
);
const eventSubject = new EventSubject();
const towerSelector = new TowersSelector(coins);
const towerMenu = new TowerMenu();

// get canvas offset
const coords = canvasRef.current.getBoundingClientRect();
const globalOffset = { x: coords.left, y: coords.top };

const game = new Game(
  coins,
  hearts,
  globalOffset,
  mapGenerator,
  enemiesGenerator,
  tilesGenerator,
  eventSubject,
  level,
  towerSelector,
  towerMenu,
);

const coinsChangedObserver = new EventObserver(handleCoinsChangedEvent);
const heartsChangedObserver = new EventObserver(handleHeartsChangedEvent);
const gameOverObserver = new EventObserver(handleGameOverEvent);

game.eventSubject.attach("coinsChanged", coinsChangedObserver);
game.eventSubject.attach("heartsChanged", heartsChangedObserver);
game.eventSubject.attach("gameOver", gameOverObserver);

game.initialize();
game.initGame();
```

1. Проверка наличия canvasRef:```
   if (!canvasRef.current) return;```

2. Создание экземпляра MapGenerator: ```
   const mapGenerator = new MapGenerator(1280, 768, canvasRef.current, myImage);```
3. Создание экземпляра EnemiesGenerator: ```
   const enemiesGenerator = new EnemiesGenerator(mapGenerator.ctx, waypoints);```
4. Создание экземпляра TilesGenerator: ```
   const tilesGenerator = new TilesGenerator(mapGenerator.ctx, placementTilesData, PlacementTile);```
5. Создание экземпляра EventSubject: ```
   const eventSubject = new EventSubject();
6. Создание экземпляра TowersSelector:```
   const towerSelector = new TowersSelector(coins);```
7. Создание экземпляра TowerMenu:```
   const towerMenu = new TowerMenu();```
8. Получение смещения холста:```
   const coords = canvasRef.current.getBoundingClientRect();
   const globalOffset = { x: coords.left, y: coords.top };```
9. Создание экземпляра Game:```
   const game = new Game(
   coins,
   hearts,
   globalOffset,
   mapGenerator,
   enemiesGenerator,
   tilesGenerator,
   eventSubject,
   level,
   towerSelector,
   towerMenu
   );```
10. Создание наблюдателей событий:```
    const coinsChangedObserver = new EventObserver(handleCoinsChangedEvent);
    const heartsChangedObserver = new EventObserver(handleHeartsChangedEvent);
    const gameOverObserver = new EventObserver(handleGameOverEvent);```

### MapGenerator

```javascript
const mapGenerator = new MapGenerator(
  1280,
  768,
  canvasRef.current,
  myImage,
);
```

Абстрактный класс игрового объекта, для генерации карты на основе
предоставленных параметров: `width`, `height`, `canvasRef.current` и `myImage`.



|          Имя          | Описание               |
|:---------------------:|:-----------------------|
|       **width**       | Ширина карты           |
|      **height**       | Высота карты           |
| **canvasRef.current** | Ссылка на канвас       |
|     **myImage**       | Изображение карты игры |

### EnemiesGenerator

```javascript
 const enemiesGenerator = new EnemiesGenerator(mapGenerator.ctx, waypoints);
```

Абстрактный класс игрового объекта, для генерации врагов на основе
предоставленных параметров: `mapGenerator.ctx`, `waypoints`.


|         Имя          | Описание                                                                                            |
|:--------------------:|:----------------------------------------------------------------------------------------------------|
| **mapGenerator.ctx** | параметр  2d context игрового канваса                                                               |
|    **waypoints**     | параметр координаты по которым идут враги                                                           |
|     **generate**     | Метод generate отвечает за создание врагов на основе данных о волне.                                |


### PlacementTile

Реализует функционал для отображения и обновления плиток на игровом поле.
Он обладает методами для отрисовки изображения плитки и обновления ее состояния
в зависимости от действий пользователя.


|        Имя        | Описание                                                                                                                                                                                                 |
|:-----------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     **draw**      | метод рисует тайл на холсте.                                                                                                                                                                             |
|    **update**     | Обновляет состояние тайла в зависимости от положения мыши                                                                                                                                                |


### TilesGenerator

```javascript
 const tilesGenerator = new TilesGenerator(mapGenerator.ctx, placementTilesData, PlacementTile);
```

Абстрактный класс игрового объекта, для генерации плиток размещения башен на основе предоставленных параметров: `mapGenerator.ctx`, `placementTilesData`,`PlacementTile`.


|              Имя               | Описание                                                                                                                                                                                          |
|:------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      **mapGenerator.ctx**      | параметр 2d context игрового канваса                                                                                                                                                              |
|     **placementTilesData**     | параметр координаты плиток для размещения башен                                                                                                                                                   |
|       **PlacementTile**        | реализует функционал для отображения и обновления плиток на игровом поле. Он обладает методами для отрисовки изображения плитки и обновления ее состояния в зависимости от действий пользователя. |

### EventSubject

```javascript
 const eventSubject = new EventSubject();
```

EventSubject может быть использован для создания централизованного механизма управления событиями в игре. После создания экземпляра EventSubject, другие объекты могут подписываться на события и реагировать на них с помощью методов attach и notify соответственно.


|    Имя     | Описание                                                                                                                                                                                                                 |
|:----------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **attach** | Присоединяет наблюдателя к определенному событию.                                                                                                                                                                        |
| **detach** | Отсоединяет наблюдателя от определенного события.                                                                                                                                                                        |
| **notify** | Уведомляет всех присоединенных наблюдателей, когда происходит определенное событие.                                                                                                                                      |


### TowersSelector

```javascript
const towerSelector = new TowersSelector(coins);
```

TowersSelector - это класс, который обеспечивает выбор башен в игровом контексте.

|             Имя              | Описание                                                                                            |
|:----------------------------:|:----------------------------------------------------------------------------------------------------|
|          **coins**           | параметр текущего золота                                                                            |
|           **init**           | метод инициализирует интерфейс выбора башен, загружает данные башен и добавляет обработчики событий |
|    **clickTowerHandler**     | метод обрабатывает щелчки по изображениям башен, позволяя выбрать или снять выбор с башни           |
|     **getSelectedTower**     | метод обрабатывает щелчки по изображениям башен, позволяя выбрать или снять выбор с башни           |
|       **updateCoins**        | метод обновляет количество монет и доступность башен                                                |
|  **updateAvailableTowers**   | метод обновляет состояние башен в зависимости от количества монет (доступные или недоступные)       |
| **showSelectedTower**        | метод отображает визуальный индикатор выбранной башни                                               |

### TowersMenu

```javascript
    const towerMenu = new TowerMenu();
```

TowerMenu - это класс, который представляет собой меню для взаимодействия с башнями в игровом контексте. Он позволяет игроку апгрейдить или продавать башни, управляя их размещением на игровом поле.

|            Имя            | Описание                                                                        |
|:-------------------------:|:--------------------------------------------------------------------------------|
|      **tileCoords**       | Координаты плитки, на которой расположена выбранная башня                       |
|     **selectedTower**     | Выбранная башня (экземпляр класса TowerConstructor)                             |
|     **placementTile**     | Плитка, на которой размещена выбранная башня (экземпляр класса PlacementTile)   |
|         **coins**         | Количество монет у игрока                                                       |
| **handleBuildingRemoval** | Функция обратного вызова для удаления выбранной башни                           |
|       **setCoins**        | Функция для обновления количества монет у игрока                                |
|     **hide(): void**      | Скрывает меню с экрана                                                          |


### Game

```javascript
const game = new Game(
  coins,
  hearts,
  globalOffset,
  mapGenerator,
  enemiesGenerator,
  tilesGenerator,
  eventSubject,
  level,
  towerSelector,
  towerMenu,
);
```

Создание экземпляра Game - это процесс инициализации игрового движка или игровой среды для запуска игры или интерактивного приложения. Этот процесс обычно включает в себя загрузку игровых ресурсов, настройку игровых компонентов и запуск основного игрового цикла.


|         Имя          | Описание                                                                                                                                                                                                                                                                        |
|:--------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      **coins**       | параметр текущего золота                                                                                                                                                                                                                                                        |
|      **hearts**      | параметр текущих жизней                                                                                                                                                                                                                                                         |
|   **globalOffset**   | параметр получения смещения холста - это процесс определения текущего смещения холста относительно его начальной позиции.                                                                                                                                                       |
|   **mapGenerator**   | папаметр абстрактный класс игрового объекта, для генерации карты на основе предоставленных параметров: `width`, `height`, `canvasRef.current` и `myImage`.                                                                                                                      |
| **enemiesGenerator** | параметр абстрактный класс игрового объекта, для генерации врагов на основе предоставленных параметров: `mapGenerator.ctx`, `waypoints`.                                                                                                                                        |
|  **tilesGenerator**  | параметр абстрактный класс игрового объекта, для генерации плиток размещения башен на основе предоставленных параметров: `mapGenerator.ctx`, `placementTilesData`,`PlacementTile`.                                                                                              |
|   **eventSubject**   | параметр EventSubject может быть использован для создания централизованного механизма управления событиями в игре. После создания экземпляра EventSubject, другие объекты могут подписываться на события и реагировать на них с помощью методов attach и notify соответственно. |
|      **level**       | параметр Моковые данные с количествои жизней,золота и характеристиками волн врагов                                                                                                                                                                                              |
|  **towerSelector**   | параметр TowersSelector - это класс, который обеспечивает выбор башен в игровом контексте.                                                                                                                                                                                      |
|    **towerMenu**     | параметр TowerMenu - это класс, который представляет собой меню для взаимодействия с башнями в игровом контексте. Он позволяет игроку апгрейдить или продавать башни, управляя их размещением на игровом поле.                                                                  |


### Методы игры

## setCoins

Изменяет количество монет и обновляет доступные башни

```typescript
/* ... */
setCoins(newCoins: number: void {
  // тело метода
}
/* ... */
```

### triggerCoinsChangeEvent

Вызывает событие изменения количества монет

```typescript
/* ... */
triggerCoinsChangeEvent(): void {

}
/* ... */
```

### setHearts

Изменяет количество жизней

```typescript
/* ... */
setHearts(newHearts: number): void {

}
/* ... */
```

### setGameOver

Завершает игру

```ts
/* ... */
setGameOver(): void;
/* ... */
```

### triggerHeartsChangeEvent

Вызывает событие изменения количества жизней

```ts
/* ... */
triggerHeartsChangeEvent(): void {}
/* ... */
```

### triggerGameOverEvent

Вызывает событие завершения игры

```ts
/* ... */
triggerGameOverEvent(): void
/* ... */
```

### setNextWave

Устанавливает следующую волну врагов

```js
/* ... */
setNextWave(): void
/* ... */
```

### initialize

Инициализирует карту, тайлы и врагов

```js
/* ... */
initialize(): void
/* ... */
```

### initializeMap

Инициализирует карту

```js
/* ... */
initializeMap(): void
/* ... */
```

### initializeTiles

Инициализирует тайлы(плитки) для размещения башен

```js
/* ... */
initializeTiles(): void;
/* ... */
```

### spawnEnemies

Генерирует следующую волну врагов

```js
/* ... */
spawnEnemies(): void;
/* ... */
```

### initGame

Инициализирует игру и запускает анимацию

```js
initGame(): void;
```

### handleEnemyLogic

Обрабатывает логику врагов

```js
/* ... */
handleEnemyLogic(animationId: number): void
/* ... */
```

### handleTilesLogic

Обрабатывает логику тайлов

```js
/* ... */
handleTilesLogic(): void
/* ... */
```

### animate

Запускает анимацию игры

```js
/* ... */
animate(): void
/* ... */
```

### handleBuildingsLogic

Обрабатывает логику башен

```js
/* ... */
handleBuildingsLogic(): void
/* ... */
```

### updateBuilding

Обновляет состояние башни

```js
/* ... */
updateBuilding(building: TowerConstructor): void
/* ... */
```

### handleBuildingTarget

Обрабатывает цель башни

```js
/* ... */
handleBuildingTarget(building: TowerConstructor): void
/* ... */
```

### findValidEnemies

Находит валидных врагов для башни

```js
/* ... */
findValidEnemies(building: TowerConstructor): Enemy[]
/* ... */
```

### handleBuildingProjectiles

Обрабатывает логику снарядов башни

```js
/* ... */
handleBuildingProjectiles(building: TowerConstructor): void
/* ... */
```

### updateProjectile

Обновляет состояние снаряда

```js
updateProjectile(projectile: Projectile): void
/* ... */
```

### handleProjectileCollision

Обрабатывает столкновение снаряда с врагом

```js
handleProjectileCollision(projectile: Projectile, building: TowerConstructor, i: number): void
/* ... */
```

### handleEnemyHit

Обрабатывает попадание по врагу

```js
handleEnemyHit(projectile: Projectile): void
/* ... */
```

### handleProjectileHit

Обрабатывает попадание снаряда

```js
handleProjectileHit(projectile: Projectile, building: TowerConstructor, i: number): void

/* ... */
```

### calculateDistance

Вычисляет расстояние между двумя точками

```js
calculateDistance(point1: IPosition, point2: IPosition): number

/* ... */
```

### handleCanvasClick

Обрабатывает щелчки на холсте

```js
handleCanvasClick(): void

/* ... */
```

### handleTowerCreation

Обрабатывает создание башни

```js
handleTowerCreation(): void;
/* ... */
```

### handleTowerMenu

Обрабатывает показ меню башни

```js
handleTowerMenu(): void;
/* ... */
```

### handleBuildingRemoval

Обрабатывает удаление башни

```js
handleBuildingRemoval(selectedTower: TowerConstructor, placementTile: PlacementTile): void;
/* ... */
```

### handleMouseMove

Обрабатывает движение мыши

```js
handleMouseMove(event: MouseEvent): void;
/* ... */
```
