import React from 'react';

function TodoList() {

    // todoList keep all list items 
    const [todoList, setTodoList] = React.useState([]);
    console.log(todoList)
    // save the new todo from the input 
    const [createTodo, setCreateTodo] = React.useState("");

    // addTodo is a function to add new todo 
    function addTodo(){
        
        const _todoList = [...todoList];
        _todoList.push({todo:createTodo, status :0});
        //setTodoList(_todoList);
        sortList(_todoList);
    }
    // inProgress() is a function to update the status of the todo to 1 
    function changeState(itemNo, status){
        const _todoList = [...todoList];
        _todoList[itemNo].status = status;
        //setTodoList(_todoList);
        sortList(_todoList);
    }

    // sort the todoList
    function sortList(curList){
        const _todolist = [...curList];
        _todolist.sort((a, b) => a.status - b.status);

        setTodoList(_todolist);
      

    }

    

    return (
        <>
            
            <div className = 'create-todo'>

                <label className = "create-todo__item">Create new Todo: </label>
                <input
                    name = 'create-todo-input'
                    className = 'create-todo__item'
                    type='text'
                    value = {createTodo}
                    onChange = {event => setCreateTodo(event.target.value)}
                />

                <button className= "create_todo__item bttom-primary"
                        onClick= {()=> addTodo()}Add the Todo>add Todo Item</button>

             
            </div>

            {/* <button className = 'buttom-primary'
                    onClick = {()=>sortList()}>sort todo list</button>
  */}

            
            {
                todoList.map((item, index)=>{
                    let className = "todo-item__" + (item.status === 0 ? "start" : item.status === 1 ? "progress" : "complete");
                    return (
                        <div className = 'todo-item'>
                            <li className = {className}>
                                {item.todo}
                            </li>
                            {
                                item.status === 0 && (<button className='button-secondary' 
                                                        onClick = {()=>changeState(index, 1 )}>
                                                            In progress 
                                                        </button>)
                            }

                            {
                                item.status <= 1 && (<button className='button-secondary' 
                                                        onClick = {()=>changeState(index, 2)}>
                                                            Complete 
                                                        </button>)
                            }
                        

                        </div>
                    )
                })
            }
            
            
        
        </>
      
    );
  }
  
  export default TodoList;