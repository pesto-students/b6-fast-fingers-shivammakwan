export const initialState = {
  playerName: null,
  level: "EASY", //HARD,MEDIUM
  difficultyFactorTypes: { EASY: 1, MEDIUM: 1.5, HARD: 2 },
  difficultyFactor: 1,
  playing: false,
  status: "START", //OVER,PLAYING
  dictionary: {
    EASY: [],
    HARD: [],
    MEDIUM: [],
  },
  dataReceived: false,
  scores: undefined,
  totalScoreList: [],
};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "SET_PLAYER":
      return {
        ...state,
        playerName: action.name,
      };
    case "SET_LEVEL":
      return {
        ...state,
        level: action.level,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_FACTOR":
      return {
        ...state,
        difficultyFactor: action.difficultyFactor,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SET_DICTIONARY":
      return {
        ...state,
        dictionary: action.dictionary,
      };
    case "SET_DATA_RECEIVED":
      return {
        ...state,
        dictionary: action.dictionary,
        dataReceived: action.dataReceived,
      };
    case "SET_SCORE":
      return {
        ...state,
        scores: action.scores,
      };
    case "ADD_SCORE_DATA":
      return {
        ...state,
        totalScoreList: action.totalScoreList,
      };
    case "SET_QUIT_GAME":
      return {
        ...state,
        status: "START",
        name: "",
        level: "EASY",
        difficultyFactor: 1,
        score: [],
        totalScoreList: [],
      };
    case "SET_GAME_OVER":
      return {
        ...state,
        status: action.status,
        // totalScoreList: action.totalScoreList,
        playing: action.playing,
      };
    default:
      return state;
  }
};

export default reducer;
