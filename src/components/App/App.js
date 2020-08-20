import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

import './App.css';



class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            {
                label: 'Drink Coffee',
                important: false,
                id: 1
            },
            {
                label: 'Make Awesome App',
                important: false,
                id: 2
            },
            {
                label: 'Have a lunch',
                important: false,
                id: 3
            }
        ],
        term: '',
        filter: 'all'
    };

    // createTodoItem(label) {
    //     const newItem = {
    //         label,
    //         important: false,
    //         done: false,
    //         id: this.maxId++
    //     };
    // }

    addItem = (text) => {
        //generate id 
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };

        //add element to array
        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            };
        });

    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArr = [...before, ...after];

            return {
                todoData: newArr
            };
        });
    };

    // toggleProperty(arr, id, propName) {
    //     const idx = arr.findIndex((el) => el.id === id);
    //     const oldItem = arr[idx];
    //     const newItem = {
    //         ...oldItem,
    //         [propName]: !oldItem[propName]
    //     };
    //     const before = arr.slice(0, idx);
    //     const after = todoData.slice(idx + 1);

    //     const newArr = [
    //         ...before,
    //         newItem,
    //         ...after
    //     ];

    //     return {
    //         todoData: newArr
    //     };
    // }

    onToggleImportant = (id) => {

        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[idx];
            const newItem = {
                ...oldItem,
                important: !oldItem.important
            };
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);

            const newArr = [
                ...before,
                newItem,
                ...after
            ];

            return {
                todoData: newArr
            };
        });

    };
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[idx];
            const newItem = {
                ...oldItem,
                done: !oldItem.done
            };
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);

            const newArr = [
                ...before,
                newItem,
                ...after
            ];

            return {
                todoData: newArr
            };
        });
    };



    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term) > -1;
        });
    }

    onSearchChange = (term) => {
        this.setState({ term });
    };
    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }


    render() {

        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(
            this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-app' >
                <AppHeader
                    toDo={todoCount}
                    done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    }
};



export default App;




