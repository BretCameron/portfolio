import React, { Component } from 'react'
import { Link } from "gatsby"
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

export default class NavBar extends Component {


  render() {
    // const { location, title, children, description } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
    const { home } = this.props;
    let logo

    console.log(this.props)
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
          // position: `fixed`,
          boxShadow: `0 2px 5px #000000aa`,
          width: `100%`,
          top: 0,
          zIndex: 10,
          // marginBottom: '60px'
        }}
      >
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            // maxWidth: rhythm(30),
            padding: `${rhythm(0.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <nav
            style={{
              display: `flex`,
              justifyContent: `space-between`
            }}
          >
            {logo}
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

