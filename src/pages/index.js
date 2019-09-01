import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import "./style.css"

import Bio from "../components/bio"
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
        <SEO title="All posts" />
        <Container>
          <Bio />
        </Container>
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
                padding: `40px 0 20px 0`,
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
                <Zoom>
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
                        <a target="_blank" href={node.frontmatter.link}>
                          <div style={{
                            display: `flex`,
                            justifyContent: `left`,
                            alignItems: `center`
                          }}>
                            <h3 style={{
                              margin: `20px 10px 10px 0`

                            }}>
                              {node.frontmatter.title}
                            </h3>
                            <h4 style={{
                              margin: `20px 0 10px 0`,
                              fontSize: `0.8rem`,
                              color: `#333`
                            }}>
                              {node.frontmatter.draft ? '(Draft)' : ''}
                            </h4>
                          </div>
                        </a>
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
                      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                        {title}
                      </Link>
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
