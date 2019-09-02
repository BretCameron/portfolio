import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import Fade from 'react-reveal/Fade';
import { Parallax } from 'react-scroll-parallax'
import Container from "../components/container"
import NavBar from "../components/navbar"
import { rhythm, scale } from "../utils/typography"
import { ParallaxProvider } from 'react-scroll-parallax'

class Layout extends React.Component {
  render() {
    const { location, title, children, description } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <StaticQuery
          query={graphql`
            query HeroQuery {
              background: file(absolutePath: { regex: "/background.png/" }) {
                childImageSharp {
                 fluid(maxWidth: 2160, traceSVG: {color: "#111111"}) {
                   ...GatsbyImageSharpFluid_withWebp_tracedSVG 
                 }
                }
              }
            }
          `}
          render={data => (
            <>
              {console.log(data)}
              <BackgroundImage
                Tag="section"
                fluid={data.background.childImageSharp.fluid}
                backgroundColor={`#FFFFFF`}
                style={{
                  // background: `#FFF`,
                  backgroundAttachment: `fixed`,
                  color: `white`,
                  height: `calc(95vh - 60px)`,
                  textAlign: `center`,
                  backgroundPosition: `bottom`,
                  imageRendering: `crisp-edges`,
                  zIndex: 2
                }}
              >
                <div style={{
                  // background: `#00000055`,
                  height: `calc(95vh - 60px)`,
                  minHeight: `600px`,
                }}>
                  <Fade>
                    <Container>
                      <div style={{ 
                        width: `100%`,
                        margin: `0, auto`,                 diplay: `flex`,
                        alignItems: `center`
                        }}>
                        <h1
                          style={{
                            ...scale(1.5),
                            marginBottom: rhythm(1.5),
                            marginTop: "100px",
                            textAlign: `center`
                          }}
                        >
                          <Link
                            style={{
                              boxShadow: `none`,
                              textDecoration: `none`,
                              color: `inherit`,
                            }}
                            to={`/`}
                          >
                            {title}
                          </Link>
                        </h1>
                        <h2
                          style={{
                            marginTop: 0,
                            marginBottom: 150,
                            textAlign: `center`,
                            fontWeight: 100,
                            backgroundPosition: '69% 0%'
                          }}
                        >
                          {description}
                        </h2>
                      </div>
                    </Container>
                  </Fade>
                  <Parallax y={[0, 100]}>
                    <Container>
                      <Fade bottom>
                        <Link to="/#about">
                          <svg style={{
                            boxShadow: `none`,
                            transform: `rotate(90deg)`,
                            cursor: `pointer`,
                            marginLeft: `0px`
                          }} viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path fill="white" d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" /></svg>
                        </Link>
                      </Fade>
                    </Container>
                  </Parallax>
                </div>
              </BackgroundImage>
              <img src={require('../../content/assets/triangles.svg')} alt="" style={{
                position: `absolute`,
                width: `102vw`,
                overflow: `hidden`,
                left: `0px`,
                bottom: `-1px`,
                pointerEvents: `none`,
                imageRendering: `crisp-edges`,
                zIndex: 2
              }} />
            </>
          )}
        />
      )
    } else {
      header = (
        <div />
      )
    }
    return (
      <>
        <ParallaxProvider>
          <NavBar home={location.pathname === rootPath} />
          <header>{header}</header>
          <main>{children}</main>
          <div style={{
            background: `black`,
            color: `white`
          }}>
            <Container>
              <footer style={{ margin: `0 auto`, textAlign: `center` }}>
                <hr width="100" style={{ margin: `20px auto`, borderTop: `1px solid white` }} />
                © {new Date().getFullYear()}
              </footer>
            </Container>
          </div>
        </ParallaxProvider>
      </>
    )
  }
}

export default Layout

export const heroQuery = graphql`
  query {
    background: file(absolutePath: { regex: "/background2.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 527) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`