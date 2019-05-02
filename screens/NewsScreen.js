import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
class NewsScreen extends Component {
  static navigationOptions = {
    title: "New Feed",
    header: null
  };

  state = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    refreshing: false
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { seed, page } = this.state;
    const url =
      `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              containerStyle={{ borderBottomWidth: 0 }}
              subtitle={item.email}
              avatar={{uri: item.picture.thumbnail}}
            />
          )}
          keyExtractor={item => item.email}
        />
      </List>
    );
  }
}
export default NewsScreen;
