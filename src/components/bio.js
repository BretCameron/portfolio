/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-portrait.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 527) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        // background: `black`,
        // color: `white`,
        minHeight: `100vh`
      }}
    >
      <h1
        id="about"
        style={{
          textAlign: `left`,
          padding: `40px 0`,
        }}
      >
        About Me
    </h1>
      <div
        style={{
          marginBottom: rhythm(2.5),
          textAlign: `center`,
          display: `grid`,
          gridTemplateColumns: `1fr 1.5fr`,
          gridColumnGap: 80
        }}
      >
        <Image
          fluid={data.avatar.childImageSharp.fluid}
          alt={author}
          style={{
            marginBottom: `10px`,
            minWidth: 50,
            // border: `1px solid #000000`,
            height: 450,
            objectFit: `cover`,
            // boxShadow: `-8px 8px 0 0 #000000`
            boxShadow: `-2px 2px 5px 2px #00000033`
          }}
          imgStyle={{
            borderRadius: `0%`,
          }}
        />
        <div
          style={{
            marginTop: `20vh`,
            textAlign: `left`
          }}
        >
          <p
            style={{
              fontSize: `1.1rem`,
              fontWeight: 100
            }}
          >
            I'm a developer and designer based in London, currently on the look out for new opportunities. I specialise in the MERN stack (MongoDB, Express, React, Node).
      </p>
          <hr width="100" />
          <h4>
            Technologies
          </h4>
          <div
            style={{
              fontSize: `1rem`,
              fontWeight: 100,
              columnCount: 3,
              textAlign: `left`,
              paddingLeft: `20px`
            }}
          >
            <ul>
              <li>JavaScript</li>
              <li>React</li>
              <li>Redux</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB</li>
              <li>Sass</li>
              <li>Git/GitHub</li>
              <li>Git Bash</li>
              <li>Mocha/Chai</li>
              <li>JQuery</li>
              <li>PHP</li>
              <li>Gatsby.js</li>
              <li>Next.js</li>
              <li>Photoshop</li>
              <li>Illustrator</li>
              <li>InDesign</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bio
