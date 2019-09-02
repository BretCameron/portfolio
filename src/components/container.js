import React, { Component } from 'react'
import { rhythm } from "../utils/typography"

export default class Container extends Component {
  render() {
    const { children } = this.props
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${rhythm(3 / 4)}`,
        }}
      >
        {children}
      </div>
    )
  }
}
