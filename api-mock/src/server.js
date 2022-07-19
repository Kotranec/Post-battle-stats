const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Team building.
// The commands are divided by index in the array. From 0 to 49 - 1st comand, from 50 to 99 - 2nd comand
const nicksMock =
    "Eralynic Zaailyn Lorrey Naanander Janmaly Ssadaly Jenicdy Casonsiella Niniena Chmanke Wistebel Yajorarylyn Ianandro Arinor Andaanie Exlynary Amssary Dozoevia Nathobrian Ianbella " +
    "Ailinton Nazieria Thnolia Nioanie Vinnor Evowson Fairy Anley Icaan Ooin Iamliabley Chleyon Aaabiac Gailic Hunna Langabcole Anadrieniel Norbrly Chnelesella Molieob Tianlor Aacistessa " +
    "Laronle Lleah Kekimpaian Brashlyn Guthliia Mingabke Hnen Rahnie Phly Anrian Tutoyaan Thbriis Kedocoatt Iankava Moriason Kelaen Minmassada Luaryon Albrvin Maewsa Ancoliyck " +
    "Manen Kaelra Elbetiah Phcojaayla Xamira Mnshlly Neyian Ellulor Rtdonrole Lisaen Kyleyden Ckelauton Anliley Owarytian Ellason Vidsa Angephia Linile Belernic Niiajorria Jayolivin " +
    "Tonsa Icaleylly Ssacariah Benreke Laanya Rolyn Sasavango Renlyn Berthan Gailmanew Ewlierian Samuleyander Jenla Niel Chniert Goelribel";
const friendsIdsMock = [3, 23, 77];

const players = nicksMock.split(" ").map((item, ind) => ({
  id: ind,
  nickname: item,
  fights: 0,
  victories: 0,
}));
const shuffPlayers = (array => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
})(players);

// Formation of the result of the battle.  
const playersPostBattle = playersInBattle => {
  const firstTeamWinner = Math.random() > 0.5;
  const playersWithScore = playersInBattle.map((item, ind) => {
    const state = Math.random() > 0.5;    
    const kills = Math.floor(Math.random() * 30);
    const deaths = Math.floor(Math.random() * 30);
    const friend = friendsIdsMock.includes(item.id);
    players[item.id].fights++;
    ind < 50 && firstTeamWinner && players[item.id].victories++;
    ind >= 50 && !firstTeamWinner && players[item.id].victories++;

    return {
      id: item.id,
      nickname: players.find(p => p.id === item.id).nickname,
      scores: kills - deaths,
      state,
      kills,
      deaths,
      winner: ind < 50 ? firstTeamWinner : !firstTeamWinner,
      friend,
      fights: players[item.id].fights,
      victories: players[item.id].victories,
    };
  });
  return playersWithScore;
}


  
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Have all URLS prefixed with a /api
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.get("/next-battle", (req, res) => {
  res.statusCode = 200;
  res.send(playersPostBattle(shuffPlayers));
})

server.post("/add-remove-friend", (req, res) => {
  const ind = friendsIdsMock.indexOf(req.body.id);

  // If the player is already a friend, then delete him, otherwise add him as a friend
  req.body.friend ? friendsIdsMock.splice(ind, 1) : friendsIdsMock.push(req.body.id);
  
  res.statusCode = 200;
  res.send(req.body);
});

server.listen(8080, () => {
  console.log("JSON Server is running");
});
