import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./twitter.css";
import axios from "axios";

class Twitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getTweetID: "",
      createTweetData: "",
      deleteTweetID: "",
      getTweet: {},
      createTweet:{},
      deleteTweet:{}
    };
  }

  getTweet = () => {
    axios.get("http://localhost:3001/getTweet/"+this.state.getTweetID, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ getTweet: response.data.data });
      })
      .catch((error) => console.log("error", error));
  };

  createTweet = () => {
    let data={
      tweet: this.state.createTweetData
    }
    axios.post("http://localhost:3001/createTweet", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data
      })
      .then((response) => {
        this.setState({ createTweet: response.data });
      })
      .catch((error) => console.log("error", error));
  };

  deleteTweet = () => {
    axios.delete("http://localhost:3001/deleteTweet/"+this.state.deleteTweetID, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ deleteTweet: response.data });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    console.log(this.state)
    return (
      <Container>
        <div className="sectiom">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tweet Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Tweet ID"
                onChange={(e) => {
                  this.setState({ getTweetID: e.target.value });
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.getTweet();
              }}
            >
              Submit
            </Button>
            <div className="result1">
              {this.state.getTweet && this.state.getTweet.id
                ? this.state.getTweet.id
                : ""}
              {this.state.getTweet && this.state.getTweet.text
                ? this.state.getTweet.text
                : ""}
            </div>
          </Form>
        </div>
        <div className="sectiom">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Create Tweet</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label="Tweet">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a Status here"
                  style={{ height: "100px" }}
                  onChange={(e) => {
                  this.setState({ createTweetData: e.target.value });
                }}
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault();
                this.createTweet();
              }}>
              Create
            </Button>
          </Form>
          <div>{this.state.createTweet && this.state.createTweet.tweetId?this.state.createTweet.tweetId:""}</div>
        </div>
        <div className="sectiom">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tweet Id</Form.Label>
              <Form.Control type="text" placeholder="Enter Tweet ID" onChange={(e) => {
                  this.setState({ deleteTweetID: e.target.value });
                }}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault();
                this.deleteTweet();
              }}>
              Submit
            </Button>
          </Form>
          <div>{this.state.deleteTweet && this.state.deleteTweet.data?this.state.deleteTweet.data:""}</div>
        </div>
      </Container>
    );
  }
}

export default Twitter;
