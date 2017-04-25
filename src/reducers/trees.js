import {
    TREES_PARSING_STARTED,
    TREES_PARSING_FINISHED,
} from '../actions/types.js';

const initialTrees = {
    isParsing: false,
    trees: [],
};

const trees = (state = initialTrees, action) => {
    switch (action.type) {
        case TREES_PARSING_STARTED:
            return {
                ...state,
                isParsing: true,
            };
        case TREES_PARSING_FINISHED:
            return {
                ...state,
                isParsing: false,
                trees: action.trees,
            };
        default:
            return state;
    }
}

export default trees;
