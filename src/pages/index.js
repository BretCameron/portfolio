import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import "./style.css"

import Bio from "../components/bio"
import Contact from "../components/contact"
import Container from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDesc = data.site.siteMetadata.description
    const posts = data.posts.edges
    const projects = data.projects.edges

    return (
      <Layout location={this.props.location} title={siteTitle} description={siteDesc} >
        <SEO title="Portfolio and Blog" />
        {/* <Container> */}
        <Bio />
        {/* </Container> */}
        {/* <Image
          fluid={data.background.childImageSharp.fluid}
          alt=""
          style={{
            marginBottom: `10px`,
            minWidth: `100%`,
            border: `1px solid black`,
            objectFit: `cover`,
          }}
          imgStyle={{
            borderRadius: `0%`,
          }}
        /> */}
        <Container>
          <div
            style={{
              marginTop: 50,
            }}
          >
            <h1
              id="projects"
              style={{
                padding: `80px 0 20px 0`,
                textAlign: `left`
              }}
            >
              Projects
          </h1>
          </div>
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gridGap: `0 30px`
            }}
          >
            {projects.map(({ node }) => {
              return (
                <Zoom key={node.fields.slug}>
                  <div
                    key={node.fields.slug}
                    style={{
                      // border: `1px solid #000000BB`,
                      // padding: 20,
                      // boxShadow: `-8px 8px 0 0 #000000BB`
                    }}
                  >
                    {node.frontmatter.featuredImage ? <Image
                      fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
                      style={{
                        boxShadow: `-2px 2px 5px 2px #00000033`
                      }}
                    /> : ''}
                    <div
                      style={{
                        padding: 10,
                        display: `grid`,
                        gridTemplateColumns: `25px auto 25px`
                      }}
                    >
                      <div>
                        <div style={{
                          margin: `10px 0 10px 0`,
                          borderLeft: `1px solid lightgrey`,
                          height: `160px`
                        }} />
                      </div>
                      <div>
                        <div style={{
                          display: `flex`,
                          justifyContent: `space-between`,
                          alignItems: `flex-end`
                        }}>
                          <div style={{
                            display: `inline-block`
                          }}>
                            <h3 style={{
                              margin: `20px 10px 10px 0`,
                              display: `inline-block`

                            }}>
                              {node.frontmatter.title}
                            </h3>
                            <h4 style={{
                              margin: `20px 0 15px 0`,
                              fontSize: `0.8rem`,
                              color: `#333`,
                              display: `inline-block`

                            }}>
                              {node.frontmatter.draft ? '(Draft)' : ''}
                            </h4>
                          </div>
                          {node.frontmatter.link ? <a style={{
                            display: `inline-block`,
                            margin: `10px 0 8px 0`,
                          }} target="_blank" rel="noopener noreferrer" href={node.frontmatter.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <title>Go to Website</title>
                              <path fill="#007acc" d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z"/></svg>
                        </a> : ''}
                        </div>
                        <p>
                          <em><strong>Tech: </strong>{node.frontmatter.tech}</em>
                        </p>
                        <p>
                          {node.frontmatter.description}
                        </p>
                      </div>
                      <div>
                        <div style={{
                          margin: `10px 0 10px 0`,
                          borderRight: `1px solid lightgrey`,
                          height: `160px`
                        }} />
                      </div>
                    </div>
                  </div>
                </Zoom>
              )
            })}
          </div>
        </Container>
        <Container>
          <div
            style={{
              marginTop: 50,
            }}
          >
            <h1
              id="blog"
              style={{
                padding: `40px 0 20px 0`,
                textAlign: `left`
              }}
            >
              Blog
          </h1>
          </div>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Fade>
                <article key={node.fields.slug}>
                  <header>
                    <h3
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <a target="_blank" rel="noopener noreferrer" style={{ boxShadow: `none` }} href={node.frontmatter.link}> 
                        {title}
                      </a>
                    </h3>
                    <small>{node.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </section>
                </article>
              </Fade>
            )
          })}
        </Container>
        <Contact />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    posts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {fileAbsolutePath: {regex: "/content\\/blog/"}}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            link
          }
        }
      }
    }
    projects: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {fileAbsolutePath: {regex: "/content\\/projects/"}},) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tech
            link
            draft
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1080) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    },
    background: file(absolutePath: { regex: "/background.jpg/" }){
      childImageSharp {
        fluid(maxWidth: 527) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
