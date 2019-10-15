import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store'
import { changeInputAction, addItemAction, deleteItemAction } from './store/actionCreators'

class TodoList extends Component {

    constructor(props) {
        super(props)
        // console.log(store.getState())
        this.state = store.getState()
        this.changeInputValue = this.changeInputValue.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.clickButton = this.clickButton.bind(this)

        store.subscribe(this.storeChange)

    }

    render() {
        return (
            <div>
                <div style={{ margin: "10px" }}>
                    <Input
                        placeholder={this.state.inputValue}
                        style={{ width: "250px" }}
                        onChange={this.changeInputValue}
                        value={this.state.inputValue}
                    />
                    <Button
                        type="primary"
                        style={{ marginLeft: "5px" }}
                        onClick={this.clickButton}
                    >
                        增加
                    </Button>
                    <div
                        style={{ margin: "10px", width: "310px" }}

                    >
                        <List
                            bordered
                            dataSource={this.state.list}
                            renderItem={(item, index) => (
                                <List.Item
                                    onClick={this.deleteItem.bind(this, index)}
                                >
                                    {item}
                                </List.Item>
                            )}
                        />
                    </div>

                </div>
            </div>
        );
    }


    changeInputValue(e) {
        // console.log(e.target.value)
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }

    storeChange() {
        this.setState(
            store.getState()
        )

    }

    clickButton() {
        // console.log("janonx")
        const action = addItemAction()
        store.dispatch(action)

    }

    deleteItem(index) {
        // console.log(index)

        const action =deleteItemAction(index);
        store.dispatch(action)
    }
}

export default TodoList;