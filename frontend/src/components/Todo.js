import React, { Component } from 'react';

import { Input, Icon, Button, Card, List, Spin, Checkbox } from 'antd';

export class Todo extends Component {

  state = {
    inputText: '',
    listItem: [],
    isLoading: true,
    isSelectAll: false
  }

  componentDidMount() {
    // เราควรจะ fetch เพื่อเอาค่ามาจาก MockAPI 
    this.fetchGet();
  }

  fetchGet = async () => {
    const result = await fetch('http://localhost:3002/todo')
    let data = await result.json();
    // console.log(data)
    let listItem = data.map((value, index) => {
      return value
    });

    this.setState({ listItem, isLoading: false })
  }

  fetchPost = async (text) => {
    this.setState({ isLoading: true });
    const result = await fetch('http://localhost:3002/todo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: text
      }),
    })
    console.log(result.ok)
    if (result.ok) {
      // ท่านี้ก็ได้ดูดีกว่า 1
      let data = await result.json()
      let listItem = this.state.listItem.concat(data);
      this.setState({ listItem, isLoading: false })
      // ท่านี้ก็ได้ดูดีกว่า 2
      //this.fetchGet();
    }

  }

  deleteListAtIndex = async (id) => {
    // ไม่ควรทำเพราะเป็นการ Render ใหม่ทั้ง State ถ้ามีเยอะก็ฉิบหายยย สิครับ
    // this.state.listItem.splice(index, 1);
    // this.setState({});
    console.log(this.state.listItem)
    this.setState({ isLoading: true })
    await fetch(`http://localhost:3002/todo/${id}`, {
      method: 'DELETE'
    })
    // console.log(listItem)
    this.setState({ listItem: this.state.listItem.filter(todo => todo.id !== id), isLoading: false });
    // console.log(this.state.listItem)

  }

  deleteTodo = async (id) => {
    const resp = await this.fetchAsync(URL + id, {
      method: 'DELETE'
    });
    if (resp) {
      const todo = this.state.listItem.filter(todo =>
        todo.id !== id
      );
      this.setState({ listItem: todo });
    }
  }

  submitList = () => {
    this.fetchPost(this.state.inputText);
    this.setState({
      //listItem: this.state.listItem.concat([this.state.inputText]),
      inputText: ''
    })
    //console.log(this.state.listItem);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.submitList();
    }
  }

  handleChangeText = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleToggleComplete = (id, isCompleted) => {
    if (isCompleted) {
      this.setIncompleteTodo(id);
    } else {
      this.setCompleteTodo(id);
    }
  }

  handleCheckAll = () => {
    const isSelect = !this.state.isSelectAll;

    const todo = this.state.listItem.map(todo => {
      return { ...todo, selected: isSelect }
    });

    console.log('Check All', todo)

    this.setState({ listItem: todo, isSelectAll: isSelect });
  }
  
  handleCheck = (id, isSelected) => {
    isSelected = !isSelected
    console.log(id + ': ' + isSelected)
    const todo = this.state.listItem.map(todo =>
      todo.id === id
        ? { ...todo, selected: isSelected }
        : todo
    );
    this.setState({ listItem: todo });
  }

  handleDeleteSelected = () => {
    for (let todo of this.state.listItem) {
      if (todo.selected) {
        this.deleteListAtIndex(todo.id);
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.state.isLoading === false ? <Card style={{ width: 600, backgroundColor: this.props.myColor }}>
            <h1>To-do-list</h1>

            <div style={{ marginBottom: '10px' }}>
              <Input
                addonAfter={<Button type="primary" onClick={this.submitList}>Add</Button>}
                onChange={this.handleChangeText}
                value={this.state.inputText}
                onKeyPress={this.handleKeyPress} />
            </div>

            <List
              bordered
              dataSource={this.state.listItem}
              style={{ height: 500, overflow: 'auto' }}
              loading={this.state.isLoading}
              header={
                <div style={{ position: 'relative', height: 20 }}>
                  <Checkbox
                    checked={this.state.isSelectAll}
                    onChange={this.handleCheckAll}
                    style={{ marginRight: 10, position: 'absolute', left: 0 }}
                  >
                    Select All
                </Checkbox>
                  <Button
                    type="danger"
                    size="small"
                    style={{ position: 'absolute', right: 0 }}
                    onClick={this.handleDeleteSelected}
                  >
                    Delete
                </Button>
                </div>
              }
              renderItem={(todo, index) => (
                <List.Item 
                actions={[<a onClick={() => this.deleteListAtIndex(todo.id)}><Icon type="close-circle" 
                style={{ fontSize: 16, color: 'rgb(255, 145, 0)' }} /></a>]}
                >
                {console.log(todo)}
                <Checkbox
                  checked={todo.selected}
                  onChange={() => this.handleCheck(todo.id, todo.selected)}
                  style={{ marginRight: 10 }}
                >
                </Checkbox>
                {console.log('Selected:', todo.selected)}
                <h4
                  onClick={() => { this.handleToggleComplete(todo.id, todo.completed)}}
                >
                {todo.content}</h4>
                </List.Item>
              )}
            />
          </Card> : <Spin />
        }
      </div>
    );
  }
}
