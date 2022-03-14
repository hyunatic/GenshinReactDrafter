import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import BlockChainReducers from './BlockChainReducers';

/**
 * RootReducer
 */
const RootReducer = combineReducers({
    auth: AuthReducers,
    blockchain: BlockChainReducers
});

export default RootReducer;