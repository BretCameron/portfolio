import BackgroundImage from "gatsby-background-image";
import Fade from 'react-reveal/Fade';
import Image from "gatsby-image";
import { Parallax } from 'react-scroll-parallax';
import React from "react";
import { rhythm } from "../utils/typography";
import { useStaticQuery, graphql } from "gatsby";

import Container from "../components/container";

const Bio = (props) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-portrait.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 840) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      background: file(absolutePath: { regex: "/dark3.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 2160) {
            ...GatsbyImageSharpFluid_withWebp
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
      <Parallax y={[25, 40]} tagOuter="figure">
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
            height: `120vh`,
            animationFillMode: `none`,
            marginBottom: `-600px`,
          }}
        />
      </Parallax>
      <Container>
        <div
          id="about"
          style={{
            minHeight: `120vh`,
            zIndex: `10`,
            color: `white`
          }}
        >
          <div
            className="bio-grid"
            style={{
              marginBottom: `rhythm(2.5)`
            }}
          >
            <h1
              className="about-me"
            >
              About Me
            </h1>
            <Fade>
              <div
                className="bio-img"
                style={{
                  marginBottom: `10px`,
                  minWidth: 50,
                  height: 450,
                  objectFit: `cover`,
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
                    fontWeight: 100,
                    textShadow: `2px 2px 5px #000000`,
                  }}
                >
                  I'm a developer and designer based in London, currently on the look out for new opportunities. I specialise in the MERN stack (MongoDB, Express, React, Node).
      </p>
                <hr width="100" style={{ border: `none`, borderTop: `1px solid white` }} />
                <h4>
                  Technologies
          </h4>
                <div
                  className="tech-list"
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

export default Bio;
