import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
    display_val : '',
    sum : 0,
    operation : '',
    sum_flag: '0'
}

function reducer(state = initialState, action) {
    console.log('reducer',state,action);
    switch(action.type) {
        case "INPUT_NUM" : {
            if(state.sum_flag == '1')
            {
                return Object.assign({},state,{
                    display_val: action.value,
                    sum_flag : '0'
                })
            }
            if(state.operation != '')
            {
                return Object.assign({},state,{
                    display_val: state.display_val.replace(/[^a-zA-Z0-9]/g, '').concat(action.value)
                })
            } 
            else 
            {
                return Object.assign({},state,{
                    display_val : state.display_val.concat(action.value)
                })
            }
        }
        case "INPUT_CLEAR" : {
            return Object.assign({},state,{
                display_val : ""
            })
        }
        case "OPERATION" : {
            if(state.operation == '')
            {
                return Object.assign({},state,{
                    sum : state.display_val,
                    operation : action.value,
                    display_val: action.value
                })
            }
            else
            {
                if(state.operation == "+")
                {
                    return Object.assign({},state,{
                        sum: parseInt(state.sum) + parseInt(state.display_val) ,
                        operation : action.value,
                        display_val: action.value
                    })
                }
                else if(state.operation == "-")
                {
                    return Object.assign({},state,{
                        sum: parseInt(state.sum) - parseInt(state.display_val) ,
                        operation : action.value,
                        display_val: action.value
                    })
                }
                else if(state.operation == "*")
                {
                    return Object.assign({},state,{
                        sum: parseInt(state.sum) * parseInt(state.display_val) ,
                        operation : action.value,
                        display_val: action.value
                    })
                }
                else if(state.operation == "/")
                {
                    return Object.assign({},state,{
                        sum: parseInt(state.sum) / parseInt(state.display_val) ,
                        operation : action.value,
                        display_val: action.value
                    })
                }
                else if(state.operation == "=")
                {
                    return Object.assign({},state,{
                        operation : "",
                        display_val: state.sum,
                        sum: 0
                    })
                }
            }
        }
        case "EQUALTO": {
            let sum = state.sum;
            if(state.operation == "+")
            {
                sum = parseInt(state.sum) + parseInt(state.display_val)
            }
            else if(state.operation == "-")
            {
                sum = parseInt(state.sum) - parseInt(state.display_val)
            }
            else if(state.operation == "*")
            {
                sum = parseInt(state.sum) * parseInt(state.display_val)
            }
            else if(state.operation == "/")
            {
                sum = parseInt(state.sum) / parseInt(state.display_val)
            }
            return Object.assign({},state,{
                operation : "",
                display_val: sum,
                sum: 0,
                sum_flag: '1'
            })
        }
        default: 
            return state;
    }
    return state;
}
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
