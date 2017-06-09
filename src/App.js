import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import firebase from './firebase.js'

import Header from './components/Header.js';
import Home from './pages/Home.js';


class App extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      post: '',
      posts: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const postsRef = firebase.database().ref('posts');
    postsRef.on('value', (snapshot) => {
      let posts = snapshot.val();
      let newState = [];
      for (let post in posts) {
        newState.push({
          id: post,
          text: posts[post].text,
          user: posts[post].user,
          hearts: posts[post].hearts
        });
      }
      this.setState({
        posts: newState
      });
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const postsRef = firebase.database().ref('posts');
    const post = {user: this.state.username, text: this.state.post, hearts: 0}
    postsRef.push(post);
    this.setState({username:'', post:''});
  }

  removePost(postId) {
      const postRef = firebase.database().ref(`/posts/${postId}`);
      postRef.remove();
  }

  addHeart(postId) {
    const postRef = firebase.database().ref('posts').child(postId);
    postRef.transaction((post) => {
      if (post) {
        post.hearts = post.hearts + 1;
      }
      return post;
    })
  }

  render() {
    return (
      <Router>
        <div className="app container">
          <Header />
          <br/>
          <form onSubmit={this.handleSubmit}>
            <label>Username:</label>
            <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/>
            <br/>
            <label>Post:</label>
            <input type="text" name="post" onChange={this.handleChange} value={this.state.post}/>
            <br/>
            <input type="submit" />
          </form>
          <hr />

          <h3>Today's Top Posts</h3>

          <section className="top-posts">
            <ul>
              {this.state.posts.map((post) => {
                return (
                  <li key={post.id}>
                    <b>{post.user}</b>
                    <p>{post.text}</p>
                    <button onClick={() => this.addHeart(post.id)}>{post.hearts} hearts</button>
                    <button onClick={() => this.removePost(post.id)}>Remove Item</button>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
