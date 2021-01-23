export const initialState = {
  playerName: null,
  level: "EASY", //HARD,MEDIUM
  difficultyFactor: 0.01,
  playing: false,
  status: "START", //OVER,PLAYING
  dictionary: {
    EASY: [],
    HARD: [],
    MEDIUM: [],
  },
  dataReceived: false,
};

const reducer = (state, action) => {
  console.log(action, state);
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
        difficultyFactor: state.difficultyFactor + 0.01,
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
    default:
      return state;
  }
};

export default reducer;
