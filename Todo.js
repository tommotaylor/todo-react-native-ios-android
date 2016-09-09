import React, { Component } from 'react';
import { AppRegistry, View, Navigator, Text } from 'react-native';
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

class Todo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos : [
        { task : "Learn React Native" },
        { task : "Learn Redux" }
      ]
    };
  }

  handlePress() {
    this.nav.push({
      name: 'todoform',
    });
  }

  onCancel() {
    this.nav.pop();
  }

  onAdd(task) {
    console.log("added: " + task );
    this.state.todos.push({ task });
    this.setState({ todos: this.state.todos });
    this.nav.pop();
  }

  onDone(todo) {
    console.log("done pressed on: " + todo.task);
    const filteredTodos = this.state.todos.filter((filterTodo) => {
      return filterTodo !== todo;
    });
    this.setState({ todos: filteredTodos });
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  renderScene(route, nav) {
    switch (route.name) {
      case 'todoform':
        return (
          <TaskForm
            onCancel={this.onCancel.bind(this)}
            onAdd={this.onAdd.bind(this)}
          />
        );
      default:
        return (
          <TaskList
            todos={this.state.todos}
            handlePress={this.handlePress.bind(this)}
            onDone={this.onDone.bind(this)}
          />
        );
    }
  }

  render() {
    const routes = [
      {name: 'tasklist', index: 0},
      {name: 'todoform', index: 1}
    ];

    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={routes[0]}
        ref={((nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

export default Todo;
