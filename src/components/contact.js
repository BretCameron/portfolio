import React, { Component } from 'react';
import Container from './container';
import { StaticQuery, graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import isEmail from 'validator/lib/isEmail';

export default class Contact extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  };

  onChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value })
  };

  onSubmit = (e) => {
    const { name, email, message } = this.state;
    if (!name || !email || !message || !isEmail(email)) {
      e.preventDefault();
    }
  };

  render() {
    return (
      <div
        style={{
          background: `linear-gradient(45deg, #ddd, #aaa, #777, #111)`,
          color: `white`,
          marginTop: `100px`,
          boxShadow: `0px -2px 5px #00000055`,
        }}>
        <div style={{
          background: `linear-gradient(#00000055, #000000ff)`,
          width: `100%`,
          height: `100%`,
          paddingBottom: `50px`,
        }}>
          <Container>
            <h1
              id="contact"
              style={{
                textAlign: `left`,
                padding: `40px 0`,
                zIndex: `10`,
                color: `white`,
                gridColumn: `1 / 3`
              }}
            >
              Get In Touch
            </h1>
            <form name="contact" id="contact-form" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="contact" />
              <div className="contact-grid">
                <div>
                  <label htmlFor="name">Name: </label>
                  <br />
                  <input onChange={this.onChange} style={{
                    width: `100%`,
                    fontWeight: `100`,
                    background: `#22222255`,
                    color: `white`,
                    padding: `4px 8px`,
                    minHeight: `2.5rem`,
                    border: `1px solid #555555`
                  }} id="name" name="name" type="text" />
                </div>
                <div>
                  <label htmlFor="email">Email: </label>
                  <br />
                  <input onChange={this.onChange} style={{
                    width: `100%`,
                    fontWeight: `100`,
                    background: `#22222255`,
                    color: `white`,
                    padding: `4px 8px`,
                    minHeight: `2.5rem`,
                    border: `1px solid #555555`
                  }} id="email" name="email" type="text" />
                </div>
                <div className="input-full-width">
                  <label htmlFor="message">Message: </label>
                  <br />
                  <textarea onChange={this.onChange} style={{
                    width: `100%`,
                    fontWeight: `100`,
                    background: `#22222255`,
                    color: `white`,
                    padding: `4px 8px`,
                    minHeight: `8rem`,
                    border: `1px solid #555555`
                  }} id="message" name="message" />
                </div>
                <div className="input-full-width">
                  <input id="submit" type="submit" value="Submit" style={{
                    width: `100%`,
                    background: `none`,
                    border: `1px solid white`,
                    minHeight: `2.5rem`,
                    color: `white`,
                    cursor: `pointer`
                  }} />
                </div>
              </div>
            </form>
          </Container>
        </div>
      </div>
    )
  }
};
