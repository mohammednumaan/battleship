# battleship

![battleship-title](https://github.com/mohammednumaan/battleship/assets/138296610/9f57d8a5-0a67-4121-ad8c-ba3e56e89ba8)

# Demo

![battleship-demo](https://github.com/mohammednumaan/battleship/assets/138296610/0ac494cd-4379-40ae-9577-86257682f496)

<a href = 'https://mohammednumaan.github.io/battleship/'>Play Battleship?</a>

# Introduction

Battleship is a strategy type guessing game for two players. It is played on ruled grids on which each player's fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.

# Implementations

<ul><b>UI-Side Implementation</b>
  <li>A Simple and Interactive Webpage.</li>
  <li>Highlights ships during placements.</li>
  <li>Displays Valid Coordinates during User's ship placement.</li>
  <li>Displays different color's if the player's had missed a shot or attacked a ship on the board.</li>
</ul>
<ul><b>User-Side Implementation</b>
  <li>User's can place ships on their board.</li>
  <li>User's can change the placement direction while placing the ships on their board.</li>
  <li>User's can attack the Machine's board.</li>
  <li>User's can restart the game after the game has ended.</li>
</ul>

<ul><b>Machine-Side Implementation</b>
  <li>The Machine can place their ships on their board at random coordinates using <b>randomCoordinate()</b>.</li>
  <li>The Machine can generate random direction to place their ships on their board using <b>randomDirection()</b>.</li>
  <li>The Machine can attack User's board at random coordinates using a simple AI.</li>
</ul>

<b>Note :</b> If a any of the players (Machine or User) hit the enemy's ship, they will have another go/turn to attack the enemy.

# Testing

Testing for this project was done through <b>Jest</b>.

<ul>
  <li>Performed Unit Tests for several functions.</li>
  <li>High Usage of <b>expect()</b>, <b>toBe()</b>, <b>toEqual()</b> Jest Methods.
</ul>

# Disclaimer

<ul>
  <li>This game is not supported on mobile, it wasn't meant to make it responsive across platforms. The main objective of this project was to implement Testing using <b>Jest</b> and build the strategy game and <b>NOT</b> to make it responsive!</li>

  <li>The Machine's AI is not smart enough to make adjacent hits.</li>
</ul>

# Assets 

<ul>
  <li>The Fonts used in this project is called <b>Summer Pixel Wide 22</b> by Suolahti Type from https://www.fontspace.com/</li>
  <li>The Color Palette was found in https://designwizard.com/blog/colour-combination/</li>
</ul>
