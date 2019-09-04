import React, { Component } from 'react'
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"

const liStyle = {
  display: `inline-block`,
  margin: `0 5px`,
  padding: `2px 2px`,
  cursor: `pointer`,
}

const linkStyle = {
  boxShadow: `none`,
  color: `#FEFEFE`
}

export default class NavBar extends Component {


  render() {
    // const { location, title, children, description } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
    const { home } = this.props;
    let logo

    if (home) {
      logo = (
        <div style={liStyle} />
      )
    } else {
      logo = (
        <h3
          style={liStyle}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              textAlign: `left`
            }}
            to={`/`}
          >
            BretCameron
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          background: `#111111`,
          color: `#FEFEFE`,
          boxShadow: `0 2px 5px #000000aa`,
          width: `100%`,
          top: 0,
          zIndex: 10
        }}
      >
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            padding: `${rhythm(0.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <nav
            className="navbar"
          >
            {logo}
            <div>
              <ul style={{
                margin: `0px`
              }}>
                <li
                  style={liStyle}
                >
                  <Link to='/#about' aria-label="Find out more about me" style={linkStyle}>
                    About
                  </Link>
                </li>
                <li
                  style={liStyle}
                >
                  <Link to='/#projects' aria-label="See my latest projects" style={linkStyle}>
                    Projects
                  </Link>
                </li>
                <li
                  style={liStyle}
                >
                  <Link to='/#blog' aria-label="Check out my latest blog posts" style={linkStyle}>
                    Blog
                  </Link>
                </li>
                <li
                  style={liStyle}
                >
                  <Link to='/#contact' aria-label="Fill in my contact form" style={linkStyle}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

