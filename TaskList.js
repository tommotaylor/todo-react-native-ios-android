import React, { Component } from 'react';
import { ListView, TouchableHighlight, Text, StyleSheet, View } from 'react-native';
import TaskRow from "./TaskRow/Component";

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#E7E7E7',
    flex: 1,
    justifyContent: 'flex-start'
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600'
  }
});

class TaskList extends Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({
      rowHasChanged : (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.todos)
    }
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);
    this.setState({ dataSource });
  }

  renderRow(todo) {
    return (
      <TaskRow todo={todo} onDone={this.props.onDone}/>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
        <TouchableHighlight
          onPress={this.props.handlePress} style={styles.button}
        >
          <Text style={styles.buttonText}>
            Add Todo
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

TaskList.propTypes = {
  onDone: React.PropTypes.func.isRequired
}

export default TaskList;
