/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import Fade from 'react-reveal/Fade';
import BackgroundImage from "gatsby-background-image"

import { Parallax } from 'react-scroll-parallax'
import { rhythm } from "../utils/typography"
import Container from "../components/container"

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
      background: file(absolutePath: { regex: "/dark3.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 4320) {
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

  const { author } = data.site.siteMetadata
  return (
    <>
      <Parallax y={[10, 35]} tagOuter="figure">
        <BackgroundImage
          Tag="section"
          fluid={data.background.childImageSharp.fluid}
          backgroundColor={`#111111`}
          style={{
            zIndex: `0`,
            background: `linear-gradient(45deg, #222222, black)`,
            width: `100%`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
            minHeight: `800px`,
            height: `110vh`,
            animationFillMode: `none`,
            marginBottom: `-800px`,
          }}
        />
      </Parallax>
      <Container>
        <div
          style={{
            // background: `black`,
            minHeight: `105vh`,
            zIndex: `10`,
            color: `white`
          }}
        >
          <div
            style={{
              marginBottom: rhythm(2.5),
              textAlign: `center`,
              display: `grid`,
              gridTemplateColumns: `1fr 1.3fr`,
              gridColumnGap: 40
            }}
          >
            <h1
              id="about"
              style={{
                textAlign: `left`,
                padding: `40px 0`,
                zIndex: `10`,
                color: `white`,
                gridColumn: `1 / 3`
              }}
            >
              About Me
            </h1>
            <Fade>
              <div
                style={{
                  marginBottom: `10px`,
                  minWidth: 50,
                  // border: `1px solid #000000`,
                  height: 450,
                  objectFit: `cover`,
                  // boxShadow: `-8px 8px 0 0 #000000`,
                  // boxShadow: `-2px 2px 5px 2px #00000033`,
                  overflow: `hidden`
                }}
              >
                <Parallax y={[10, -15]} tagOuter="figure">
                  <Image
                    fluid={data.avatar.childImageSharp.fluid}
                    alt={author}

                    imgStyle={{
                      borderRadius: `0%`,
                      transform: `scale(1.15)`,
                      // height: `100%`,
                      width: `100%`,
                    }}
                  />
                </Parallax>
              </div>
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
                <hr width="100" style={{ border: `none`, borderTop: `1px solid white` }} />
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
            </Fade>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Bio
