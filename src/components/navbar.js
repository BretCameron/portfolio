import React, { Component } from 'react'
import { Link } from 'gatsby'
import { rhythm } from "../utils/typography"

const liStyle = {
  display: `inline-block`,
  margin: `0 5px`,
  padding: `2px 5px`,
  cursor: `pointer`,
}

const linkStyle = {
  boxShadow: `none`,
  color: `#FEFEFE`
}

export default class header extends Component {
  render() {
    return (
      <div
        style={{
          background: `#111111`,
          color: `#FEFEFE`
        }}
      >
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(30),
            padding: `${rhythm(0.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <nav
            style={{
              display: `flex`,
              justifyContent: `space-between`
            }}
          >
            <div style={liStyle} />
            <div>
              <ul style={{
                margin: 0,
              }}>
                <Link to='/#about' style={linkStyle}>
                  <li
                    style={liStyle}
                  >
                    About
                  </li>
                </Link>
                <Link to='/#projects' style={linkStyle}>
                  <li
                    style={liStyle}
                  >
                    Projects
                  </li>
                </Link>
                <Link to='/#blog' style={linkStyle}>
                  <li
                    style={liStyle}
                  >
                    Blog
                  </li>
                </Link>
                <Link to='/#contact' style={linkStyle}>
                  <li
                    style={liStyle}
                  >
                    Contact
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
