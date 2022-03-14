const initState = {
    blocks: [],
    validChain: false,
    balance: '',
};

const BlockChainReducers = (state = initState, action) => {
    switch (action.type) {
        case 'START_CHAIN':
            return {
                ...state,
                blocks: action.payload
            }
        case 'CHECK_CHAIN':
            return {
                ...state,
                validChain: action.payload
            }
        case 'GET_NEW_CHAIN':
            return {
                ...state,
                blocks: [...state.blocks, action.payload]
            }
        case 'GET_BALANCE':
            return {
                ...state,
                balance: action.payload
            }
        default:
            return state;
    }
}
export default BlockChainReducers;