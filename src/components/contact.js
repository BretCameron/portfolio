import React, { Component } from 'react'
import Container from './container'
import { StaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Fade from 'react-reveal/Fade';
import isEmail from 'validator/lib/isEmail';

export default class Contact extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  }

  onChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value })
  }

  onSubmit = (e) => {
    const { name, email, message } = this.state;
    if (!name || !email || !message || !isEmail(email)) {
      e.preventDefault();
    }
  }


  render() {
    return (
      <StaticQuery
        query={graphql`
            query ContactQuery {
              background: file(absolutePath: { regex: "/grey.jpg/" }) {
                childImageSharp {
                 fluid(maxWidth: 2160, traceSVG: {color: "#111111"}) {
                   ...GatsbyImageSharpFluid_withWebp 
                 }
                }
              }
            }
          `}
        render={data => (
          <BackgroundImage
            Tag="section"
            fluid={data.background.childImageSharp.fluid}
            backgroundColor={`#FFFFFF`}
            style={{
              // background: `black`,
              color: `white`,
              marginTop: `100px`,
              boxShadow: `0px -2px 5px #00000055`,
              // paddingBottom: `100px`
            }}>
            <div style={{
              background: `linear-gradient(#00000055, #000000ff)`,
              width: `100%`,
              height: `100%`,
              paddingBottom: `50px`,
              // marginBottom: `100px`
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
                  <div style={{
                    display: `grid`,
                    gridTemplateColumns: `1fr 1fr`,
                    gridGap: `20px`
                  }}>
                    <div>
                      <label htmlFor="name">Name: </label>
                      <br />
                      <input onChange={this.onChange} style={{
                        width: `100%`,
                        fontWeight: `100`,
                        background: `#22222255`,
                        color: `white`,
                        padding: `2px 4px`,
                        minHeight: `2rem`,
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
                        padding: `2px 4px`,
                        minHeight: `2rem`,
                        border: `1px solid #555555`
                      }} id="email" name="email" type="text" />
                    </div>
                    <div style={{
                      gridColumn: `1 /3`
                    }}>
                      <label htmlFor="message">Message: </label>
                      <br />
                      <textarea onChange={this.onChange} style={{
                        width: `100%`,
                        fontWeight: `100`,
                        background: `#22222255`,
                        color: `white`,
                        padding: `2px 4px`,
                        minHeight: `8rem`,
                        border: `1px solid #555555`
                      }} id="message" name="message" />
                    </div>
                    <div style={{
                      gridColumn: `1 /3`
                    }}>
                      <input id="submit" type="submit" value="Submit" style={{
                        width: `100%`,
                        background: `none`,
                        border: `1px solid white`,
                        color: `white`,
                        cursor: `pointer`
                      }} />
                    </div>
                  </div>
                </form>
              </Container>
            </div>
          </BackgroundImage>

        )} />
    )
  }
}
