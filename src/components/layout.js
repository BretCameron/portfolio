import BackgroundImage from "gatsby-background-image";
import Fade from 'react-reveal/Fade';
import { Link, StaticQuery, graphql } from "gatsby";
import { Parallax } from 'react-scroll-parallax';
import React, { Component } from "react";

import Container from "../components/container";
import { ParallaxProvider } from 'react-scroll-parallax';
import NavBar from "../components/navbar";
import { rhythm, scale } from "../utils/typography";

class Layout extends Component {
  goToBio = () => {
    if (this.props.location.hash === "#about") {
      window.scrollTo(0, document.querySelector('#about').getBoundingClientRect().y
      );
    };
  };

  render() {
    const { location, title, children, description } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

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
              <BackgroundImage
                Tag="section"
                fluid={data.background.childImageSharp.fluid}
                backgroundColor={`#FFF`}
                style={{
                  backgroundAttachment: `fixed`,
                  color: `white`,
                  height: `calc(95vh - 60px)`,
                  textAlign: `center`,
                  backgroundPosition: `bottom`,
                  imageRendering: `crisp-edges`,
                  zIndex: 2,
                  marginBottom: `-10px`
                }}
              >
                <div style={{
                  height: `calc(95vh - 60px)`,
                }}>
                  <Fade>
                    <Container>
                      <div style={{
                        width: `100%`,
                        margin: `0, auto`, diplay: `flex`,
                        alignItems: `center`
                      }}>
                        <h1
                          className="title"
                          style={{
                            marginBottom: rhythm(1.5),
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
                          className="description"
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
                        <Link to="/#about" onClick={this.goToBio}>
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
              <img
                className="hero-cutout"
                src={require('../../content/assets/triangles.svg')} alt="" style={{
                  position: `absolute`,
                  width: `100%`,
                  overflow: `hidden`,
                  left: `0px`,
                  bottom: `0px`,
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
        <></>
      )
    }
    return (
      <>
        <ParallaxProvider>
          <NavBar home={location.pathname === rootPath} />
          <header>{header}</header>
          <main style={{ marginTop: `10px` }}>{children}</main>
          <footer style={{
            background: `#000`,
            color: `#FFF`
          }}>
            <Container>
              <div style={{ margin: `0 auto`, textAlign: `center` }}>
                <hr width="100" style={{ margin: `20px auto`, borderTop: `1px solid white` }} />
                © {new Date().getFullYear()}
              </div>
            </Container>
          </footer>
        </ParallaxProvider>
      </>
    )
  }
};

export default Layout;

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
`;